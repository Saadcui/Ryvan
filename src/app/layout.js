// app/layout.js
import './globals.css';

import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Accelerate E-commerce Site',
  description: 'Shop the best products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
