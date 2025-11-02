import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import UploadModuleForm from "./components/UploadModuleForm.jsx";
import ModuleGrid from "./components/ModuleGrid.jsx";

export default function App() {
  const [admin, setAdmin] = useState(() => {
    try {
      const raw = localStorage.getItem("edusolve_admin");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    try {
      if (admin) localStorage.setItem("edusolve_admin", JSON.stringify(admin));
      else localStorage.removeItem("edusolve_admin");
    } catch (e) {
      // ignore persistence errors
    }
  }, [admin]);

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <Header
        isAdmin={!!admin}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={() => setAdmin(null)}
      />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        {!admin ? (
          <div className="mx-auto max-w-2xl">
            {showLogin ? (
              <AdminLogin
                onSuccess={(user) => {
                  setAdmin(user);
                  setShowLogin(false);
                }}
              />
            ) : (
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur">
                <h2 className="text-lg font-semibold">Admin access required</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Sign in as an administrator to upload and manage modules.
                </p>
                <button
                  onClick={() => setShowLogin(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  Open admin login
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <UploadModuleForm />
            </div>
            <div className="lg:col-span-2">
              <ModuleGrid />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        Built for educators • Admin-only access • Demo interface
      </footer>
    </div>
  );
}
