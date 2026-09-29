'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'customer' | 'waiter' | null;

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('thali') || '{}');
      if (saved.dark) setDark(saved.dark);
      if (saved.user) router.push('/');
    } catch {}
  }, [router]);

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
        </div>
      </header>

      {!role ? <RoleSelector setRole={setRole} dark={dark} router={router} /> : role === 'customer' ? <CustomerSignup dark={dark} router={router} /> : <WaiterSignup dark={dark} router={router} />}
    </main>
  );
}

function RoleSelector({ setRole, dark, router }: any) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ font: '600 32px var(--font-head)', margin: '0 0 8px', color: 'var(--text)' }}>
            Join Thali House
          </h1>
          <p style={{ color: 'var(--muted)', margin: '0' }}>Choose how you want to get involved</p>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Customer Role Card */}
          <button
            onClick={() => setRole('customer')}
            style={{
              background: 'var(--card)',
              border: '2px solid var(--border)',
              borderRadius: '16px',
              padding: '32px 24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
              (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.background = 'var(--card)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '40px' }}>🛵</div>
              <div>
                <h2 style={{ font: '600 20px var(--font-head)', margin: '0', color: 'var(--text)' }}>
                  I'm a Customer
                </h2>
                <p style={{ color: 'var(--muted)', font: '14px var(--font-body)', margin: '4px 0 0' }}>
                  Order delicious thalis
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '4px 12px', borderRadius: '20px', font: '11px var(--font-body)', fontWeight: '600' }}>Build your thali</span>
              <span style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '4px 12px', borderRadius: '20px', font: '11px var(--font-body)', fontWeight: '600' }}>Track orders</span>
              <span style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '4px 12px', borderRadius: '20px', font: '11px var(--font-body)', fontWeight: '600' }}>Get offers</span>
            </div>
          </button>

          {/* Waiter Role Card */}
          <button
            onClick={() => setRole('waiter')}
            style={{
              background: 'var(--card)',
              border: '2px solid var(--border)',
              borderRadius: '16px',
              padding: '32px 24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
              (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.background = 'var(--card)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '40px' }}>👨‍🍳</div>
              <div>
                <h2 style={{ font: '600 20px var(--font-head)', margin: '0', color: 'var(--text)' }}>
                  I'm a Waiter
                </h2>
                <p style={{ color: 'var(--muted)', font: '14px var(--font-body)', margin: '4px 0 0' }}>
                  Serve and manage orders
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '4px 12px', borderRadius: '20px', font: '11px var(--font-body)', fontWeight: '600' }}>Manage orders</span>
              <span style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '4px 12px', borderRadius: '20px', font: '11px var(--font-body)', fontWeight: '600' }}>Earn money</span>
              <span style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '4px 12px', borderRadius: '20px', font: '11px var(--font-body)', fontWeight: '600' }}>Grow skills</span>
            </div>
          </button>
        </div>

        <p style={{ textAlign: 'center', margin: '32px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: '800',
              cursor: 'pointer',
              font: 'inherit',
              fontSize: 'inherit',
            }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

function CustomerSignup({ dark, router }: any) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', address: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name.trim() || !formData.email.includes('@'))) {
      setError('Please enter valid name and email');
      return;
    }
    if (step === 2 && (!formData.phone.length || !formData.city.trim())) {
      setError('Please enter phone and city');
      return;
    }
    if (step === 3 && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address.trim()) {
      setError('Please enter your address');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      const user = { name: formData.name, email: formData.email, phone: formData.phone, city: formData.city, address: formData.address, role: 'customer' };
      try {
        const current = JSON.parse(localStorage.getItem('thali') || '{}');
        localStorage.setItem('thali', JSON.stringify({ ...current, user }));
      } catch {}
      router.push('/');
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ font: '600 28px var(--font-head)', margin: '0 0 8px', color: 'var(--text)' }}>
            Create your account
          </h1>
          <p style={{ color: 'var(--muted)', margin: '0', fontSize: '14px' }}>
            Step {step} of 4: {step === 1 ? 'Your info' : step === 2 ? 'Contact details' : step === 3 ? 'Security' : 'Address'}
          </p>
          <div style={{ display: 'flex', gap: '4px', marginTop: '16px', justifyContent: 'center' }}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={{ height: '4px', width: '60px', background: s <= step ? 'var(--primary)' : 'var(--border)', borderRadius: '2px', transition: 'all 0.2s' }} />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {step === 1 && (
            <>
              <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
            </>
          )}

          {step === 2 && (
            <>
              <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
            </>
          )}

          {step === 3 && (
            <>
              <input type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} minLength={6} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <p style={{ color: 'var(--muted)', fontSize: '12px', margin: '0' }}>Use at least 6 characters with a mix of letters and numbers</p>
            </>
          )}

          {step === 4 && (
            <>
              <input type="text" name="address" placeholder="Street address" value={formData.address} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <p style={{ color: 'var(--muted)', fontSize: '12px', margin: '0' }}>This helps us deliver your orders to the right location</p>
            </>
          )}

          {error && <p style={{ color: 'var(--primary)', margin: '0', fontSize: '13px' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1,
                  background: 'var(--border)',
                  color: 'var(--text)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px',
                  font: '600 13px var(--font-body)',
                  cursor: 'pointer',
                }}
              >
                BACK
              </button>
            )}
            <button
              type={step === 4 ? 'submit' : 'button'}
              onClick={() => step < 4 && handleNext()}
              disabled={loading}
              style={{
                flex: 1,
                background: 'var(--primary)',
                color: 'var(--on-primary)',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                font: '600 13px var(--font-body)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {step === 4 ? (loading ? 'CREATING...' : 'CREATE ACCOUNT') : 'NEXT'}
            </button>
          </div>

          <p style={{ textAlign: 'center', margin: '16px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/login')}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', font: 'inherit', fontSize: 'inherit' }}
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function WaiterSignup({ dark, router }: any) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    restaurantName: '',
    restaurantCity: '',
    availability: 'full-time',
    documentType: 'aadhar',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name.trim() || !formData.email.includes('@'))) {
      setError('Please enter valid name and email');
      return;
    }
    if (step === 2 && (!formData.phone.length || !formData.experience.trim())) {
      setError('Please enter phone and experience');
      return;
    }
    if (step === 3 && (!formData.restaurantName.trim() || !formData.restaurantCity.trim())) {
      setError('Please enter restaurant details');
      return;
    }
    if (step === 4 && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.documentType) {
      setError('Please select a document type');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      const user = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        restaurantName: formData.restaurantName,
        restaurantCity: formData.restaurantCity,
        availability: formData.availability,
        documentType: formData.documentType,
        role: 'waiter',
        joinedDate: new Date().toLocaleDateString(),
        status: 'active',
        totalOrders: 0,
        rating: 4.8,
      };
      try {
        const current = JSON.parse(localStorage.getItem('thali') || '{}');
        localStorage.setItem('thali', JSON.stringify({ ...current, user }));
      } catch {}
      router.push('/waiter-dashboard');
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ font: '600 28px var(--font-head)', margin: '0 0 8px', color: 'var(--text)' }}>
            Join as a Waiter
          </h1>
          <p style={{ color: 'var(--muted)', margin: '0', fontSize: '14px' }}>
            Step {step} of 5: {step === 1 ? 'Personal info' : step === 2 ? 'Experience' : step === 3 ? 'Restaurant' : step === 4 ? 'Security' : 'Verification'}
          </p>
          <div style={{ display: 'flex', gap: '4px', marginTop: '16px', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} style={{ height: '4px', width: '48px', background: s <= step ? 'var(--primary)' : 'var(--border)', borderRadius: '2px', transition: 'all 0.2s' }} />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {step === 1 && (
            <>
              <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
            </>
          )}

          {step === 2 && (
            <>
              <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <input type="text" name="experience" placeholder="Years of experience (e.g., 2, 5)" value={formData.experience} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
            </>
          )}

          {step === 3 && (
            <>
              <input type="text" name="restaurantName" placeholder="Restaurant/Shop name" value={formData.restaurantName} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <input type="text" name="restaurantCity" placeholder="Restaurant city" value={formData.restaurantCity} onChange={handleChange} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
            </>
          )}

          {step === 4 && (
            <>
              <input type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} minLength={6} style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} required />
              <p style={{ color: 'var(--muted)', fontSize: '12px', margin: '0' }}>Secure your account with a strong password</p>
            </>
          )}

          {step === 5 && (
            <>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', color: 'var(--muted)', font: '12px var(--font-body)', marginBottom: '8px' }}>Availability</label>
                <select name="availability" value={formData.availability} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="weekends">Weekends only</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: 'var(--muted)', font: '12px var(--font-body)', marginBottom: '8px' }}>Verification Document</label>
                <select name="documentType" value={formData.documentType} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pancard">PAN Card</option>
                  <option value="driving">Driving License</option>
                  <option value="passport">Passport</option>
                </select>
              </div>
            </>
          )}

          {error && <p style={{ color: 'var(--primary)', margin: '0', fontSize: '13px' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1,
                  background: 'var(--border)',
                  color: 'var(--text)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px',
                  font: '600 13px var(--font-body)',
                  cursor: 'pointer',
                }}
              >
                BACK
              </button>
            )}
            <button
              type={step === 5 ? 'submit' : 'button'}
              onClick={() => step < 5 && handleNext()}
              disabled={loading}
              style={{
                flex: 1,
                background: 'var(--primary)',
                color: 'var(--on-primary)',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                font: '600 13px var(--font-body)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {step === 5 ? (loading ? 'VERIFYING...' : 'COMPLETE SIGNUP') : 'NEXT'}
            </button>
          </div>

          <p style={{ textAlign: 'center', margin: '16px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/login')}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', font: 'inherit', fontSize: 'inherit' }}
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  background: 'var(--bg)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  padding: '14px',
  font: 'inherit',
  fontSize: '14px',
  outline: 'none' as const,
};

const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = 'var(--primary)';
};

const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = 'var(--border)';
};
