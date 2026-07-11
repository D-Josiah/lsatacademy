import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// ---- module mocks -------------------------------------------------------
vi.mock('react-helmet-async', () => ({ Helmet: () => null }));
vi.mock('../lib/AuthContext', () => ({ useAuth: vi.fn() }));

// Shared, per-test state the mocked Supabase builders read from.
const state = vi.hoisted(() => ({
  entries: [], // rows returned by the load query
  insertResult: { data: null, error: null },
  insertPayloads: [], // every insert() payload, for shape assertions
  updateResult: { data: null, error: null },
  deleteError: null,
  // The LawHub bank rows the modal loads once (module-level cache in Journal,
  // so this is fixed for the whole file rather than reset per test).
  drillBank: [
    {
      id: 42, preptest: 120, section: 2, question: 5,
      subtype: 'Flaws', difficulty: 4, test_prep_type: 'Flaw',
      structure_type: 'CAUSAL', structure_subtype: null,
    },
  ],
  eqCalls: [], // every .eq(col, val) on the portal client, for the scoping assertion
}));

// Portal client: one chainable builder per from() call. It tracks the operation
// so terminal methods (single / await) resolve the right shape.
vi.mock('../lib/portalClient', () => ({
  portal: {
    from: vi.fn(() => {
      const b = {
        _op: 'select',
        select() { return b; },
        insert(payload) { b._op = 'insert'; state.insertPayloads.push(payload); return b; },
        update() { b._op = 'update'; return b; },
        delete() { b._op = 'delete'; return b; },
        eq(col, val) { state.eqCalls.push([col, val]); return b; },
        order() { return b; },
        abortSignal() { return b; },
        single() {
          if (b._op === 'insert') return Promise.resolve(state.insertResult);
          if (b._op === 'update') return Promise.resolve(state.updateResult);
          return Promise.resolve({ data: null, error: null });
        },
        // Load (select...order) and delete are awaited without a named terminal.
        then(resolve, reject) {
          const result =
            b._op === 'delete'
              ? { error: state.deleteError }
              : { data: state.entries, error: null };
          return Promise.resolve(result).then(resolve, reject);
        },
      };
      return b;
    }),
  },
}));

// Drill client: the modal loads the whole bank once (count head request, then
// paged .range() reads). The builder is thenable: it resolves the count until
// .range() marks it as a page read, which resolves the bank rows instead.
vi.mock('../lib/drillClient', () => ({
  DRILL_TABLE: 'drill_questions',
  drillClient: {
    from: () => {
      const b = {
        _page: false,
        select: () => b,
        order: () => b,
        abortSignal: () => b,
        range: () => { b._page = true; return b; },
        then(resolve, reject) {
          const result = b._page
            ? { data: state.drillBank, error: null }
            : { count: state.drillBank.length, error: null };
          return Promise.resolve(result).then(resolve, reject);
        },
      };
      return b;
    },
  },
}));

import { useAuth } from '../lib/AuthContext';
import Journal from './Journal';

const USER = { id: 'student-1' };

const entry = (over = {}) => ({
  id: 1,
  logged_on: '2026-06-01',
  section_kind: 'LR',
  preptest: 120,
  section: 2,
  question: 5,
  question_type: 'Flaw',
  structure_type: 'Causal',
  difficulty: 3,
  result: 'incorrect',
  confidence: 'high',
  error_tags: ['Out of scope'],
  needs_review: true,
  takeaway: '',
  ...over,
});

const renderJournal = () =>
  render(
    <MemoryRouter>
      <Journal />
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
  state.entries = [];
  state.insertResult = { data: null, error: null };
  state.insertPayloads = [];
  state.updateResult = { data: null, error: null };
  state.deleteError = null;
  state.eqCalls = [];
  useAuth.mockReturnValue({ user: USER });
});

describe('Journal — loading & empty', () => {
  it('shows the empty state when the student has no entries', async () => {
    renderJournal();
    expect(await screen.findByText('Start your journal')).toBeInTheDocument();
  });

  it('scopes the load query to the signed-in student (SEC-001)', async () => {
    renderJournal();
    await screen.findByText('Start your journal');
    expect(state.eqCalls).toContainEqual(['student_id', 'student-1']);
  });
});

