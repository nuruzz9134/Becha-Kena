import React from 'react'
import FilterSection from '../components/FilterSection'
import Sort from '../components/Sort'
import ProductsList from '../components/ProductsList'
import { useProductContext } from '../context/ProductsContext'
import '../products/Products.css'


const Products = () => {
  // const {products} = useProductContext();
  return (
    <div className='products-container'>
      <div className='filter-container-column'>
        <FilterSection/>
      </div>
      <div className='sorted-products-column'>
        <div ><Sort/></div>
        <div className='productsList-div'><ProductsList/></div>
      </div>
    </div>
  )
}

export default Products