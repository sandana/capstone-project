import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { books, categories } from '../data/books';
import { boughtBooks, recommendFor } from '../utils/recommend';
import BookGrid from '../components/BookGrid';
import Section from '../components/Section';
import OrderRow from '../components/OrderRow';

export default function Home() {
  const { user } = useAuth();
  const { orders, points } = useOrders();

  const recent = orders.slice(0, 3);
  const again = user ? boughtBooks(orders.filter((o) => o.status !== 'Cancelled')).slice(0, 4) : [];
  const recs = user ? recommendFor(orders) : [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
        <h1 className="text-3xl font-bold">{user ? `Welcome back, ${user.name}` : 'Discover your next great read'}</h1>
        <p className="mt-2 max-w-xl text-indigo-100">
          Browse thousands of titles across fiction, technology, business, science and history.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link to="/catalogue" className="btn bg-white text-indigo-700 hover:bg-indigo-50">Browse catalogue</Link>
          {user ? (
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm">⭐ {points} gift points</span>
          ) : (
            <Link to="/login" className="btn border border-white/60 text-white hover:bg-white/10">Login</Link>
          )}
        </div>
      </div>

      <Section title="Shop by category">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.id} to={`/catalogue?category=${c.id}`} className="btn-secondary">{c.name}</Link>
          ))}
        </div>
      </Section>

      {user && (
        <>
          <Section
            title="Order history"
            action={<Link to="/orders" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">View all</Link>}
          >
            <div className="space-y-3">
              {recent.length ? recent.map((o) => <OrderRow key={o.id} order={o} />) : <p className="text-slate-500">No orders yet.</p>}
            </div>
          </Section>

          {again.length > 0 && (
            <Section title="Buy Again" subtitle="Books from your previous orders">
              <BookGrid books={again} action="again" />
            </Section>
          )}
        </>
      )}

      <Section title={user ? 'Recommended for you' : 'Top rated'} subtitle={user ? 'Based on your order history' : undefined}>
        <BookGrid books={recs} />
      </Section>
    </div>
  );
}
