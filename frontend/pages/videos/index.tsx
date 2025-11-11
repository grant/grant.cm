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
      <div className="bg-black-light text-white min-h-full">
        <h1 className="text-center max-[1080px]:text-medium">
          Grant Timmerman's Videos
        </h1>
        <div className="grid justify-items-center min-h-screen max-[1080px]:grid-cols-1 min-[1080px]:grid-cols-3">
          {videoData.map(video => {
            return (
              <div
                className="block px-[10px] my-5 max-w-[320px] group"
                key={video.url}
              >
                <a href={video.url}>
                  <span
                    className="opacity-[0.3] absolute pointer-events-none text-9xl group-hover:opacity-100"
                    style={{
                      paddingTop: '20px',
                      paddingLeft: '120px',
                      fontSize: '100px',
                      color: 'rgba(239, 239, 239, 0.95)',
                    }}
                  >
                    ▶
                  </span>
                  <img
                    src={video.thumbnail}
                    className="w-full"
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