describe('Journal — insights', () => {
  it('renders computed stat cards from the loaded entries', async () => {
    state.entries = [
      entry({ id: 1, error_tags: ['Out of scope'] }),
      entry({ id: 2, error_tags: ['Out of scope', 'Misread the stimulus'] }),
    ];
    renderJournal();

    // "Logged" total card — the stat number lives in a sibling of the label.
    expect(await screen.findByText('Today’s focus')).toBeInTheDocument();
    const loggedCard = screen.getByText('Logged').parentElement;
    expect(within(loggedCard).getByText('2')).toBeInTheDocument();
    // Top mistake surfaces the most frequent tag (it also appears in the tag-counts
    // card, so just assert it's present at least once).
    expect(screen.getAllByText('Out of scope').length).toBeGreaterThan(0);
  });
});

describe('Journal — resilience (regression: indefinite loading)', () => {
  it('clears the spinner and shows an error when the load query rejects', async () => {
    // Simulate the network/expired-token case where the query THROWS instead of
    // resolving {data, error}. Before the try/catch fix this hung on "Loading…".
    const { portal } = await import('../lib/portalClient');
    portal.from.mockImplementationOnce(() => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            order: () => ({
              abortSignal: () => Promise.reject(new Error('Failed to fetch')),
            }),
          }),
        }),
      }),
    }));

    renderJournal();

    // It must NOT stay stuck on the loading state.
    await waitFor(() => expect(screen.queryByText('Loading…')).not.toBeInTheDocument());
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });
});

