import { useEffect, useState } from "react";
import { UploadCloud, Link, Image, Type, Film, Tag } from "lucide-react";

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
      // ignore persistence errors
    }
  }, [modules]);

  return [modules, setModules];
}

export default function UploadModuleForm() {
  const [modules, setModules] = useLocalModules();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [resource, setResource] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const reset = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setVideoUrl("");
    setThumbUrl("");
    setResource("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    await new Promise((r) => setTimeout(r, 500));

    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const payload = {
      id,
      title: title.trim(),
      category: category.trim() || "General",
      description: description.trim(),
      videoUrl: videoUrl.trim(),
      thumbUrl: thumbUrl.trim(),
      resources: resource.trim() ? [{ label: "Resource", url: resource.trim() }] : [],
      createdAt: now,
    };

    setModules([payload, ...modules]);
    setSaving(false);
    setSuccess("Module uploaded successfully");
    reset();
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Upload a new module</h3>
          <p className="mt-1 text-sm text-slate-400">Provide video details and optional thumbnail/resources.</p>
        </div>
        <UploadCloud className="size-5 text-indigo-400" />
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="text-sm text-slate-300">Title</label>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Type className="size-4 text-slate-400" />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Intro to Algebra"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="text-sm text-slate-300">Category</label>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Tag className="size-4 text-slate-400" />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Mathematics"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-slate-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Brief summary of the module…"
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 p-3 text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="md:col-span-1">
          <label className="text-sm text-slate-300">Video URL</label>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Film className="size-4 text-slate-400" />
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              placeholder="https://cdn.example.com/video.mp4"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="text-sm text-slate-300">Thumbnail URL</label>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Image className="size-4 text-slate-400" />
            <input
              value={thumbUrl}
              onChange={(e) => setThumbUrl(e.target.value)}
              placeholder="https://cdn.example.com/thumb.jpg"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-slate-300">Resource link (optional)</label>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Link className="size-4 text-slate-400" />
            <input
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              placeholder="https://example.com/resources.pdf"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        {success && (
          <div className="md:col-span-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            {success}
          </div>
        )}

        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving || !title || !videoUrl}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-60"
          >
            <UploadCloud className="size-4" />
            {saving ? "Uploading…" : "Upload module"}
          </button>
        </div>
      </form>
    </div>
  );
}
