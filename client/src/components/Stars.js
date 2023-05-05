import React from 'react'
import { FaStar, FaStarHalfAlt,} from "react-icons/fa";
import { AiOutlineStar} from "react-icons/ai";


const Stars = ({stars}) => {

    const ratingStar = Array.from({length:5},(element,index)=> {
        let number = index + 0.5 

        return <span key={index}>
                {
                    stars >= index + 1 ? <FaStar/> 
                    : stars >= number ? <FaStarHalfAlt />
                    : <AiOutlineStar/>
                }
        </span>
})



  return (
    <div>
        {ratingStar}
    </div>
  )
}

export default Stars