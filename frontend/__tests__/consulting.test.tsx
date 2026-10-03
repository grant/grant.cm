import {describe, it, expect} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import Consulting from '../pages/consulting';

describe('Consulting', () => {
  it('still serves the existing consulting page without a public nav link', () => {
    render(<Consulting />);

    expect(
      screen.getByRole('heading', {name: 'Timmerman Consulting, LLC'}),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /15 Min/})).toHaveAttribute(
      'href',
      '/consulting/15',
    );
    expect(
      within(screen.getByRole('navigation', {name: 'Primary'})).queryByRole(
        'link',
        {name: 'Consulting'},
      ),
    ).not.toBeInTheDocument();
  });
});
