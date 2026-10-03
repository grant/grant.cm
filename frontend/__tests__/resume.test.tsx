import {describe, it, expect} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import Resume from '../pages/resume';

describe('Resume', () => {
  it('still serves the existing resume page without a public nav link', () => {
    render(<Resume />);

    expect(screen.getByTitle("Grant Timmerman's Resume")).toHaveAttribute(
      'src',
      'https://storage.googleapis.com/granttimmerman-resume/Grant_Timmerman_Resume.pdf',
    );
    expect(
      within(screen.getByRole('navigation', {name: 'Primary'})).queryByRole(
        'link',
        {name: 'Resume'},
      ),
    ).not.toBeInTheDocument();
  });
});
