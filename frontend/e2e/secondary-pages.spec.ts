import {expect, test} from '@playwright/test';

const routes = [
  '/consulting',
  '/videos',
  '/cal',
  '/resume',
  '/dinner',
  '/missing',
];

for (const route of routes) {
  test(`${route} uses the secondary page shell`, async ({page}) => {
    await page.goto(route);

    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation', {name: 'Primary'})).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
}

test('uses coral for actions and teal for secondary information', async ({
  page,
}) => {
  await page.goto('/consulting');
  await expect(page.getByRole('link', {name: /15 Min/})).toHaveCSS(
    'background-color',
    'rgb(234, 95, 78)',
  );

  await page.goto('/videos');
  await expect(page.locator('main time, main p').first()).toHaveCSS(
    'color',
    'rgb(73, 161, 167)',
  );
});
