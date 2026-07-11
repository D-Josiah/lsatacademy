import { describe, it, expect } from 'vitest';
import {
  summarize,
  streak,
  weeklyVolume,
  byDimension,
  topMistake,
  errorTagCounts,
  calibration,
  hardestUnsolved,
  recommendation,
  buildDrillLink,
  questionTypeLabel,
  prettyStructure,
} from './journal';

// All analytics are pure (data in, data out). Every test passes a FIXED `today`
// so nothing depends on the real clock. Dates use `logged_on` (YYYY-MM-DD) which
// the code reads directly, sidestepping timezone games with `created_at`.

const TODAY = new Date('2026-06-08T12:00:00');

// Tiny entry factory — only the fields a given function reads need to be set.
const entry = (over = {}) => ({
  result: 'incorrect',
  logged_on: '2026-06-08',
  ...over,
});

describe('summarize', () => {
  it('returns all-zero / null shape for an empty array', () => {
    expect(summarize([], TODAY)).toEqual({
      total: 0,
      today: 0,
      thisWeek: 0,
      avgDifficulty: null,
      accuracy: null,
      streakDays: 0,
    });
  });

  it('counts today and the trailing 7-day window inclusively', () => {
    const entries = [
      entry({ logged_on: '2026-06-08' }), // today
      entry({ logged_on: '2026-06-02' }), // exactly 6 days ago -> in week
      entry({ logged_on: '2026-06-01' }), // 7 days ago -> out of week
    ];
    const s = summarize(entries, TODAY);
    expect(s.total).toBe(3);
    expect(s.today).toBe(1);
    expect(s.thisWeek).toBe(2); // 06-08 and 06-02
  });

  it('treats correct and correct_guessed as right, incorrect as wrong, for accuracy', () => {
    const entries = [
      entry({ result: 'correct' }),
      entry({ result: 'correct_guessed' }),
      entry({ result: 'incorrect' }),
      entry({ result: 'incorrect' }),
    ];
    // 2 of 4 right -> 50%
    expect(summarize(entries, TODAY).accuracy).toBe(50);
  });

  it('averages difficulty only over entries that have one, rounded to 1 decimal', () => {
    const entries = [
      entry({ difficulty: 5 }),
      entry({ difficulty: 2 }),
      entry({ difficulty: undefined }), // ignored
    ];
    // (5 + 2) / 2 = 3.5
    expect(summarize(entries, TODAY).avgDifficulty).toBe(3.5);
  });

  it('falls back to created_at date when logged_on is absent', () => {
    const entries = [{ result: 'incorrect', created_at: '2026-06-08T09:00:00Z' }];
    expect(summarize(entries, TODAY).today).toBe(1);
  });
});

describe('streak', () => {
  it('is 0 for no entries', () => {
    expect(streak([], TODAY)).toBe(0);
  });

  it('counts consecutive days ending today', () => {
    const entries = [
      entry({ logged_on: '2026-06-08' }),
      entry({ logged_on: '2026-06-07' }),
      entry({ logged_on: '2026-06-06' }),
    ];
    expect(streak(entries, TODAY)).toBe(3);
  });

  it('anchors to the most recent logged day when nothing is logged today', () => {
    const entries = [
      entry({ logged_on: '2026-06-06' }),
      entry({ logged_on: '2026-06-05' }),
    ];
    // today is 06-08, nothing today, but 06-06 + 06-05 are a 2-day streak
    expect(streak(entries, TODAY)).toBe(2);
  });

  it('stops at the first gap', () => {
    const entries = [
      entry({ logged_on: '2026-06-08' }),
      entry({ logged_on: '2026-06-07' }),
      // gap on 06-06
      entry({ logged_on: '2026-06-05' }),
    ];
    expect(streak(entries, TODAY)).toBe(2);
  });

  it('counts a day once even with multiple entries', () => {
    const entries = [
      entry({ logged_on: '2026-06-08' }),
      entry({ logged_on: '2026-06-08' }),
      entry({ logged_on: '2026-06-07' }),
    ];
    expect(streak(entries, TODAY)).toBe(2);
  });
});

