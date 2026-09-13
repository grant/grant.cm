import SecondaryShell from '../../components/secondaryShell';
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
      date: video.date ? new Date(video.date.replace(/\./g, '-')) : undefined,
      thumbnail: getVideoThumbnailURL(getVideoID(video.url)),
    };
  });

  return (
    <SecondaryShell title="Videos" accent="teal">
      <div className="grid grid-cols-3 gap-8 max-[1080px]:grid-cols-2 max-[700px]:grid-cols-1">
        {videoData.map(video => (
          <a
            className="group block overflow-hidden rounded-lg border border-muted bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            href={video.url}
            key={video.url}
          >
            <div className="relative">
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[72px] text-white/70 transition group-hover:text-white">
                ▶
              </span>
              <img
                src={video.thumbnail}
                className="aspect-video w-full object-cover"
                alt=""
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold">{video.title}</h2>
              <p className="mt-1 text-small text-secondary-dark">
                {video.date ? prettyDate(video.date) : null}
              </p>
            </div>
          </a>
        ))}
      </div>
    </SecondaryShell>
  );
}
