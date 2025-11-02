import React, { useEffect, useState } from 'react';

const AuthModal = ({ open, onClose, onAuthed }) => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setError('');
      setLoading(false);
      setPassword('');
    }
  }, [open]);

  const canSubmit = backend && email && password && (mode === 'login' || name);

  const submit = async (e) => {
    e?.preventDefault?.();
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      if (mode === 'register') {
        const res = await fetch(`${backend}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) throw new Error(await res.text());
      }
      const res2 = await fetch(`${backend}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res2.ok) throw new Error(await res2.text());
      const token = (await res2.json()).access_token;
      localStorage.setItem('edusolve_token', token);
      // fetch profile
      const me = await fetch(`${backend}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      const user = await me.json();
      localStorage.setItem('edusolve_user', JSON.stringify(user));
      onAuthed({ token, user });
      onClose();
    } catch (e) {
      setError('Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-1">{mode === 'login' ? 'Sign in' : 'Create your account'}</h3>
        <p className="text-sm text-gray-600 mb-4">Use your email to {mode === 'login' ? 'sign in' : 'get started'}.</p>
        <form onSubmit={submit} className="grid gap-3">
          {mode === 'register' && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />

          {error && <div className="text-sm text-rose-600">{error}</div>}

          <button
            disabled={!canSubmit || loading}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-600">
          {mode === 'login' ? (
            <button className="underline" onClick={() => setMode('register')}>Need an account? Register</button>
          ) : (
            <button className="underline" onClick={() => setMode('login')}>Already have an account? Sign in</button>
          )}
        </div>

        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  );
};

export default AuthModal;
