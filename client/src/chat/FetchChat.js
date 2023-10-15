import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { acc_Token } from '../features/AuthSlice'
import { fetchMyChatsSortCut } from '../features/ChatlogSlice'

const FetchChat = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {groupname} = useParams()
    const access_token = useSelector(acc_Token)
    const [option,SetYourOption] = useState('')

    const data = {
    token : access_token,
    group : groupname
    }
    dispatch(fetchMyChatsSortCut(data))
    
    if (option === 'yes'){
        navigate(`/chat_with/${groupname}/`)
    }else(
        navigate(`/products/`)
        )

  return (
    <div className='fetch-chat-opin'>
        Do you want to chat ? 
        <div>
            <button onClick={()=>SetYourOption('yes')}>YES</button>
        </div>
        <div>
            <button onClick={()=>SetYourOption('no')}>NO</button>
        </div>
       
    </div>
  )
}

export default FetchChat