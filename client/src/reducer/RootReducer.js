
import { combineReducers } from "@reduxjs/toolkit";
import { AuthApi } from "../auth/AuthApi";
import AuthSlice from "../features/AuthSlice";
import ProductSlice from "../features/ProductSlice";
import ChatlogSlice from "../features/ChatlogSlice";
import AddSlice from "../features/AddSlice";
import CartSlice from "../features/CartSlice";

const rootReducer = combineReducers({
    [AuthApi.reducerPath]: AuthApi.reducer,
    AuthSlice,
    ProductSlice,
    ChatlogSlice,
    AddSlice,
    CartSlice
})

export default rootReducer;