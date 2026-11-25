const steps = ['Cart', 'Delivery', 'Payment', 'Confirmation'];

export default function CheckoutSteps({ current }) {
  return (
    <ol className="mb-6 flex items-center gap-2 text-sm" aria-label="Checkout progress">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              i <= current ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
            }`}
          >
            {i + 1}
          </span>
          <span className={`hidden sm:inline ${i === current ? 'font-semibold' : 'text-slate-500'}`}>{s}</span>
          {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-slate-300 dark:bg-slate-600" />}
        </li>
      ))}
    </ol>
  );
}
