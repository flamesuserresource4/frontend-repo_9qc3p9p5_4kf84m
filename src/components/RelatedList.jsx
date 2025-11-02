import React from 'react';
import VideoCard from './VideoCard';

const RelatedList = ({ modules, onSelect }) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">Related modules</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {modules.slice(0, 6).map((m) => (
          <div key={m.id}>
            <VideoCard module={m} onSelect={() => onSelect(m)} compact />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedList;
