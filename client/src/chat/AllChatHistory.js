import React from 'react'
import { useSelector } from 'react-redux'
import { mychats } from '../features/ChatlogSlice'
import GroupArry from './GroupArry'

const AllChatHistory = () => {
    const mychat = useSelector(mychats)
  return (
    <div className='chat-groupname-container'>
      <h4>Chat Groups</h4>
        {
                mychat.map((item,index)=>(
                    <GroupArry key={index} items={item}/>
                  ) 
                )
            }
    </div>
  )
}

export default AllChatHistory