import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CheckoutContext = createContext(null);

const initial = { addressId: null, paymentMethod: 'card', pointsToUse: 0 };

export function CheckoutProvider({ children }) {
  const [checkout, setCheckout] = useLocalStorage('checkout', initial);
  const update = (patch) => setCheckout((c) => ({ ...c, ...patch }));
  const reset = () => setCheckout(initial);
  return <CheckoutContext.Provider value={{ checkout, update, reset }}>{children}</CheckoutContext.Provider>;
}

export const useCheckout = () => useContext(CheckoutContext);
