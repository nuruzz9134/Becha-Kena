import { isCursorAtEnd } from '@testing-library/user-event/dist/utils'
import React from 'react'
import { MdPriceChange } from 'react-icons/md'

const CartReducer = (state,action) => {
    switch(action.type){

        case "ADD_TO_CART" :
            let {id,color,amount,product} = action.payload
            let existedCartItem = state.cart.find((currElm) => currElm.id === id + color
            )
            if (existedCartItem){
                let updatedProduct = state.cart.map((currElm)=>{
                    if(currElm.id == id+color){
                        let newAmount = currElm.amount + amount;
                        return{
                            ...currElm,
                            amount:newAmount
                        }
                    }else{
                        return currElm
                    }
                }
                )
                return{
                    ...state,
                    cart:updatedProduct
                }
            }else{
            let cartProduct = {
                id : id + color,
                name: product.name,
                color,
                amount,
                img:product.image[0].url,
                price:product.price,
                max:product.stock
            };

        return {
            ...state,
            cart:[...state.cart,cartProduct]
            }
        }

     
        case "SET_INCREAMENT":
            let incProduct  = state.cart.map((currElm)=>{
                if (currElm.id === action.payload){
                    let incAmount = currElm.amount + 1;
                    if (incAmount > currElm.max){
                        incAmount = currElm.max
                    }
                  return {
                    ...currElm,
                    amount : incAmount
                    }
                }else{
                        return currElm
                    }
                }
            )

            return{
                ...state,
                cart : incProduct
            }


        case "SET_DECREAMENT":
            let decProduct  = state.cart.map((currElm)=>{
                if (currElm.id === action.payload){
                    let decAmount = currElm.amount - 1;
                    if (decAmount <= 0){
                        decAmount = 1
                    }
                  return {
                    ...currElm,
                    amount : decAmount
                    }
                }else{
                    return currElm
                }
            })
            return{
                ...state,
                cart : decProduct
            }


        case "CART_TOTAL_ITEM":
            let updatedTotalItem = state.cart.reduce((initialVal,currElm)=>{
                let {amount} = currElm
                initialVal = initialVal + amount

                return initialVal
            },0);

            return {
                ...state,
                total_item : updatedTotalItem
            }


        case "CART_TOTAL_PRICE" :
            let updatedTotalAmount = state.cart.reduce((initialVal,currElm)=>{
                let {amount,price} = currElm

                initialVal = initialVal + price * amount

                return initialVal
            },0);

            return {
                ...state,
                total_amount : updatedTotalAmount
            }



        case "REMOVE_ITEM" :
            let updatedCart = state.cart.filter((currElm)=>currElm.id !== action.payload)
            return {
                ...state,
                cart:updatedCart
            }

        case "CLEAR_CART" :
            return{
                ...state,
                cart : []
            }

    }
  return state;
}

export default CartReducer