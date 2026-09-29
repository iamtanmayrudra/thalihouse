'use client';

interface BuilderProps {
  step: number;
  setStep: (step: number) => void;
  selected: string[];
  setSelected: (selected: string[]) => void;
  items: any[];
  steps: string[];
  user: any;
  addToCart: (ids: string[]) => void;
  total: number;
}

export default function Builder({ step, setStep, selected, setSelected, items, steps, user, addToCart, total }: BuilderProps) {
  const stepCats = [['Rice'], ['Dal'], ['Sabzi'], ['Protein'], ['Dessert']];
  const stepItems = items.filter((i) => stepCats[step].includes(i.category));
  const isLast = step === steps.length - 1;

  const toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  const scrollTo = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section" id="builder">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE FUN PART</p>
          <h2>Build your thali</h2>
        </div>
        <span className="step-count">
          {step + 1} <small>/ {steps.length}</small>
        </span>
      </div>
      <div className="progress">
        <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="builder-grid">
        <div className="builder-options">
          <p className="step-label">STEP {step + 1}</p>
          <h3>{steps[step]}</h3>
          <div className="choice-grid">
            {stepItems.map((item) => (
              <button
                key={item.id}
                className={selected.includes(item.id) ? 'choice selected' : 'choice'}
                onClick={() => toggle(item.id)}
              >
                <span className="choice-icon">{item.emoji}</span>
                <span>
                  <b>{item.name}</b>
                  <small>{item.description}</small>
                </span>
                <strong>₹{item.price}</strong>
                {selected.includes(item.id) && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className="builder-controls">
            <button className="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="primary small" onClick={() => (isLast ? scrollTo('.summary') : setStep(step + 1))}>
              {isLast ? 'REVIEW THALI' : 'NEXT STEP'} <span>→</span>
            </button>
          </div>
        </div>
        <aside className="summary">
          <div className="summary-top">
            <span>Your thali</span>
            <span className="live">● LIVE</span>
          </div>
          <div className="summary-items">
            {selected.length ? (
              selected.map((id) => {
                const item = items.find((i) => i.id === id)!;
                return (
                  <div className="summary-row" key={id}>
                    <span>
                      {item.emoji} {item.name}
                    </span>
                    <span>₹{item.price}</span>
                  </div>
                );
              })
            ) : (
              <p className="muted">Start choosing your favourites</p>
            )}
          </div>
          <div className="summary-total">
            <span>Subtotal</span>
            <strong>₹{total}</strong>
          </div>
          <button
            className="primary full"
            disabled={!selected.length}
            onClick={() => {
              if (!user) {
                window.location.href = '/login';
              } else {
                addToCart(selected);
              }
            }}
          >
            ADD TO CART <span>→</span>
          </button>
        </aside>
      </div>
    </section>
  );
}
