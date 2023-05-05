
import axios from 'axios';
import { createContext , useContext, useEffect } from 'react'
import { useReducer } from 'react';
import productReducer  from '../reducer/productReducer';

const AppContext = createContext();

const intialState = {
    isLoading : false,
    isError : false,
    products : [],
    featureProducts : [],
    isSingleLoading : false,
    singleProduct : {}
}

const Api = 'https://api.pujakaitem.com/api/products';

const ProductsContext = ({children}) => {

    const [state,dispatch] = useReducer(productReducer,intialState)

    const getProducts= async (url)=>{

        dispatch({type : "Set_Single_loadding"})

        try{
            const res = await axios.get(url);
            const products = await res.data
            dispatch(
                {  type:"Api_Data" ,
                payload : products  }
                    )
            }catch(errors){
                dispatch({type : "Api_error"})
            }
    };

    // 2nd api call for single product

    const getSingleProducts= async (url)=>{
        dispatch({type : "Single_Product_loadding"})

        try{
            const res = await axios.get(url);
            const singleProduct = await res.data
            dispatch(
                {  type:"Single_Product_Data" , 
                    payload : singleProduct  }
                    )
            }catch(errors){
                dispatch({type : "Single_Product_error"})
            }
    };

    useEffect(()=>{
        getProducts(Api)
    },[])

  return (
        <AppContext.Provider value={{...state, getSingleProducts}}>{children}</AppContext.Provider>
  )
}

// custome hooks
const useProductContext = ()=>{
   return useContext(AppContext);
} 

export { ProductsContext , AppContext , useProductContext }