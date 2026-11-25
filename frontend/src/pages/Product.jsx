import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBook, getCategory, getPublisher } from '../data/books';
import { useCart } from '../context/CartContext';
import { money, deliveryLabel } from '../utils/format';
import { relatedTo } from '../utils/recommend';
import { Cover, Stars } from '../components/BookCard';
import BookGrid from '../components/BookGrid';
import Section from '../components/Section';

export default function Product() {
  const { id } = useParams();
  const book = getBook(id);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!book) {
    return (
      <div className="py-10 text-center">
        <p className="mb-4">Book not found.</p>
        <Link to="/catalogue" className="btn-primary">Back to catalogue</Link>
      </div>
    );
  }

  const add = () => {
    addItem(book.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <Cover book={book} className="h-80" />
        <div>
          <p className="text-sm text-indigo-600 dark:text-indigo-400">
            {getCategory(book.category)?.name} · {getPublisher(book.publisher)?.name}
          </p>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-slate-500">by {book.author}</p>
          <div className="mt-2"><Stars rating={book.rating} /></div>
          <p className="mt-4">{book.description}</p>
          <p className="mt-4 text-3xl font-bold">{money(book.price)}</p>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
            Tentative delivery by <strong>{deliveryLabel(book.deliveryDays)}</strong> ({book.deliveryDays} days)
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <label htmlFor="qty" className="sr-only">Quantity</label>
            <select id="qty" className="input !w-20" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
            </select>
            <button className="btn-secondary" onClick={add}>{added ? 'Added ✓' : 'Add to Cart'}</button>
            <button className="btn-primary" onClick={() => { addItem(book.id, qty); navigate('/cart'); }}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Section title="Related books">
          <BookGrid books={relatedTo(book)} />
        </Section>
      </div>
    </div>
  );
}
