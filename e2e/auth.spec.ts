import { test, expect } from '@playwright/test';

// The login -> portal flow is the "humiliating if it broke" path. It needs a real
// (throwaway) student account in the portal Supabase project. Provide these via
// CI secrets / a local .env to enable the signed-in test:
//   E2E_STUDENT_EMAIL, E2E_STUDENT_PASSWORD
const STUDENT_EMAIL = process.env.E2E_STUDENT_EMAIL;
const STUDENT_PASSWORD = process.env.E2E_STUDENT_PASSWORD;
const hasCreds = !!(STUDENT_EMAIL && STUDENT_PASSWORD);

test.describe('auth', () => {
  test('redirects an unauthenticated visitor away from /portal to /login', async ({ page }) => {
    await page.goto('/portal');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: /sign-in/i })).toBeVisible();
  });

  // Exercises the real submit path (no account needed): bad creds must produce a
  // visible error, proving the form submits, calls Supabase, and recovers — i.e.
  // it does NOT hang or silently no-op.
  test('shows an error for wrong credentials instead of hanging', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('nobody-test@example.com');
    await page.getByLabel('Password').fill('definitely-the-wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Login maps "Invalid login credentials" to a friendly message; accept either.
    await expect(
      page.getByText(/don’t match|don't match|Invalid login credentials/i)
    ).toBeVisible({ timeout: 15_000 });
    // And the button must return from its busy state, not stay stuck on "Signing in…".
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeEnabled();
  });

  // Skipped until a test student account is wired up via env (see above).
  test.describe(() => {
    test.skip(!hasCreds, 'Set E2E_STUDENT_EMAIL / E2E_STUDENT_PASSWORD to enable.');

    test('a student can sign in and land on the portal', async ({ page }) => {
      await page.goto('/login');
      await page.getByLabel('Email').fill(STUDENT_EMAIL!);
      await page.getByLabel('Password').fill(STUDENT_PASSWORD!);
      await page.getByRole('button', { name: 'Sign in' }).click();

      await expect(page).toHaveURL(/\/portal/, { timeout: 15_000 });
    });
  });
});
