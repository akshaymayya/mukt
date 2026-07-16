import React from 'react';
import { Almarai, Instrument_Serif } from 'next/font/google';
import '../index.css';
import '../App.css';
import '../dashboard.css';
import '../views/FlowDashboard/flow-theme.css';
import { AuthProvider } from '../components/AuthContext';

const almarai = Almarai({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-almarai',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Mozara - Financial Flow Infrastructure',
  description: 'Mozara is a financial flow infrastructure platform designed for project-based businesses in India. Automate vendor payments, compliance, and cash flow.',
  metadataBase: new URL('https://mozaara.dpdns.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://mozaara.dpdns.org/',
    title: 'Mozara - Financial Flow Infrastructure',
    description: 'Automate vendor payments, compliance, and cash flow visibility for complex projects.',
    images: [
      {
        url: '/logo.png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${almarai.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/logo.png?v=3" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
