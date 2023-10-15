import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { acc_Token } from '../features/AuthSlice'
import { fetchAsyncalMyChats } from '../features/ChatlogSlice'
import AllChatHistory from './AllChatHistory'

const AllChats = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const acc_token = useSelector(acc_Token)
    dispatch(fetchAsyncalMyChats(acc_token))

  return (
    <div>
          <AllChatHistory/>
    </div>
  )
}

export default AllChats