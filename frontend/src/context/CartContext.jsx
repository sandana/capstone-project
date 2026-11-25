import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getBook } from '../data/books';
import { shippingFor } from '../utils/format';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // items: [{ bookId, qty }]
  const [items, setItems] = useLocalStorage('cart', []);

  const addItem = (bookId, qty = 1) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.bookId === bookId);
      if (existing) {
        return prev.map((i) => (i.bookId === bookId ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
      }
      return [...prev, { bookId, qty }];
    });

  const setQty = (bookId, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.bookId !== bookId)
        : prev.map((i) => (i.bookId === bookId ? { ...i, qty: Math.min(10, qty) } : i)),
    );

  const removeItem = (bookId) => setItems((prev) => prev.filter((i) => i.bookId !== bookId));
  const clear = () => setItems([]);

  const detailed = useMemo(
    () => items.map((i) => ({ ...i, book: getBook(i.bookId) })).filter((i) => i.book),
    [items],
  );
  const count = detailed.reduce((n, i) => n + i.qty, 0);
  const subtotal = detailed.reduce((s, i) => s + i.qty * i.book.price, 0);
  const shipping = shippingFor(subtotal);

  return (
    <CartContext.Provider
      value={{ items: detailed, count, subtotal, shipping, addItem, setQty, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