describe('weeklyVolume', () => {
  it('returns the requested number of buckets, oldest to newest', () => {
    const buckets = weeklyVolume([], 8, TODAY);
    expect(buckets).toHaveLength(8);
    // oldest bucket starts before the newest
    expect(buckets[0].start < buckets[7].start).toBe(true);
    // The newest bucket is anchored to start ON today and runs 6 days forward.
    expect(buckets[7].start).toBe('2026-06-08');
    expect(buckets[7].end).toBe('2026-06-14');
  });

  it('drops entries that fall outside the window and bins the rest by week', () => {
    const entries = [
      entry({ logged_on: '2026-06-08' }), // today -> newest bucket [06-08..06-14]
      entry({ logged_on: '2026-06-07' }), // -> previous bucket [06-01..06-07]
      entry({ logged_on: '2020-01-01' }), // far out of range -> dropped
    ];
    const buckets = weeklyVolume(entries, 8, TODAY);
    const total = buckets.reduce((n, b) => n + b.count, 0);
    expect(total).toBe(2); // the 2020 entry is not binned
    expect(buckets[7].count).toBe(1); // today
    expect(buckets[6].count).toBe(1); // yesterday falls in the prior week bucket
  });
});

describe('byDimension', () => {
  it('tallies total + missed per value with a rounded miss rate', () => {
    const entries = [
      entry({ question_type: 'Flaw', result: 'incorrect' }),
      entry({ question_type: 'Flaw', result: 'correct' }),
      entry({ question_type: 'Weaken', result: 'incorrect' }),
    ];
    const rows = byDimension(entries, 'question_type');
    const flaw = rows.find((r) => r.key === 'Flaw');
    const weaken = rows.find((r) => r.key === 'Weaken');
    expect(flaw).toMatchObject({ total: 2, missed: 1, missRate: 50 });
    expect(weaken).toMatchObject({ total: 1, missed: 1, missRate: 100 });
  });

  it('skips entries missing the key', () => {
    const entries = [entry({ question_type: undefined }), entry({ question_type: 'Flaw' })];
    const rows = byDimension(entries, 'question_type');
    expect(rows).toHaveLength(1);
  });

  it('sorts by missed desc, then total desc', () => {
    const entries = [
      entry({ question_type: 'A', result: 'incorrect' }),
      entry({ question_type: 'B', result: 'incorrect' }),
      entry({ question_type: 'B', result: 'incorrect' }),
    ];
    const rows = byDimension(entries, 'question_type');
    expect(rows[0].key).toBe('B'); // 2 missed beats 1 missed
  });
});

describe('topMistake & errorTagCounts', () => {
  it('topMistake returns the most frequent tag', () => {
    const entries = [
      entry({ error_tags: ['Out of scope', 'Misread the stimulus'] }),
      entry({ error_tags: ['Out of scope'] }),
    ];
    expect(topMistake(entries)).toEqual({ tag: 'Out of scope', count: 2 });
  });

  it('topMistake is null when there are no tags', () => {
    expect(topMistake([entry({ error_tags: [] }), entry({})])).toBeNull();
  });

  it('errorTagCounts returns every tag sorted by count desc', () => {
    const entries = [
      entry({ error_tags: ['x', 'y'] }),
      entry({ error_tags: ['x'] }),
    ];
    expect(errorTagCounts(entries)).toEqual([
      { tag: 'x', count: 2 },
      { tag: 'y', count: 1 },
    ]);
  });
});

