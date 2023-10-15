import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";
import { Link,NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import '../Css/products.css';
import '../Css/productDetailed.css';
import useRazorpay from "react-razorpay";

import ProductImages from './ProductImages';
import AmountToggle from './AmountToggle';
import {acc_Token} from '../features/AuthSlice';
import { userId } from '../features/AuthSlice';
import { userName } from '../features/AuthSlice';
import { fetchAsyncalChatlogs } from '../features/ChatlogSlice';
import { add_new_cart_item } from '../features/CartSlice';


const SingleProduct = () => {
    let {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [post, setPost] = useState(null);
    const [amount,setAmount]=useState(1)
    // const [cartitem,setCartitem]=useState({})

    const acc_token = useSelector(acc_Token)
    const userid = useSelector(userId)
    const username = useSelector(userName)
    const Razorpay = useRazorpay();

    
    const setDecrese = ()=>{
        amount > 1 ? setAmount(amount -1) : setAmount(1)
    }
    const setIncrese = ()=>{
        amount < post.quantity ? setAmount(amount +1 ) : setAmount(post.quantity)
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/single_product/${id}`)
        .then((response) => {
          setPost(response.data[0]);
        });
      }, [id]);


    const AddtoCart =()=>{
      const cartitem = {
        "productId":post.id,
        "productName":post.name,
        "productCompany":post.company,
        "productTotalPrice":amount * post.price,
        "productQuantity":amount
      }
      axios.post(`http://127.0.0.1:8000/addtocart/`,cartitem,{
        headers: { Authorization: `Bearer ${acc_token}` }
      }
      )
    .then((response) => {
      dispatch(add_new_cart_item(cartitem))
      navigate("/cart/")
    })
    }

      
    const ChatboxHandler = ()=>{
        const groupName = username + String(userid) + '_' + post.seller
        const data = {
          grp:groupName,
          sid:post.seller,
          tkn:acc_token
        }
        dispatch(fetchAsyncalChatlogs(data))
        navigate(`/chat_with/${groupName}/`)
    }


    const payment_successfull =(payment_id,order_id,signature)=>{
      axios.post(`http://127.0.0.1:8000/razorpay/order/complete/`,{
        "payment_id" :payment_id,
        "order_id": order_id,
        "signature":signature 
      })
        .then((response) => {
          console.log("payment successfull...",response)
          const info = {
            "product_quantity":amount ,
            "orderedId":response.data.orderedId
              }
          axios.put(`http://127.0.0.1:8000/buyproduct/${post.id}`,info,{
            headers: { Authorization: `Bearer ${acc_token}` }
          }
          )
        .then((response) => {
          console.log("Order successfull...",response)
        })
        })
    }

    const BuyProductHandler =()=>{
      axios.post(`http://127.0.0.1:8000/razorpay/order/create/`,{
        "amount":amount * post.price * 100,
        "currency":"INR"
      })
        .then((response) => {
          console.log(response.data);
          const order_id = response.data.data.id
          console.log("order_id.....",order_id);

          const options = {
            key: "rzp_test_T13JVLKiRC8RN5", // Enter the Key ID generated from the Dashboard
            currency: "INR",
            name: username,
            description: "Purchase Description",
            image: "https://example.com/your_logo",
            order_id: order_id,
            handler: function (response) {
              // alert(response.razorpay_payment_id);
              // alert(response.razorpay_order_id);
              // alert(response.razorpay_signature);
              payment_successfull(
                response.razorpay_payment_id,
                response.razorpay_order_id,
                response.razorpay_signature
              )
            },
            // prefill: {
            //   name: "Piyush Garg",
            //   email: "youremail@example.com",
            //   contact: "9999999999",
            // },
            // notes: {
            //   address: "Razorpay Corporate Office",
            // },
            theme: {
              color: "#3399cc",
            },
          };
        
          const rzp1 = new window.Razorpay(options);
        
          rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
        
          rzp1.open();


        });
    }
      if (!post) return null;

  return (
    <div className='product-detailed-info'>

      <div className='product-detailed-info-left'>
        <ProductImages imgs={[post.main_img,...post.images]}/>
      </div>

        <div className='product-detailed-info-right'>
          <div>
            <div>product name : {post.name}</div>
            <div>company : {post.company}</div>
            <div> price : {post.price}</div>
            <div>offer price : {post.offer_Price}</div>

            <div className='item-chose'> your items number : 
              <AmountToggle
              amount ={amount}
              setdecrese ={setDecrese}
              setincrese = {setIncrese }
              />
            </div>
            <div>
              Total Price : {amount * post.price}
            </div>


            <div>product type : {post.product_type}</div>
            <div>available items : {post.quantity}</div>
            <div>description : {post.description}</div>
          </div>
          <div className='product-handler-button'>
              <button onClick={AddtoCart}>
                      ADD TO CART
              </button>
              <button onClick={ChatboxHandler}>
                      CHAT WITH SELLER
              </button>
              { post.quantity >0 &&
                <button onClick={BuyProductHandler}>
                      BUY PRODUCT
              </button>
              }
            </div>
        </div>

    </div>
  )
}

export default SingleProduct