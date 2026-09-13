import {expect, test} from '@playwright/test';

test('homepage matches its visual baseline', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot('homepage.png', {
    animations: 'disabled',
    fullPage: true,
    maxDiffPixels: 1_000,
  });
});

test('shows compact earlier experience and all projects', async ({page}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {name: 'Earlier experience'}),
  ).toBeVisible();
  await expect(
    page.getByRole('region', {name: 'Earlier experience'}).locator('img'),
  ).toHaveCount(7);
  await expect(
    page.getByText('Google · Software Engineer Intern'),
  ).toBeVisible();
  await expect(
    page.getByRole('link', {name: 'ts2gas on GitHub'}),
  ).toHaveAttribute('href', 'https://github.com/grant/ts2gas');
  await expect(
    page.getByRole('link', {name: 'Computer Checklist on GitHub'}),
  ).toHaveAttribute('href', 'https://github.com/grant/new-computer-checklist');
});

test('shows a visible keyboard focus indicator', async ({page}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const focusedElement = page.locator(':focus-visible');
  await expect(focusedElement).toHaveCSS('outline-style', 'solid');
  await expect(focusedElement).toHaveCSS('outline-width', '3px');
  await expect(focusedElement).toHaveCSS('outline-color', 'rgb(234, 95, 78)');
});
