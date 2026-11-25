import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const OrdersContext = createContext(null);

const hoursAgo = (h) => new Date(Date.now() - h * 36e5).toISOString();

// Seeded history so Home / Buy Again / Recommendations work on first login.
const seedOrders = () => [
  {
    id: 'ORD-1001',
    placedAt: hoursAgo(24 * 40),
    status: 'Delivered',
    items: [
      { bookId: 'b3', qty: 1, price: 39.99 },
      { bookId: 'b4', qty: 1, price: 34.5 },
    ],
    total: 79.48,
    pointsUsed: 0,
    paymentMethod: 'Credit / Debit Card',
    address: '12 Park Lane, London',
  },
  {
    id: 'ORD-1002',
    placedAt: hoursAgo(24 * 12),
    status: 'Delivered',
    items: [{ bookId: 'b9', qty: 1, price: 29.99 }],
    total: 34.98,
    pointsUsed: 0,
    paymentMethod: 'UPI',
    address: '12 Park Lane, London',
  },
  {
    id: 'ORD-1003',
    placedAt: hoursAgo(10),
    status: 'Placed',
    items: [{ bookId: 'b6', qty: 2, price: 24.99 }],
    total: 49.98,
    pointsUsed: 0,
    paymentMethod: 'Cash on Delivery',
    address: '12 Park Lane, London',
  },
];

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('orders', seedOrders());
  const [points, setPoints] = useLocalStorage('giftPoints', 250);
  const [addresses, setAddresses] = useLocalStorage('addresses', [
    { id: 'a1', name: 'Alex Reader', line: '12 Park Lane', city: 'London', zip: 'W1K 7AA', phone: '07123456789' },
  ]);

  const addAddress = (addr) => {
    const created = { ...addr, id: `a${Date.now()}` };
    setAddresses((prev) => [...prev, created]);
    return created;
  };

  const placeOrder = (order) => {
    const id = `ORD-${1000 + orders.length + 1}`;
    const placed = { ...order, id, placedAt: new Date().toISOString(), status: 'Placed' };
    setOrders((prev) => [placed, ...prev]);
    // deduct redeemed points, earn 1 point per whole dollar paid
    setPoints((p) => p - order.pointsUsed + Math.floor(order.total));
    return placed;
  };

  const cancelOrder = (id) => {
    const target = orders.find((o) => o.id === id);
    if (!target) return;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'Cancelled' } : o)));
    // reverse points: refund redeemed, take back earned
    setPoints((p) => Math.max(0, p + target.pointsUsed - Math.floor(target.total)));
  };

  const getOrder = (id) => orders.find((o) => o.id === id);

  return (
    <OrdersContext.Provider
      value={{ orders, points, addresses, addAddress, placeOrder, cancelOrder, getOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
