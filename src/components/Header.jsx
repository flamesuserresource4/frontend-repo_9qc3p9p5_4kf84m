import React from 'react';
import { Menu, Search, User, LogOut } from 'lucide-react';

const Header = ({ query, setQuery, user, onOpenAuth, onLogout }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-gray-100 lg:hidden" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400" />
            <span className="font-semibold text-lg tracking-tight">EduSolve</span>
          </div>
        </div>

        <div className="flex-1 mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, topics, or educators"
              className="w-full h-10 rounded-full border border-gray-200 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100" aria-label="Search">
            <Search size={20} />
          </button>
          {user ? (
            <button className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50" onClick={onLogout}>
              <span className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-500 text-white grid place-items-center text-[11px]">
                {user.name?.split(' ').map(n=>n[0]).slice(0,2).join('') || 'U'}
              </span>
              <span className="hidden sm:block">{user.name || user.email}</span>
              <LogOut size={16} className="text-gray-500" />
            </button>
          ) : (
            <button className="h-9 rounded-full bg-gray-900 text-white px-4 text-sm hover:bg-black" onClick={onOpenAuth}>
              <span className="inline-flex items-center gap-2"><User size={16} /> Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
