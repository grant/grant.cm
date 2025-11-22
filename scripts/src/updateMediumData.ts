/**
 * Updates the static blogpost data from Medium.com
 *
 * Uses the public, undocumented API to get data. Stores in JSON files.
 * https://medium.com/@granttimmerman?format=json
 */
import axios from 'axios';

// https://medium.com/@granttimmerman
const MEDIUM_ARTICLES = [
  'https://medium.com/google-cloud/cloud-workflows-continuous-deployment-with-github-actions-514866c9250',
  'https://medium.com/google-cloud/grpc-on-cloud-run-743ed586d4ad',
  'https://medium.com/google-cloud/the-wondrous-world-of-cloud-audit-logs-7a1fe6e47002',
  'https://medium.com/google-cloud/dart-functions-framework-25a13251a5d',
  'https://medium.com/google-cloud/c-functions-framework-21f327fdee16',
  'https://medium.com/google-cloud/call-a-workflow-from-a-function-51fc7fc8e1ff',
  'https://medium.com/google-cloud/cloud-function-buildpacks-ebba8e5e382',
  'https://medium.com/google-cloud/serverless-functions-in-any-language-b44401c40859',
  'https://medium.com/google-cloud/google-sheets-cloud-run-ffc1875d2a1',
  'https://medium.com/google-cloud/r-functions-framework-fba630e820c2',
  'https://medium.com/google-cloud/swift-on-cloud-run-b6397a428d',
  'https://medium.com/google-cloud/7-gcloud-tricks-you-probably-didnt-know-7f64a16869e7',
  'https://medium.com/google-cloud/net-functions-framework-a039d6d38348',
  'https://medium.com/google-cloud/deno-on-cloud-run-89ae64d1664d',
  'https://medium.com/google-cloud/ruby-functions-on-cloud-run-db6ea95ad8ac',
  'https://medium.com/@granttimmerman/test-pub-sub-with-the-functions-framework-and-pub-sub-emulator-a2dc39196603',
  'https://medium.com/google-cloud/php-functions-on-cloud-run-23acdb6022e9',
  'https://medium.com/google-cloud/3-great-options-for-persistent-storage-with-cloud-run-f1581ee05164',
  'https://medium.com/google-cloud/youtube-api-cloud-run-41109db98584',
  'https://medium.com/google-cloud/go-functions-framework-120ace237fe2',
  'https://medium.com/google-cloud/how-i-found-the-best-pizza-restaurant-in-13-000-cities-using-cloud-tasks-cloud-functions-and-db888675db71',
  'https://medium.com/google-cloud/asynchronous-code-execution-with-google-cloud-tasks-9b73ceaf48c3',
  'https://medium.com/google-cloud/gapi-the-google-apis-client-library-for-browser-javascript-5896b12dbbd5',
  'https://medium.com/google-cloud/express-routing-with-google-cloud-functions-36fb55885c68',
  'https://medium.com/google-cloud/node-12-functions-on-cloud-run-d891dd93c7c8',
  'https://medium.com/google-cloud/debugging-node-google-cloud-functions-locally-in-vs-code-e6b912eb3f84',
  'https://medium.com/google-cloud/google-cloud-functions-framework-9fbd899c201c',
  'https://medium.com/@granttimmerman/10-apps-script-talks-fall-18-tour-63a6c5481b07',
  'https://medium.com/@granttimmerman/my-5-most-favorite-g-suite-announcements-at-next-18-1d9738cbd576',
];

const mediumUsername = 'granttimmerman';

(async () => {
  // Get Medium API data
  const res = await axios.get(
    `https://medium.com/@${mediumUsername}?format=json`,
  );
  const data = res.data;

  // Parse JSON
  const prefix = '])}while(1);</x>';
  const parsedData = JSON.parse(data.slice(prefix.length));

  // Medium posts
  const posts = parsedData.payload.references.Post;
  const filteredPostData = Object.values(posts).map((p: any) => {
    const postData = {
      id: p.id,
      title: p.title,
      createdAt: p.createdAt,
      contentPreview: p.content.subtitle,
      url: `https://medium.com/@${mediumUsername}/${p.uniqueSlug}`,
      imageURL: `https://miro.medium.com/max/2000/${p.virtuals.previewImage.imageId}`,
    };
    return postData;
  });
})();
