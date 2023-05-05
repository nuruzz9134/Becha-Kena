import React from 'react'
import { useFilterContext } from '../context/Filter_Context'
import GrideView from './GrideView'
import ListView from './ListView'



const ProductsList = () => {

  const {filter_products,grid_view} = useFilterContext()


  if ( grid_view === false){
    return(
    <div className='main-products-listview'>
      <ListView products ={filter_products}/>
    </div>
    ) 
  }

  if ( grid_view === true){
      return (
      <div className='main-products-gridview'>
        <GrideView products ={filter_products}/>
      </div>
      )
  }
  

}

export default ProductsList