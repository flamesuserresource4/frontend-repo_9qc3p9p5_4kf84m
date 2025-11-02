import { useEffect, useState } from "react";

function useLocalModules() {
  const [modules, setModules] = useState(() => {
    try {
      const raw = localStorage.getItem("edusolve_modules");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("edusolve_modules", JSON.stringify(modules));
    } catch (e) {
      // ignore
    }
  }, [modules]);

  return [modules, setModules];
}

export default function ModuleGrid() {
  const [modules] = useLocalModules();

  if (!modules.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-10 text-center text-sm text-slate-400 backdrop-blur">
        No modules yet. Once you upload, they will appear here.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((m) => (
        <article
          key={m.id}
          className="group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-900/60 shadow hover:border-white/20"
        >
          <div className="aspect-video w-full bg-slate-800/50">
            {m.thumbUrl ? (
              <img
                src={m.thumbUrl}
                alt={m.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="grid h-full place-items-center text-slate-500">No thumbnail</div>
            )}
          </div>
          <div className="p-4">
            <h4 className="line-clamp-1 font-medium tracking-tight text-white">{m.title}</h4>
            <p className="mt-1 line-clamp-2 text-sm text-slate-400">{m.description || "No description"}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span className="rounded-full bg-white/5 px-2 py-1">{m.category || "General"}</span>
              <a
                href={m.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 hover:text-indigo-200"
              >
                Open video →
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
