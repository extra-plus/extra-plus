'use client';
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { products, type Product } from '@/lib/products';

type CartItem = { id: string; quantity: number };

type CartState = { items: Record<string, number> };

type Action =
  | { type: 'ADD'; id: string; quantity?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: CartState;
  add: (id: string, quantity?: number) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  itemsWithDetails: () => (CartItem & { product: Product })[];
  count: number;
  total: number;
} | null>(null);

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD': {
      const q = action.quantity ?? 1;
      return { items: { ...state.items, [action.id]: (state.items[action.id] ?? 0) + q } };
    }
    case 'REMOVE': {
      const { [action.id]: _, ...rest } = state.items;
      return { items: rest };
    }
    case 'INCREMENT':
      return { items: { ...state.items, [action.id]: (state.items[action.id] ?? 0) + 1 } };
    case 'DECREMENT': {
      const current = state.items[action.id] ?? 0;
      if (current <= 1) {
        const { [action.id]: _, ...rest } = state.items;
        return { items: rest };
      }
      return { items: { ...state.items, [action.id]: current - 1 } };
    }
    case 'CLEAR':
      return { items: {} };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: {} });

  const value = useMemo(() => {
    const itemsWithDetails = () =>
      Object.entries(state.items).map(([id, quantity]) => ({
        id,
        quantity,
        product: products.find(p => p.id === id)!
      }));

    const count = Object.values(state.items).reduce((a, b) => a + b, 0);
    const total = itemsWithDetails().reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    return {
      state,
      add: (id: string, quantity = 1) => dispatch({ type: 'ADD', id, quantity }),
      remove: (id: string) => dispatch({ type: 'REMOVE', id }),
      increment: (id: string) => dispatch({ type: 'INCREMENT', id }),
      decrement: (id: string) => dispatch({ type: 'DECREMENT', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
      itemsWithDetails,
      count,
      total
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
