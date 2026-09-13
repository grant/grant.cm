import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import SectionFooter from '../pages/home/section/footer';

describe('SectionFooter', () => {
  it('renders the social links with correct hrefs', () => {
    render(<SectionFooter />);

    expect(screen.getByText('GitHub')).toHaveAttribute(
      'href',
      'http://www.github.com/grant',
    );
    expect(screen.getByText('LinkedIn')).toHaveAttribute(
      'href',
      'http://www.linkedin.com/in/granttimmerman',
    );
    expect(screen.getByText('Contact')).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:granttimmerman@gmail.com'),
    );
  });

  it('renders the California tagline', () => {
    render(<SectionFooter />);
    expect(screen.getByText(/Made with .* in California/)).toBeInTheDocument();
  });
});
