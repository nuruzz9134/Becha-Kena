import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart} from 'react-icons/fa';
import "./allCSS/Navbar.css"
import { useCartContext } from '../context/CartContext';

const Navbar = () => {
    const {total_item } = useCartContext()
    console.log("total_item>>>",total_item)
  return (
    <div className='navbar'>
        <ul className='navbar-link'>
            <li>
                <NavLink to='/' className='navbar-link-box'>home</NavLink>
            </li>
            <li>
            <NavLink to='about' className='navbar-link-box'>about</NavLink>
            </li>
            <li>
                <NavLink to='contact' className='navbar-link-box'>contact</NavLink>
            </li>
            <li>
                <NavLink to='products' className='navbar-link-box'>Products</NavLink>
            </li>
            <li>
                <NavLink to='login' className='navbar-link-box'>Log in</NavLink>
            </li>
            <li>
                <NavLink to='cart' className='navbar-link-box'>
                    <FaShoppingCart />
                    <span>{total_item}</span>
                    </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Navbar