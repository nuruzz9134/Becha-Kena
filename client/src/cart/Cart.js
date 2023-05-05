import React from 'react'
import { useCartContext } from '../context/CartContext'
import CartItems from './CartItems';
import '../cart/Cart.css';
import { NavLink,Link } from 'react-router-dom';
import FormatePrice from '../helper/FormatePrice';

const Cart = () => {
  const {cart,clearCart,total_amount,shipping_fees} = useCartContext();
  if (cart.length === 0){
    return <h2>No Cart Item</h2>
  }
  return (
    <div className='cart-containers'>
      <div className='cart-heading'>
        <p>ITEM</p>
        <p>PRICE</p>
        <p>QUANTITY</p>
        <p>SUBTOTAL</p>
        <p>REMOVE</p>
      </div>
      <hr/>

      <div className='cart-items'>
      {
        cart.map((currElm)=>{
          return <CartItems key={currElm.id} {...currElm} />
        }
        )
      }
      </div>

      <hr/>

      <div className='cartShopping-clearCart'>
        <div>
          <Link to='/products'>
            <button>
              Continiue Shoppping
            </button>
          </Link>
        </div>

        <div>
            <button onClick={clearCart}>Clear Cart</button>
        </div>

        </div>

        <div className='shopping-total'>
          <div className='total'>
            <p>Subtotal : </p>
            <p><FormatePrice price={total_amount} /></p>
          </div>
          <div className='total'>
            <p>Shipping Fees : </p>
            <p><FormatePrice price={shipping_fees} /></p>
          </div>
          <hr/>
          <div className='total'>
            <p>Total Order Price : </p>
            <p><FormatePrice price={total_amount + shipping_fees} /></p>
          </div>
        </div>

    </div>
  )
}

export default Cart