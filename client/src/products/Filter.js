import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { store } from '../Store';
import '../Css/products.css'

import { allProducts } from '../features/ProductSlice';
import { filterCategory } from '../features/ProductSlice';
import { filterCompany } from '../features/ProductSlice';
import { searchFilterProduct } from '../features/ProductSlice';

const Filter = () => {

  useEffect((e)=>{

},[])
  
  const dispatch = useDispatch()
  const products  = useSelector(allProducts)

  const getUniqdata = (data,propaty)=>{
    let newValue = data.map((currElm)=>{
      return currElm[propaty]
    })
    return(newValue= ['all',...new Set(newValue)])
  }

  const categoryData = getUniqdata(products,"catagory")
  const companyData = getUniqdata(products,"company")

  const search_product_name =(elm)=>{
      dispatch(searchFilterProduct(elm))
  }
  const filterCategoryValue = (elm)=>{
    dispatch(filterCategory(elm))
  }
  const filterCompanyValue = (elm)=>{
    dispatch(filterCompany(elm))
  }

  return (

    <div className='filter-column'>
      <div className='filter-search'>
      <h3>search hear</h3>
          <form onSubmit={(e)=>e.preventDefault()}>
            <input type='text' name='text'
             onChange={(currElm)=>search_product_name(currElm.target.value)}
            placeholder="search hear..."/>
          </form>
      </div>

      <div className='filter-category'>
        <h3>category</h3>
        <div>
      {categoryData.map((currElm,index)=>{
        return(
            <button
            key={index}
            type="button"
            name="category"
            value={currElm}
            onClick={(currElm)=>filterCategoryValue(currElm.target.value)}
            >
            {currElm}
          </button>
        );
      })}
      </div>
      </div>

      <div className='filter-company'>
        <h3>company</h3>
        <form action='#'>
        <select name='company'
                id='company'
                onClick={(currElm)=>filterCompanyValue(currElm.target.value)}
                >
          {
            companyData.map((currElm,index)=>{
              return(
                <option key={index} value={currElm} name="company" >
                        {currElm}
                </option>
              )
            })
          }
        </select>
        </form>
        </div>

      </div>

  )
}

export default Filter