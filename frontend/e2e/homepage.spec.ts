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

test.describe('mobile homepage', () => {
  test.use({viewport: {width: 390, height: 844}});

  test('keeps headings and copy readable at 390px', async ({page}) => {
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    for (const selector of ['h1', 'h1 + h3']) {
      const textRects = await page.locator(selector).evaluate(element => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return [...range.getClientRects()]
          .filter(rect => rect.width > 0)
          .map(({left, right}) => ({left, right}));
      });
      for (const rect of textRects) {
        expect(rect.left).toBeGreaterThanOrEqual(0);
        expect(rect.right).toBeLessThanOrEqual(390);
      }
    }

    const aboutCopy = page.locator('#about > p');
    await expect(aboutCopy).toHaveCSS('color', 'rgb(255, 255, 255)');
    const aboutPadding = await aboutCopy.evaluate(element => {
      const style = getComputedStyle(element);
      return {left: style.paddingLeft, right: style.paddingRight};
    });
    expect(aboutPadding.left).toBe(aboutPadding.right);

    const projectHeadingLines = await page
      .getByRole('heading', {name: 'Side Projects'})
      .evaluate(element => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return [...range.getClientRects()].filter(rect => rect.width > 0)
          .length;
      });
    expect(projectHeadingLines).toBe(1);

    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(documentWidth).toBe(390);

    const navigationLinks = page
      .locator('section')
      .first()
      .locator('a')
      .or(page.locator('footer a'));
    for (const link of await navigationLinks.all()) {
      const box = await link.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      animations: 'disabled',
      fullPage: true,
      maxDiffPixels: 1_000,
    });
  });
});

test('shows compact earlier experience and all projects', async ({page}) => {
  await page.goto('/');

  const cartesiaExperience = page.locator('#experience article.cartesia');
  await expect(cartesiaExperience).toContainText(
    'Cartesia - Software Engineer',
  );
  await expect(cartesiaExperience).toContainText('Building real-time voice AI.');
  await expect(cartesiaExperience).not.toContainText(
    'Building real-time voice AI at Cartesia',
  );
  await expect(
    page.getByRole('heading', {name: 'Earlier experience'}),
  ).toBeVisible();
  await expect(
    page.getByRole('region', {name: 'Earlier experience'}).locator('img'),
  ).toHaveCount(7);
  await expect(
    page.getByText('Google · Software Engineer Intern'),
  ).toBeVisible();
  const earlierExperienceDetail = page.getByText(
    'Android app validation · Summer 2015',
    {exact: true},
  );
  await expect(earlierExperienceDetail).toHaveCSS('display', 'block');
  await expect(earlierExperienceDetail).toHaveClass(/text-white\/80/);
  await expect(
    page.getByRole('link', {name: 'ts2gas on GitHub'}),
  ).toHaveAttribute('href', 'https://github.com/grant/ts2gas');
  await expect(
    page.getByRole('link', {name: 'Computer Checklist on GitHub'}),
  ).toHaveAttribute('href', 'https://github.com/grant/new-computer-checklist');
});

test('marks video and blog links as opening in a new tab', async ({page}) => {
  await page.goto('/');

  for (const name of ['Videos', 'Blogposts']) {
    const link = page.getByRole('link', {name, exact: true});
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer');
    await expect(link.locator('svg')).toHaveCount(1);
  }
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
    'rgb(255, 255, 255)',
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

  for (const label of ['GitHub', 'LinkedIn', 'Twitter']) {
    await expect(
      page.locator('footer').getByRole('link', {name: label, exact: true}),
    ).toHaveAttribute('href', /^https:\/\//);
  }
});
