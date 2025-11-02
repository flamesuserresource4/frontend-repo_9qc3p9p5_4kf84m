import React, { useEffect, useMemo, useState } from 'react';
import { Save } from 'lucide-react';

const Notes = ({ moduleId }) => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('edusolve_token') : null;
  const [text, setText] = useState('');
  const [savedAt, setSavedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lightweight anonymous identity fallback
  const userId = useMemo(() => {
    let id = localStorage.getItem('edusolve_user_id');
    if (!id) {
      id = (self.crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
      localStorage.setItem('edusolve_user_id', id);
    }
    return id;
  }, []);

  // Load
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        if (!backend) {
          const cached = localStorage.getItem(`edusolve_notes_${moduleId}`);
          if (cached) setText(cached);
          return;
        }
        const url = token
          ? `${backend}/modules/${moduleId}/notes`
          : `${backend}/modules/${moduleId}/notes?user_id=${encodeURIComponent(userId)}`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) throw new Error('Failed to load note');
        const data = await res.json();
        setText(data.content || '');
      } catch (e) {
        const cached = localStorage.getItem(`edusolve_notes_${moduleId}`);
        if (cached) setText(cached);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [backend, moduleId, userId, token]);

  // Debounced save
  useEffect(() => {
    if (loading) return;
    const id = setTimeout(async () => {
      try {
        localStorage.setItem(`edusolve_notes_${moduleId}`, text);
        if (backend) {
          await fetch(`${backend}/modules/${moduleId}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ user_id: userId, content: text }),
          });
        }
        setSavedAt(new Date());
      } catch (e) {}
    }, 600);
    return () => clearTimeout(id);
  }, [text, backend, moduleId, userId, token, loading]);

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Your notes</h3>
        <div className="text-xs text-gray-500 inline-flex items-center gap-1">
          <Save size={14} />
          {savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : loading ? 'Loading…' : 'Autosaving…'}
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write key takeaways, action steps, or timestamps…"
        className="min-h-[160px] w-full resize-y rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
      />
      <p className="mt-2 text-[11px] text-gray-500">Notes sync to your account when signed in, or to a private device ID if not.</p>
    </div>
  );
};

export default Notes;
