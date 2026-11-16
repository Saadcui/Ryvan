// app/layout.js
import './globals.css';
import logo from '../assets/logo.png';

import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../component/Toast';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Ryvan — Premium Streetwear & Footwear in Pakistan',
    template: '%s | Ryvan',
  },
  description:
    'Shop premium clothing, streetwear, and footwear from Ryvan. Discover curated fashion online in Pakistan with delivery worldwide.',
  keywords: [
    'Ryvan',
    'streetwear',
    'clothing',
    'footwear',
    'fashion',
    'Pakistan',
    'online shopping Pakistan',
    'online clothing store Pakistan',
    'menswear Pakistan',
    'womenswear Pakistan',
    'unisex streetwear',
    'Karachi',
    'Lahore',
    'Islamabad',
    'global shipping',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: logo.src,
    shortcut: logo.src,
  },
  openGraph: {
    type: 'website',
    siteName: 'Ryvan',
    title: 'Ryvan — Premium Streetwear & Footwear in Pakistan',
    description:
      'Shop premium clothing, streetwear, and footwear from Ryvan. Curated fashion styles for customers in Pakistan and worldwide.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryvan — Premium Streetwear & Footwear in Pakistan',
    description:
      'Shop premium clothing, streetwear, and footwear from Ryvan. Curated fashion styles for customers in Pakistan and worldwide.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
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
