
import React from 'react'
import "./allCSS/OfferSection.css"
import special_offer from "../images/special_offer.jpg"


const OfferSection = () => {
  return (
    <div className='offer-section'>
        <img src={special_offer} alt='offer img' />
    </div>
  )
}

export default OfferSection