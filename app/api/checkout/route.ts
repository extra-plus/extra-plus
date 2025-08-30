import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const origin = new URL(req.url).origin;

    const line_items = items.map((i: { id: string; quantity: number }) => {
      const p = products.find(x => x.id === i.id);
      if (!p) throw new Error('Invalid product id: ' + i.id);
      return {
        quantity: i.quantity,
        price_data: {
          currency: p.currency,
          unit_amount: p.price,
          product_data: {
            name: p.name,
            description: p.description,
            images: p.image ? [origin + p.image] : [],
          },
        },
      } as Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] error', err);
    return NextResponse.json({ error: 'Checkout error' }, { status: 500 });
  }
}
