import { createContext, useContext, useEffect, useReducer } from "react";
import CartReducer from "../reducer/CartReducer";


const cartContext = createContext()

const getLocalStorageCartData = ()=>{
  let localCartdata = localStorage.getItem("itemsCart")
  if (localCartdata === []){
    return [];
  }else{
    return JSON.parse(localCartdata)
  };
}

const initialState = {
  cart: getLocalStorageCartData(),
  total_item:'',
  total_amount:'',
  shipping_fees:5000,
}

const CartProvider = ({children})=>{

    const [state,dispatch]= useReducer(CartReducer,initialState)

    const addToCart = (id,color,amount,product)=>{
      dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}})
    };

    const setIncreament =(id)=>{
      dispatch({type:"SET_INCREAMENT",payload:id})
    };

    const setDecreament =(id)=>{
      dispatch({type:"SET_DECREAMENT",payload:id})
    };

    const removeItem =(id)=>{
      dispatch({type:"REMOVE_ITEM",payload:id})
    };

    const clearCart =()=>{
      dispatch({type:"CLEAR_CART"})
    };

    useEffect(()=>{
      dispatch({type:"CART_TOTAL_ITEM"})
      dispatch({type:"CART_TOTAL_PRICE"})
      localStorage.setItem("itemsCart",JSON.stringify(state.cart))
    },[state.cart])

    return (
        <cartContext.Provider
         value={{...state,addToCart,setIncreament,setDecreament,removeItem,clearCart}}>
         {children}
         </cartContext.Provider>
  )
};

const useCartContext =()=>{
  return useContext(cartContext);
}

export {CartProvider,useCartContext}