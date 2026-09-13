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

test('expands earlier experience and archived projects', async ({page}) => {
  await page.goto('/');

  const internship = page.getByRole('heading', {
    name: 'Google - Software Engineer Intern',
  });
  await expect(internship).toBeHidden();
  await page.getByText('Show earlier experience & internships').click();
  await expect(internship).toBeVisible();

  const archivedProject = page.getByRole('heading', {name: 'Github Issues'});
  await expect(archivedProject).toBeHidden();
  await page.getByText(/Show \d+ more projects/).click();
  await expect(archivedProject).toBeVisible();
});
