import { useEffect, useState, useContext } from 'react';
import Link from 'next/link'

import axios from 'axios';

import { useCart } from '../context/cart-context'
import { useUser } from '../context/user-context'
import Loading from '../components/loading'
import numberFormat from '../utils/number-format'

export default function SideCart() {
  const {cartItems, setCartItems, cartOpen, setCartOpen, loading, setLoading} = useCart();
  const {user} = useUser()

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  useEffect(async () => {
    try {
      const cart = await axios.get('/api/get-cart');
      await setProducts(cart.data.contents)
      await setCart(cart.data)
      await setLoading(false)
    } catch (err) {
      console.error(err);
    }
  }, [cartItems])

  const deleteItem = async (item) => {
    try {
      setLoading(true)
      const res = await axios.post('/api/delete-from-cart', {id: item.id})
      setCartItems(res.data.contents)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={`fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 ${cartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Warenkorb</h3>
        <button className="text-gray-600 focus:outline-none" onClick={() => setCartOpen(!cartOpen)}>
          <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <hr className="my-3" />
      {}
      {!loading ? <>
        {products && products.map(item => {
          return (
            <div key={item.id} className="flex justify-between mt-6">
              <div className="flex">
                {/* <img className="h-20 w-20 object-cover rounded" src={(item && item.attributes && item.attributes.img1) && item.attributes.img1.value} alt="" /> */}
                <div className="">
                  <h3 className="text-sm text-gray-600">{item.quantity}x {item.name}</h3>
                  <div className="flex items-center mt-2">
                    <button onClick={() => deleteItem(item)}><img src="/icons/trash-2.svg" alt="" /></button>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-600">{numberFormat(item.price)}</span>
            </div>
          )
        })}
      </>
      : <Loading/>}
      
      <hr className="my-3" />

      <div className="flex justify-between">
        <p className="text-sm text-gray-600">Summe</p>
        <p className="text-sm text-gray-600">{numberFormat(cart.sum)}</p>
      </div>

      <div className="flex justify-between mt-2">
        <p className="text-sm text-gray-600">davon MwSt.</p>
        <p className="text-sm text-gray-600">{numberFormat(cart.sum * 19 / 100)}</p>
      </div>



      <Link href={user.status == 'active' ? "/checkout" : '/login?proceedOrder=true' }>
        <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <span>Checkout</span>
          <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </Link>
    </div>
  )
}