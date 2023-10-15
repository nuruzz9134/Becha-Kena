import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const fetchAsyncalChatlogs = createAsyncThunk(
    'getallChatlogs/fetchAsyncalChatlogs',
    async (data) => {
       const {grp,sid,tkn} = data
       const sellerID ={
        'seller' : sid
       }

       const response = await axios.post(`http://127.0.0.1:8000/chatgroup/${grp}/`,
                                          sellerID,{
                                          headers: { Authorization: `Bearer ${tkn}` }
                                        }
                                        )
            return response.data

      // const response = await axios({
      //                             method: 'post',
      //                             url:`http://127.0.0.1:8000/chatgroup/${grp}/`,
      //                             data:sellerID,
      //                             headers: { Authorization: `Bearer ${tkn}` },                      
      //                             })
            // return response.data
    }
  )


export const fetchAsyncalMyChats = createAsyncThunk(
  'getallMyChats/fetchAsyncMyChats',
  async (acess_Token) => {
    const config =  {
      headers: { Authorization: `Bearer ${acess_Token}` }
    }
    const response = await axios.get("http://127.0.0.1:8000/mychats/",config)
    return response.data
}
)

export const fetchMyChatsSortCut = createAsyncThunk(
  'getallMyChatsSortCut/fetchMyChatsSortCut',
  async (data) => {
    const {group,token} = data
    const response = await axios.get(`http://127.0.0.1:8000/chatsortcut/${group}/`,
                                          {
                                          headers: { Authorization: `Bearer ${token}` }
                                        })
            return response.data
}
)


  const initialState = {
    allChatlogs: [],
    mychats : []
  }

  export const ChatlogSlice = createSlice({
    name: 'Chatlog',
    initialState,

    reducers: {
        add_new_text_data:(state,action)=>{
          console.log("logs",action.payload)
        state.allChatlogs =  [...state.allChatlogs,action.payload]
    },
        add_new_image_data:(state,action)=>{
        state.allChatlogs =  [...state.allChatlogs,action.payload]
        },


    },

    extraReducers:{
        
        [fetchAsyncalChatlogs.fulfilled]:(state,{payload})=> {
            console.log(" fetching fulfiled");
            return {...state, allChatlogs : payload}
        },
        [fetchMyChatsSortCut.fulfilled]:(state,{payload})=> {
          console.log(" fetching fulfiled");
          return {...state, allChatlogs : payload}
      },
        [fetchAsyncalMyChats.fulfilled]:(state,{payload})=> {
          return {...state, mychats : payload}
      },
    }

  })

  export const chatlogs = (state)=>state.rootReducer.ChatlogSlice.allChatlogs
  export const mychats = (state)=>state.rootReducer.ChatlogSlice.mychats

  export const {add_new_text_data,add_new_image_data} = ChatlogSlice.actions

  export default ChatlogSlice.reducer