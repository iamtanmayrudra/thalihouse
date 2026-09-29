'use client';

export default function Hero() {
  return (
    <section className="hero">
      <span className="blob blob-one" />
      <span className="blob blob-two" />
      <div className="hero-text">
        <p className="eyebrow">MADE FOR YOUR CRAVINGS</p>
        <h1>
          Your Thali.<br />
          <em>Your rules.</em>
        </h1>
        <p className="hero-copy">Pick your favourites and build a meal exactly the way you like it — fresh, fast and made to order.</p>
        <div className="hero-business-strip" aria-label="Thali House business highlights">
          <span><i>●</i> Accepting orders now</span>
          <span>📍 3 kitchens near you</span>
          <span>🛵 Delivery &amp; pickup</span>
        </div>
        <div className="hero-cta">
          <button className="primary" onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })}>
            BUILD MY THALI <span>→</span>
          </button>
          <button className="ghost" onClick={() => document.querySelector('.menu-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore menu
          </button>
        </div>
        <div className="hero-stats">
          <div>
            <b>4.8★</b>
            <span>Avg. rating</span>
          </div>
          <div>
            <b>30 min</b>
            <span>Delivery</span>
          </div>
          <div>
            <b>50+</b>
            <span>Combinations</span>
          </div>
        </div>
      </div>
      <div className="hero-art">
        <span className="hero-emoji">🍛</span>
        <span className="spark spark-one">✦</span>
        <span className="spark spark-two">✦</span>
        <span className="chip chip-one">🌶 Spice your way</span>
        <span className="chip chip-two">⚡ Ready in 30 min</span>
        <span className="chip chip-three">🌿 100% veg</span>
        <div className="hero-order-card">
          <span className="order-card-icon">📦</span>
          <span><b>1,200+ orders served</b><small>Fresh meals this month</small></span>
        </div>
      </div>
    </section>
  );
}
