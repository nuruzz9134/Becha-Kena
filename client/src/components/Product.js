import React from 'react'
import { NavLink } from 'react-router-dom'
import FormatePrice from '../helper/FormatePrice'
import "../components/allCSS/Product.css"

const Product = (data) => {
    const {id,name,image,price,catagory} = data
  return (
    <div className='card'>
        <NavLink to={`product_detailed/${id}`}>
                <img src={image} alt={name}/>
                <div className='card-info'>
                <p>{name}</p>
                <h4>{<FormatePrice price={price}/>}</h4>
                </div>
        </NavLink>
    </div>
  )
}

export default Product