import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Filter from './Filter';
import ProductsList from './ProductsList';
import { fetchAsyncallProducts } from '../features/ProductSlice';
import '../Css/products.css';


const Products = () => {
  let dispatch = useDispatch()
  dispatch(fetchAsyncallProducts())


  return (
    <div className='products-container'>
      <div className='filter-container-column'>
        <Filter/>
      </div>
      
      <div className='products-list-column'>
        <div className='productsList-div'>
           <ProductsList/>
        </div>
      </div>
    </div>
  )

}

export default Products