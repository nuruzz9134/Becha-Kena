import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  access_token: null,
  userId : null,
  userName : '',
}

export const authSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
    setUserToken:(state,action)=>{
        state.access_token = action.payload.access_token
    },
    unsetUserToken:(state,action)=>{
        state.access_token = action.payload.access_token
    },
    setUserId:(state,action)=>{
      state.userId = action.payload
    },
    setUserName:(state,action)=>{
      state.userName = action.payload
    },
  },

})

export const { setUserToken,unsetUserToken,setUserId,setUserName } = authSlice.actions

export const acc_Token = (state)=>state.rootReducer.AuthSlice.access_token
export const userId = (state)=>state.rootReducer.AuthSlice.userId
export const userName = (state)=>state.rootReducer.AuthSlice.userName
export default authSlice.reducer