import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAsyncallAdds = createAsyncThunk(
    'getallAdds/fetchAsyncAdds',
    async () => {
      const response = await axios.get("http://127.0.0.1:8000/addsimages")
      console.log(response.data)
            return response.data
    }
  )

  const initialState = {
    allAdds: []
  }

  export const AddSlice = createSlice({
    name: 'allAdds',
    initialState,
    reducers: {
    },
    extraReducers:{
        [fetchAsyncallAdds.fulfilled]:(state,{payload})=> {
            console.log(" fetching fulfiled");
            return {...state, allAdds : payload}
        },
    }

  })

  export const adds = (state)=>state.rootReducer.AddSlice.allAdds


export default AddSlice.reducer