import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import VideoGrid from './components/VideoGrid';

const seedModules = [
  {
    id: 0,
    title: 'Calm Classroom: De-escalation Strategies for Challenging Moments',
    educator: 'Dr. Maya Collins',
    duration: '12:47',
    views: 138200,
    category: 'Classroom Management',
  },
  {
    id: 1,
    title: 'Backward Design: Plan Assessments Before Activities',
    educator: 'Alex Rivera',
    duration: '9:05',
    views: 85210,
    category: 'Lesson Planning',
  },
  {
    id: 2,
    title: 'Formative Checks That Take Under 3 Minutes',
    educator: 'Priya Shah',
    duration: '7:31',
    views: 65200,
    category: 'Assessment',
  },
  {
    id: 3,
    title: 'Email Templates for Tough Parent Conversations',
    educator: 'Jamie Lee',
    duration: '11:13',
    views: 48210,
    category: 'Parent Communication',
  },
  {
    id: 4,
    title: 'Free EdTech Tools to Automate Grading',
    educator: 'Tech Coach Nina',
    duration: '14:22',
    views: 193220,
    category: 'EdTech',
  },
  {
    id: 5,
    title: 'Differentiation Made Simple: Tiered Tasks',
    educator: 'Samir Patel',
    duration: '10:18',
    views: 42110,
    category: 'Special Education',
  },
  {
    id: 6,
    title: 'Hooks That Get Students Talking in 60 Seconds',
    educator: 'Marisol Gomez',
    duration: '6:44',
    views: 128420,
    category: 'Student Engagement',
  },
  {
    id: 7,
    title: 'Teacher Wellbeing: Boundaries That Stick',
    educator: 'Coach Daniel',
    duration: '8:37',
    views: 77410,
    category: 'Wellbeing',
  },
  {
    id: 8,
    title: 'Managing Transitions Without Losing Time',
    educator: 'Dr. Maya Collins',
    duration: '5:58',
    views: 90300,
    category: 'Classroom Management',
  },
  {
    id: 9,
    title: 'Standards to Lessons: A Practical Workflow',
    educator: 'Alex Rivera',
    duration: '13:41',
    views: 56100,
    category: 'Lesson Planning',
  },
  {
    id: 10,
    title: 'Rubrics That Students Actually Use',
    educator: 'Priya Shah',
    duration: '9:52',
    views: 61200,
    category: 'Assessment',
  },
  {
    id: 11,
    title: 'Parent Conferences: Agenda, Scripts, and Follow-ups',
    educator: 'Jamie Lee',
    duration: '15:03',
    views: 37250,
    category: 'Parent Communication',
  },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const modules = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedModules.filter((m) => {
      const matchesCategory = category === 'All' || m.category === category;
      const matchesQuery = !q ||
        m.title.toLowerCase().includes(q) ||
        m.educator.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header query={query} setQuery={setQuery} />
      <CategoryBar selected={category} onSelect={setCategory} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Bite-sized modules that solve real classroom problems
          </h1>
          <p className="mt-2 text-gray-600">
            Explore practical, classroom-tested strategies for teachers. Watch, apply, and share.
          </p>
        </section>

        <VideoGrid modules={modules} />
      </main>

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
    </div>
  );
}
