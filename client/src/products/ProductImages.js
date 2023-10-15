import React from 'react'
import { useState } from 'react'
import '../Css/productDetailed.css';

const ProductImages = ({imgs}) => {
    const [mainImage,setMainImage] = useState(imgs[0])
  return (
    <div className='image-detailed-presentation'>

    <div className='image-destructuring'>
      {
        imgs.map((currentImg,index)=>{
          return(
            <div className='image-all-parts'>
                {
                    <img 
                src={currentImg}
                alt="image"
                key={index}
                onClick={()=>setMainImage(currentImg)}
                />
                }
            </div>
          )
        }
        )
      }
    </div>
  <div className='image-single-parts'>
    <img src={mainImage} alt="image"/>
  </div>
  </div>
  )
}

export default ProductImages