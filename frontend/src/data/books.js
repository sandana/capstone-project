export const categories = [
  { id: 'fiction', name: 'Fiction' },
  { id: 'tech', name: 'Technology' },
  { id: 'business', name: 'Business' },
  { id: 'science', name: 'Science' },
  { id: 'history', name: 'History' },
];

export const publishers = [
  { id: 'penguin', name: 'Penguin Books', blurb: 'Classic and contemporary literature.' },
  { id: 'oreilly', name: "O'Reilly Media", blurb: 'Technology and software engineering.' },
  { id: 'harper', name: 'HarperCollins', blurb: 'Bestselling fiction and business titles.' },
  { id: 'oxford', name: 'Oxford Press', blurb: 'Academic science and history.' },
  { id: 'wiley', name: 'Wiley', blurb: 'Professional and business reference.' },
];

// deliveryDays = tentative days to deliver after ordering
export const books = [
  { id: 'b1', title: 'The Silent Harbour', author: 'Mara Ellis', category: 'fiction', publisher: 'penguin', price: 14.99, rating: 4.5, deliveryDays: 3, color: 'from-indigo-500 to-purple-600', description: 'An atmospheric mystery set in a fading coastal town where every resident hides a secret.' },
  { id: 'b2', title: 'Midnight in Lisbon', author: 'Rui Almeida', category: 'fiction', publisher: 'harper', price: 12.5, rating: 4.2, deliveryDays: 4, color: 'from-rose-500 to-orange-500', description: 'A sweeping love story across two decades and two continents.' },
  { id: 'b3', title: 'Clean Architecture in Practice', author: 'Dana Whitfield', category: 'tech', publisher: 'oreilly', price: 39.99, rating: 4.8, deliveryDays: 2, color: 'from-sky-500 to-cyan-600', description: 'Practical patterns for building maintainable, testable software systems.' },
  { id: 'b4', title: 'Learning React Deeply', author: 'Priya Nair', category: 'tech', publisher: 'oreilly', price: 34.5, rating: 4.7, deliveryDays: 2, color: 'from-cyan-500 to-teal-600', description: 'From hooks to concurrent rendering — build production-ready React apps.' },
  { id: 'b5', title: 'PostgreSQL Unlocked', author: 'Tom Becker', category: 'tech', publisher: 'oreilly', price: 42, rating: 4.6, deliveryDays: 5, color: 'from-blue-600 to-indigo-700', description: 'Indexing, query planning and performance tuning for real workloads.' },
  { id: 'b6', title: 'The Lean Founder', author: 'Sophie Grant', category: 'business', publisher: 'wiley', price: 24.99, rating: 4.3, deliveryDays: 3, color: 'from-emerald-500 to-green-700', description: 'Build a startup with less waste and faster feedback loops.' },
  { id: 'b7', title: 'Negotiation Playbook', author: 'Hector Ruiz', category: 'business', publisher: 'harper', price: 19.99, rating: 4.1, deliveryDays: 3, color: 'from-amber-500 to-yellow-600', description: 'Tactics and mindsets for winning deals without burning bridges.' },
  { id: 'b8', title: 'Leading Remote Teams', author: 'Anita Rao', category: 'business', publisher: 'wiley', price: 27, rating: 4.4, deliveryDays: 6, color: 'from-lime-500 to-emerald-600', description: 'Management essentials for distributed and hybrid organisations.' },
  { id: 'b9', title: 'Cosmos Explained', author: 'Dr. Leo Hart', category: 'science', publisher: 'oxford', price: 29.99, rating: 4.9, deliveryDays: 4, color: 'from-violet-600 to-fuchsia-600', description: 'A clear tour of the universe, from black holes to dark energy.' },
  { id: 'b10', title: 'The Living Cell', author: 'Mei Tanaka', category: 'science', publisher: 'oxford', price: 31.5, rating: 4.5, deliveryDays: 5, color: 'from-green-500 to-teal-600', description: 'How the smallest unit of life shapes everything we know about biology.' },
  { id: 'b11', title: 'Quantum Minds', author: 'Arjun Patel', category: 'science', publisher: 'penguin', price: 22.75, rating: 4.0, deliveryDays: 3, color: 'from-purple-500 to-pink-600', description: 'An accessible introduction to quantum theory and its surprises.' },
  { id: 'b12', title: 'Empires of Salt', author: 'Helena Voss', category: 'history', publisher: 'oxford', price: 26.99, rating: 4.6, deliveryDays: 4, color: 'from-stone-500 to-amber-700', description: 'How trade routes for a single commodity built and broke empires.' },
  { id: 'b13', title: 'The Long Winter War', author: 'Ivan Petrov', category: 'history', publisher: 'penguin', price: 18.5, rating: 4.2, deliveryDays: 2, color: 'from-slate-500 to-slate-700', description: 'A gripping narrative history of a forgotten Arctic campaign.' },
  { id: 'b14', title: 'Cities of the Silk Road', author: 'Layla Hassan', category: 'history', publisher: 'harper', price: 21, rating: 4.3, deliveryDays: 5, color: 'from-orange-500 to-red-600', description: 'Travel through the great trading cities that linked East and West.' },
  { id: 'b15', title: 'Refactoring Legacy Code', author: 'Greg Moss', category: 'tech', publisher: 'wiley', price: 36, rating: 4.4, deliveryDays: 3, color: 'from-zinc-500 to-slate-700', description: 'Safely evolve large codebases with tests, seams and small steps.' },
  { id: 'b16', title: 'Garden of Glass', author: 'Elise Moreau', category: 'fiction', publisher: 'penguin', price: 13.25, rating: 4.7, deliveryDays: 3, color: 'from-teal-400 to-blue-600', description: 'A haunting literary novel about memory, loss and reinvention.' },
];

export const getBook = (id) => books.find((b) => b.id === id);
export const getCategory = (id) => categories.find((c) => c.id === id);
export const getPublisher = (id) => publishers.find((p) => p.id === id);
