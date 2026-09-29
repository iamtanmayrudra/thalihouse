'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState<'customer' | 'waiter'>('customer');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('thali') || '{}');
      if (saved.dark) setDark(saved.dark);
      if (saved.user) router.push(saved.user.role === 'waiter' ? '/waiter-dashboard' : '/');
    } catch {}
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password.length >= 6) {
        let current: Record<string, any> = {};
        try { current = JSON.parse(localStorage.getItem('thali') || '{}'); } catch {}
        const existingWaiter = current.waiterProfile && current.waiterProfile.email === email ? current.waiterProfile : null;
        const user = role === 'waiter'
          ? existingWaiter || {
              name: email.split('@')[0], email, role: 'waiter', phone: '', experience: '0',
              restaurantName: 'Thali House', restaurantCity: 'Main Branch', availability: 'Available',
              documentType: '', joinedDate: new Date().toLocaleDateString(), status: 'Available', totalOrders: 0, rating: 5,
            }
          : { name: email.split('@')[0], email, role: 'customer' };
        try {
          localStorage.setItem('thali', JSON.stringify({ ...current, user, ...(role === 'waiter' ? { waiterProfile: user } : {}) }));
        } catch {}
        router.push(role === 'waiter' ? '/waiter-dashboard' : '/');
      } else {
        setError('Invalid email or password');
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
              Welcome back
            </h1>
            <p style={{ color: 'var(--muted)', margin: '0' }}>Log in to your Thali House account</p>
          </div>

          <form
            onSubmit={handleLogin}
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
            <div role="group" aria-label="Account type" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'var(--bg)', padding: '5px', borderRadius: '10px' }}>
              {(['customer', 'waiter'] as const).map((option) => (
                <button key={option} type="button" onClick={() => setRole(option)} style={{ border: 'none', borderRadius: '7px', padding: '10px', background: role === option ? 'var(--primary)' : 'transparent', color: role === option ? 'var(--on-primary)' : 'var(--muted)', font: '700 12px var(--font-body)', cursor: 'pointer' }}>
                  {option === 'customer' ? 'Customer' : 'Waiter'}
                </button>
              ))}
            </div>
            {role === 'waiter' && <p style={{ margin: '0', color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>Waiter accounts open the operations dashboard. Customer cart and checkout features are not available in this mode.</p>}
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
              placeholder="Password"
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
              {loading ? 'LOGGING IN...' : 'LOG IN'}
            </button>

            <p style={{ textAlign: 'center', margin: '16px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/register')}
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
                Sign up
              </button>
            </p>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'var(--muted)' }}>
            Demo: Use any email and password (min 6 chars)
          </p>
        </div>
      </div>
    </main>
  );
}
