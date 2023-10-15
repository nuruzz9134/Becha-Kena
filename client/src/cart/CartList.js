import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import SingleCart from './SingleCart';
import { cartItems } from '../features/CartSlice';

const CartList = () => {
    const cartitems = useSelector(cartItems)
  return (
    <div>
        {
            cartitems.map((item,index)=>(
                <SingleCart key={index} item={item}/>
            ))
        }
    </div>
  )
}

export default CartList