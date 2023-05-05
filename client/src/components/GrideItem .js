import React from 'react'
import Item_Description from './Item_Description'
import { NavLink } from 'react-router-dom'

const GrideItem  = ({id,name,company,image,price,description}) => {
    
  return (<div className='gride-container'>
    <NavLink to={`product_detailed/${id}`}>
    <div className='indivisual-gride-container'>
      
        <div className='gride-img'>
            <img src={image}/>
        </div>
        <div className='gride-detailed'>
                <p><b>name  : </b>{name}</p>
                <p><b>company  : </b>{company}</p>
                <p><b>about  : </b><Item_Description description={description}/></p>
                <p><b>price  : </b>{price}</p>
        </div>
    </div>
    </NavLink>
    </div>
  )
}

export default GrideItem 