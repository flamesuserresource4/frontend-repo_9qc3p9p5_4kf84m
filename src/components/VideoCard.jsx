import React from 'react';
import { PlayCircle, Eye } from 'lucide-react';

const colorPairs = [
  ['from-indigo-500', 'to-sky-500'],
  ['from-emerald-500', 'to-teal-400'],
  ['from-fuchsia-500', 'to-violet-500'],
  ['from-amber-500', 'to-orange-500'],
  ['from-blue-600', 'to-cyan-400'],
  ['from-rose-500', 'to-pink-500'],
];

const VideoCard = ({ module, onSelect, compact = false }) => {
  const { title, educator, duration, views, category } = module;
  const color = colorPairs[module.id % colorPairs.length];

  return (
    <div className={`group cursor-pointer ${compact ? '' : ''}`} onClick={onSelect}>
      <div className={`relative ${compact ? 'aspect-[16/10]' : 'aspect-video'} w-full overflow-hidden rounded-xl bg-gradient-to-tr ${color[0]} ${color[1]} shadow-sm`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        <PlayCircle className="absolute inset-0 m-auto text-white/90 group-hover:scale-105 transition-transform" size={compact ? 40 : 56} />
        <span className="absolute bottom-2 right-2 text-xs font-medium px-2 py-1 rounded bg-black/70 text-white backdrop-blur">
          {duration}
        </span>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200 grid place-items-center text-gray-500 text-xs font-semibold">
          {educator.split(' ').map((n) => n[0]).slice(0,2).join('')}
        </div>
        <div className="min-w-0">
          <h3 className={`font-semibold leading-snug line-clamp-2 ${compact ? 'text-sm' : 'text-sm'}`}>{title}</h3>
          <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
            <span>{educator}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1"><Eye size={14} /> {Intl.NumberFormat('en', { notation: 'compact' }).format(views)}</span>
            <span>•</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
