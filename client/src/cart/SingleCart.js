import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { acc_Token } from '../features/AuthSlice';
import { delete_cart_item } from '../features/CartSlice';
import { MdDelete} from "react-icons/md";
import '../Css/cart.css';

const SingleCart = ({item}) => {
    const acess_token = useSelector(acc_Token)
    const dispatch = useDispatch()
  
      const HandleDelete = (e)=>{
        e.preventDefault()
        const config =  {
          headers: { Authorization: `Bearer ${acess_token}`}
        }
          axios.delete( `http://127.0.0.1:8000/deletefromCart/${item.id}`,config)
      
          .then((res)=>{
            dispatch(delete_cart_item(item.id))
            }
          )
          .catch((error)=>console.log(error.response.data));
  
      }
  return (
    <div className='cart-heading'>
        <div className='cart-image'>
          <img src={item.main_img} alt='imgage'/>
        </div>
        <div>{item.name}</div>
        <div>{item.company}</div>
        <div>{item.quantity}</div>
        <div>{item.price}</div>
        <div>{item.isPaid === "true" ? "paid":"not paid"} </div>
        <div className='cart-remove-icon'><MdDelete color='red' size={30} onClick={HandleDelete}/></div>
    </div>
  )
}

export default SingleCart