import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Shared, mutable mock state so each test can set `configured` + the row bank
// the mocked Supabase client returns. Hoisted so the vi.mock factory can read it.
const mock = vi.hoisted(() => ({ configured: true, rows: [] }));

vi.mock('react-helmet-async', () => ({ Helmet: () => null }));

// Mock the drill Supabase client. The page does a head/count query, then a
// paginated data query (.select().order().order().order().range()), and a
// reviews insert. We give `select` a dual role: awaitable for the count, and
// chainable for the data fetch.
vi.mock('../lib/drillClient', () => ({
  DRILL_TABLE: 'drill_questions',
  DRILL_REVIEWS: 'drill_reviews',
  get drillConfigured() {
    return mock.configured;
  },
  drillClient: {
    from: (table) => {
      if (table === 'drill_reviews') {
        return { insert: vi.fn().mockResolvedValue({ error: null }) };
      }
      return {
        select: (_cols, opts) => {
          if (opts && opts.head) {
            return Promise.resolve({ count: mock.rows.length, error: null });
          }
          const chain = {
            order: () => chain,
            range: () => Promise.resolve({ data: mock.rows, error: null }),
          };
          return chain;
        },
      };
    },
  },
}));

import DrillFinder from './DrillFinder';

// Minimal row matching the columns DrillFinder selects/renders.
const row = (over = {}) => ({
  id: 1,
  preptest: 120,
  section: 2,
  question: 5,
  subtype: 'Flaws',
  difficulty: 3,
  test_prep_type: 'Flaw',
  structure_type: 'Causal',
  structure_subtype: null,
  confidence: 'HIGH',
  ...over,
});

const renderPage = (path = '/drill-finder') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <DrillFinder />
    </MemoryRouter>
  );

beforeEach(() => {
  mock.configured = true;
  mock.rows = [];
  // The page fetches a static asks JSON asset; stub it to an empty map.
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('DrillFinder', () => {
  it('shows the "almost ready" notice when the drill DB is not configured', async () => {
    mock.configured = false;
    renderPage();
    expect(await screen.findByText(/Drill Finder is almost ready/)).toBeInTheDocument();
  });

  it('loads and renders question rows with the total count', async () => {
    mock.rows = [
      row({ id: 1, test_prep_type: 'Flaw', preptest: 120 }),
      row({ id: 2, test_prep_type: 'Weaken', preptest: 121, question: 9 }),
    ];
    renderPage();

    // The PT·Sec·Q cell identifies a rendered row.
    expect(await screen.findByText('PT120 · S2 · Q5')).toBeInTheDocument();
    expect(screen.getByText('PT121 · S2 · Q9')).toBeInTheDocument();
    // Count line reflects the full bank.
    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument());
  });

  it('seeds the Question type filter from the ?type= URL param and filters rows', async () => {
    mock.rows = [
      row({ id: 1, test_prep_type: 'Flaw', preptest: 120 }),
      row({ id: 2, test_prep_type: 'Weaken', preptest: 121, question: 9 }),
    ];
    renderPage('/drill-finder?type=Weaken');

    // Only the Weaken row survives the seeded filter.
    expect(await screen.findByText('PT121 · S2 · Q9')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText('PT120 · S2 · Q5')).not.toBeInTheDocument()
    );

    // The Question type dropdown shows an active count badge of 1.
    // Anchor the name so it matches the dropdown button, not the "About Question
    // type" info button.
    const typeBtn = screen.getByRole('button', { name: /^Question type/ });
    expect(within(typeBtn).getByText('1')).toBeInTheDocument();
  });

  it('paginates when results exceed one page and advances on Next', async () => {
    // 60 rows -> 2 pages of 50.
    mock.rows = Array.from({ length: 60 }, (_, i) =>
      row({ id: i + 1, question: i + 1, preptest: 120, section: 1 })
    );
    renderPage();

    expect(await screen.findByText('Page 1 / 2')).toBeInTheDocument();
    // First page shows Q1, not Q51.
    expect(screen.getByText('PT120 · S1 · Q1')).toBeInTheDocument();
    expect(screen.queryByText('PT120 · S1 · Q51')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Next/ }));

    expect(await screen.findByText('Page 2 / 2')).toBeInTheDocument();
    expect(screen.getByText('PT120 · S1 · Q51')).toBeInTheDocument();
  });
});
