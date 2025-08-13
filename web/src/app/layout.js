// app/layout.js
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../component/Navbar';

export const metadata = {
  title: 'Your E-commerce Site',
  description: 'Shop the best products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
