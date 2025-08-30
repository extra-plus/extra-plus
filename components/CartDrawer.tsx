'use client';
import { useCart } from './CartContext';
import { formatCurrency } from '@/lib/format';
import { useState } from 'react';

export default function CartDrawer() {
  const { itemsWithDetails, increment, decrement, remove, total, clear } = useCart();
  const [open, setOpen] = useState(false);
  const items = itemsWithDetails();

  const checkout = async () => {
    if (items.length === 0) return;
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(i => ({ id: i.id, quantity: i.quantity })) })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert('ไม่สามารถเช็คเอาท์ได้ กรุณาลองใหม่');
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="relative bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        🛒 ตะกร้า
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
          {items.reduce((a, b) => a + b.quantity, 0)}
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-green-800">ตะกร้าสินค้า</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {items.length === 0 && <p className="text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>}
              {items.map(({ id, quantity, product }) => (
                <div key={id} className="flex gap-4 items-center border-b pb-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(product.price)} x {quantity}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => decrement(id)} className="px-2 py-1 border rounded">−</button>
                      <span>{quantity}</span>
                      <button onClick={() => increment(id)} className="px-2 py-1 border rounded">+</button>
                      <button onClick={() => remove(id)} className="ml-3 text-red-600 text-sm">ลบ</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">ยอดรวม</span>
                <span className="text-lg font-semibold text-green-800">{formatCurrency(total)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={clear} className="flex-1 border rounded-lg py-2">ล้างตะกร้า</button>
                <button onClick={checkout} className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700">ไปชำระเงิน</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
