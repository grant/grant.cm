/**
 * Gets the youtube video id from a url
 */
export const getVideoID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

/**
 * Gets the youtube video url from an ID.
 * @see https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api?rq=1
 */
export const getVideoThumbnailURL = (videoId: string) => {
  // Image with black bars
  // return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Image without black bars
  return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
};
