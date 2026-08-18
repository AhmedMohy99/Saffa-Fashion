'use client';

import { FormEvent, useState } from 'react';
import '../admin.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/admin/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');

      // Read the optional redirect only in the browser. This avoids
      // useSearchParams() during Next.js static generation on /admin/login.
      const requestedNext = new URLSearchParams(window.location.search).get('next');
      const next = requestedNext && requestedNext.startsWith('/admin')
        ? requestedNext
        : '/admin';

      window.location.assign(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
      setLoading(false);
    }
  }

  return (
    <main className="saffa-admin saffa-login-page">
      <div className="login-noise" />
      <section className="login-card">
        <div className="login-mark">SF</div>
        <span className="admin-kicker">Saffa Fashion · Private Area</span>
        <h1>Welcome back.</h1>
        <p className="login-copy">Sign in to manage products, pricing, visibility and your store settings.</p>
        <form onSubmit={submit} className="login-form">
          <label>
            Admin username
            <input
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Admin username"
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
            />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button className="admin-btn dark login-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in securely'}
          </button>
        </form>
        <div className="login-security"><span>●</span> Protected admin session · 8 hour expiry</div>
        <a href="/" className="login-back">← Return to storefront</a>
      </section>
    </main>
  );
}
