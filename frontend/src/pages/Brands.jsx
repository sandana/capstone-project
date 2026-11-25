import { Link } from 'react-router-dom';
import { books, publishers } from '../data/books';

export default function Brands() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Publishers &amp; Brands</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {publishers.map((p) => {
          const count = books.filter((b) => b.publisher === p.id).length;
          return (
            <Link key={p.id} to={`/catalogue?publisher=${p.id}`} className="card p-5 transition hover:shadow-md">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                {p.name[0]}
              </div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-slate-500">{p.blurb}</p>
              <p className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">{count} titles →</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
