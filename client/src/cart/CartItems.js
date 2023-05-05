import React from 'react';
import { useState } from 'react';
import FormatePrice from '../helper/FormatePrice';
import CartAmountToggle from '../components/CartAmountToggle';
import { MdDelete} from "react-icons/md";
import { useCartContext } from '../context/CartContext';



const CartItems = ({id,color,amount,name,img,price,max}) => {


  // const [quantity,setQuantity]=useState('')

  const {removeItem,setDecreament,setIncreament} = useCartContext()

  // const setDecrese = ()=>{
  //   quantity > 1 ? setQuantity(quantity -1) : setQuantity(1)
  // }

  // const setIncrese = ()=>{
  //   quantity < max ? setQuantity(quantity +1 ) : setQuantity(max)
  // }

  return (
    <div className='cart-heading'>
        <div className='cart-image--name'>
          <div>
            <figure>
              <img src={img} alt='card-image'/>
            </figure>
          </div>
          <div>
            <p>{name}</p>
            <div className='card-item-color'>
                <p>color :</p>
                <div className='color-style' style={{backgroundColor : color}}/>
            </div>
          </div>
        </div>

        <div>
          <FormatePrice price={price}/>
        </div>

        <div>
        <CartAmountToggle
         amount ={amount}
         setdecrese ={()=> setDecreament(id)}
         setincrese = {()=> setIncreament(id) }
         />
        </div>

        <div>
        <FormatePrice price={price * amount}/>
        </div>

        <div>
            <button onClick={()=>removeItem(id)}><MdDelete/></button>
        </div>
    
    </div>
  )
}

export default CartItems