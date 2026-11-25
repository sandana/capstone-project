import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useCheckout } from '../context/CheckoutContext';
import CheckoutSteps from '../components/CheckoutSteps';

const empty = { name: '', line: '', city: '', zip: '', phone: '' };

export default function Delivery() {
  const { items } = useCart();
  const { addresses, addAddress } = useOrders();
  const { checkout, update } = useCheckout();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [adding, setAdding] = useState(addresses.length === 0);
  const [error, setError] = useState('');

  if (!items.length) return <Navigate to="/cart" replace />;

  const selected = checkout.addressId || addresses[0]?.id;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.line.trim()) e.line = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!/^[A-Za-z0-9 -]{4,10}$/.test(form.zip)) e.zip = 'Enter a valid postal code';
    if (!/^\d{10,11}$/.test(form.phone)) e.phone = 'Enter a 10–11 digit phone number';
    return e;
  };

  const save = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const created = addAddress(form);
    update({ addressId: created.id });
    setForm(empty);
    setAdding(false);
    setError('');
  };

  const next = () => {
    if (!selected) {
      setError('Please select or add a delivery address.');
      return;
    }
    update({ addressId: selected });
    navigate('/checkout/payment');
  };

  const field = (key, label, props = {}) => (
    <div>
      <label htmlFor={key} className="label">{label}</label>
      <input id={key} className="input" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} {...props} />
      {errors[key] && <p className="field-error">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <CheckoutSteps current={1} />
      <h1 className="mb-4 text-2xl font-bold">Delivery address</h1>

      <div className="space-y-3">
        {addresses.map((a) => (
          <label key={a.id} className={`card flex cursor-pointer gap-3 p-4 ${selected === a.id ? 'ring-2 ring-indigo-500' : ''}`}>
            <input type="radio" name="address" checked={selected === a.id} onChange={() => update({ addressId: a.id })} />
            <span>
              <strong>{a.name}</strong>
              <br />
              <span className="text-sm text-slate-500">{a.line}, {a.city}, {a.zip} · {a.phone}</span>
            </span>
          </label>
        ))}
      </div>

      {adding ? (
        <form onSubmit={save} noValidate className="card mt-4 grid gap-3 p-4 sm:grid-cols-2">
          {field('name', 'Full name')}
          {field('phone', 'Phone', { inputMode: 'numeric' })}
          <div className="sm:col-span-2">{field('line', 'Street address')}</div>
          {field('city', 'City')}
          {field('zip', 'Postal code')}
          <div className="flex gap-2 sm:col-span-2">
            <button className="btn-primary">Save address</button>
            {addresses.length > 0 && <button type="button" className="btn-secondary" onClick={() => setAdding(false)}>Cancel</button>}
          </div>
        </form>
      ) : (
        <button className="btn-secondary mt-4" onClick={() => setAdding(true)}>+ Add new address</button>
      )}

      {error && <p role="alert" className="field-error mt-3">{error}</p>}

      <div className="mt-6 flex justify-between">
        <Link to="/cart" className="btn-secondary">Back</Link>
        <button className="btn-primary" onClick={next}>Continue to payment</button>
      </div>
    </div>
  );
}
