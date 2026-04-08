// app/layout.js
import './globals.css';

import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../component/Toast';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Accelerate — Premium Streetwear & Footwear in Pakistan',
    template: '%s | Accelerate',
  },
  description:
    'Shop premium clothing and footwear from Accelerate. New arrivals, curated streetwear aesthetic, and worldwide reach from Pakistan.',
  keywords: [
    'Accelerate',
    'streetwear',
    'clothing',
    'footwear',
    'fashion',
    'Pakistan',
    'online shopping Pakistan',
    'Karachi',
    'Lahore',
    'Islamabad',
    'global shipping',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Accelerate',
    title: 'Accelerate — Premium Streetwear & Footwear in Pakistan',
    description:
      'Shop premium clothing and footwear from Accelerate. Curated streetwear aesthetic with Pakistan and global customers in mind.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accelerate — Premium Streetwear & Footwear in Pakistan',
    description:
      'Shop premium clothing and footwear from Accelerate. Curated streetwear aesthetic with Pakistan and global customers in mind.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
