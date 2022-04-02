import { createContext, useReducer } from "react";
export const contextStore = createContext();
import {
  useLocalStorage,
  writeStorage,
  deleteFromStorage,
} from "@rehooks/local-storage";

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_PRICE": {
      const price = action.payload;
      writeStorage("price", price);
      return { ...state, cart: { ...state.cart, price: price } };
    }
    case "ORDER_INFO": {
      const orderInfo = action.payload;
      writeStorage("orderInfo", orderInfo);
      return { ...state, cart: { ...state.cart, orderInfo: orderInfo } };
    }

    case "ADD_TO_CART": {
      let allredyIncart = false;
      const newItem = action.payload;
      const exitItems = state.cart.cartItems.slice();

      exitItems.forEach((element) => {
        if (element.name === newItem.name) {
          allredyIncart = true;
        }
      });
      if (!allredyIncart) {
        exitItems.push(newItem);
      }
      writeStorage("amazonbd", exitItems);
      return { ...state, cart: { ...state.cart, cartItems: exitItems } };
    }
    case "REMOVE_ITEM": {
      if (confirm("It's going to delete all items from your cart.") == true) {
        const removeItem = action.payload;
        const exitItems = state.cart.cartItems.slice();

        const index = exitItems.indexOf(removeItem);
        if (index > -1) {
          exitItems.splice(index, 1);
        }
        deleteFromStorage("amazonbd");
        writeStorage("amazonbd", exitItems);
        return { ...state, cart: { ...state.cart, cartItems: exitItems } };
      }
      return state;
    }
    case "CART_PLUS": {
      let newItem = action.payload;
      let exitItems = state.cart.cartItems.slice();

      exitItems.forEach((element) => {
        if (element.id === newItem.id) {
          element.qty++;
        }
      });

      return { ...state, cart: { ...state.cart, cartItems: exitItems } };
    }
    case "CART_MINUS": {
      const newItem = action.payload;
      const exitItems = state.cart.cartItems.slice();
      exitItems.forEach((element) => {
        if (element.name === newItem.name) {
          if (element.qty == 0) {
            alert("Sorry, you have reached in minimum quantity!");
            return state;
          }
          element.qty--;
        }
      });

      return { ...state, cart: { ...state.cart, cartItems: exitItems } };
    }
    default:
      return state;
  }
};
export default function StoreProvider(props) {
  const [cartInfo] = useLocalStorage("amazonbd");
  const [orderInfo] = useLocalStorage("orderInfo");
  const [price] = useLocalStorage("price");
  const initialState = {
    cart: {
      cartItems: cartInfo ? cartInfo : [],
    },
    orderInfo: orderInfo ? orderInfo : {},
    price: price ? price : 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <contextStore.Provider value={value}>
      {props.children}
    </contextStore.Provider>
  );
}
