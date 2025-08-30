import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'EXTRA PLUS – เครื่องดื่มออแกนิค',
  description: 'Ecommerce เครื่องดื่มบำรุงร่างกายออแกนิค ด้วย Next.js + Stripe',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <CartProvider>
          <Header />
          {children}
          <footer id="contact" className="bg-green-800 text-white text-center py-8 mt-16">
            <p>📍 ที่อยู่: 123 ถนนสุขภาพ กรุงเทพฯ</p>
            <p>📞 โทร: 080-123-4567 | ✉️ email@example.com</p>
            <p className="mt-2">© {new Date().getFullYear()} EXTRA PLUS. All rights reserved.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
