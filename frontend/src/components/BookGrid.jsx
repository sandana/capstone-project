import BookCard from './BookCard';

export default function BookGrid({ books, action, empty = 'No books found.' }) {
  if (!books.length) {
    return <p className="py-8 text-center text-slate-500">{empty}</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} action={action} />
      ))}
    </div>
  );
}
