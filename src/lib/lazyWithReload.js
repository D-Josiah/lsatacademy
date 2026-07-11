import { lazy } from 'react';

// Why this exists:
// Every route is code-split (lazy(() => import('./pages/...'))), so Vite emits
// hash-named chunks like /assets/Portal-a1b2c3.js. When a new build deploys, the
// previous deployment's hashed files stop being served and 404. A user whose tab
// has been open since before the deploy is holding an index.html that still
// references the OLD hashes — the moment they navigate into a lazy route they
// hadn't visited yet, the dynamic import() fetches a dead chunk and rejects.
//
// The student portal is hit hardest: it's auth-gated, so students keep one
// long-lived tab open and navigate around (sessions / journal / notes), maximizing
// the odds a deploy lands mid-session. The symptom is a "random 404" on a JS chunk
// and a white screen.
//
// Fix: on a failed import, force ONE full reload. That re-fetches a fresh
// index.html referencing the new chunk names, and the navigation succeeds. A
// timestamp guard makes this loop-proof — if the chunk is genuinely missing (not
// just stale), the immediate re-failure falls through the guard and rethrows, so
// the error boundary can show a message instead of reloading forever.

const RELOAD_KEY = 'chunk-reload-at';
const RELOAD_COOLDOWN_MS = 10_000;

// Exported separately from lazyWithReload so it can be unit-tested without React.
export function retryImport(
  factory,
  {
    storage = window.sessionStorage,
    reload = () => window.location.reload(),
    now = () => Date.now(),
  } = {}
) {
  return factory().catch((err) => {
    const last = storage.getItem(RELOAD_KEY);
    // Only reload if we haven't already reloaded for a chunk failure very
    // recently. A stale chunk heals on the first reload; a chunk that 404s again
    // immediately is genuinely gone, so we stop and let the error surface.
    // `null` = never reloaded this tab session → always take the first reload.
    if (last === null || now() - Number(last) > RELOAD_COOLDOWN_MS) {
      storage.setItem(RELOAD_KEY, String(now()));
      reload();
      // Never resolve: keep the Suspense boundary pending until the reload
      // swaps the document out from under us.
      return new Promise(() => {});
    }
    throw err;
  });
}

export const lazyWithReload = (factory) => lazy(() => retryImport(factory));
