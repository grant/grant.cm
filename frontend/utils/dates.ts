/**
 * Modified JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 * https://johnresig.com/files/pretty.js
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
export function prettyDate(date) {
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const day_diff = Math.floor(diff / 86400);

  return (
    (day_diff === 0 &&
      ((diff < 60 && 'just now') ||
        (diff < 120 && '1 minute ago') ||
        (diff < 3600 && Math.floor(diff / 60) + ' minutes ago') ||
        (diff < 7200 && '1 hour ago') ||
        (diff < 86400 && Math.floor(diff / 3600) + ' hours ago'))) ||
    (day_diff === 1 && 'Yesterday') ||
    (day_diff < 31 && day_diff + ' days ago') ||
    (day_diff < 100 && Math.ceil(day_diff / 7) + ' weeks ago') ||
    (day_diff < 700 && Math.ceil(day_diff / 30) + ' months ago') ||
    Math.ceil(day_diff / 365) + ' years ago'
  );
}
