import { useState } from "react";
import { Lock, Mail } from "lucide-react";

const DEMO_EMAIL = "admin@edusolve.com";
const DEMO_PASSWORD = "admin123";

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple demo-only gate. In a full build, this would call the backend and verify admin role.
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      onSuccess({ email: DEMO_EMAIL, role: "admin" });
    } else {
      setError("Invalid admin credentials. Use the demo admin to continue.");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Admin sign in</h2>
        <p className="mt-1 text-sm text-slate-400">
          Only administrators can access the dashboard. For this demo, use:
        </p>
        <div className="mt-2 text-xs text-slate-400">
          <div>• Email: <span className="font-mono text-slate-300">{DEMO_EMAIL}</span></div>
          <div>• Password: <span className="font-mono text-slate-300">{DEMO_PASSWORD}</span></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 focus-within:ring-2 focus-within:ring-indigo-500/40">
            <Mail className="size-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@edusolve.com"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 focus-within:ring-2 focus-within:ring-indigo-500/40">
            <Lock className="size-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in as admin"}
        </button>
      </form>
    </div>
  );
}
