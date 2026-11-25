import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';
import { getBook } from '../data/books';
import { money, formatDate, canCancel, hoursLeftToCancel, CANCEL_WINDOW_HOURS } from '../utils/format';

export default function OrderDetail() {
  const { id } = useParams();
  const { getOrder, cancelOrder } = useOrders();
  const { addItem } = useCart();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="py-10 text-center">
        <p className="mb-4">Order not found.</p>
        <Link to="/orders" className="btn-primary">Back to orders</Link>
      </div>
    );
  }

  const cancellable = canCancel(order);

  const onCancel = () => {
    if (window.confirm('Cancel this order? This cannot be undone.')) cancelOrder(order.id);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/orders" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">← All orders</Link>
      <div className="card mt-3 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{order.id}</h1>
            <p className="text-sm text-slate-500">Placed {formatDate(order.placedAt)} · {order.status}</p>
          </div>
          {cancellable && <button className="btn-danger" onClick={onCancel}>Cancel order</button>}
        </div>

        <ul className="my-4 divide-y divide-slate-200 text-sm dark:divide-slate-700">
          {order.items.map((i) => (
            <li key={i.bookId} className="flex items-center justify-between py-2">
              <span>{getBook(i.bookId)?.title} × {i.qty}</span>
              <span className="flex items-center gap-3">
                {money(i.price * i.qty)}
                <button className="text-indigo-600 hover:underline dark:text-indigo-400" onClick={() => addItem(i.bookId)}>Buy again</button>
              </span>
            </li>
          ))}
          <li className="flex justify-between py-2 font-bold"><span>Total ({order.paymentMethod})</span><span>{money(order.total)}</span></li>
        </ul>

        <p className="text-sm text-slate-500">Deliver to: {order.address}</p>
        {order.pointsUsed > 0 && <p className="text-sm text-slate-500">Gift points redeemed: {order.pointsUsed}</p>}
        <p className="mt-3 text-sm">
          {order.status === 'Cancelled' && 'This order was cancelled.'}
          {order.status === 'Placed' && (cancellable
            ? `You can cancel for another ${hoursLeftToCancel(order)} hours.`
            : `The ${CANCEL_WINDOW_HOURS}-hour cancellation window has passed.`)}
          {order.status === 'Delivered' && `Cancellation is only available within ${CANCEL_WINDOW_HOURS} hours of ordering.`}
        </p>
      </div>
    </div>
  );
}
