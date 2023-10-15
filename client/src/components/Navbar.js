import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome} from 'react-icons/ai';
import {SiProducthunt} from 'react-icons/si';
import {PiWechatLogoFill} from 'react-icons/pi';
import {CgProfile} from 'react-icons/cg';
import { FaShoppingCart} from 'react-icons/fa';
import '../Css/navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
        <ul className='navbar-link'>
            <li>
                <NavLink to='/' className='navbar-link-box'><AiOutlineHome/></NavLink>
            </li>
            <li>
                <NavLink to='products' className='navbar-link-box'><SiProducthunt/></NavLink>
            </li>
            <li>
                <NavLink to='chats' className='navbar-link-box'><PiWechatLogoFill/></NavLink>
            </li>
            <li>
                <NavLink to='login' className='navbar-link-box'><CgProfile/></NavLink>
            </li>
            <li>
                <NavLink to='cart' className='navbar-link-box'>
                    <FaShoppingCart />
                    </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Navbar