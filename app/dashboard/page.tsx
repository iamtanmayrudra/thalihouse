'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface User {
  name: string;
  email: string;
  role?: 'customer' | 'waiter';
}

interface Order {
  id: number;
  lines: string[];
  total: number;
  date: string;
  discount?: number;
  couponCode?: string;
  status?: 'pending' | 'confirmed' | 'preparing' | 'on_way' | 'delivered';
  estimatedDelivery?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('thali') || '{}');
      if (saved.user) {
        if (saved.user.role === 'waiter') {
          router.push('/waiter-dashboard');
          return;
        }
        setUser(saved.user);
        if (saved.orders) setOrders(saved.orders);
        if (saved.favs) setFavs(saved.favs);
        if (typeof saved.dark === 'boolean') setDark(saved.dark);
        setLoading(false);
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    try {
      const current = JSON.parse(localStorage.getItem('thali') || '{}');
      localStorage.setItem('thali', JSON.stringify({ ...current, user: null }));
    } catch {}
    router.push('/');
  };

  if (loading || !user) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)' }}>Loading...</div>;
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalSaved = orders.reduce((sum, order) => sum + (order.discount || 0), 0);

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
          <button className="auth-link" onClick={() => router.push('/')}>Back to Home</button>
          <button className="auth-signup" onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 24px' }}>
        {/* User Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', background: 'var(--card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', display: 'grid', placeItems: 'center', font: '600 32px var(--font-head)', flexShrink: 0 }}>
            {user.name[0]?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ font: '600 28px var(--font-head)', margin: '0 0 8px', color: 'var(--text)' }}>Welcome, {user.name}!</h1>
            <p style={{ color: 'var(--muted)', margin: '0', fontSize: '14px' }}>{user.email}</p>
            <p style={{ color: 'var(--muted)', margin: '8px 0 0', fontSize: '13px' }}>Member since {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>TOTAL ORDERS</p>
            <p style={{ font: '600 32px var(--font-head)', margin: '0', color: 'var(--text)' }}>{orders.length}</p>
            <p style={{ color: 'var(--green)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>Active Customer</p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>TOTAL SPENT</p>
            <p style={{ font: '600 32px var(--font-head)', margin: '0', color: 'var(--text)' }}>₹{totalSpent}</p>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>Lifetime value</p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>TOTAL SAVED</p>
            <p style={{ font: '600 32px var(--font-head)', margin: '0', color: 'var(--green)' }}>₹{totalSaved}</p>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>With coupons</p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>FAVOURITES</p>
            <p style={{ font: '600 32px var(--font-head)', margin: '0', color: 'var(--text)' }}>{favs.length}</p>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>Saved items</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'overview' ? 'var(--primary)' : 'var(--muted)',
              font: '600 14px var(--font-body)',
              cursor: 'pointer',
              paddingBottom: '8px',
              borderBottom: activeTab === 'overview' ? '3px solid var(--primary)' : 'none',
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'orders' ? 'var(--primary)' : 'var(--muted)',
              font: '600 14px var(--font-body)',
              cursor: 'pointer',
              paddingBottom: '8px',
              borderBottom: activeTab === 'orders' ? '3px solid var(--primary)' : 'none',
            }}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'settings' ? 'var(--primary)' : 'var(--muted)',
              font: '600 14px var(--font-body)',
              cursor: 'pointer',
              paddingBottom: '8px',
              borderBottom: activeTab === 'settings' ? '3px solid var(--primary)' : 'none',
            }}
          >
            Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ font: '600 24px var(--font-head)', margin: '0 0 20px', color: 'var(--text)' }}>Recent Orders</h2>
            {orders.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {orders.slice(0, 5).map(order => {
                  const statusColors = { pending: '#c47a10', confirmed: '#1f8a5b', preparing: '#ff7a45', on_way: '#4a90e2', delivered: '#1f8a5b' };
                  const statusIcons = { pending: '⏳', confirmed: '✓', preparing: '👨‍🍳', on_way: '🚗', delivered: '✓' };
                  const statusLabels = { pending: 'Pending', confirmed: 'Confirmed', preparing: 'Preparing', on_way: 'On the way', delivered: 'Delivered' };
                  const status = order.status || 'confirmed';
                  return (
                  <div key={order.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <p style={{ font: '600 14px var(--font-body)', margin: '0', color: 'var(--text)' }}>Order #{String(order.id).slice(-5)}</p>
                        <p style={{ color: 'var(--muted)', font: '12px var(--font-body)', margin: '4px 0 0' }}>{order.date}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: statusColors[status], fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>{statusIcons[status]} {statusLabels[status]}</div>
                        <p style={{ font: '600 16px var(--font-body)', margin: '0', color: 'var(--text)' }}>₹{order.total}</p>
                        {order.discount && <p style={{ color: 'var(--green)', font: '600 12px var(--font-body)', margin: '4px 0 0' }}>Saved ₹{order.discount}</p>}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                      {order.lines.slice(0, 2).map((line, i) => (
                        <p key={i} style={{ margin: '4px 0' }}>• {line}</p>
                      ))}
                      {order.lines.length > 2 && <p style={{ margin: '4px 0' }}>... and {order.lines.length - 2} more items</p>}
                    </div>
                    {order.estimatedDelivery && <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px', fontSize: '12px' }}>
                      <p style={{ margin: '0', color: 'var(--muted)' }}>Delivery by <strong style={{ color: 'var(--primary)' }}>{order.estimatedDelivery}</strong></p>
                    </div>}
                  </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0' }}>No orders yet. Start building your thali!</p>
                <button
                  onClick={() => router.push('/')}
                  style={{
                    marginTop: '16px',
                    background: 'var(--primary)',
                    color: 'var(--on-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    font: '600 12px var(--font-body)',
                    cursor: 'pointer',
                  }}
                >
                  PLACE AN ORDER
                </button>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ font: '600 24px var(--font-head)', margin: '0 0 20px', color: 'var(--text)' }}>All Orders</h2>
            {orders.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {orders.map(order => {
                  const statusColors = { pending: '#c47a10', confirmed: '#1f8a5b', preparing: '#ff7a45', on_way: '#4a90e2', delivered: '#1f8a5b' };
                  const statusIcons = { pending: '⏳', confirmed: '✓', preparing: '👨‍🍳', on_way: '🚗', delivered: '✓' };
                  const statusLabels = { pending: 'Pending', confirmed: 'Confirmed', preparing: 'Preparing', on_way: 'On the way', delivered: 'Delivered' };
                  const status = order.status || 'confirmed';
                  return (
                  <div key={order.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <p style={{ font: '600 14px var(--font-body)', margin: '0', color: 'var(--text)' }}>Order #{String(order.id).slice(-5)}</p>
                        <p style={{ color: 'var(--muted)', font: '12px var(--font-body)', margin: '4px 0 0' }}>{order.date}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: statusColors[status], fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>{statusIcons[status]} {statusLabels[status]}</div>
                        <p style={{ font: '600 16px var(--font-body)', margin: '0', color: 'var(--text)' }}>₹{order.total}</p>
                        {order.couponCode && <p style={{ color: 'var(--green)', font: '600 11px var(--font-body)', margin: '4px 0 0' }}>Code: {order.couponCode}</p>}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                      {order.lines.map((line, i) => (
                        <p key={i} style={{ margin: '4px 0' }}>• {line}</p>
                      ))}
                    </div>
                    {order.estimatedDelivery && <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px', fontSize: '12px' }}>
                      <p style={{ margin: '0', color: 'var(--muted)' }}>Delivery by <strong style={{ color: 'var(--primary)' }}>{order.estimatedDelivery}</strong></p>
                    </div>}
                  </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0' }}>You haven't placed any orders yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ font: '600 24px var(--font-head)', margin: '0 0 20px', color: 'var(--text)' }}>Account Settings</h2>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ font: '600 14px var(--font-body)', margin: '0 0 16px', color: 'var(--text)' }}>Account Information</p>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <p style={{ color: 'var(--muted)', font: '11px var(--font-body)', margin: '0 0 4px', letterSpacing: '0.5px' }}>FULL NAME</p>
                  <p style={{ font: '14px var(--font-body)', margin: '0', color: 'var(--text)' }}>{user.name}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--muted)', font: '11px var(--font-body)', margin: '0 0 4px', letterSpacing: '0.5px' }}>EMAIL ADDRESS</p>
                  <p style={{ font: '14px var(--font-body)', margin: '0', color: 'var(--text)' }}>{user.email}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ font: '600 14px var(--font-body)', margin: '0 0 16px', color: 'var(--text)' }}>Preferences</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ margin: '0', color: 'var(--text)', fontSize: '14px' }}>Dark Mode</p>
                <button
                  onClick={() => setDark(!dark)}
                  style={{
                    background: dark ? 'var(--primary)' : 'var(--border)',
                    border: 'none',
                    borderRadius: '20px',
                    width: '48px',
                    height: '28px',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', width: '24px', height: '24px', background: 'white', borderRadius: '50%', top: '2px', left: dark ? '22px' : '2px', transition: 'left 0.2s' }} />
                </button>
              </div>
            </div>

            <div style={{ background: '#fee5e5', border: '1px solid #f5c2c2', borderRadius: '12px', padding: '20px' }}>
              <p style={{ font: '600 14px var(--font-body)', margin: '0 0 12px', color: '#c81e1e' }}>Danger Zone</p>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '2px solid #c81e1e',
                  color: '#c81e1e',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  font: '600 12px var(--font-body)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                LOG OUT FROM ALL DEVICES
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
