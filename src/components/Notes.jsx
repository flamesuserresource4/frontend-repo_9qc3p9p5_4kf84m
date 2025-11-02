import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

const Notes = ({ moduleId }) => {
  const storageKey = `edusolve_notes_${moduleId}`;
  const [text, setText] = useState('');
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem(storageKey);
    if (cached) setText(cached);
  }, [storageKey]);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(storageKey, text);
      setSavedAt(new Date());
    }, 500);
    return () => clearTimeout(id);
  }, [text, storageKey]);

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Your notes</h3>
        <div className="text-xs text-gray-500 inline-flex items-center gap-1">
          <Save size={14} />
          {savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : 'Autosaving...'}
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write key takeaways, action steps, or timestamps..."
        className="min-h-[140px] w-full resize-y rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
      />
    </div>
  );
};

export default Notes;
