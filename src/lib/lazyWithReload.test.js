import { describe, it, expect, vi, beforeEach } from 'vitest';
import { retryImport } from './lazyWithReload';

// retryImport wraps a dynamic import() so a failed chunk fetch (a stale hash
// after a deploy) forces ONE reload, then gives up so it can't loop forever.
// We drive it with an in-memory storage + injectable reload/now so there's no
// real navigation or timers involved.

function makeStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = String(v);
    },
    removeItem: (k) => {
      delete data[k];
    },
  };
}

describe('retryImport', () => {
  let reload;
  let storage;

  beforeEach(() => {
    reload = vi.fn();
    storage = makeStorage();
  });

  it('passes the loaded module through untouched on success', async () => {
    const mod = { default: 'Page' };
    const out = await retryImport(() => Promise.resolve(mod), { storage, reload });
    expect(out).toBe(mod);
    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads once on a failed import and never resolves (holds Suspense)', async () => {
    const factory = () => Promise.reject(new Error('Failed to fetch dynamically imported module'));
    const result = retryImport(factory, { storage, reload, now: () => 1000 });

    // Let the rejection + catch handler run.
    await new Promise((r) => setTimeout(r, 0));
    expect(reload).toHaveBeenCalledTimes(1);

    // The returned promise must STAY pending so the boundary doesn't render the
    // error before the reload swaps the document.
    const settled = await Promise.race([
      result.then(() => 'resolved', () => 'rejected'),
      Promise.resolve('pending'),
    ]);
    expect(settled).toBe('pending');
  });

  it('does NOT reload again within the cooldown — it rethrows so the error surfaces', async () => {
    // A chunk that already triggered a reload moments ago (recorded in storage)
    // is genuinely gone, not just stale. Reloading again would loop forever.
    storage.setItem('chunk-reload-at', '1000');
    const err = new Error('still 404');

    await expect(
      retryImport(() => Promise.reject(err), { storage, reload, now: () => 5000 })
    ).rejects.toBe(err);
    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads again once the cooldown has elapsed (a later, separate deploy)', async () => {
    storage.setItem('chunk-reload-at', '1000');

    const result = retryImport(() => Promise.reject(new Error('stale again')), {
      storage,
      reload,
      now: () => 1000 + 20_000, // well past the cooldown window
    });
    await Promise.race([result.then(null, () => {}), Promise.resolve()]);

    expect(reload).toHaveBeenCalledTimes(1);
  });
});