describe('calibration', () => {
  it('counts confidentWrong (high + incorrect) and shakyRight (low + not incorrect) with rates', () => {
    const entries = [
      entry({ confidence: 'high', result: 'incorrect' }), // confidentWrong
      entry({ confidence: 'high', result: 'correct' }),
      entry({ confidence: 'low', result: 'correct' }), // shakyRight
      entry({ confidence: 'low', result: 'incorrect' }),
    ];
    expect(calibration(entries)).toEqual({
      confidentWrong: 1,
      confidentWrongRate: 50, // 1 of 2 high-confidence
      shakyRight: 1,
      shakyRightRate: 50, // 1 of 2 low-confidence
    });
  });

  it('returns null rates when a confidence bucket is empty', () => {
    const c = calibration([entry({ confidence: 'medium', result: 'incorrect' })]);
    expect(c.confidentWrongRate).toBeNull();
    expect(c.shakyRightRate).toBeNull();
  });
});

describe('hardestUnsolved', () => {
  it('picks the highest-difficulty entry that needs review and is still incorrect', () => {
    const entries = [
      entry({ needs_review: true, result: 'incorrect', difficulty: 3, logged_on: '2026-06-01' }),
      entry({ needs_review: true, result: 'incorrect', difficulty: 5, logged_on: '2026-06-02' }),
      entry({ needs_review: false, result: 'incorrect', difficulty: 9 }), // not flagged
      entry({ needs_review: true, result: 'correct', difficulty: 8 }), // not incorrect
    ];
    expect(hardestUnsolved(entries).difficulty).toBe(5);
  });

  it('breaks difficulty ties by most recent day', () => {
    const entries = [
      entry({ needs_review: true, result: 'incorrect', difficulty: 5, logged_on: '2026-06-01' }),
      entry({ needs_review: true, result: 'incorrect', difficulty: 5, logged_on: '2026-06-05' }),
    ];
    expect(hardestUnsolved(entries).logged_on).toBe('2026-06-05');
  });

  it('returns null when nothing qualifies', () => {
    expect(hardestUnsolved([entry({ needs_review: false })])).toBeNull();
  });
});

describe('recommendation', () => {
  it('returns null when nothing was missed', () => {
    expect(recommendation([entry({ result: 'correct', question_type: 'Flaw' })])).toBeNull();
  });

  it('points at the weakest question type with a pre-filtered drill link', () => {
    const entries = [
      entry({ result: 'incorrect', question_type: 'Flaw' }),
      entry({ result: 'incorrect', question_type: 'Flaw' }),
      entry({ result: 'incorrect', question_type: 'Weaken' }),
    ];
    const rec = recommendation(entries);
    expect(rec.weakType.key).toBe('Flaw');
    expect(rec.drillLink).toBe('/drill-finder?type=Flaw');
  });
});

describe('buildDrillLink', () => {
  it('returns the bare path with no filters', () => {
    expect(buildDrillLink()).toBe('/drill-finder');
    expect(buildDrillLink({})).toBe('/drill-finder');
  });

  it('encodes a question type', () => {
    expect(buildDrillLink({ questionType: 'Necessary-Assumption' })).toBe(
      '/drill-finder?type=Necessary-Assumption'
    );
  });

  it('includes difficulty when present and skips it when falsy', () => {
    expect(buildDrillLink({ questionType: 'Flaw', difficulty: 3 })).toBe(
      '/drill-finder?type=Flaw&difficulty=3'
    );
    expect(buildDrillLink({ questionType: 'Flaw', difficulty: 0 })).toBe('/drill-finder?type=Flaw');
  });
});

describe('label helpers', () => {
  it('questionTypeLabel maps known values and passes through unknowns', () => {
    expect(questionTypeLabel('Necessary-Assumption')).toBe('Necessary Assumption');
    expect(questionTypeLabel('Totally-Made-Up')).toBe('Totally-Made-Up');
    expect(questionTypeLabel('')).toBe('-');
  });

  it('prettyStructure title-cases a hyphenated structure', () => {
    expect(prettyStructure('Scope-Concept-Shift')).toBe('Scope Concept Shift');
    expect(prettyStructure('Causal')).toBe('Causal');
    expect(prettyStructure('')).toBe('');
  });
});
