import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ListView from './ListView';
import '../Css/products.css';

import { allProducts } from '../features/ProductSlice';
import { filterdProducts } from '../features/ProductSlice';

const ProductsList = () => {
  let alls = useSelector(allProducts)
  let filt = useSelector(filterdProducts)

  let data = ''
  data = filt == '' ? alls : filt

  return (
    <div className='products-list'>
      <ListView products ={data}/>
    </div>
  )
}

export default ProductsList