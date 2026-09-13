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

  const focusedElement = page.locator(':focus-visible');
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.keyboard.press('Tab');
    if ((await focusedElement.count()) > 0) break;
  }

  await expect(focusedElement).toHaveCSS('outline-style', 'solid');
  await expect(focusedElement).toHaveCSS('outline-width', '3px');
  await expect(focusedElement).toHaveCSS('outline-color', 'rgb(234, 95, 78)');
});

test('uses accessible homepage foreground colors', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('#about > p')).toHaveCSS(
    'color',
    'rgb(34, 34, 34)',
  );
  await expect(page.locator('#experience > p')).toHaveCSS(
    'color',
    'rgb(255, 255, 255)',
  );
  await expect(page.locator('#projects > p')).toHaveCSS(
    'color',
    'rgb(24, 24, 24)',
  );
  const experienceBackground = await page
    .locator('#experience')
    .evaluate(element => getComputedStyle(element).backgroundImage);
  expect(experienceBackground).toContain('rgb(36, 87, 92)');
  expect(experienceBackground).toContain('rgb(52, 119, 126)');
});

test('publishes branded favicon and social metadata', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    'href',
    '/favicon.svg',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://grant.cm/og.png',
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
});
