export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // สตางค์
  currency: 'thb' | 'usd';
  image: string;
  tags?: string[];
};

export const products: Product[] = [
  {
    id: 'extra-plus-original',
    name: 'EXTRA PLUS Original',
    description: 'สูตรดั้งเดิม บำรุงร่างกาย กระปรี้กระเปร่า',
    price: 4900,
    currency: 'thb',
    image: '/drinks/original.jpg',
    tags: ['energy','classic']
  },
  {
    id: 'extra-plus-berry',
    name: 'EXTRA PLUS Berry',
    description: 'ผสมเบอร์รี่ออแกนิค รสชาติสดชื่น',
    price: 5900,
    currency: 'thb',
    image: '/drinks/berry.jpg',
    tags: ['fruit','organic']
  },
  {
    id: 'extra-plus-herbal',
    name: 'EXTRA PLUS Herbal',
    description: 'สมุนไพรไทยแท้ ฟื้นฟูพลังงานยาวนาน',
    price: 5500,
    currency: 'thb',
    image: '/drinks/herbal.jpg',
    tags: ['herbal','healthy']
  }
];
