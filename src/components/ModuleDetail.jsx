import React, { useState } from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import Notes from './Notes';
import RelatedList from './RelatedList';
import Timestamps from './Timestamps';
import Resources from './Resources';

const ModuleDetail = ({ module, related, onBack, onSelectRelated }) => {
  if (!module) return null;
  const [seekTo, setSeekTo] = useState(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
        <ArrowLeft size={18} /> Back to modules
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer src={module.videoUrl} title={module.title} seekTo={seekTo} />
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{module.educator}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><Eye size={14} /> {Intl.NumberFormat('en', { notation: 'compact' }).format(module.views)}</span>
              <span>•</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">{module.category}</span>
            </div>
            <p className="mt-3 text-gray-700 leading-relaxed">{module.description}</p>
          </div>

          <div className="mt-6 grid gap-6">
            <Timestamps moduleId={module.id} onSeek={(t) => setSeekTo(t)} />
            <Resources moduleId={module.id} />
            <Notes moduleId={module.id} />
          </div>
        </div>

        <aside className="lg:col-span-1">
          <RelatedList modules={related} onSelect={(m) => onSelectRelated(m)} />
        </aside>
      </div>
    </div>
  );
};

export default ModuleDetail;
