import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ modules, onSelect }) => {
  if (!modules.length) {
    return (
      <div className="text-center text-gray-600 py-20">
        No modules match your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {modules.map((m) => (
        <VideoCard key={m.id} module={m} onSelect={() => onSelect(m)} />)
      )}
    </div>
  );
};

export default VideoGrid;
