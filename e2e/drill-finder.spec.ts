import { test, expect } from '@playwright/test';

// Drill Finder is the one public, interactive feature (anonymous reads, no login).
// It hits the live drill Supabase project, so it can run without test creds — but
// if the DB is unreachable in CI the page shows an error/empty state rather than
// rows, so we assert on the resilient, always-present scaffolding plus a filter.

test.describe('drill finder', () => {
  test('loads the page and renders the filter toolbar', async ({ page }) => {
    await page.goto('/drill-finder');
    await expect(page.getByRole('heading', { name: /LR Drill/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Question type/ })).toBeVisible();
  });

  test('opens a filter dropdown and exposes options', async ({ page }) => {
    await page.goto('/drill-finder');
    // Wait for the bank to finish loading — a table row means rows arrived and the
    // filter option lists (derived from the data) are populated.
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 15_000 });

    await page.getByRole('button', { name: /^Difficulty/ }).click();
    // The difficulty dropdown should reveal at least one selectable option.
    await expect(page.getByRole('button', { name: /Easiest|Hardest|Hard/ }).first()).toBeVisible();
  });
});
