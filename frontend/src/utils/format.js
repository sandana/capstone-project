export const POINT_VALUE = 0.1; // 1 gift point = $0.10
export const CANCEL_WINDOW_HOURS = 48;
export const SHIPPING_FEE = 4.99;
export const FREE_SHIPPING_THRESHOLD = 50;

export const money = (n) => `$${Number(n).toFixed(2)}`;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export const addDays = (days, from = new Date()) => {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
};

export const deliveryLabel = (days) =>
  addDays(days).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

export const hoursSince = (iso) => (Date.now() - new Date(iso).getTime()) / 36e5;

export const canCancel = (order) =>
  order.status === 'Placed' && hoursSince(order.placedAt) <= CANCEL_WINDOW_HOURS;

export const hoursLeftToCancel = (order) =>
  Math.max(0, Math.floor(CANCEL_WINDOW_HOURS - hoursSince(order.placedAt)));

export const shippingFor = (subtotal) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
