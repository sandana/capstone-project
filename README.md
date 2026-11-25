# capstone-project – PageTurner E-Bookstore

Online bookstore where customers browse, select and purchase books.

## Frontend (React + Vite + Tailwind CSS)

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build
```

Demo login: `demo@bookstore.com` / `password123`

### Modules implemented

| Module | Route | Notes |
|---|---|---|
| Login | `/login` | Validation, loading state, protected routes |
| Home | `/` | Order history, Buy Again, recommendations, gift points |
| Recommendations | `/` | Ranked by categories in order history (`utils/recommend.js`) |
| Catalogue | `/catalogue` | Category filter, search, sort |
| Brands | `/brands` | Publishers, links to filtered catalogue |
| Product | `/books/:id` | Tentative delivery date, related books |
| Shopping cart | `/cart` | Quantity, remove, totals, shipping |
| Delivery | `/checkout/delivery` | Select / add address with validation |
| Payment + Gift points | `/checkout/payment` | Card / UPI / COD, redeem points (1 pt = $0.10). Card number ending `0000` simulates a decline |
| Confirmation | `/confirmation/:id` | Payment and purchase summary |
| Cancellation | `/orders`, `/orders/:id` | Allowed only within 48 hours of order |

### Structure

```
frontend/src
  components/  reusable Navbar, BookCard, BookGrid, OrderRow, CheckoutSteps ...
  context/     Auth, Cart, Orders, Checkout, Theme providers
  pages/       one file per screen
  utils/       formatting, business rules, recommendations
  data/        mock catalogue (replace with backend API calls)
```

State is persisted in `localStorage`; data and auth are mocked until the backend
(PostgreSQL + OpenAPI) is available. Light/dark theme toggle is in the navbar.
