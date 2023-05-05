import React, { useState } from 'react'

const MyImages = ({imgs = [{url : ""}]}) => {
  const [mainImage,setMainImage] = useState(imgs[0])
  return( 
    <div className='image-detailed-presentation'>

    <div className='image-destructuring'>
      {
        imgs.map((currentImg,index)=>{
          return(
            <div className='image-all-parts'>
                {<img 
                src={currentImg.url}
                alt={currentImg.filename}
                key={index}
                onClick={()=>setMainImage(currentImg)}

                />}
            </div>
          )
        }
        )
      }
    </div>
  <div className='image-single-parts'>
    <img src={mainImage.url} alt={mainImage.filename}/>
  </div>
  </div>
  )

}

export default MyImages
