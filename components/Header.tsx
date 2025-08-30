'use client';
import CartDrawer from './CartDrawer';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-sm sticky top-0 bg-white/90 backdrop-blur z-40">
      <a href="/" className="text-2xl font-extrabold text-green-700">EXTRA PLUS</a>
      <nav className="hidden md:flex gap-6 text-gray-700">
        <a href="#products" className="hover:text-green-700">สินค้า</a>
        <a href="#benefits" className="hover:text-green-700">จุดเด่น</a>
        <a href="#contact" className="hover:text-green-700">ติดต่อเรา</a>
      </nav>
      <CartDrawer />
    </header>
  );
}
