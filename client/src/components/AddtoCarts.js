import React, { useState } from 'react'
import { FaCheck} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import CartAmountToggle from './CartAmountToggle';
import { useCartContext } from '../context/CartContext';


const AddtoCarts = ({product}) => {

    const {addToCart} = useCartContext()

    const {id,colors,stock} = product
    const [color, setColor] = useState(colors[0])
    const [amount,setAmount]=useState(1)
    const setDecrese = ()=>{
        amount > 1 ? setAmount(amount -1) : setAmount(1)
    }

    const setIncrese = ()=>{
        amount < stock ? setAmount(amount +1 ) : setAmount(stock)
    }

  return (<div>
    <div className='colors'>
        <p>
            Chose your color : 
            {
                colors.map((currColor,index)=>{
                    return <button key={index} style={{backgroundColor : currColor}}
                                   className = {color === currColor ? 'btn-color-style ': 'btn-color-style'}
                                   onClick={()=>setColor(currColor)}>
                                    
                                   {color === currColor ? <FaCheck/> : null}

                                   </button>
                    })
            }
        </p>
    </div>
    <CartAmountToggle
         amount ={amount}
         setdecrese ={setDecrese}
         setincrese = {setIncrese }
         />
        <NavLink to = "/cart"> <button onClick={()=>addToCart(id,color,amount,product)}>
            Add to cart</button> </NavLink>
    </div>
  )
}

export default AddtoCarts
