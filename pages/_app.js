import { createContext, useMemo, useState } from 'react';

import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import {CartContext} from '../utils/cart-context';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const value = useMemo(
    () => ({ cart, setCart }), 
    [cart]
  );

  return (
    <CartContext.Provider value={value}>
      <Layout>
        {cart.length}
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>

  )
}

export default MyApp
