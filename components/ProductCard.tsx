'use client';
import { type Product } from '@/lib/products';
import { useCart } from './CartContext';
import { formatCurrency } from '@/lib/format';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold text-green-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-1 flex-1">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-green-700 font-bold">{formatCurrency(product.price)}</span>
        <button
          onClick={() => add(product.id, 1)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}
