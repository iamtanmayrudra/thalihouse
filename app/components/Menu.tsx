'use client';

interface MenuProps {
  active: string;
  setActive: (active: string) => void;
  items: any[];
  cart: Record<string, number>;
  favs: string[];
  addToCart: (ids: string[]) => void;
  toggleFav: (id: string) => void;
}

export default function Menu({ active, setActive, items, cart, favs, addToCart, toggleFav }: MenuProps) {
  const visible = active === 'All' ? items : items.filter((i) => i.category === active);

  const scrollTo = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section menu-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FRESH FROM THE KITCHEN</p>
          <h2>Explore the menu</h2>
        </div>
        <button className="text-button" onClick={() => { setActive('All'); scrollTo('.menu-grid'); }}>
          View all →
        </button>
      </div>
      <div className="categories">
        {['All', 'Rice', 'Dal', 'Sabzi', 'Protein', 'Dessert'].map((c) => (
          <button key={c} className={active === c ? 'active' : ''} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {visible.map((item) => (
          <article className="product-card" key={item.id}>
            <div className="product-image">
              {item.emoji}
              <button aria-label="Favourite" onClick={() => toggleFav(item.id)}>
                {favs.includes(item.id) ? '♥' : '♡'}
              </button>
            </div>
            <div className="product-info">
              <div className="rating">★ {item.rating}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="product-bottom">
                <b>₹{item.price}</b>
                <button onClick={() => addToCart([item.id])}>
                  {cart[item.id] ? `✓ ADDED (${cart[item.id]})` : '+ ADD'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
