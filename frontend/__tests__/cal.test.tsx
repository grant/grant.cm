import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import Cal from '../pages/cal';

describe('Cal', () => {
  it('embeds Google Calendar from calendar.google.com', () => {
    render(<Cal />);

    const iframe = screen.getByTitle("Grant Timmerman's Calendar");
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringMatching(
        /^https:\/\/calendar\.google\.com\/calendar\/embed\?/,
      ),
    );
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('showTitle=0'),
    );
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('showPrint=0'),
    );
    expect(iframe).toHaveAttribute('src', expect.stringContaining('mode=WEEK'));
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('src=granttimmerman%40gmail.com'),
    );
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('ctz=America%2FLos_Angeles'),
    );
    expect(iframe).not.toHaveAttribute(
      'src',
      expect.stringContaining('www.google.com'),
    );
  });
});
