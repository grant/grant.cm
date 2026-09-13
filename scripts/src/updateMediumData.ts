/**
 * Updates the static blogpost data from Medium.com
 *
 * Uses the public, undocumented API to get data. Stores in JSON files.
 * https://medium.com/@granttimmerman?format=json
 */
import axios from 'axios';

const mediumUsername = 'granttimmerman';

interface MediumPost {
  id: string;
  title: string;
  createdAt: number;
  content: {subtitle: string};
  uniqueSlug: string;
  virtuals: {previewImage: {imageId: string}};
}

async function updateMediumData() {
  // Get Medium API data
  const res = await axios.get(
    `https://medium.com/@${mediumUsername}?format=json`,
  );
  const data = res.data;

  // Parse JSON
  const prefix = '])}while(1);</x>';
  const parsedData = JSON.parse(data.slice(prefix.length));

  // Medium posts
  const posts = parsedData.payload.references.Post as Record<
    string,
    MediumPost
  >;
  const filteredPostData = Object.values(posts).map((p: MediumPost) => ({
    id: p.id,
    title: p.title,
    createdAt: p.createdAt,
    contentPreview: p.content.subtitle,
    url: `https://medium.com/@${mediumUsername}/${p.uniqueSlug}`,
    imageURL: `https://miro.medium.com/max/2000/${p.virtuals.previewImage.imageId}`,
  }));

  console.log(JSON.stringify(filteredPostData, null, 2));
}

updateMediumData().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
