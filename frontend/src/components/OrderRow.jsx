import { Link } from 'react-router-dom';
import { money, formatDate, canCancel, hoursLeftToCancel } from '../utils/format';

const badge = {
  Placed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
};

export default function OrderRow({ order, onCancel }) {
  return (
    <div className="card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link to={`/orders/${order.id}`} className="font-semibold hover:text-indigo-600 dark:hover:text-indigo-400">
          {order.id}
        </Link>
        <p className="text-sm text-slate-500">
          {formatDate(order.placedAt)} · {order.items.length} item(s) · {money(order.total)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[order.status]}`}>{order.status}</span>
        {onCancel && canCancel(order) && (
          <button className="btn-danger" onClick={() => onCancel(order.id)} title={`${hoursLeftToCancel(order)}h left to cancel`}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
