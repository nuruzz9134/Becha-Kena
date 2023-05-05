
import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Contact from './contact/Contact';
import Products from './products/Products';
import Cart from './cart/Cart';
import About from './about/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetailed from './components/ProductDetailed';


const App = () => {
  return (

    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='products/product_detailed/:id' element={<ProductDetailed/>}/>
      </Routes>
    </div>

  )
}

export default App