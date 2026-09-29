'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  user: { name: string; email: string; role?: 'customer' | 'waiter' } | null;
  dark: boolean;
  setDark: (dark: boolean) => void;
  cartCount: number;
  orders: any[];
  favs: string[];
  openDropdown: null | 'cart' | 'profile';
  setOpenDropdown: (dropdown: null | 'cart' | 'profile') => void;
  setPanel: (panel: null | 'cart' | 'orders' | 'profile') => void;
  cart: Record<string, number>;
  cartTotal: number;
  find: (id: string) => any;
  setUser: (user: any) => void;
  setCart: (cart: Record<string, number>) => void;
  setToast: (toast: string) => void;
}

export default function Header({
  user,
  dark,
  setDark,
  cartCount,
  orders,
  favs,
  openDropdown,
  setOpenDropdown,
  setPanel,
  cart,
  cartTotal,
  find,
  setUser,
  setCart,
  setToast,
}: HeaderProps) {
  const router = useRouter();
  const cartIds = Object.keys(cart);

  return (
    <header className="topbar">
      <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
        <span className="brand-mark">✦</span>
        <span>THALI<span className="accent">HOUSE</span></span>
      </div>
      <div className="header-actions">
        <button className="theme-button" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
          {dark ? '☀' : '☾'}
        </button>
        {user && user.role !== 'waiter' && (
          <>
            <div className="dropdown-wrapper">
              <button className="cart" onClick={() => setOpenDropdown(openDropdown === 'cart' ? null : 'cart')}>
                Cart <b>{cartCount}</b> ▼
              </button>
              {openDropdown === 'cart' && (
                <div className="dropdown-menu cart-dropdown">
                  <div className="dropdown-item" style={{ padding: '12px', borderBottom: '1px solid var(--border)', fontWeight: '700' }}>
                    Items in cart: {cartCount}
                  </div>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {cartIds.length
                      ? cartIds.map((id) => (
                          <div key={id} className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{find(id).emoji} {find(id).name}</span>
                            <span style={{ fontWeight: '700' }}>₹{find(id).price * cart[id]}</span>
                          </div>
                        ))
                      : <div className="dropdown-item">No items</div>}
                  </div>
                  <div className="dropdown-item" style={{ borderTop: '1px solid var(--border)', fontWeight: '700', textAlign: 'right' }}>
                    Total: ₹{cartTotal}
                  </div>
                  <button className="dropdown-button" onClick={() => { setPanel('cart'); setOpenDropdown(null); }}>
                    View Cart
                  </button>
                </div>
              )}
            </div>
            <div className="dropdown-wrapper">
              <button className="auth-signup" onClick={() => setOpenDropdown(openDropdown === 'profile' ? null : 'profile')}>
                Hi, {user.name.split(' ')[0]} ▼
              </button>
              {openDropdown === 'profile' && (
                <div className="dropdown-menu profile-dropdown">
                  <div className="dropdown-item" style={{ textAlign: 'center', padding: '16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', display: 'grid', placeItems: 'center', font: '600 20px var(--font-head)', margin: '0 auto 8px' }}>
                      {user.name[0]?.toUpperCase()}
                    </div>
                    <b>{user.name}</b>
                    <small style={{ display: 'block', color: 'var(--muted)', fontSize: '12px', marginTop: '4px' }}>{user.email}</small>
                  </div>
                  <div className="dropdown-item">{orders.length} orders</div>
                  <div className="dropdown-item">{favs.length} favourites</div>
                  <button className="dropdown-button" onClick={() => { setPanel('orders'); setOpenDropdown(null); }}>
                    View Orders
                  </button>
                  <button className="dropdown-button" style={{ marginTop: '8px' }} onClick={() => router.push('/dashboard')}>
                    Profile Settings
                  </button>
                  <button className="dropdown-button" style={{ marginTop: '8px', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)' }} onClick={() => { setUser(null); setOpenDropdown(null); setCart({}); setToast('Logged out'); }}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <>
            <button className="auth-link" onClick={() => router.push('/login')}>
              Log in
            </button>
            <button className="auth-signup" onClick={() => router.push('/signup')}>
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
