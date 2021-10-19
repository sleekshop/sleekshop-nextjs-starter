import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import {CartProvider} from '../context/cart-context';

function MyApp({ Component, pageProps }) {

  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>

  )
}

export default MyApp
