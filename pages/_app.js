import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import {CartProvider} from '../context/cart-context';
import {UserProvider} from '../context/user-context';

function MyApp({ Component, pageProps }) {

  return (
    <CartProvider>
      <UserProvider>      
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </CartProvider>

  )
}

export default MyApp
