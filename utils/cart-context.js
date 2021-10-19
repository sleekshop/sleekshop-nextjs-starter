import { createContext } from "react";

const CartContext = createContext({
  cart: [],
  setCart: () => {},
});

export {
  CartContext
}