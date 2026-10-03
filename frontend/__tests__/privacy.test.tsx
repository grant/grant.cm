import {describe, it, expect} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import Privacy from '../pages/privacy';

describe('Privacy', () => {
  it('states the personal-site and health-data uses', () => {
    render(<Privacy />);

    expect(
      screen.getByRole('heading', {name: 'Privacy', level: 1}),
    ).toBeInTheDocument();
    expect(screen.getByText('This is my personal site.')).toBeInTheDocument();
    expect(screen.queryByText(/grantcm/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Google Health data/)).toBeInTheDocument();
    expect(screen.getByText(/activity and fitness/)).toBeInTheDocument();
    expect(
      screen.getByText(/health metrics and measurements/),
    ).toBeInTheDocument();
    expect(screen.getByText(/sleep/)).toBeInTheDocument();
    expect(screen.getByText(/read-only/)).toBeInTheDocument();
    expect(
      screen.queryByText('granttimmerman@gmail.com'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Email me'})).toHaveAttribute(
      'href',
      'mailto:granttimmerman@gmail.com',
    );
  });

  it('links to the privacy page from the secondary footer', () => {
    render(<Privacy />);

    expect(
      within(screen.getByRole('contentinfo')).getByRole('link', {
        name: 'Privacy',
      }),
    ).toHaveAttribute('href', '/privacy');
  });
});
