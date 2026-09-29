'use client';

interface NewsletterProps {
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  setToast: (toast: string) => void;
}

export default function Newsletter({ newsletterEmail, setNewsletterEmail, setToast }: NewsletterProps) {
  const handleSubscribe = () => {
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setToast('🎉 Subscribed! Check your email for a welcome offer.');
      setNewsletterEmail('');
    } else {
      setToast('Please enter a valid email');
    }
  };

  return (
    <section className="section" id="newsletter" style={{ background: 'var(--surface)', borderRadius: '16px', textAlign: 'center', padding: '60px 24px' }}>
      <p className="eyebrow">STAY IN THE LOOP</p>
      <h2 style={{ marginBottom: '12px' }}>Get the latest offers & updates</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '15px', maxWidth: '500px', margin: '0 auto 32px' }}>
        Subscribe to our newsletter for exclusive deals, new menu items, and insider tips on building the perfect thali.
      </p>
      <div style={{ display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
          style={{
            flex: 1,
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
        <button className="primary" onClick={handleSubscribe} style={{ whiteSpace: 'nowrap' }}>
          SUBSCRIBE
        </button>
      </div>
    </section>
  );
}
