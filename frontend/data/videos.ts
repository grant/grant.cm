/**
 * A video, usually hosted on YouTube.
 */
export interface Video {
  url: string; // The url of the video.
  title: string; // The title of the video.
  date?: string; // The date the video was uploaded.
}

export const Videos: Video[] = [{
  url: 'https://www.youtube.com/watch?v=r8rVm4-RJJM',
  title: 'Cloud, Dart, and full-stack Flutter | Q&A',
  date: '2021-05-19',
}, {
  url: 'https://www.youtube.com/watch?v=JwCmu_INnCg',
  title: 'Go full-stack with Kotlin or Dart on Google Cloud | Session',
  date: '2021-05-19',
}, {
  url: 'https://www.youtube.com/watch?v=yGQe0-5D7e4',
  title: 'CloudEvents with Google Cloud',
  date: '2020-09-15',
}, {
  url: 'https://www.youtube.com/watch?v=qQiqo1zZJmI',
  title: 'Functions Framework',
  date: '2020-11-10',
}, {
  url: 'https://www.youtube.com/watch?v=zRjOSxTpC3A',
  title: 'Cloud Functions vs. Cloud Run',
  date: '2020-10-15',
}, {
  url: 'https://www.youtube.com/watch?v=EjMs36ucRA4',
  title: '2019.06.13 SeattleJS Go Serverless with Google Cloud Functions by Grant Timmerman',
  date: '2019-06-13',
}, {
  url: 'https://www.youtube.com/watch?v=fEbAALVwyEU',
  title: 'Functions as a Service (Cloud Next \'19)',
  date: '2019-04-11',
}, {
  url: 'https://www.youtube.com/watch?v=dpYHPzQF1qI',
  title: 'Grant Timmerman - All About Apps Script',
  date: '2019-02-02',
}, {
  url: 'https://www.youtube.com/watch?v=qFN8ULYt7Bk',
  title: 'Automate G Suite with APIs and Apps Script - Grant Timmerman',
  date: '2018-10-30',
}, {
  url: 'https://www.youtube.com/watch?v=ReeTGi600QI',
  title: 'TU17: Enhancing the Google Apps Script Developer Experience with clasp and TypeScript',
  date: '2018-10-05',
}, {
  url: 'https://www.youtube.com/watch?v=wXYtWwtizag',
  title: 'Enhancing the Google Apps Script Developer Experience (Cloud Next \'18)',
  date: '2018-08-09',
}, {
  url: 'https://www.youtube.com/watch?v=iVVZfPbNCtI',
  title: 'React.js: The Frontend Framework of the Future',
  date: '2015-14-17',
}, {
  url: 'https://www.youtube.com/watch?v=weZUOS8QuLw',
  title: 'Hacking like a Hipster - Grunt, Gulp and Heroku',
  date: '2014-03-06',
}];