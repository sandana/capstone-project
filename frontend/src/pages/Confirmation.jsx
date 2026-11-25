import { Link, Navigate, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { money, formatDate, CANCEL_WINDOW_HOURS } from '../utils/format';
import { getBook } from '../data/books';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Confirmation() {
  const { id } = useParams();
  const { getOrder } = useOrders();
  const order = getOrder(id);
  if (!order) return <Navigate to="/orders" replace />;

  return (
    <div className="mx-auto max-w-2xl">
      <CheckoutSteps current={3} />
      <div className="card p-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">✓</div>
        <h1 className="text-2xl font-bold">Payment successful</h1>
        <p className="text-slate-500">Thank you! Your order <strong>{order.id}</strong> has been placed on {formatDate(order.placedAt)}.</p>

        <ul className="my-5 divide-y divide-slate-200 text-left text-sm dark:divide-slate-700">
          {order.items.map((i) => (
            <li key={i.bookId} className="flex justify-between py-2">
              <span>{getBook(i.bookId)?.title} × {i.qty}</span>
              <span>{money(i.price * i.qty)}</span>
            </li>
          ))}
          {order.pointsUsed > 0 && <li className="flex justify-between py-2 text-emerald-600"><span>Gift points redeemed</span><span>{order.pointsUsed} pts</span></li>}
          <li className="flex justify-between py-2 font-bold"><span>Total paid ({order.paymentMethod})</span><span>{money(order.total)}</span></li>
        </ul>

        <p className="text-sm text-slate-500">Delivering to {order.address}. You can cancel within {CANCEL_WINDOW_HOURS} hours from your orders page.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link to={`/orders/${order.id}`} className="btn-secondary">View order</Link>
          <Link to="/catalogue" className="btn-primary">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}
