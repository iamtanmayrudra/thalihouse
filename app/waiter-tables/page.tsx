'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  category: string;
  rating: string;
  description: string;
}

interface TableOrder {
  tableNumber: number;
  items: { id: string; name: string; quantity: number; price: number; emoji: string }[];
  total: number;
  status: 'available' | 'occupied' | 'pending-payment' | 'completed';
  startTime: string;
  assignedTime: number;
  elapsedTime: number;
  paymentQR?: string;
  orderType: 'offline';
}

const menuItems: MenuItem[] = [
  { id: 'rice', name: 'Jeera Rice', emoji: '🍚', price: 40, category: 'Rice', rating: '4.8', description: 'Fragrant basmati with cumin' },
  { id: 'dal', name: 'Dal Makhani', emoji: '🥣', price: 50, category: 'Dal', rating: '4.9', description: 'Slow-cooked, creamy black lentils' },
  { id: 'paneer', name: 'Paneer Tikka', emoji: '🧀', price: 70, category: 'Protein', rating: '4.8', description: 'Smoky cottage cheese & peppers' },
  { id: 'sabzi', name: 'Kadai Veg', emoji: '🥘', price: 45, category: 'Sabzi', rating: '4.7', description: 'Seasonal vegetables, bold spices' },
  { id: 'roti', name: 'Butter Roti', emoji: '🫓', price: 25, category: 'Rice', rating: '4.6', description: 'Tandoor-baked and brushed with butter' },
  { id: 'gulab', name: 'Gulab Jamun', emoji: '🍮', price: 35, category: 'Dessert', rating: '4.9', description: 'Warm cardamom syrup dumplings' },
  { id: 'biryani', name: 'Biryani', emoji: '🍛', price: 120, category: 'Rice', rating: '4.9', description: 'Fragrant rice with spices and meat' },
  { id: 'samosa', name: 'Samosa', emoji: '🥟', price: 20, category: 'Sabzi', rating: '4.5', description: 'Crispy pastry with filling' },
  { id: 'lassi', name: 'Lassi', emoji: '🥛', price: 30, category: 'Dessert', rating: '4.7', description: 'Yogurt-based refreshing drink' },
];

