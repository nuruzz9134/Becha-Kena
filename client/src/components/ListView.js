import React, { useState } from 'react'
import Product from './Product';

const ListView = ({products}) => {

    return(
        products.map((currElm)=>{
            // const {id,name,company,image,price,description} = currElm;
            return(
                <div>
                    <Product key={currElm.id} {...currElm} />
                </div>
            )
            
        })
    )
        
}

export default ListView