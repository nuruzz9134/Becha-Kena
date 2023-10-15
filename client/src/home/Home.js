import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Advertisement from '../components/Advertisement'
import axios from 'axios';
import { fetchAsyncallAdds } from '../features/AddSlice';

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAsyncallAdds())
  }, []);

  return (
    <div>
      <Advertisement/>
    </div>
  )
}

export default Home