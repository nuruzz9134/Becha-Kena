import React from 'react'
import Product from './Product'

const ListView = ({products}) => {
    return(
        products.map((currElm)=>{
            return(
                <div>
                    <Product key={currElm.id} {...currElm} />
                </div>
            )
            
        })
    )
}

export default ListView