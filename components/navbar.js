import Link from 'next/link'

import { useCart } from '../context/cart-context';
import { useUser } from '../context/user-context';

export default function Navbar() {
  const { cartItems, cartOpen, setCartOpen } = useCart();
  const { user } = useUser();
  return (
    <header className="bg-white">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="w-full text-gray-700 text-2xl font-semibold cursor-pointer">
              Brand
            </div>
          </Link>

          <div className="flex flex-col sm:flex-row">
            <Link href="/shop">
              <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">Shop</a>
            </Link>
          </div>
          <div className="flex items-center justify-end w-full">
            <Link href="/login">
              <div>
                {user.status == 'active' && <span>Hi, {user.attributes.firstname.value}</span>}
                <button className="text-gray-600 focus:outline-none ml-1 mr-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
              </div>
            </Link>
            <button className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setCartOpen(!cartOpen)}>
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}