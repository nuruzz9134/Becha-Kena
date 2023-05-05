import React from 'react'
import GrideItem from './GrideItem '

const GrideView = ({products}) => {
  return (
    <div>
        {
            products.map((currElm)=>{
              // const {id,name,company,image,price,description} = currElm;
                return <GrideItem key={currElm.id} {...currElm} />
            })
        }
    </div>
  )
}

export default GrideView