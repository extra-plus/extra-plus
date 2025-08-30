import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-primary.soft to-green-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">พลังงานธรรมชาติในทุกขวด</h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">EXTRA PLUS เครื่องดื่มออแกนิค 100% ช่วยบำรุงร่างกาย สดชื่นตลอดวัน</p>
        <a href="#products" className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700">สั่งซื้อเลย</a>
      </section>

      {/* Products */}
      <section id="products" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">ทำไมต้อง EXTRA PLUS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-5xl">🌱</div>
              <h3 className="font-bold text-lg mt-2">ออแกนิคแท้ 100%</h3>
              <p className="text-gray-600">ปลูกแบบธรรมชาติ ปลอดสารเคมี</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-5xl">💧</div>
              <h3 className="font-bold text-lg mt-2">ไม่มีน้ำตาล</h3>
              <p className="text-gray-600">ดีต่อสุขภาพ คุมน้ำหนักง่าย</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-5xl">⚡</div>
              <h3 className="font-bold text-lg mt-2">พลังงานยาวนาน</h3>
              <p className="text-gray-600">พร้อมลุยงานทั้งวัน</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
