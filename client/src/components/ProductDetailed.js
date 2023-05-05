import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductContext } from '../context/ProductsContext';
import FormatePrice from '../helper/FormatePrice';
import MyImages from './MyImages';
import "../components/allCSS/ProductDetailed.css"
import Stars from './Stars';
import AddtoCarts from './AddtoCarts';


const Api = 'https://api.pujakaitem.com/api/products';

const ProductDetailed = () => {
  const {id} = useParams();
  const { getSingleProducts, isSingleLoading , singleProduct } = useProductContext();
  // console.log(singleProduct)
  const {
    id:productID,
    category,
    image,
    colors,
    company,
    name,
    description,
    reviews,
    price,
    stars,
    stock } = singleProduct;


  useEffect(()=>{
    getSingleProducts(`${Api}?id=${id}`)
    // console.log(singleProduct)
  },[])

  if (isSingleLoading){
    return <div>......Loading</div>
  }

  return (
    <div className='product-detailed-info'>
      <div className='product-detailed-info-left'>
        <MyImages imgs={image}/>
      </div>
      <div className='product-detailed-info-right'>

        <div className='product-name'>{name}</div>
        <div className='product-review'> <Stars stars= {stars} /> <p>({reviews} customer reviews)</p></div>
        <p> MRP : <FormatePrice price={price}/></p>
        <p>{description}</p>
        <span>Available : {stock > 0 ? "In Stock" : "Not Available"}</span>
        <p>company : {company}</p> 

         {stock > 0 && <AddtoCarts product = {singleProduct}/>}  
      </div>
    </div>
    
  )
}

export default ProductDetailed