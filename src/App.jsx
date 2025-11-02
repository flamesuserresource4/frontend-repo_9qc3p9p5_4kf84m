import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import VideoGrid from './components/VideoGrid';
import ModuleDetail from './components/ModuleDetail';
import AuthModal from './components/AuthModal';

const fallbackModules = [
  {
    id: 0,
    title: 'Calm Classroom: De-escalation Strategies for Challenging Moments',
    educator: 'Dr. Maya Collins',
    duration: '12:47',
    views: 138200,
    category: 'Classroom Management',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description:
      'Learn practical de-escalation steps for tense classroom situations. Build calm routines, language scripts, and follow-up strategies you can use tomorrow.',
  },
  {
    id: 1,
    title: 'Backward Design: Plan Assessments Before Activities',
    educator: 'Alex Rivera',
    duration: '9:05',
    views: 85210,
    category: 'Lesson Planning',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description:
      'Design units by defining success first. We walk through aligning objectives, assessments, and instruction with a quick template.',
  },
];

export default function App() {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [modules, setModules] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('edusolve_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('edusolve_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        if (!backend) throw new Error('No backend');
        const res = await fetch(`${backend}/modules`, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setModules(data);
      } catch (e) {
        setModules(fallbackModules);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [backend]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return modules.filter((m) => {
      const matchesCategory = category === 'All' || m.category === category;
      const matchesQuery = !q ||
        m.title.toLowerCase().includes(q) ||
        m.educator.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [modules, query, category]);

  const related = useMemo(() => {
    if (!selected) return [];
    return modules
      .filter((m) => m.id !== selected.id && (m.category === selected.category || m.educator === selected.educator))
      .slice(0, 8);
  }, [selected, modules]);

  const handleAuthed = ({ token, user }) => {
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('edusolve_token');
    localStorage.removeItem('edusolve_user');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header query={query} setQuery={setQuery} user={user} onOpenAuth={() => setAuthOpen(true)} onLogout={handleLogout} />
      {!selected && <CategoryBar selected={category} onSelect={setCategory} />} 

      {!selected ? (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <section className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Bite-sized modules that solve real classroom problems
            </h1>
            <p className="mt-2 text-gray-600">
              Explore practical, classroom-tested strategies for teachers. Watch, apply, and share.
            </p>
          </section>

          {loading ? (
            <div className="text-center text-gray-600 py-20">Loading…</div>
          ) : (
            <VideoGrid modules={filtered} onSelect={setSelected} />
          )}
        </main>
      ) : (
        <ModuleDetail
          module={selected}
          related={related}
          onBack={() => setSelected(null)}
          onSelectRelated={(m) => setSelected(m)}
        />
      )}

      <footer className="border-t mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between">
          <p>
            © {new Date().getFullYear()} EduSolve. Built for educators.
          </p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-gray-900">About</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
            <a href="#" className="hover:text-gray-900">Privacy</a>
          </div>
        </div>
      </footer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthed={handleAuthed} />
    </div>
  );
}
