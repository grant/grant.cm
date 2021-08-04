import styles from './index.module.scss';
import { VIDEOS } from '../../data/videos';
import { prettyDate } from '../../utils/dates';
import { getVideoID, getVideoThumbnailURL } from '../../utils/youtube';

// A page with my videos.
// http://localhost:8080/videos
export default function Videos() {

  // Get video data
  const videoData = VIDEOS.map(video => {
    return {
      ...video,
      date: new Date(video.date.replace(/\./g, '-')),
      thumbnail: getVideoThumbnailURL(getVideoID(video.url))
    };
  });

  return (
    <div className={styles.pageContent}>
      <h1 className={styles.title}>Grant Timmerman's Videos</h1>
      <div className={styles.videoList}>{videoData.map(video => {
        return (
          <div className={styles.videoBlock} key={video.url}>
            <a href={video.url}>
              <span className={styles.videoArrow}>▶</span>
              <img src={video.thumbnail} className={styles.videoThumbnail} alt={video.title} />
              <div className={styles.videoTitle}>{video.title}</div>
              <div className={styles.videoDate}>{prettyDate(video.date)}</div>
            </a>
          </div>
        )
      })}</div>
    </div>
  );
}
