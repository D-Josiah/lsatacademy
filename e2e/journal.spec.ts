import { test, expect } from '@playwright/test';

// Logs a real journal entry through the UI and cleans it up afterwards.
// Needs a real (throwaway) student login — the seeded Sydney account works:
//   E2E_STUDENT_EMAIL=sswanson@hmc.edu  E2E_STUDENT_PASSWORD=LsatStudent#2026
const EMAIL = process.env.E2E_STUDENT_EMAIL;
const PASSWORD = process.env.E2E_STUDENT_PASSWORD;
const hasCreds = !!(EMAIL && PASSWORD);

test.describe('wrong answer journal', () => {
  test.skip(!hasCreds, 'Set E2E_STUDENT_EMAIL / E2E_STUDENT_PASSWORD to run (e.g. the seeded Sydney account).');

  test('a student can log an entry; it appears, then is cleaned up', async ({ page }) => {
    // A unique marker so we can find — and only delete — the row we created.
    const marker = `e2e entry ${Date.now()}`;

    // Sign in.
    await page.goto('/login');
    await page.getByLabel('Email').fill(EMAIL!);
    await page.getByLabel('Password').fill(PASSWORD!);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL(/\/portal/, { timeout: 20_000 });

    await page.goto('/portal/journal');

    // Open the log modal and put the marker in the takeaway field (last textarea
    // in the dialog — robust to placeholder wording changes). Leaving PT/Sec/Q
    // blank means no drill-bank lookup, so the test doesn't depend on live data.
    await page.getByRole('button', { name: /Log a question/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.locator('textarea').last().fill(marker);
    await dialog.getByRole('button', { name: /Log it/i }).click();

    // It should land in the Entries tab.
    await page.getByRole('button', { name: /^Entries/ }).click();
    await expect(page.getByText(marker)).toBeVisible({ timeout: 10_000 });

    // Cleanup: delete the row we just created.
    const row = page.locator('tr', { hasText: marker });
    await row.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText(marker)).toHaveCount(0, { timeout: 10_000 });
  });
});
