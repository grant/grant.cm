import {expect, test} from '@playwright/test';

const routes = ['/consulting', '/videos', '/cal', '/resume', '/dinner', '/missing'];

for (const route of routes) {
  test(`${route} uses the secondary page shell`, async ({page}) => {
    await page.goto(route);

    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation', {name: 'Primary'})).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
}
