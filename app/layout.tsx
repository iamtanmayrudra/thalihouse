import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Thali House — Your Thali. Your Rules.', description: 'Build a meal exactly the way you like it.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
