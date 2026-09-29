'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface WaiterUser {
  name: string;
  email: string;
  phone: string;
  experience: string;
  restaurantName: string;
  restaurantCity: string;
  availability: string;
  documentType: string;
  role: 'waiter';
  joinedDate: string;
  status: string;
  totalOrders: number;
  rating: number;
}

interface OrderAssignment {
  id: number;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered';
  deliveryAddress: string;
  priority: 'normal' | 'urgent';
  time: string;
  estimatedDelivery: string;
  orderType: 'online' | 'offline';
}

export default function WaiterDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<WaiterUser | null>(null);
  const [orders, setOrders] = useState<OrderAssignment[]>([]);
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'earnings' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderAssignment | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('thali') || '{}');
      if (saved.user && saved.user.role === 'waiter') {
        setUser(saved.user);
        setOrders(saved.waiterOrders || generateDemoOrders());
        if (typeof saved.dark === 'boolean') setDark(saved.dark);
        setLoading(false);
      } else {
        router.push('/register');
      }
    } catch {
      router.push('/register');
    }
  }, [router]);

  const generateDemoOrders = (): OrderAssignment[] => [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      items: ['1x Jeera Rice', '1x Dal Makhani', '1x Paneer Tikka'],
      total: 160,
      status: 'pending',
      deliveryAddress: 'Sector 5, Downtown',
      priority: 'urgent',
      time: '14:30',
      estimatedDelivery: '14:45',
      orderType: 'online',
    },
    {
      id: 2,
      customerName: 'Priya Singh',
      items: ['1x Kadai Veg', '1x Butter Roti', '1x Gulab Jamun'],
      total: 105,
      status: 'accepted',
      deliveryAddress: 'Market Road, Central',
      priority: 'normal',
      time: '14:15',
      estimatedDelivery: '14:50',
      orderType: 'online',
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      items: ['1x Jeera Rice', '1x Dal Makhani'],
      total: 90,
      status: 'ready',
      deliveryAddress: 'Tech Park, North',
      priority: 'normal',
      time: '13:50',
      estimatedDelivery: '14:20',
      orderType: 'online',
    },
  ];

  const handleLogout = () => {
    try {
      const current = JSON.parse(localStorage.getItem('thali') || '{}');
      localStorage.setItem('thali', JSON.stringify({ ...current, user: null }));
    } catch {}
    router.push('/');
  };

  const updateOrderStatus = (orderId: number, newStatus: OrderAssignment['status']) => {
    setOrders(orders.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    try {
      const current = JSON.parse(localStorage.getItem('thali') || '{}');
      localStorage.setItem('thali', JSON.stringify({ ...current, waiterOrders: orders.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)) }));
    } catch {}
  };

  if (loading || !user) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)' }}>Loading...</div>;
  }

  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered').length;
  const earningsPerOrder = 50;
  const ratingBonus = user.rating >= 4.5 ? 10 : 0;
  const quickDeliveryBonus = 5;
  const todayEarnings = deliveredOrders.length * (earningsPerOrder + ratingBonus);
  const totalEarnings = (user.totalOrders + deliveredOrders.length) * earningsPerOrder;
  const statusColors = { pending: '#c47a10', accepted: '#4a90e2', preparing: '#ff7a45', ready: '#1f8a5b', delivered: '#1f8a5b' };
  const statusIcons = { pending: '⏳', accepted: '✓', preparing: '👨‍🍳', ready: '📦', delivered: '✓' };
  const statusLabels = { pending: 'Pending', accepted: 'Accepted', preparing: 'Preparing', ready: 'Ready', delivered: 'Delivered' };

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <header className="topbar">
        <div className="brand" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <span className="brand-mark">✦</span>
          <span>THALI<span className="accent">HOUSE</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ font: '600 13px var(--font-body)', color: 'var(--muted)' }}>👨‍🍳 Waiter Mode</span>
          <button className="theme-button" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
            {dark ? '☀' : '☾'}
          </button>
          <button className="auth-link" onClick={() => router.push('/waiter-tables')}>📋 Tables</button>
          <button className="auth-link" onClick={() => router.push('/')}>Home</button>
          <button className="auth-signup" onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Waiter Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', background: 'var(--card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', display: 'grid', placeItems: 'center', font: '600 32px var(--font-head)', flexShrink: 0 }}>
            {user.name[0]?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ font: '600 28px var(--font-head)', margin: '0 0 8px', color: 'var(--text)' }}>Welcome, {user.name}!</h1>
            <p style={{ color: 'var(--muted)', margin: '0', fontSize: '14px' }}>{user.restaurantName} • {user.restaurantCity}</p>
            <p style={{ color: 'var(--muted)', margin: '8px 0 0', fontSize: '13px' }}>{user.experience} years experience • Joined {user.joinedDate}</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
            <div style={{ background: 'var(--surface)', padding: '12px 16px', borderRadius: '10px' }}>
              <p style={{ color: 'var(--muted)', font: '11px var(--font-body)', margin: '0 0 4px', letterSpacing: '0.5px' }}>STATUS</p>
              <p style={{ font: '600 14px var(--font-body)', margin: '0', color: 'var(--green)' }}>🟢 {user.status}</p>
            </div>
            <div style={{ background: 'var(--surface)', padding: '12px 16px', borderRadius: '10px' }}>
              <p style={{ color: 'var(--muted)', font: '11px var(--font-body)', margin: '0 0 4px', letterSpacing: '0.5px' }}>RATING</p>
              <p style={{ font: '600 14px var(--font-body)', margin: '0', color: 'var(--primary)' }}>⭐ {user.rating}</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--tint-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', margin: '-20px 0 32px', color: 'var(--text)', fontSize: '13px', lineHeight: 1.5 }}>
          <b>Order source policy:</b> <b>Online</b> orders come from the customer app or delivery platforms and appear here for fulfilment. <b>Offline</b> dine-in and walk-in orders must be created through <b>Tables</b>.
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          <div style={{ background: activeOrdersCount > 0 ? 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,107,107,0.05))' : 'var(--card)', border: activeOrdersCount > 0 ? '1px solid rgba(255,107,107,0.3)' : '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>ACTIVE ORDERS</p>
            <p style={{ font: '600 36px var(--font-head)', margin: '0', color: activeOrdersCount > 0 ? '#ff6b6b' : 'var(--primary)' }}>{activeOrdersCount}</p>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>{activeOrdersCount > 0 ? 'Waiting to deliver' : 'No active orders'}</p>
          </div>

          <div style={{ background: todayEarnings > 0 ? 'linear-gradient(135deg, rgba(31,138,91,0.1), rgba(31,138,91,0.05))' : 'var(--card)', border: todayEarnings > 0 ? '1px solid rgba(31,138,91,0.3)' : '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>TODAY'S EARNINGS</p>
            <p style={{ font: '600 32px var(--font-head)', margin: '0', color: 'var(--green)' }}>₹{todayEarnings}</p>
            <p style={{ color: 'var(--green)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>{deliveredOrders.length} orders completed</p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>TOTAL DELIVERED</p>
            <p style={{ font: '600 36px var(--font-head)', margin: '0', color: 'var(--text)' }}>{user.totalOrders + deliveredOrders.length}</p>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>Lifetime deliveries</p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
            <p style={{ color: 'var(--muted)', font: '600 12px var(--font-body)', margin: '0 0 8px', letterSpacing: '1px' }}>NEXT PAYOUT</p>
            <p style={{ font: '600 32px var(--font-head)', margin: '0', color: 'var(--text)' }}>₹{totalEarnings}</p>
            <p style={{ color: 'var(--green)', font: '600 12px var(--font-body)', margin: '8px 0 0' }}>Due in 5 days</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', overflowX: 'auto' }}>
          {['overview', 'orders', 'earnings', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab ? 'var(--primary)' : 'var(--muted)',
                font: '600 14px var(--font-body)',
                cursor: 'pointer',
                paddingBottom: '8px',
                borderBottom: activeTab === tab ? '3px solid var(--primary)' : 'none',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ font: '600 24px var(--font-head)', margin: '0 0 20px', color: 'var(--text)' }}>Pending Orders</h2>
            {orders.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} style={{ background: 'var(--card)', border: '2px solid ' + (order.priority === 'urgent' ? '#ff6b6b' : 'var(--border)'), borderRadius: '14px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <p style={{ font: '600 16px var(--font-body)', margin: '0', color: 'var(--text)' }}>{order.customerName}</p>
                          <span style={{ background: order.orderType === 'online' ? '#e6f2ff' : 'var(--tint)', color: order.orderType === 'online' ? '#2371b8' : 'var(--primary)', padding: '2px 8px', borderRadius: '6px', font: '700 10px var(--font-body)' }}>{order.orderType.toUpperCase()}</span>
                          {order.priority === 'urgent' && <span style={{ background: '#ff6b6b', color: 'white', padding: '2px 8px', borderRadius: '6px', font: '600 11px var(--font-body)' }}>URGENT</span>}
                        </div>
                        <p style={{ color: 'var(--muted)', font: '13px var(--font-body)', margin: '0' }}>📍 {order.deliveryAddress}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: statusColors[order.status], fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>{statusIcons[order.status]} {statusLabels[order.status]}</div>
                        <p style={{ font: '600 20px var(--font-body)', margin: '0', color: 'var(--text)' }}>₹{order.total}</p>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '12px', background: 'var(--bg)', padding: '8px 12px', borderRadius: '8px' }}>
                      {order.items.map((item, i) => (
                        <p key={i} style={{ margin: '4px 0' }}>• {item}</p>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        <p style={{ margin: '0' }}>Ordered at: <strong>{order.time}</strong></p>
                        <p style={{ margin: '4px 0 0' }}>Est. delivery: <strong>{order.estimatedDelivery}</strong></p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'accepted')}
                            style={{
                              background: 'var(--primary)',
                              color: 'var(--on-primary)',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              font: '600 12px var(--font-body)',
                              cursor: 'pointer',
                            }}
                          >
                            ACCEPT
                          </button>
                        )}
                        {order.status === 'accepted' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            style={{
                              background: 'var(--primary)',
                              color: 'var(--on-primary)',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              font: '600 12px var(--font-body)',
                              cursor: 'pointer',
                            }}
                          >
                            START
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            style={{
                              background: 'var(--primary)',
                              color: 'var(--on-primary)',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              font: '600 12px var(--font-body)',
                              cursor: 'pointer',
                            }}
                          >
                            MARK READY
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            style={{
                              background: 'var(--green)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              font: '600 12px var(--font-body)',
                              cursor: 'pointer',
                            }}
                          >
                            MARK DELIVERED
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0' }}>No orders yet. Check back soon!</p>
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
                {orders.map(order => (
                  <div key={order.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <p style={{ font: '600 14px var(--font-body)', margin: '0', color: 'var(--text)' }}>Order #{order.id}</p>
                        <p style={{ color: 'var(--muted)', font: '12px var(--font-body)', margin: '4px 0 0' }}>{order.customerName} · {order.orderType.toUpperCase()}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: statusColors[order.status], fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>{statusIcons[order.status]} {statusLabels[order.status]}</div>
                        <p style={{ font: '600 16px var(--font-body)', margin: '0', color: 'var(--text)' }}>₹{order.total}</p>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                      {order.items.map((item, i) => (
                        <p key={i} style={{ margin: '4px 0' }}>• {item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0' }}>No orders yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ font: '600 24px var(--font-head)', margin: '0 0 20px', color: 'var(--text)' }}>Earnings</h2>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <p style={{ color: 'var(--muted)', font: '12px var(--font-body)', margin: '0 0 8px' }}>TODAY</p>
                  <p style={{ font: '600 28px var(--font-head)', margin: '0', color: 'var(--green)' }}>₹{todayEarnings}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--muted)', font: '12px var(--font-body)', margin: '0 0 8px' }}>LIFETIME TOTAL</p>
                  <p style={{ font: '600 28px var(--font-head)', margin: '0', color: 'var(--green)' }}>₹{totalEarnings}</p>
                </div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', fontSize: '13px', color: 'var(--muted)' }}>
                <p style={{ margin: '0' }}>Delivered: {deliveredOrders.length} orders today</p>
                <p style={{ margin: '4px 0 0' }}>Total delivered: {user.totalOrders + deliveredOrders.length} orders</p>
              </div>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
              <p style={{ font: '600 16px var(--font-body)', margin: '0 0 16px', color: 'var(--text)' }}>Payment Structure</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Per Order Delivery</span>
                  <span style={{ font: '600 14px var(--font-body)', color: 'var(--text)' }}>₹{earningsPerOrder}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: user.rating >= 4.5 ? 'rgba(31,138,91,0.1)' : 'var(--bg)', borderRadius: '8px', border: user.rating >= 4.5 ? '1px solid rgba(31,138,91,0.3)' : 'none' }}>
                  <div>
                    <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Rating Bonus (4.5+) {user.rating >= 4.5 && '✓'}</span>
                    <p style={{ color: 'var(--muted)', fontSize: '12px', margin: '4px 0 0' }}>Your rating: {user.rating}⭐</p>
                  </div>
                  <span style={{ font: '600 14px var(--font-body)', color: 'var(--green)' }}>+₹{ratingBonus}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Quick Delivery Bonus</span>
                  <span style={{ font: '600 14px var(--font-body)', color: 'var(--green)' }}>+₹{quickDeliveryBonus}</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '8px', padding: '12px', marginTop: '16px' }}>
                <p style={{ margin: '0', color: 'var(--text)', fontSize: '13px' }}>💡 <strong>Pro Tip:</strong> Maintain a 4.5+ rating to earn ₹{ratingBonus} extra per delivery!</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ font: '600 24px var(--font-head)', margin: '0 0 20px', color: 'var(--text)' }}>Settings</h2>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ font: '600 14px var(--font-body)', margin: '0 0 16px', color: 'var(--text)' }}>Personal Information</p>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <p style={{ color: 'var(--muted)', font: '11px var(--font-body)', margin: '0 0 4px', letterSpacing: '0.5px' }}>FULL NAME</p>
                  <p style={{ font: '14px var(--font-body)', margin: '0', color: 'var(--text)' }}>{user.name}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--muted)', font: '11px var(--font-body)', margin: '0 0 4px', letterSpacing: '0.5px' }}>EMAIL ADDRESS</p>
                  <p style={{ font: '14px var(--font-body)', margin: '0', color: 'var(--text)' }}>{user.email}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--muted)', font: '11px var(--font-body)', margin: '0 0 4px', letterSpacing: '0.5px' }}>RESTAURANT</p>
                  <p style={{ font: '14px var(--font-body)', margin: '0', color: 'var(--text)' }}>{user.restaurantName}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ font: '600 14px var(--font-body)', margin: '0 0 16px', color: 'var(--text)' }}>Availability</p>
              <p style={{ font: '14px var(--font-body)', margin: '0', color: 'var(--text)', textTransform: 'capitalize' }}>{user.availability}</p>
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
