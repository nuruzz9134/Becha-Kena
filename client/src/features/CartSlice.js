import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAsyncallCart = createAsyncThunk(
    'getallCarts/fetchAsyncallCart',
    async (token) => {
      const response = await axios.get("http://127.0.0.1:8000/allCartitem/",{
        headers: { Authorization: `Bearer ${token}` }
                })
            return response.data
    }
  )

  const initialState = {
    allCartItems: []
  }

  export const CartSlice = createSlice({
    name: 'CartItems',
    initialState,
    reducers: {
        add_new_cart_item:(state,action)=>{
          state.allCartItems =  [...state.allCartItems,action.payload]
      },
      delete_cart_item:(state,action)=>{
        state.allCartItems = state.allCartItems.filter((element)=>element.id != action.payload)
    },
    },
    extraReducers:{
        [fetchAsyncallCart.fulfilled]:(state,{payload})=> {
            console.log(" fetching fulfiled");
            return {...state, allCartItems : payload}
        },
    }

  })

export const cartItems = (state)=>state.rootReducer.CartSlice.allCartItems

export const {add_new_cart_item,delete_cart_item} = CartSlice.actions

export default CartSlice.reducer