'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('thali') || '{}');
      if (saved.dark) setDark(saved.dark);
      if (saved.user) router.push('/');
    } catch {}
  }, [router]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (name && email && password.length >= 6) {
        const user = { name, email };
        try {
          const current = JSON.parse(localStorage.getItem('thali') || '{}');
          localStorage.setItem('thali', JSON.stringify({ ...current, user }));
        } catch {}
        router.push('/');
      } else {
        setError('Please fill in all fields. Password must be at least 6 characters.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <header className="topbar">
        <div className="brand" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <span className="brand-mark">✦</span>
          <span>THALI<span className="accent">HOUSE</span></span>
        </div>
        <div className="header-actions">
          <button className="theme-button" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
            {dark ? '☀' : '☾'}
          </button>
        </div>
      </header>

      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ font: '600 32px var(--font-head)', margin: '0 0 8px', color: 'var(--text)' }}>
              Create your account
            </h1>
            <p style={{ color: 'var(--muted)', margin: '0' }}>Join Thali House and start building your perfect meal</p>
          </div>

          <form
            onSubmit={handleSignup}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                background: 'var(--bg)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '14px',
                font: 'inherit',
                fontSize: '14px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: 'var(--bg)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '14px',
                font: 'inherit',
                fontSize: '14px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />

            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              style={{
                background: 'var(--bg)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '14px',
                font: 'inherit',
                fontSize: '14px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />

            {error && <p style={{ color: 'var(--primary)', margin: '0', fontSize: '13px' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--primary)',
                color: 'var(--on-primary)',
                border: 'none',
                borderRadius: '10px',
                padding: '16px',
                font: 'inherit',
                fontWeight: '800',
                fontSize: '13px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                marginTop: '8px',
                transition: 'background .2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) (e.target as HTMLElement).style.background = 'var(--primary-dark)';
              }}
              onMouseLeave={(e) => {
                if (!loading) (e.target as HTMLElement).style.background = 'var(--primary)';
              }}
            >
              {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
            </button>

            <p style={{ textAlign: 'center', margin: '16px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontWeight: '800',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                Log in
              </button>
            </p>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'var(--muted)' }}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </main>
  );
}
