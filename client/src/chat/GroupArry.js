import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const GroupArry = ({items}) => {

  const navigate = useNavigate()
  return (
        <div className='chat-groupname'>
            <Link to= {`/fetchchat/${items}/`}>
                  {items}
            </Link>
        </div>
  )
}

export default GroupArry