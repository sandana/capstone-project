import { useOrders } from '../context/OrdersContext';
import OrderRow from '../components/OrderRow';

export default function Orders() {
  const { orders, points, cancelOrder } = useOrders();

  const onCancel = (id) => {
    if (window.confirm('Cancel this order? This cannot be undone.')) cancelOrder(id);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Your orders</h1>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">⭐ {points} gift points</span>
      </div>
      <div className="space-y-3">
        {orders.length ? orders.map((o) => <OrderRow key={o.id} order={o} onCancel={onCancel} />) : <p className="text-slate-500">No orders yet.</p>}
      </div>
    </div>
  );
}