describe('Journal — entries tab', () => {
  it('switches to the entries table and filters by result', async () => {
    state.entries = [
      entry({ id: 1, result: 'incorrect', question_type: 'Flaw' }),
      entry({ id: 2, result: 'correct', question_type: 'Weaken', logged_on: '2026-06-02' }),
    ];
    renderJournal();
    const user = userEvent.setup();

    await user.click(await screen.findByRole('button', { name: /Entries/ }));

    // Scope row assertions to the table — the type filter dropdown also renders
    // "Flaw"/"Weaken" as <option>s.
    const table = screen.getByRole('table');
    expect(within(table).getByText('Flaw')).toBeInTheDocument();
    expect(within(table).getByText('Weaken')).toBeInTheDocument();

    // Filter to "Got it wrong" -> only the incorrect row remains. Find the result
    // dropdown by the option it uniquely contains.
    const selects = screen.getAllByRole('combobox');
    const resultSelect = selects.find((s) =>
      within(s).queryByRole('option', { name: 'Got it wrong' })
    );
    await user.selectOptions(resultSelect, 'incorrect');

    expect(within(table).getByText('Flaw')).toBeInTheDocument();
    expect(within(table).queryByText('Weaken')).not.toBeInTheDocument();
  });

  it('deletes an entry and removes it from the table', async () => {
    state.entries = [entry({ id: 7, question_type: 'Flaw' })];
    renderJournal();
    const user = userEvent.setup();

    await user.click(await screen.findByRole('button', { name: /Entries/ }));
    const table = screen.getByRole('table');
    expect(within(table).getByText('Flaw')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    // After deleting the only entry the page falls back to the empty state.
    await waitFor(() => expect(screen.getByText('Start your journal')).toBeInTheDocument());
    expect(state.eqCalls).toContainEqual(['id', 7]);
  });

  it('marks an entry reviewed', async () => {
    state.entries = [entry({ id: 9, needs_review: true })];
    state.updateResult = { data: entry({ id: 9, needs_review: false }), error: null };
    renderJournal();
    const user = userEvent.setup();

    await user.click(await screen.findByRole('button', { name: /Entries/ }));
    expect(screen.getByText('● in review')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reviewed' }));

    await waitFor(() => expect(screen.queryByText('● in review')).not.toBeInTheDocument());
  });
});

describe('Journal — log modal', () => {
  // Opens the modal and waits for the LawHub bank to finish loading.
  const openModal = async (user) => {
    await user.click(await screen.findByRole('button', { name: '+ Log a question' }));
    await waitFor(() =>
      expect(screen.queryByText(/loading question bank/i)).not.toBeInTheDocument()
    );
  };
  // The three question-reference fields (PrepTest/Section selects + Q# input).
  const pickQuestion = async (user, pt, sec, q) => {
    await user.selectOptions(screen.getByLabelText('PrepTest'), pt);
    await user.selectOptions(screen.getByLabelText('Section'), sec);
    await user.type(screen.getByLabelText('Question number'), q);
  };

  it('auto-classifies an LR question once PT·Section·Question are entered', async () => {
    renderJournal();
    const user = userEvent.setup();
    await openModal(user);

    await pickQuestion(user, '120', '2', '5');

    // The classification card appears with the matched bank row's data.
    expect(await screen.findByText('PT120 - S2 - Q5')).toBeInTheDocument();
    expect(screen.getByText('Flaws')).toBeInTheDocument();
  });

  it('inserts a matched LR entry with the bank classification', async () => {
    state.insertResult = {
      data: entry({ id: 100, question_type: 'Flaw', logged_on: '2026-06-05' }),
      error: null,
    };
    renderJournal();
    const user = userEvent.setup();
    await openModal(user);

    await pickQuestion(user, '120', '2', '5');
    await user.click(screen.getByRole('button', { name: 'Log it' }));

    // onSaved prepends the row -> the Entries tab count reflects it.
    expect(await screen.findByRole('button', { name: /Entries \(1\)/ })).toBeInTheDocument();
    expect(state.insertPayloads[0]).toMatchObject({
      section_kind: 'LR',
      preptest: 120,
      section: 2,
      question: 5,
      drill_question_id: 42,
      question_type: 'Flaw',
      structure_type: 'CAUSAL',
      difficulty: 4,
      source_label: 'LawHub',
    });
  });

  it('blocks a new LR entry that does not match a LawHub question', async () => {
    renderJournal();
    const user = userEvent.setup();
    await openModal(user);

    // Q99 does not exist in the bank at PT120 S2.
    await pickQuestion(user, '120', '2', '99');
    expect(screen.getByText(/No LR question at that spot/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Log it' }));
    expect(screen.getByText(/Pick a valid PrepTest/)).toBeInTheDocument();
    expect(state.insertPayloads).toHaveLength(0);
  });

  it('logs an RC question manually - RC types, no bank classification', async () => {
    state.insertResult = {
      data: entry({ id: 101, section_kind: 'RC', question_type: 'RC-Inference', structure_type: null }),
      error: null,
    };
    renderJournal();
    const user = userEvent.setup();
    await openModal(user);

    await user.click(screen.getByRole('button', { name: 'Reading Comp' }));
    // RC section choices are the PT's non-LR sections (bank has S2 -> offer 1/3/4).
    await user.selectOptions(screen.getByLabelText('PrepTest'), '120');
    const secSelect = screen.getByLabelText('Section');
    expect(within(secSelect).queryByRole('option', { name: 'Section 2' })).not.toBeInTheDocument();
    await user.selectOptions(secSelect, '1');
    await user.type(screen.getByLabelText('Question number'), '7');

    // RC question type is picked manually from the RC list.
    const typeSelect = screen
      .getAllByRole('combobox')
      .find((s) => within(s).queryByRole('option', { name: 'Inference (RC)' }));
    await user.selectOptions(typeSelect, 'RC-Inference');
    await user.click(screen.getByRole('button', { name: 'Log it' }));

    await waitFor(() => expect(state.insertPayloads).toHaveLength(1));
    expect(state.insertPayloads[0]).toMatchObject({
      section_kind: 'RC',
      preptest: 120,
      section: 1,
      question: 7,
      drill_question_id: null,
      subtype: null,
      question_type: 'RC-Inference',
      structure_type: null,
      source_label: 'LawHub',
    });
  });
});
