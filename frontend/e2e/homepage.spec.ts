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
