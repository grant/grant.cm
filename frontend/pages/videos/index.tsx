import styles from './index.module.scss';
import Head from 'next/head';
import {VIDEOS} from '../../data/videos';
import {prettyDate} from '../../utils/dates';
import {getVideoID, getVideoThumbnailURL} from '../../utils/youtube';

// A page with my videos.
// http://localhost:8080/videos
export default function Videos() {
  // Get video data
  const videoData = VIDEOS.map(video => {
    return {
      ...video,
      date: new Date(video.date.replace(/\./g, '-')),
      thumbnail: getVideoThumbnailURL(getVideoID(video.url)),
    };
  });

  return (
    <div>
      <style jsx global>{`
        body {
          background: #222;
        }
      `}</style>
      <Head key="head">
        <title>Grant Timmerman's Videos</title>
      </Head>
      <div className={styles.pageContent}>
        <h1 className={styles.title}>Grant Timmerman's Videos</h1>
        <div
          className={`${styles.videoList} grid justify-items-center min-h-screen`}
        >
          {videoData.map(video => {
            return (
              <div className={styles.videoBlock} key={video.url}>
                <a href={video.url}>
                  <span
                    className={`${styles.videoArrow} opacity-0 absolute pointer-events-none text-9xl`}
                    style={{
                      paddingTop: '20px',
                      paddingLeft: '150px',
                      fontSize: '100px',
                      color: 'rgba(239, 239, 239, 0.95)',
                    }}
                  >
                    ▶
                  </span>
                  <img
                    src={video.thumbnail}
                    className={styles.videoThumbnail}
                    alt={video.title}
                  />
                  <div
                    style={{
                      maxWidth: '300px',
                    }}
                  >
                    {video.title}
                  </div>
                  <div className="text-gray">{prettyDate(video.date)}</div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
