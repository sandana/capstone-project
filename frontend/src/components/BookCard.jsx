import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money, deliveryLabel } from '../utils/format';
import { getPublisher } from '../data/books';

export function Cover({ book, className = 'h-48' }) {
  return (
    <div className={`flex items-end rounded-lg bg-gradient-to-br p-3 ${book.color} ${className}`}>
      <span className="text-sm font-bold leading-tight text-white drop-shadow">{book.title}</span>
    </div>
  );
}

export function Stars({ rating }) {
  return (
    <span className="text-xs text-amber-500" aria-label={`Rated ${rating} out of 5`}>
      ★ {rating.toFixed(1)}
    </span>
  );
}

export default function BookCard({ book, action = 'cart' }) {
  const { addItem } = useCart();

  return (
    <article className="card flex flex-col p-3 transition hover:shadow-md">
      <Link to={`/books/${book.id}`}>
        <Cover book={book} />
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <Link to={`/books/${book.id}`} className="font-semibold leading-tight hover:text-indigo-600 dark:hover:text-indigo-400">
          {book.title}
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
        <p className="text-xs text-slate-400">{getPublisher(book.publisher)?.name}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-bold">{money(book.price)}</span>
          <Stars rating={book.rating} />
        </div>
        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
          Delivery by {deliveryLabel(book.deliveryDays)}
        </p>
        <button className="btn-primary mt-3" onClick={() => addItem(book.id)}>
          {action === 'again' ? 'Buy Again' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
