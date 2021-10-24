import { useEffect, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'

import numberFormat from '../../utils/number-format'
import Loading from '../../components/loading'
import SizeVariants from '../../components/size-variants'
import { useCart } from '../../context/cart-context'

export default function Product() {
  const router = useRouter()
  const { slug } = router.query
  const { cartItems, setCartItems, cartOpen, setCartOpen, loading, setLoading } = useCart();

  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [count, setCount] = useState(1)

  useEffect(() => {
    if (slug) {
      axios.get('/api/get-product', {
        params: {
          slug: slug
        }
      })
        .then(res => {
          console.log(res.data);
          setProduct(res.data)
          setActiveImage(res.data.attributes.img1.value)
        })
    }
  }, [slug])

  const addToCart = () => {

    setCartOpen(true)
    setLoading(true)

    axios.post('/api/add-to-cart', { id: product.id, quantity: count })
      .then(res => {
        setCartItems([...cartItems, { id: product.id, quantity: count }])
      })

  }

  if (product) {
    return (
      <div className="container mx-auto px-6">
        <div className="md:flex md:items-center">
          <div className="w-full h-64 md:w-1/2 lg:h-96">
            <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={activeImage} alt={product.name} />
          </div>
          <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
            <h3 className="text-gray-700 uppercase text-lg">{product.name}</h3>
            <span className="text-gray-500 mt-3">{numberFormat(product.attributes.price.value)}</span>
            <hr className="my-3" />
            <div className="mt-2">
              <label className="text-gray-700 text-sm" htmlFor="count">Anzahl:</label>
              <div className="flex items-center mt-1">
                <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={() => setCount(count + 1)}>
                  <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
                <span className="text-gray-700 text-lg mx-2 w-5 text-center">{count}</span>
                <button className={`${count == 1 ? 'text-gray-200' : 'text-gray-500'} focus:outline-none focus:text-gray-600`} onClick={() => setCount(count - 1)} disabled={count == 1}>
                  <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
              </div>
            </div>
            <div className="mt-3">
              {product.attributes.size && product.attributes.size.value && <SizeVariants product={product} />}
            </div>
            <div className="flex items-center mt-6">
              <button
                onClick={() => addToCart()}
                className={`${loading ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-600'} px-8 py-2 text-white text-sm font-medium rounded focus:outline-none`}
                disabled={loading}
              >
                In den Warenkorb
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <Loading />
  }


}