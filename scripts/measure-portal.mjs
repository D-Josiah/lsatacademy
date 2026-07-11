// One-off diagnostic: log in as Sydney and measure rendered content widths in
// each portal tab to find the real source of the width mismatch.
import { chromium } from '@playwright/test';

const BASE = process.env.BASE || 'http://localhost:5174';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto(`${BASE}/login`);
await page.getByLabel('Email').fill('sswanson@hmc.edu');
await page.getByLabel('Password').fill('LsatStudent#2026');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL(/\/portal/, { timeout: 20000 });
await page.waitForTimeout(1500);

const measure = async (label) => {
  const data = await page.evaluate(() => {
    const round = (n) => Math.round(n * 10) / 10;
    const w = (el) => (el ? round(el.getBoundingClientRect().width) : null);
    const container = document.querySelector('.portal-page .container');
    const tabs = document.querySelector('.portal-tabs');
    const panel = tabs?.nextElementSibling;
    // Direct children of the panel (the actual content blocks)
    const firstChild = panel?.firstElementChild;
    const blocks = panel ? [...panel.children].map((c) => w(c)) : [];
    const textarea = document.querySelector('.portal-textarea');
    // A meeting card: the flex row that contains a "View recap" or the dot
    const cards = [...document.querySelectorAll('a')]
      .filter((a) => a.textContent.trim() === 'View recap')
      .map((a) => w(a.closest('div')));
    return {
      container: w(container),
      panel: w(panel),
      panelFirstChild: w(firstChild),
      panelChildren: blocks,
      textarea: w(textarea),
      meetingCards: cards,
    };
  });
  console.log(`\n== ${label} ==`);
  console.log(JSON.stringify(data, null, 2));
};

await page.getByRole('button', { name: 'Sessions' }).click();
await page.waitForTimeout(400);
await measure('SESSIONS tab');

await page.getByRole('button', { name: /Notes/ }).click();
await page.waitForTimeout(400);
await measure('NOTES tab');

await browser.close();
