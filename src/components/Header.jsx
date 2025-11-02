import { LogIn, LogOut, UploadCloud, Shield } from "lucide-react";

export default function Header({ isAdmin, onLoginClick, onLogoutClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-md bg-indigo-500/20 grid place-items-center">
            <Shield className="size-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">EduSolve Admin</h1>
            <p className="text-xs text-slate-400">Manage learning modules</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
              <UploadCloud className="size-3.5" /> Admin Mode
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 ring-1 ring-inset ring-amber-500/20">
              <Shield className="size-3.5" /> Restricted
            </span>
          )}

          {isAdmin ? (
            <button
              onClick={onLogoutClick}
              className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              <LogIn className="size-4" /> Admin login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
