import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { money, deliveryLabel, FREE_SHIPPING_THRESHOLD } from '../utils/format';
import { Cover } from '../components/BookCard';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Cart() {
  const { items, subtotal, shipping, setQty, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-lg">Your cart is empty.</p>
        <Link to="/catalogue" className="btn-primary">Browse books</Link>
      </div>
    );
  }

  return (
    <div>
      <CheckoutSteps current={0} />
      <h1 className="mb-4 text-2xl font-bold">Shopping cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-3">
          {items.map(({ book, qty }) => (
            <li key={book.id} className="card flex gap-4 p-3">
              <Cover book={book} className="h-24 w-16 shrink-0 !p-1 text-xs" />
              <div className="flex flex-1 flex-col">
                <Link to={`/books/${book.id}`} className="font-semibold hover:text-indigo-600">{book.title}</Link>
                <p className="text-sm text-slate-500">{book.author}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Delivery by {deliveryLabel(book.deliveryDays)}</p>
                <div className="mt-auto flex items-center gap-2 pt-2">
                  <button className="btn-secondary !px-2 !py-1" onClick={() => setQty(book.id, qty - 1)} aria-label="Decrease quantity">−</button>
                  <span className="w-6 text-center">{qty}</span>
                  <button className="btn-secondary !px-2 !py-1" onClick={() => setQty(book.id, qty + 1)} aria-label="Increase quantity">+</button>
                  <button className="ml-3 text-sm text-red-600 hover:underline" onClick={() => removeItem(book.id)}>Remove</button>
                </div>
              </div>
              <p className="font-bold">{money(book.price * qty)}</p>
            </li>
          ))}
        </ul>

        <aside className="card h-fit space-y-2 p-4">
          <h2 className="font-semibold">Order summary</h2>
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></div>
          {shipping > 0 && <p className="text-xs text-slate-500">Free shipping over {money(FREE_SHIPPING_THRESHOLD)}</p>}
          <div className="flex justify-between border-t border-slate-200 pt-2 font-bold dark:border-slate-700">
            <span>Total</span><span>{money(subtotal + shipping)}</span>
          </div>
          <button
            className="btn-primary w-full"
            onClick={() => navigate(user ? '/checkout/delivery' : '/login', { state: { from: '/checkout/delivery' } })}
          >
            {user ? 'Proceed to delivery' : 'Login to checkout'}
          </button>
        </aside>
      </div>
    </div>
  );
}
