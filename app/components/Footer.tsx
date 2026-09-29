'use client';

import { useRouter } from 'next/navigation';

interface FooterProps {
  setPanel: (panel: null | 'cart' | 'orders' | 'profile') => void;
  user: any;
}

export default function Footer({ setPanel, user }: FooterProps) {
  const router = useRouter();

  const scrollTo = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-mark">✦</span>
            <span>
              THALI<span className="accent">HOUSE</span>
            </span>
          </div>
          <p>Build a meal exactly the way you like it — fresh, fast and made to order.</p>
          <div className="socials">
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="Facebook">
              FB
            </a>
            <a href="#" aria-label="X">
              X
            </a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <a onClick={() => scrollTo('#builder')}>Build a thali</a>
          <a onClick={() => scrollTo('.menu-section')}>Menu</a>
          <a onClick={() => (user ? setPanel('orders') : router.push('/login'))}>Orders</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
        <div>
          <h4>Get in touch</h4>
          <a href="mailto:hello@thalihouse.com">hello@thalihouse.com</a>
          <a href="tel:+911234567890">+91 12345 67890</a>
          <span>Open daily, 10am – 11pm</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Thali House. All rights reserved.</span>
        <span>
          <a href="#">Privacy</a> · <a href="#">Terms</a>
        </span>
      </div>
    </footer>
  );
}
