import React from 'react'
import { useSelector } from 'react-redux'
import { userId } from '../features/AuthSlice'
import '../Css/chat.css';



const ChatBox = ({items}) => {
  const {content, img, timestamp,sender} = items
  const userid = useSelector(userId)
    
  if (userid == sender){
      if(content){
        return(<div className='my-chats'>
          <div className='your-message-green'>
              <div>{content}</div>
              <div>Time : {timestamp}</div>
          </div>
          </div>
        )
      }
      if(img){
        return(<div>
          <div className='your-message-green'>
              <div><img src={img}/></div>
              <div>Time : {timestamp}</div>
          </div>
          </div>
        )
      }
  }

  if (userid != sender){
    if(content){
      return(<>
        <div className='other-message-red'>
            <div>{content}</div>
            <div>{timestamp}</div>
        </div>
        </>
      )
    }
    if(img){
      return(<>
        <div className='other-message-red'>
            <div><img src={img}/></div>
            <div>{timestamp}</div>
        </div>
        </>
      )
    }
}
  
    }

export default ChatBox