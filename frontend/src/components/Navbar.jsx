import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/brands', label: 'Brands' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          📚 PageTurner
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
              {l.label}
            </Link>
          ))}
          <Link to="/orders" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
            Orders
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button className="btn-secondary !px-3" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link to="/cart" className="btn-secondary relative !px-3" aria-label="Shopping cart">
            🛒
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs text-white">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <button className="btn-secondary hidden md:inline-flex" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
          <button className="btn-secondary !px-3 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 px-4 py-2 dark:border-slate-700 md:hidden" aria-label="Mobile">
          {[...links, { to: '/orders', label: 'Orders' }].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded px-2 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              {l.label}
            </Link>
          ))}
          {user && (
            <button className="rounded px-2 py-2 text-left text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800" onClick={logout}>
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
