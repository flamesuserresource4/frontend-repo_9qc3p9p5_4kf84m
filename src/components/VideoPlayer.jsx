import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ src, title, seekTo }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && typeof seekTo === 'number') {
      try {
        ref.current.currentTime = seekTo;
        ref.current.focus();
      } catch (e) {
        // ignore
      }
    }
  }, [seekTo]);

  return (
    <div className="w-full">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video
          ref={ref}
          controls
          controlsList="nodownload"
          className="h-full w-full"
          poster="https://images.unsplash.com/photo-1584697964194-0719f0fcba28?q=80&w=1600&auto=format&fit=crop"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 className="mt-4 text-xl font-semibold leading-tight">{title}</h2>
    </div>
  );
};

export default VideoPlayer;
