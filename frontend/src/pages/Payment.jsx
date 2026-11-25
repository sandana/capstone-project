import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useCheckout } from '../context/CheckoutContext';
import { money, POINT_VALUE } from '../utils/format';
import CheckoutSteps from '../components/CheckoutSteps';

const methods = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'upi', label: 'UPI' },
  { id: 'cod', label: 'Cash on Delivery' },
];

export default function Payment() {
  const { items, subtotal, shipping, clear } = useCart();
  const { points, addresses, placeOrder } = useOrders();
  const { checkout, update, reset } = useCheckout();
  const navigate = useNavigate();
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [upi, setUpi] = useState('');
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  const [failure, setFailure] = useState('');

  const address = addresses.find((a) => a.id === checkout.addressId);
  if (!items.length) return <Navigate to="/cart" replace />;
  if (!address) return <Navigate to="/checkout/delivery" replace />;

  const gross = subtotal + shipping;
  const maxPoints = Math.min(points, Math.floor(gross / POINT_VALUE));
  const pointsUsed = Math.min(checkout.pointsToUse, maxPoints);
  const discount = pointsUsed * POINT_VALUE;
  const total = Math.max(0, gross - discount);
  const method = checkout.paymentMethod;

  const validate = () => {
    const e = {};
    if (method === 'card') {
      if (!/^\d{16}$/.test(card.number.replace(/\s/g, ''))) e.number = 'Enter a 16-digit card number';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) e.expiry = 'Use MM/YY';
      if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = 'Invalid CVV';
    }
    if (method === 'upi' && !/^[\w.-]+@[\w-]+$/.test(upi)) e.upi = 'Enter a valid UPI ID (e.g. name@bank)';
    return e;
  };

  const pay = async () => {
    const e = validate();
    setErrors(e);
    setFailure('');
    if (Object.keys(e).length) return;
    setPaying(true);
    // Simulated payment gateway call. A card ending in 0000 simulates a decline.
    await new Promise((r) => setTimeout(r, 1200));
    if (method === 'card' && card.number.replace(/\s/g, '').endsWith('0000')) {
      setPaying(false);
      setFailure('Payment was declined. Please try another card or payment method.');
      return;
    }
    const order = placeOrder({
      items: items.map((i) => ({ bookId: i.book.id, qty: i.qty, price: i.book.price })),
      total: Number(total.toFixed(2)),
      pointsUsed,
      paymentMethod: methods.find((m) => m.id === method).label,
      address: `${address.line}, ${address.city}`,
    });
    navigate(`/confirmation/${order.id}`, { replace: true });
    clear();
    reset();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <CheckoutSteps current={2} />
      <h1 className="mb-4 text-2xl font-bold">Payment</h1>

      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <section className="card p-4">
            <h2 className="mb-2 font-semibold">Payment method</h2>
            <div className="space-y-2">
              {methods.map((m) => (
                <label key={m.id} className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="method" checked={method === m.id} onChange={() => { update({ paymentMethod: m.id }); setErrors({}); }} />
                  {m.label}
                </label>
              ))}
            </div>

            {method === 'card' && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="number" className="label">Card number</label>
                  <input id="number" className="input" inputMode="numeric" placeholder="4111 1111 1111 1111" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                  {errors.number && <p className="field-error">{errors.number}</p>}
                </div>
                <div>
                  <label htmlFor="expiry" className="label">Expiry</label>
                  <input id="expiry" className="input" placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                  {errors.expiry && <p className="field-error">{errors.expiry}</p>}
                </div>
                <div>
                  <label htmlFor="cvv" className="label">CVV</label>
                  <input id="cvv" type="password" className="input" inputMode="numeric" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                  {errors.cvv && <p className="field-error">{errors.cvv}</p>}
                </div>
              </div>
            )}
            {method === 'upi' && (
              <div className="mt-4">
                <label htmlFor="upi" className="label">UPI ID</label>
                <input id="upi" className="input" placeholder="name@bank" value={upi} onChange={(e) => setUpi(e.target.value)} />
                {errors.upi && <p className="field-error">{errors.upi}</p>}
              </div>
            )}
            {method === 'cod' && <p className="mt-3 text-sm text-slate-500">Pay in cash when your order arrives.</p>}
          </section>

          <section className="card p-4">
            <h2 className="mb-1 font-semibold">Gift points</h2>
            <p className="mb-2 text-sm text-slate-500">
              You have <strong>{points}</strong> points (1 point = {money(POINT_VALUE)}).
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number" min="0" max={maxPoints} className="input !w-32" aria-label="Points to redeem"
                value={pointsUsed}
                onChange={(e) => update({ pointsToUse: Math.max(0, Math.min(maxPoints, Number(e.target.value) || 0)) })}
              />
              <button className="btn-secondary" onClick={() => update({ pointsToUse: maxPoints })}>Use max ({maxPoints})</button>
              <button className="btn-secondary" onClick={() => update({ pointsToUse: 0 })}>Clear</button>
            </div>
          </section>
        </div>

        <aside className="card h-fit space-y-2 p-4 text-sm">
          <h2 className="font-semibold">Summary</h2>
          <p className="text-slate-500">Ship to: {address.line}, {address.city}</p>
          <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></div>
          {discount > 0 && <div className="flex justify-between text-emerald-600"><span>Points ({pointsUsed})</span><span>−{money(discount)}</span></div>}
          <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold dark:border-slate-700"><span>Total</span><span>{money(total)}</span></div>
          {failure && <p role="alert" className="field-error">{failure}</p>}
          <button className="btn-primary w-full" onClick={pay} disabled={paying}>
            {paying ? 'Processing payment...' : `Pay ${money(total)}`}
          </button>
          <Link to="/checkout/delivery" className="btn-secondary w-full">Back</Link>
        </aside>
      </div>
    </div>
  );
}
