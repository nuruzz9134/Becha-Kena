import React from 'react'
import '../Css/adds.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector} from 'react-redux';
import { adds } from '../features/AddSlice';

const Advertisement = () => {
  
  const image = useSelector(adds)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % image.length);
    }, 2000); // Change slide every 2 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [image]);

  if (image ==null) return null

  return (
    <div className="carousel">
      {image.map((img, index) => (
        <div
          key={index}
          className={`carousel-slide ${
            index === currentSlide ? 'active' : ''
          }`}
        >
          <img src={img} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default Advertisement