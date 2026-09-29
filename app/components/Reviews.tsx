'use client';

const reviews = [
  {
    avatar: 'S',
    name: 'Sneha Patel',
    text: '"Best thali I\'ve had! The freshness is unmatched and the options are endless. Highly recommend!"',
  },
  {
    avatar: 'A',
    name: 'Arjun Kumar',
    text: '"Fast delivery, hot food, and exactly what I ordered. Will definitely order again!"',
  },
  {
    avatar: 'P',
    name: 'Priya Sharma',
    text: '"Finally, a place where I can customize exactly what I want in my thali. Love the builder!"',
  },
];

export default function Reviews() {
  return (
    <section className="section" id="reviews">
      <div className="section-heading">
        <p className="eyebrow">LOVED BY FOOD LOVERS</p>
        <h2>What our customers say</h2>
      </div>
      <div className="reviews-grid">
        {reviews.map((review, i) => (
          <article className="review-card" key={i}>
            <div className="review-rating">★★★★★</div>
            <p className="review-text">{review.text}</p>
            <div className="review-author">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', display: 'grid', placeItems: 'center', fontWeight: '600' }}>
                {review.avatar}
              </div>
              <div>
                <strong>{review.name}</strong>
                <small>Verified Buyer</small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
