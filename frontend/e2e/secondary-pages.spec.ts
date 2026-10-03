import {expect, test} from '@playwright/test';

const routes = [
  '/consulting',
  '/videos',
  '/cal',
  '/resume',
  '/dinner',
  '/privacy',
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

const routeAccents = [
  {route: '/consulting', accent: 'coral', color: 'rgb(234, 95, 78)'},
  {route: '/videos', accent: 'teal', color: 'rgb(73, 161, 167)'},
  {route: '/cal', accent: 'teal', color: 'rgb(73, 161, 167)'},
  {route: '/resume', accent: 'navy', color: 'rgb(45, 62, 82)'},
  {route: '/dinner', accent: 'orange', color: 'rgb(232, 132, 59)'},
  {route: '/privacy', accent: 'coral', color: 'rgb(234, 95, 78)'},
] as const;

for (const {route, accent, color} of routeAccents) {
  test(`${route} uses its restrained route accent`, async ({page}) => {
    await page.goto(route);

    const shell = page.locator(`[data-accent="${accent}"]`);
    await expect(shell).toHaveCSS('border-top-color', color);
    await expect(shell).toHaveCSS('border-top-width', '4px');
  });
}

test('privacy policy states the personal-site and health-data uses', async ({
  page,
}) => {
  await page.goto('/privacy');

  await expect(page).toHaveTitle('Privacy | Grant Timmerman');
  await expect(
    page.getByRole('heading', {name: 'Privacy', level: 1}),
  ).toBeVisible();
  await expect(page.getByText('This is my personal site.')).toBeVisible();
  await expect(page.getByText(/grantcm/i)).toHaveCount(0);
  await expect(page.getByText(/Google Health data/)).toBeVisible();
  await expect(page.getByText(/read-only/)).toBeVisible();
  await expect(page.getByText('granttimmerman@gmail.com')).toHaveCount(0);
  await expect(page.getByRole('link', {name: 'Email me'})).toHaveAttribute(
    'href',
    'mailto:granttimmerman@gmail.com',
  );
  await expect(
    page.getByRole('contentinfo').getByRole('link', {name: 'Privacy'}),
  ).toHaveAttribute('href', '/privacy');
});
