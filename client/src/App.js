
import React from 'react'
import './App.css';
import {Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { acc_Token } from './features/AuthSlice';

import RegistrationForm from './auth/RegistrationForm';
import LoginForm from './auth/LoginForm';
import VerifyOtp from './auth/VerifyOtp';

import Add_Product from './products/Add_Product';

import Navbar from './components/Navbar';
import Home from './home/Home';
import Products from './products/Products';
import SingleProduct from './products/SingleProduct';

import ChatScreen from './chat/ChatScreen';
import AllChats from './chat/AllChats';
import FetchChat from './chat/FetchChat';

import Cart from './cart/Cart';

const App = () => {
  const access_token = useSelector(acc_Token)
  return (

    <div>
      <Navbar/>
      <Routes>
          <Route path="/reg" element={<RegistrationForm/>}/>
          <Route path="login/" element={<LoginForm/>}/>
          <Route path="otp/" element={<VerifyOtp/>}/>

          <Route path="/" element={<Home/>}/>
          <Route path="products/" element={<Products/>}/>
          <Route path="products/product_detailed/:id" element={<SingleProduct/>}/>

          <Route path="addproduct/" element={access_token ? <Add_Product/> : <LoginForm/>}/>

          <Route path="fetchchat/:groupname" element={access_token ? <FetchChat/> : <LoginForm/>}/>
          <Route path="chat_with/:groupname" element={access_token ? <ChatScreen/> : <LoginForm/>}/>
          <Route path="chats/" element={access_token ? <AllChats/> : <LoginForm/>}/>

          <Route path="cart/" element={access_token ? <Cart/> : <LoginForm/>}/>

      </Routes>
    </div>

  )
}

export default App