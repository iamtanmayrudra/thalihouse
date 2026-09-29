'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { mockCoupons, getEligibleCoupons, getRecommendedCoupon, calculateFinalPrice, calculateDiscount, getContextualSuggestions, type CartItem } from './lib/promotions';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import Builder from './components/Builder';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

type Item = { id: string; name: string; description: string; price: number; emoji: string; category: string; rating: string };
const items: Item[] = [
  { id: 'rice', name: 'Jeera Rice', description: 'Fragrant basmati with cumin', price: 40, emoji: '🍚', category: 'Rice', rating: '4.8' },
  { id: 'dal', name: 'Dal Makhani', description: 'Slow-cooked, creamy black lentils', price: 50, emoji: '🥣', category: 'Dal', rating: '4.9' },
  { id: 'paneer', name: 'Paneer Tikka', description: 'Smoky cottage cheese & peppers', price: 70, emoji: '🧀', category: 'Protein', rating: '4.8' },
  { id: 'sabzi', name: 'Kadai Veg', description: 'Seasonal vegetables, bold spices', price: 45, emoji: '🥘', category: 'Sabzi', rating: '4.7' },
  { id: 'roti', name: 'Butter Roti', description: 'Tandoor-baked and brushed with butter', price: 25, emoji: '🫓', category: 'Rice', rating: '4.6' },
  { id: 'gulab', name: 'Gulab Jamun', description: 'Warm cardamom syrup dumplings', price: 35, emoji: '🍮', category: 'Dessert', rating: '4.9' }
];
const steps = ['Pick a base', 'Choose your dal', 'Add a sabzi', 'Choose protein', 'Make it yours'];

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(['rice']);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<null | 'cart' | 'profile'>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favs, setFavs] = useState<string[]>([]);
  const [user, setUser] = useState<{ name: string; email: string; role?: 'customer' | 'waiter' } | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [panel, setPanel] = useState<null | 'cart' | 'orders' | 'profile'>(null);
  const [appliedCouponId, setAppliedCouponId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.topbar', { y: -40, opacity: 0, duration: .6 })
        .from('.hero .eyebrow, .hero h1, .hero-copy, .hero-cta, .hero-stats > div', { y: 36, opacity: 0, duration: .8, stagger: .1 }, '-=.3')
        .from('.hero-art', { scale: .7, opacity: 0, rotate: -12, duration: 1.1, ease: 'back.out(1.5)' }, '-=1')
        .from('.chip', { scale: 0, opacity: 0, duration: .5, stagger: .12, ease: 'back.out(2)' }, '-=.4');
      gsap.to('.hero-emoji', { y: -14, rotate: 4, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('.chip', { y: -8, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: { each: .4, from: 'random' } });
      gsap.to('.spark', { rotate: 360, duration: 8, ease: 'none', repeat: -1 });
      gsap.to('.blob', { x: 30, y: -20, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1.5 });
      gsap.from('.section-heading, .progress, .builder-grid', { scrollTrigger: { trigger: '#builder', start: 'top 80%' }, y: 40, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out' });
      gsap.from('.categories button', { scrollTrigger: { trigger: '.categories', start: 'top 90%' }, x: 20, opacity: 0, stagger: .06, duration: .5 });
      gsap.from('.review-card', { scrollTrigger: { trigger: '#reviews', start: 'top 85%' }, y: 30, opacity: 0, stagger: .1, duration: .6, ease: 'power2.out' });
      gsap.from('#newsletter > *', { scrollTrigger: { trigger: '#newsletter', start: 'top 85%' }, y: 30, opacity: 0, stagger: .15, duration: .6, ease: 'power2.out' });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo('.product-card', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .07, ease: 'power2.out', clearProps: 'transform,opacity' });
  }, [active]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('thali') || '{}');
      if (s.user?.role === 'waiter') {
        router.replace('/waiter-dashboard');
        return;
      }
      if (s.user) setUser(s.user);
      if (s.cart) setCart(s.cart);
      if (s.favs) setFavs(s.favs);
      if (s.orders) setOrders(s.orders);
      if (typeof s.dark === 'boolean') setDark(s.dark);
      if (s.appliedCouponId) setAppliedCouponId(s.appliedCouponId);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) try {
      const current = JSON.parse(localStorage.getItem('thali') || '{}');
      localStorage.setItem('thali', JSON.stringify({ ...current, user, cart, favs, orders, dark, appliedCouponId }));
    } catch {}
  }, [ready, user, cart, favs, orders, dark, appliedCouponId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const find = (id: string) => items.find(i => i.id === id)!;
  const cartIds = Object.keys(cart);
  const cartCount = cartIds.reduce((n, id) => n + cart[id], 0);
  const cartTotal = cartIds.reduce((n, id) => n + cart[id] * find(id).price, 0);
  const cartItemsData: CartItem[] = cartIds.map(id => {
    const item = find(id);
    return { id, name: item.name, price: item.price, quantity: cart[id], category: item.category, emoji: item.emoji };
  });

  const isFirstOrder = orders.length === 0;
  const eligibleCoupons = getEligibleCoupons(mockCoupons, cartTotal, cartItemsData, isFirstOrder);
  const recommendedCoupon = getRecommendedCoupon(eligibleCoupons, cartTotal);
  const appliedCoupon = appliedCouponId ? mockCoupons.find(c => c.id === appliedCouponId) : undefined;
  const { discount: appliedDiscount, finalTotal: subtotalAfterDiscount } = calculateFinalPrice(cartTotal, appliedCoupon, 0);
  const gstRate = 0.18;
  const gstAmount = Math.round(subtotalAfterDiscount * gstRate);
  const finalTotal = subtotalAfterDiscount + gstAmount;

  const addToCart = (ids: string[]) => {
    setCart(c => {
      const n = { ...c };
      ids.forEach(id => {
        n[id] = (n[id] ?? 0) + 1;
      });
      return n;
    });
    setToast(ids.length > 1 ? `${ids.length} items added to cart` : `${find(ids[0]).name} added to cart`);
  };

  const changeQty = (id: string, d: number) => setCart(c => {
    const n = { ...c };
    const q = (n[id] ?? 0) + d;
    if (q <= 0) delete n[id];
    else n[id] = q;
    return n;
  });

  const toggleFav = (id: string) => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const removeCoupon = () => setAppliedCouponId(null);

  const getEstimatedDelivery = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const checkout = () => {
    if (!user) {
      router.push('/login');
      setToast('Please log in to place your order');
      return;
    }
    setOrders(o => [{
      id: Date.now(),
      lines: cartIds.map(id => `${cart[id]} × ${find(id).name}`),
      total: finalTotal,
      date: new Date().toLocaleString(),
      discount: appliedDiscount,
      couponCode: appliedCoupon?.code,
      status: 'confirmed',
      estimatedDelivery: getEstimatedDelivery()
    }, ...o]);
    setCart({});
    setPanel('orders');
    setToast('Order placed! 🎉');
  };

  const scrollTo = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
  const total = useMemo(() => selected.reduce((sum, id) => sum + (items.find(i => i.id === id)?.price ?? 0), 0), [selected]);

  return (
    <main ref={root} className={dark ? 'app dark' : 'app'}>
      <Header
        user={user}
        dark={dark}
        setDark={setDark}
        cartCount={cartCount}
        orders={orders}
        favs={favs}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        setPanel={setPanel}
        cart={cart}
        cartTotal={cartTotal}
        find={find}
        setUser={setUser}
        setCart={setCart}
        setToast={setToast}
      />

      <Hero />

      <Builder
        step={step}
        setStep={setStep}
        selected={selected}
        setSelected={setSelected}
        items={items}
        steps={steps}
        user={user}
        addToCart={addToCart}
        total={total}
      />

      <Menu
        active={active}
        setActive={setActive}
        items={items}
        cart={cart}
        favs={favs}
        addToCart={addToCart}
        toggleFav={toggleFav}
      />

      <Reviews />

      <Newsletter
        newsletterEmail={newsletterEmail}
        setNewsletterEmail={setNewsletterEmail}
        setToast={setToast}
      />

      <Footer setPanel={setPanel} user={user} />

      {panel && (
        <div className="modal-backdrop drawer-backdrop" onClick={() => setPanel(null)}>
          <aside className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-head">
              <h3>{panel === 'cart' ? 'Your cart' : 'Your orders'}</h3>
              <button onClick={() => setPanel(null)} aria-label="Close">✕</button>
            </div>

            {panel === 'cart' && (
              cartIds.length ? (
                <>
                  <div className="drawer-body">
                    {cartIds.map(id => (
                      <div className="cart-row" key={id}>
                        <span className="cart-emoji">{find(id).emoji}</span>
                        <div>
                          <b>{find(id).name}</b>
                          <small>₹{find(id).price}</small>
                        </div>
                        <div className="qty">
                          <button onClick={() => changeQty(id, -1)}>−</button>
                          <span>{cart[id]}</span>
                          <button onClick={() => changeQty(id, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="drawer-foot">
                    <div className="summary-total"><span>Subtotal</span><strong>₹{cartTotal}</strong></div>
                    {appliedDiscount > 0 && <div className="summary-row" style={{ paddingTop: '4px' }}><span>Discount</span><span style={{ color: 'var(--green)' }}>-₹{Math.round(appliedDiscount)}</span></div>}
                    <div className="summary-row" style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px' }}><span>Subtotal after discount</span><span>₹{Math.round(subtotalAfterDiscount)}</span></div>
                    <div className="summary-row"><span>GST (18%)</span><span style={{ color: 'var(--primary)', fontWeight: '600' }}>+₹{gstAmount}</span></div>
                    <div className="summary-total"><span>Final Total</span><strong>₹{Math.round(finalTotal)}</strong></div>
                    {cartTotal >= 200 && (
                      <>
                        {recommendedCoupon && !appliedCoupon && (
                          <div className="coupon-suggestion">
                            <div className="coupon-header">🎉 SPECIAL OFFER</div>
                            <div className="coupon-card">
                              <div><b>{recommendedCoupon.code}</b><small>{recommendedCoupon.description}</small></div>
                              <div className="coupon-saving">Save ₹{Math.round(calculateDiscount(recommendedCoupon, cartTotal))}</div>
                              <button className="coupon-apply" onClick={() => { setAppliedCouponId(recommendedCoupon.id); setToast(`${recommendedCoupon.code} applied! 🎉`); }}>APPLY</button>
                            </div>
                            {eligibleCoupons.length > 1 && <button className="text-button" style={{ marginTop: '8px' }}>View {eligibleCoupons.length - 1} more →</button>}
                          </div>
                        )}
                        {appliedCoupon && (
                          <div className="coupon-applied">
                            <div>✓ {appliedCoupon.code} APPLIED<br /><small>You saved ₹{Math.round(appliedDiscount)}</small></div>
                            <button onClick={removeCoupon} style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                          </div>
                        )}
                      </>
                    )}
                    <button className="primary full" onClick={() => { if (!user) { setToast("Please log in to place order"); router.push("/login"); } else checkout(); }}>PLACE ORDER <span>→</span></button>
                    <button className="secondary full" onClick={() => setCart({})}>Clear cart</button>
                  </div>
                </>
              ) : (
                <div className="drawer-body">
                  <p className="muted">Your cart is empty. Add something tasty!</p>
                  <button className="primary" onClick={() => { setPanel(null); scrollTo('.menu-section'); }}>BROWSE MENU</button>
                </div>
              )
            )}

            {panel === 'orders' && (
              <div className="drawer-body">
                {orders.length ? (
                  orders.map(o => {
                    const statusColors = { pending: '#c47a10', confirmed: '#1f8a5b', preparing: '#ff7a45', on_way: '#4a90e2', delivered: '#1f8a5b' };
                    const statusLabels = { pending: '⏳ Pending', confirmed: '✓ Confirmed', preparing: '👨‍🍳 Preparing', on_way: '🚗 On the way', delivered: '✓ Delivered' };
                    const status = (Object.hasOwn(statusColors, o.status) ? o.status : 'pending') as keyof typeof statusColors;
                    return (
                      <div className="order" key={o.id} style={{ borderRadius: '12px', border: '1px solid var(--border)', padding: '16px', marginBottom: '12px', background: 'var(--surface)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div>
                            <b style={{ fontSize: '14px' }}>Order #{String(o.id).slice(-5)}</b>
                            <small style={{ display: 'block', color: 'var(--muted)', fontSize: '12px', marginTop: '2px' }}>{o.date}</small>
                          </div>
                          <span style={{ color: statusColors[status], fontWeight: '600', fontSize: '12px' }}>{statusLabels[status]}</span>
                        </div>
                        <div style={{ margin: '8px 0' }}>
                          {o.lines.map((l: string) => (
                            <p key={l} style={{ margin: '4px 0', fontSize: '13px', color: 'var(--text)' }}>{l}</p>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px' }}>
                          <div>
                            <strong style={{ fontSize: '16px' }}>₹{o.total}</strong>
                            {o.discount && <small style={{ display: 'block', color: 'var(--green)', fontSize: '11px' }}>Saved ₹{o.discount}</small>}
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px' }}>Est. Delivery</small>
                            <small style={{ display: 'block', color: 'var(--primary)', fontWeight: '600', fontSize: '12px' }}>{o.estimatedDelivery || 'Soon'}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="muted">No orders yet.</p>
                )}
              </div>
            )}
          </aside>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}

      <nav className="bottom-nav">
        <a className="active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⌂<span>Home</span></a>
        <a onClick={() => scrollTo('.menu-section')}>▦<span>Menu</span></a>
        <a className="build" onClick={() => scrollTo('#builder')}>＋<span>Build</span></a>
        <a onClick={() => user ? setPanel('orders') : router.push('/login')}>▣<span>Orders</span></a>
        <a onClick={() => user ? router.push('/dashboard') : router.push('/login')}>◎<span>Profile</span></a>
      </nav>
    </main>
  );
}
