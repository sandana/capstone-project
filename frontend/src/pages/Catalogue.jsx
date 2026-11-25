import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books, categories, publishers } from '../data/books';
import BookGrid from '../components/BookGrid';

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'all';
  const publisher = params.get('publisher') || 'all';
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = books.filter(
      (b) =>
        (category === 'all' || b.category === category) &&
        (publisher === 'all' || b.publisher === publisher) &&
        (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)),
    );
    const sorters = {
      popular: (a, b) => b.rating - a.rating,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      fast: (a, b) => a.deliveryDays - b.deliveryDays,
    };
    return [...list].sort(sorters[sort]);
  }, [category, publisher, query, sort]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Catalogue</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {[{ id: 'all', name: 'All' }, ...categories].map((c) => (
          <button
            key={c.id}
            onClick={() => setParam('category', c.id)}
            className={category === c.id ? 'btn-primary' : 'btn-secondary'}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <input className="input" placeholder="Search title or author" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
        <select className="input" value={publisher} onChange={(e) => setParam('publisher', e.target.value)} aria-label="Publisher">
          <option value="all">All publishers</option>
          {publishers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="popular">Top rated</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="fast">Fastest delivery</option>
        </select>
      </div>

      <p className="mb-3 text-sm text-slate-500">{filtered.length} book(s)</p>
      <BookGrid books={filtered} />
    </div>
  );
}
