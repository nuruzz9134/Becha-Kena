import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/products.css';

const Product = (data) => {
    const {id,catagory,company,name,
            size,price,offer_Price,
              quantity,product_type,description,
              manufacture_date,warranty_months,
              seller,main_img} = data
  return (
        <div>
            <Link to={`product_detailed/${id}`} className='product-img'>
              <div>
                  <img src={main_img} alt={'picture'}/>
              </div>
              <div>
                  {name}
              </div>
            </Link>
        </div>
  )
}

export default Product