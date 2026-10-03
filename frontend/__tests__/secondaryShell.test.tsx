import {describe, it, expect} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import SecondaryShell from '../components/secondaryShell';

describe('SecondaryShell', () => {
  it('does not advertise a public resume link', () => {
    render(
      <SecondaryShell title="Consulting">
        <p>Content</p>
      </SecondaryShell>,
    );

    const nav = screen.getByRole('navigation', {name: 'Primary'});
    expect(
      within(nav).queryByRole('link', {name: 'Resume'}),
    ).not.toBeInTheDocument();
    expect(within(nav).getByRole('link', {name: 'Consulting'})).toHaveAttribute(
      'href',
      '/consulting',
    );
    expect(within(nav).getByRole('link', {name: 'Videos'})).toHaveAttribute(
      'href',
      '/videos',
    );
    expect(within(nav).getByRole('link', {name: 'Calendar'})).toHaveAttribute(
      'href',
      '/cal',
    );
  });
});
