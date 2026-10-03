import {expect, test} from '@playwright/test';
import {WATERSF_APP_URL} from '../pages/watersf';

test('/watersf redirects to the live watersf Cloud Run app', async ({
  request,
}) => {
  const response = await request.get('/watersf', {maxRedirects: 0});

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe(WATERSF_APP_URL);
});

test('/watersf/ reaches the live watersf Cloud Run app', async ({request}) => {
  const trailingSlash = await request.get('/watersf/', {maxRedirects: 0});
  expect(trailingSlash.status()).toBe(308);
  expect(trailingSlash.headers().location).toBe('/watersf');

  const destination = await request.get('/watersf', {maxRedirects: 0});
  expect(destination.status()).toBe(307);
  expect(destination.headers().location).toBe(WATERSF_APP_URL);
});
