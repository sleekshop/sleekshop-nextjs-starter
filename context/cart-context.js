import { createContext, useContext, useState } from 'react'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartOpen,
        setCartOpen,
        loading,
        setLoading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context)
    throw new Error('usePokemon must be used inside a `PokemonProvider`')

  return context
}