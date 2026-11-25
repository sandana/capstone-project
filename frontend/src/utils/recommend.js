import { books } from '../data/books';

// Recommend books from categories/publishers the user bought before,
// excluding already-purchased books. Falls back to top rated.
export function recommendFor(orders, limit = 4) {
  const active = orders.filter((o) => o.status !== 'Cancelled');
  const bought = new Set(active.flatMap((o) => o.items.map((i) => i.bookId)));
  const catScore = {};
  active.forEach((o) =>
    o.items.forEach((i) => {
      const b = books.find((x) => x.id === i.bookId);
      if (b) catScore[b.category] = (catScore[b.category] || 0) + i.qty;
    }),
  );

  const ranked = books
    .filter((b) => !bought.has(b.id))
    .map((b) => ({ b, score: (catScore[b.category] || 0) * 10 + b.rating }))
    .sort((a, c) => c.score - a.score)
    .map((x) => x.b);

  return ranked.slice(0, limit);
}

export function relatedTo(book, limit = 4) {
  return books
    .filter((b) => b.id !== book.id)
    .map((b) => ({
      b,
      score: (b.category === book.category ? 2 : 0) + (b.publisher === book.publisher ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, c) => c.score - a.score || c.b.rating - a.b.rating)
    .slice(0, limit)
    .map((x) => x.b);
}

export function boughtBooks(orders) {
  const seen = new Set();
  const out = [];
  orders.forEach((o) =>
    o.items.forEach((i) => {
      const b = books.find((x) => x.id === i.bookId);
      if (b && !seen.has(b.id)) {
        seen.add(b.id);
        out.push(b);
      }
    }),
  );
  return out;
}
