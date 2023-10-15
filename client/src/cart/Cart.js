import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAsyncallCart } from '../features/CartSlice'
import { acc_Token } from '../features/AuthSlice';
import '../Css/cart.css';
import CartList from './CartList';


const Cart = () => {
    const dispatch = useDispatch()
    const acess_token = useSelector(acc_Token)
    useEffect(() => {
      dispatch(fetchAsyncallCart(acess_token))
    }, []);
  return (<>
    <div className='cart-heading'>
        <p>IMG</p>
        <p>NAME</p>
        <p>COMPANY</p>
        <p>QUANTITY</p>
        <p>PRICE</p>
        <p>REMOVE</p>
      </div>
      <hr/>
    <div><CartList/></div>
    </>
  )
}

export default Cart