export default function WaiterTablesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dark, setDark] = useState(false);
  const [tables, setTables] = useState<Record<number, TableOrder>>({});
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState<{ id: string; name: string; quantity: number; price: number; emoji: string }[]>([]);
  const [assignedTime, setAssignedTime] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('thali') || '{}');
      if (saved.user && saved.user.role === 'waiter') {
        setUser(saved.user);
        if (typeof saved.dark === 'boolean') setDark(saved.dark);
        if (saved.waiterTables) setTables(saved.waiterTables);
        setLoading(false);
      } else {
        router.push('/register');
      }
    } catch {
      router.push('/register');
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTables(t => {
        const updated = { ...t };
        Object.keys(updated).forEach(tableNum => {
          const table = updated[parseInt(tableNum)];
          if (table.status === 'occupied') {
            table.elapsedTime = (new Date().getTime() - new Date(table.startTime).getTime()) / 60000;
          }
        });
        try {
          const current = JSON.parse(localStorage.getItem('thali') || '{}');
          localStorage.setItem('thali', JSON.stringify({ ...current, waiterTables: updated }));
        } catch {}
        return updated;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const selectTable = (tableNum: number) => {
    setSelectedTable(tableNum);
    setCartItems([]);
    if (!tables[tableNum]) {
      setTables(t => ({ ...t, [tableNum]: { tableNumber: tableNum, items: [], total: 0, status: 'occupied', startTime: new Date().toISOString(), assignedTime: 30, elapsedTime: 0, orderType: 'offline' } }));
    }
  };

  const addToCart = (item: MenuItem) => {
    setCartItems(c => {
      const existing = c.find(x => x.id === item.id);
      if (existing) {
        return c.map(x => (x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x));
      }
      return [...c, { id: item.id, name: item.name, quantity: 1, price: item.price, emoji: item.emoji }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems(c => {
      const item = c.find(x => x.id === id);
      if (!item) return c;
      const newQty = item.quantity + delta;
      if (newQty <= 0) return c.filter(x => x.id !== id);
      return c.map(x => (x.id === id ? { ...x, quantity: newQty } : x));
    });
  };

  const submitOrder = () => {
    if (!selectedTable || cartItems.length === 0) return;
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTables(t => {
      const updated = { ...t, [selectedTable]: { ...t[selectedTable], items: cartItems, total, status: 'occupied' as const, assignedTime } };
      try {
        const current = JSON.parse(localStorage.getItem('thali') || '{}');
        localStorage.setItem('thali', JSON.stringify({ ...current, waiterTables: updated }));
      } catch {}
      return updated;
    });
    setCartItems([]);
    setShowMenuModal(false);
  };

  const generatePaymentQR = (tableNum: number) => {
    const table = tables[tableNum];
    if (!table) return;
    const qrData = `Table:${tableNum}|Amount:${table.total}|Time:${new Date().toLocaleTimeString()}`;
    const qrCode = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Ctext x='50' y='100' font-size='20' fill='black'%3ETable ${tableNum}%3C/text%3E%3Ctext x='50' y='130' font-size='18' fill='green'%3E₹${table.total}%3C/text%3E%3C/svg%3E`;
    setTables(t => ({ ...t, [tableNum]: { ...t[tableNum], paymentQR: qrCode, status: 'pending-payment' } }));
  };

  const markTableAvailable = (tableNum: number) => {
    setTables(t => {
      const updated = { ...t, [tableNum]: { ...t[tableNum], status: 'available' as const, items: [], total: 0, paymentQR: undefined } };
      try {
        const current = JSON.parse(localStorage.getItem('thali') || '{}');
        localStorage.setItem('thali', JSON.stringify({ ...current, waiterTables: updated }));
      } catch {}
      return updated;
    });
    setSelectedTable(null);
  };

  if (loading || !user) return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)' }}>Loading...</div>;

  const statusColors = { available: '#1f8a5b', occupied: '#ff7a45', 'pending-payment': '#4a90e2', completed: '#1f8a5b' };
  const statusIcons = { available: '✓', occupied: '👥', 'pending-payment': '💳', completed: '✓' };
  const categories = ['All', 'Rice', 'Dal', 'Sabzi', 'Protein', 'Dessert'];
  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter(i => i.category === activeCategory);

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <header className="topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: 'clamp(10px, 3vw, 16px) clamp(12px, 4vw, 24px)' }}>
        <div className="brand" onClick={() => router.push('/')} style={{ cursor: 'pointer', flexShrink: 0 }}>
          <span className="brand-mark">✦</span>
          <span className="brand-text" style={{ display: 'inline' }}>THALI<span className="accent">HOUSE</span></span>
          <span className="brand-short" style={{ display: 'none' }}>TH</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)', flexGrow: 1, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
          <button className="theme-button" aria-label="Toggle theme" onClick={() => setDark(!dark)} style={{ fontSize: '16px' }}>
            {dark ? '☀' : '☾'}
          </button>
          <button
            className="icon-button"
            onClick={() => router.push('/waiter-dashboard')}
            title="Dashboard"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'var(--text)',
              padding: '8px',
              borderRadius: '6px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          >
            📊<span className="mobile-show-text"> Dashboard</span>
          </button>
          <button
            className="auth-signup"
            onClick={() => { try { localStorage.setItem('thali', JSON.stringify({ user: null })); } catch {} router.push('/'); }}
            style={{
              padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 18px)',
              fontSize: 'clamp(11px, 2vw, 13px)',
              whiteSpace: 'nowrap'
            }}
          >
            Log Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(16px, 4vw, 40px)' }}>
        <h1 style={{ font: 'clamp(22px, 6vw, 28px) 600 var(--font-head)', margin: '0 0 clamp(20px, 5vw, 32px)', color: 'var(--text)' }}>Table Management</h1>
        <div style={{ background: 'var(--tint-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px', color: 'var(--text)', fontSize: '13px', lineHeight: 1.5 }}>
          <b>Order source policy:</b> table and walk-in orders are recorded as <b>Offline</b>. Delivery-platform and customer-app orders are recorded as <b>Online</b> and are managed from the waiter dashboard.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(85px, 18vw, 140px), 1fr))', gap: 'clamp(8px, 3vw, 12px)', marginBottom: 'clamp(24px, 5vw, 40px)' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(tableNum => {
            const table = tables[tableNum];
            const status = table?.status || 'available';
            return (
              <div
                key={tableNum}
                onClick={() => selectTable(tableNum)}
                style={{
                  background: selectedTable === tableNum ? 'var(--primary)' : `linear-gradient(135deg, ${statusColors[status]}20, ${statusColors[status]}05)`,
                  border: selectedTable === tableNum ? `2px solid var(--primary)` : `2px solid ${statusColors[status]}`,
                  borderRadius: 'clamp(8px, 3vw, 12px)',
                  padding: 'clamp(10px, 3vw, 16px)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                  minHeight: 'clamp(75px, 15vw, 120px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 'clamp(4px, 1vw, 8px)',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                <p style={{ font: 'clamp(16px, 4vw, 20px) 600 var(--font-head)', margin: '0', color: selectedTable === tableNum ? 'var(--on-primary)' : 'var(--text)' }}>
                  {statusIcons[status]} T{tableNum}
                </p>
                <p style={{ color: selectedTable === tableNum ? 'rgba(255,255,255,0.8)' : 'var(--muted)', font: 'clamp(10px, 2.5vw, 12px) var(--font-body)', margin: '0', textTransform: 'capitalize' }}>
                  {status === 'pending-payment' ? 'Payment' : status}
                </p>
                {table && <p style={{ color: selectedTable === tableNum ? 'rgba(255,255,255,0.7)' : 'var(--muted)', font: 'clamp(9px, 2vw, 11px) var(--font-body)', margin: '0' }}>₹{table.total}</p>}
              </div>
            );
          })}
        </div>

        {selectedTable && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'clamp(12px, 3vw, 16px)', padding: 'clamp(16px, 4vw, 28px)', marginBottom: 'clamp(20px, 5vw, 32px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 20px)', marginBottom: 'clamp(16px, 4vw, 20px)' }}>
              <h2 style={{ font: 'clamp(18px, 5vw, 24px) 600 var(--font-head)', margin: '0', color: 'var(--text)' }}>Table {selectedTable}</h2>
              <button
                onClick={() => setShowMenuModal(true)}
                style={{
                  background: 'var(--primary)',
                  color: 'var(--on-primary)',
                  border: 'none',
                  borderRadius: 'clamp(8px, 2vw, 10px)',
                  padding: 'clamp(10px, 3vw, 12px) clamp(16px, 4vw, 24px)',
                  font: 'clamp(12px, 3vw, 13px) 600 var(--font-body)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                + ADD ITEMS
              </button>
            </div>

            {tables[selectedTable]?.items.length > 0 && (
              <div style={{ marginBottom: 'clamp(16px, 4vw, 20px)' }}>
                <div style={{ display: 'grid', gap: 'clamp(6px, 2vw, 8px)', marginBottom: 'clamp(12px, 3vw, 16px)' }}>
                  {tables[selectedTable].items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'clamp(10px, 2vw, 12px)', background: 'var(--bg)', borderRadius: 'clamp(6px, 2vw, 8px)', fontSize: 'clamp(12px, 3vw, 13px)' }}>
                      <span>{item.emoji} {item.name} x{item.quantity}</span>
                      <span style={{ font: 'clamp(12px, 3vw, 13px) 600 var(--font-body)', color: 'var(--primary)' }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'clamp(10px, 2vw, 12px)', display: 'flex', justifyContent: 'space-between', font: 'clamp(14px, 4vw, 16px) 600 var(--font-head)' }}>
                  <span>Total:</span>
                  <span style={{ color: 'var(--primary)' }}>₹{tables[selectedTable].total}</span>
                </div>
              </div>
            )}

            {tables[selectedTable]?.status === 'occupied' && tables[selectedTable]?.items.length > 0 && (
              <div style={{ background: 'var(--bg)', padding: 'clamp(12px, 3vw, 16px)', borderRadius: 'clamp(10px, 2vw, 12px)', marginBottom: 'clamp(12px, 3vw, 16px)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(12px, 3vw, 16px)', marginBottom: 'clamp(12px, 3vw, 16px)' }}>
                  <div>
                    <p style={{ color: 'var(--muted)', font: 'clamp(10px, 2.5vw, 12px) var(--font-body)', margin: '0 0 clamp(6px, 1.5vw, 8px)' }}>ASSIGNED TIME</p>
                    <p style={{ font: 'clamp(16px, 4vw, 18px) 600 var(--font-head)', margin: '0', color: 'var(--text)' }}>{tables[selectedTable].assignedTime} min</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--muted)', font: 'clamp(10px, 2.5vw, 12px) var(--font-body)', margin: '0 0 clamp(6px, 1.5vw, 8px)' }}>ELAPSED TIME</p>
                    <p style={{ font: 'clamp(16px, 4vw, 18px) 600 var(--font-head)', margin: '0', color: Math.round(tables[selectedTable].elapsedTime) > tables[selectedTable].assignedTime * 0.8 ? 'var(--primary)' : 'var(--text)' }}>
                      {Math.round(tables[selectedTable].elapsedTime)} min
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => generatePaymentQR(selectedTable)}
                  style={{
                    width: '100%',
                    background: 'var(--primary)',
                    color: 'var(--on-primary)',
                    border: 'none',
                    borderRadius: 'clamp(8px, 2vw, 10px)',
                    padding: 'clamp(12px, 3vw, 14px)',
                    font: 'clamp(12px, 3vw, 13px) 600 var(--font-body)',
                    cursor: 'pointer',
                    marginBottom: 'clamp(8px, 2vw, 8px)',
                  }}
                >
                  💳 GENERATE PAYMENT QR
                </button>
              </div>
            )}

            {tables[selectedTable]?.status === 'pending-payment' && tables[selectedTable]?.paymentQR && (
              <div style={{ background: 'var(--bg)', padding: 'clamp(16px, 3vw, 20px)', borderRadius: 'clamp(10px, 2vw, 12px)', textAlign: 'center', marginBottom: 'clamp(12px, 3vw, 16px)' }}>
                <p style={{ color: 'var(--muted)', font: 'clamp(10px, 2.5vw, 12px) var(--font-body)', margin: '0 0 clamp(12px, 3vw, 12px)' }}>SCAN TO PAY</p>
                <div style={{ background: 'white', padding: 'clamp(12px, 3vw, 16px)', borderRadius: 'clamp(6px, 2vw, 8px)', display: 'inline-block', marginBottom: 'clamp(12px, 3vw, 12px)' }}>
                  <img src={tables[selectedTable].paymentQR} alt="Payment QR" style={{ width: 'clamp(120px, 40vw, 160px)', height: 'clamp(120px, 40vw, 160px)' }} />
                </div>
                <p style={{ font: 'clamp(14px, 4vw, 16px) 600 var(--font-head)', margin: 'clamp(8px, 2vw, 8px) 0 clamp(12px, 3vw, 16px)', color: 'var(--text)' }}>₹{tables[selectedTable].total}</p>
                <button
                  onClick={() => markTableAvailable(selectedTable)}
                  style={{
                    width: '100%',
                    background: 'var(--green)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'clamp(8px, 2vw, 10px)',
                    padding: 'clamp(12px, 3vw, 12px)',
                    font: 'clamp(12px, 3vw, 13px) 600 var(--font-body)',
                    cursor: 'pointer',
                  }}
                >
                  ✓ MARK PAID & AVAILABLE
                </button>
              </div>
            )}
          </div>
        )}

        {showMenuModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 'clamp(8px, 3vw, 20px)' }}>
            <div style={{ background: 'var(--bg)', borderRadius: 'clamp(12px, 3vw, 16px)', width: '100%', maxWidth: 'clamp(320px, 95vw, 600px)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'var(--card)', padding: 'clamp(12px, 3vw, 20px)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'clamp(8px, 2vw, 12px)' }}>
                <div style={{ flex: 1, minWidth: 0 }}><h3 style={{ font: 'clamp(14px, 4vw, 18px) 600 var(--font-head)', margin: '0', color: 'var(--text)' }}>Add Items to Table {selectedTable}</h3><p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 'clamp(11px, 2.5vw, 12px)' }}>Order type: <b>Offline · Dine-in</b></p></div>
                <button
                  onClick={() => setShowMenuModal(false)}
                  style={{ background: 'none', border: 'none', font: 'clamp(18px, 5vw, 24px)', cursor: 'pointer', color: 'var(--text)', padding: '0', flexShrink: 0, marginTop: '-2px' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(12px, 3vw, 18px)' }}>
                <div style={{ display: 'flex', gap: 'clamp(6px, 2vw, 8px)', marginBottom: 'clamp(12px, 3vw, 16px)', overflowX: 'auto', paddingBottom: 'clamp(6px, 1.5vw, 8px)' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        background: activeCategory === cat ? 'var(--primary)' : 'var(--card)',
                        color: activeCategory === cat ? 'var(--on-primary)' : 'var(--text)',
                        border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: '20px',
                        padding: 'clamp(8px, 2vw, 8px) clamp(12px, 3vw, 16px)',
                        font: 'clamp(11px, 2.5vw, 12px) 600 var(--font-body)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gap: 'clamp(10px, 3vw, 12px)' }}>
                  {filteredItems.map(item => {
                    const cartItem = cartItems.find(c => c.id === item.id);
                    return (
                      <div key={item.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'clamp(8px, 2vw, 12px)', padding: 'clamp(10px, 2.5vw, 14px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', flexWrap: 'wrap' }}>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ font: 'clamp(12px, 3vw, 14px) 600 var(--font-body)', margin: '0 0 clamp(2px, 1vw, 4px)', color: 'var(--text)' }}>{item.emoji} {item.name}</p>
                          <p style={{ color: 'var(--muted)', font: 'clamp(11px, 2.5vw, 12px) var(--font-body)', margin: '0' }}>₹{item.price}</p>
                        </div>
                        {!cartItem ? (
                          <button
                            onClick={() => addToCart(item)}
                            style={{
                              background: 'var(--primary)',
                              color: 'var(--on-primary)',
                              border: 'none',
                              borderRadius: 'clamp(6px, 2vw, 8px)',
                              padding: 'clamp(8px, 2vw, 8px) clamp(10px, 2.5vw, 14px)',
                              font: 'clamp(11px, 2.5vw, 12px) 600 var(--font-body)',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            + ADD
                          </button>
                        ) : (
                          <div style={{ display: 'flex', gap: 'clamp(6px, 1.5vw, 8px)', alignItems: 'center' }}>
                            <button onClick={() => updateCartQty(item.id, -1)} style={{ background: 'var(--border)', border: 'none', borderRadius: 'clamp(4px, 1.5vw, 6px)', width: 'clamp(24px, 8vw, 28px)', height: 'clamp(24px, 8vw, 28px)', cursor: 'pointer', color: 'var(--text)', fontSize: 'clamp(14px, 3vw, 16px)' }}>−</button>
                            <span style={{ minWidth: 'clamp(20px, 5vw, 24px)', textAlign: 'center', font: 'clamp(12px, 3vw, 12px) 600 var(--font-body)' }}>{cartItem.quantity}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} style={{ background: 'var(--primary)', border: 'none', borderRadius: 'clamp(4px, 1.5vw, 6px)', width: 'clamp(24px, 8vw, 28px)', height: 'clamp(24px, 8vw, 28px)', cursor: 'pointer', color: 'var(--on-primary)', fontSize: 'clamp(14px, 3vw, 16px)' }}>+</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {cartItems.length > 0 && (
                <div style={{ background: 'var(--card)', padding: 'clamp(12px, 3vw, 18px)', borderTop: '1px solid var(--border)', display: 'flex', gap: 'clamp(8px, 2.5vw, 12px)', flexDirection: 'column' }}>
                  <button
                    onClick={() => { setCartItems([]); setShowMenuModal(false); }}
                    style={{
                      width: '100%',
                      background: 'var(--border)',
                      color: 'var(--text)',
                      border: 'none',
                      borderRadius: 'clamp(8px, 2vw, 10px)',
                      padding: 'clamp(12px, 3vw, 12px)',
                      font: 'clamp(12px, 3vw, 13px) 600 var(--font-body)',
                      cursor: 'pointer',
                    }}
                  >
                    CLEAR
                  </button>
                  <button
                    onClick={submitOrder}
                    style={{
                      width: '100%',
                      background: 'var(--primary)',
                      color: 'var(--on-primary)',
                      border: 'none',
                      borderRadius: 'clamp(8px, 2vw, 10px)',
                      padding: 'clamp(12px, 3vw, 12px)',
                      font: 'clamp(12px, 3vw, 13px) 600 var(--font-body)',
                      cursor: 'pointer',
                    }}
                  >
                    SUBMIT ORDER
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
