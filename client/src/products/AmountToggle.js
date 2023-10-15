import React from 'react'
import '../Css/productDetailed.css';

import { FaPlus, FaMinus} from "react-icons/fa";

const AmountToggle = ({ amount , setdecrese , setincrese}) => {
  return (
    <div className='cart-button'>
        <div className='amount-toggle'>
            <button onClick={()=>setdecrese()}><FaMinus/></button>
            <div className='amount-style'>{amount}</div>
            <button onClick={()=>setincrese()}><FaPlus/></button>
        </div>
    </div>
  )
}

export default AmountToggle