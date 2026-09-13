import {describe, it, expect} from 'vitest';
import {prettyDate} from '../utils/dates';

const SECOND = 1000;
const HOUR = 60 * 60 * SECOND;
const DAY = 24 * HOUR;

describe('prettyDate', () => {
  it('returns "just now" for the current time', () => {
    expect(prettyDate(new Date())).toBe('just now');
  });

  it('returns "1 hour ago" for an hour-old date', () => {
    expect(prettyDate(new Date(Date.now() - HOUR))).toBe('1 hour ago');
  });

  it('returns "2 days ago" for a two-day-old date', () => {
    expect(prettyDate(new Date(Date.now() - 2 * DAY))).toBe('2 days ago');
  });
});
