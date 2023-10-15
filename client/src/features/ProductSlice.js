import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAsyncallProducts = createAsyncThunk(
    'getallProducts/fetchAsyncProducts',
    async () => {
      const response = await axios.get("http://127.0.0.1:8000/products/")
            return response.data
    }
  )


const initialState ={
    all_products : [],
    filter_products : [],
    grid_view : false,
    sorting_value : "lowest",
    filters: {
                text:"",
                category:"all",
                company:"all",
                minPrice:0,
                price:0,
                maxPrice:0
            }
}

    export const ProductSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {
        filterCategory:(state,action)=>{
            let {all_products} = state          
            if(state.filters.company !='all'){      //* if company = not all
                    let {filter_products} = state
                    let tempFileProduct = [...filter_products] 

                if (action.payload != 'all'){      //** if category = not all
                    state.filters.category = action.payload
                    tempFileProduct = tempFileProduct.filter((currElm)=>{
                        return currElm.catagory === action.payload;
                    });
                state.filter_products = tempFileProduct
                }else{                             //** if category = all
                    state.filters.category = action.payload
                    all_products = all_products.filter((currElm)=>{
                        return currElm.company === state.filters.company ;
                    });
                state.filter_products = all_products

                }

            }else{                                          //* if company = all
                let tempFileProduct = [...all_products]
                if (action.payload != 'all'){              // ** if caregory = not all
                    state.filters.category = action.payload
                    tempFileProduct = tempFileProduct.filter((currElm)=>{
                        return currElm.catagory === action.payload;
                    });
                state.filter_products = tempFileProduct
                }else{                                      // ** if category = all
                    state.filters.category = action.payload
                    state.filter_products = all_products
                }
            }

        },filterCompany:(state,action)=>{

            let {all_products} = state

            if(state.filters.category !='all'){
                    let {filter_products} = state
                    let tempFileProduct = [...filter_products]
                if (action.payload != 'all'){
                    state.filters.company = action.payload
                    tempFileProduct = tempFileProduct.filter((currElm)=>{
                        return currElm.company === action.payload;
                    });
                state.filter_products = tempFileProduct

                }else{
                    state.filters.company = action.payload
                    all_products = all_products.filter((currElm)=>{
                        return currElm.catagory === state.filters.category ;
                    });
                state.filter_products = all_products
                }


            }else{
                let tempFileProduct = [...all_products]
                if(action.payload != 'all'){
                    state.filters.company = action.payload
                    tempFileProduct = tempFileProduct.filter((currElm)=>{
                        return currElm.company === action.payload;
                    });
                state.filter_products = tempFileProduct
                }else{
                    state.filters.company = action.payload
                    state.filter_products = all_products
                }
            }

            },searchFilterProduct:(state,action)=>{
                state.filter_products = state.all_products.filter((currElm)=>currElm.name.toLowerCase().includes(action.payload))
            }

        },
        extraReducers:{
            [fetchAsyncallProducts.fulfilled]:(state,{payload})=> {
                console.log(" fetching fulfiled");
                return {...state, all_products : payload}
            },
        }
      })

    export const allProducts =(state)=> state.rootReducer.ProductSlice.all_products
    export const filterdProducts =(state)=> state.rootReducer.ProductSlice.filter_products

    export const {
                  filterCategory,
                  filterCompany,
                  searchFilterProduct} = ProductSlice.actions

export default ProductSlice.reducer