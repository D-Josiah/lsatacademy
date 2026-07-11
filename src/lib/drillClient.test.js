import { describe, it, expect, afterEach, vi } from 'vitest';

// `drillConfigured` gates the Drill Finder's "coming soon" state vs. the real UI,
// so it's worth pinning. It's computed at module load from import.meta.env, so we
// reset the module registry between cases and re-import with stubbed env.

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('drillClient config', () => {
  it('exposes the expected table names', async () => {
    const mod = await import('./drillClient');
    expect(mod.DRILL_TABLE).toBe('drill_questions');
    expect(mod.DRILL_REVIEWS).toBe('drill_reviews');
  });

  it('is configured when real fallback credentials are in place', async () => {
    // No env overrides -> falls back to the baked-in real project creds.
    const mod = await import('./drillClient');
    expect(mod.drillConfigured).toBe(true);
  });

  it('is NOT configured when env points at the placeholder values', async () => {
    vi.stubEnv('VITE_DRILL_SUPABASE_URL', 'https://YOUR-NEW-PROJECT.supabase.co');
    vi.stubEnv('VITE_DRILL_SUPABASE_ANON_KEY', 'YOUR_NEW_ANON_KEY');
    vi.resetModules();
    const mod = await import('./drillClient');
    expect(mod.drillConfigured).toBe(false);
  });
});
