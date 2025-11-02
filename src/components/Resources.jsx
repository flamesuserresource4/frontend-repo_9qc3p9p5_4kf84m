import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

const Resources = ({ moduleId }) => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const fetchData = async () => {
    try {
      if (!backend) return;
      const res = await fetch(`${backend}/modules/${moduleId}/resources`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setList(data);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    setList([]);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, backend]);

  const addResource = async (e) => {
    e.preventDefault();
    if (!name || !url) return;
    try {
      if (backend) {
        const res = await fetch(`${backend}/modules/${moduleId}/resources`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, url }),
        });
        if (res.ok) {
          setName('');
          setUrl('');
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
        <Download size={18} className="text-gray-600" />
        <h3 className="font-semibold">Resources</h3>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-gray-500">No resources yet.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((r, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{r.name}</span>
              <a
                href={r.url}
                download
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={addResource} className="mt-4 grid grid-cols-5 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="col-span-2 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="col-span-3 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
        />
        <div className="col-span-5 text-right">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add resource
          </button>
        </div>
      </form>
    </div>
  );
};

export default Resources;
