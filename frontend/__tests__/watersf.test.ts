import {describe, expect, it} from 'vitest';
import {getServerSideProps, WATERSF_APP_URL} from '../pages/watersf';

describe('watersf path redirect', () => {
  it('sends visitors to the live Cloud Run app', async () => {
    expect(WATERSF_APP_URL).toBe(
      'https://watersf-166145790296.us-central1.run.app',
    );
    await expect(getServerSideProps()).resolves.toEqual({
      redirect: {
        destination: WATERSF_APP_URL,
        permanent: false,
      },
    });
  });
});
