import {describe, it, expect} from 'vitest';
import {getVideoID, getVideoThumbnailURL} from '../utils/youtube';

describe('getVideoID', () => {
  it('extracts the id from a watch URL', () => {
    expect(getVideoID('https://www.youtube.com/watch?v=g6i-mb_3iWM')).toBe(
      'g6i-mb_3iWM',
    );
  });

  it('extracts the id from a youtu.be short URL', () => {
    expect(getVideoID('https://youtu.be/g6i-mb_3iWM')).toBe('g6i-mb_3iWM');
  });

  it('returns an empty string for a non-video URL', () => {
    expect(getVideoID('https://example.com/not-a-video')).toBe('');
  });
});

describe('getVideoThumbnailURL', () => {
  it('builds the thumbnail URL from an id', () => {
    expect(getVideoThumbnailURL('g6i-mb_3iWM')).toBe(
      'https://i.ytimg.com/vi/g6i-mb_3iWM/mqdefault.jpg',
    );
  });
});
