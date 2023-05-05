import { useProductContext } from "../context/ProductsContext";
import React from 'react'
import Product from "./Product";
import "../components/allCSS/FeatureProducts.css"



const FeatureProducts = () => {
    const { isLoading , featureProducts } = useProductContext();

    if (isLoading){
        return <div>............Loadding</div>
    }
  return (
    <div className="feature-products">
      {
        featureProducts.map((currEle)=>{
          return <Product key={currEle.id} {...currEle}/>
        })
      }
    </div>
  )
}

export default FeatureProducts