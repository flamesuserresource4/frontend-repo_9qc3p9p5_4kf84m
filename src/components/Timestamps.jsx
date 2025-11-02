import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const Timestamps = ({ moduleId, onSeek }) => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [list, setList] = useState([]);
  const [label, setLabel] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (!backend) return;
      const res = await fetch(`${backend}/modules/${moduleId}/timestamps`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setList(data);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setList([]);
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, backend]);

  const addTimestamp = async (e) => {
    e.preventDefault();
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return;
    const seconds = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
    try {
      if (backend) {
        const res = await fetch(`${backend}/modules/${moduleId}/timestamps`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ label, time: seconds }),
        });
        if (res.ok) {
          setLabel('');
          setTimeStr('');
          fetchData();
        }
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} className="text-gray-600" />
        <h3 className="font-semibold">Timestamps</h3>
      </div>
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : list.length === 0 ? (
        <p className="text-sm text-gray-500">No timestamps yet.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((t, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <button
                className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
                onClick={() => onSeek?.(t.time)}
              >
                {formatTime(t.time)}
              </button>
              <span className="ml-3 flex-1 text-gray-700">{t.label}</span>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={addTimestamp} className="mt-4 grid grid-cols-5 gap-2">
        <input
          value={timeStr}
          onChange={(e) => setTimeStr(e.target.value)}
          placeholder="mm:ss"
          className="col-span-2 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
        />
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          className="col-span-3 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
        />
        <div className="col-span-5 text-right">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add timestamp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Timestamps;
