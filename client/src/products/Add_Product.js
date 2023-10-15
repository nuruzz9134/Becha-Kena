import React from 'react'
import { useState } from 'react'

const Add_Product = () => {

    const [catagory,setCatagory] = useState('')
    const [productid,SetId] = useState('')
    const [productName,SetProductName] = useState('')
    const [type,setType] = useState('')
    const [companyName,SetCompanyName] = useState('')
    const [productSize,SetProductSize] = useState('')
    const [productPrice,SetproductPrice] = useState('')
    const [productOfferPrice,SetproductOfferPrice] = useState('')
    const [productQuantity,SetproductQuantity] = useState('')
    const [productWarranty,SetWarrantyMonth] = useState('')
    const [productDetailed,Setdescription] = useState('')
    const [productManufactureDate,SetmanufactureDate] = useState('')
    const [main_img,setEnteredMain_img] = useState('')
    const [image1,setEnteredImage1] = useState('')
    const [image2,setEnteredImage2] = useState('')
    const [image3,setEnteredImage3] = useState('')


    const handleSubmit = async(e)=> {
      e.preventDefault()
      const data = {
        productId : productid,
        catagory : catagory,
        name : productName,
        type : type,
        company : companyName,
        size : productSize,
        price : productPrice,
        offerPrice : productOfferPrice,
        detailed : productDetailed,
        quantity : productQuantity,
        warranty : productWarranty,
        manufactur_at : productManufactureDate,
        main_img: main_img,
        image1 : image1,
        image2 : image2,
        image3 : image3
      }

    }
  return (
    
    <div>
                

		<form onSubmit={handleSubmit}>
			<div className="form_wrap">

                <label for="catagory">Catagory</label>  <span> </span>
                <select id='catagory' onClick={e=>setCatagory(e.target.value)}>
                  <option value="#"></option> 
                  <option value="phone">Phone</option> 
                  <option value="laptop">Laptop</option> 
                </select>


				<div className="">
					<label for="productID">Create Product Id</label>
					<input type="text" id="productID"
                     onChange={e=>SetId(e.target.value)}
                     value={productid} />
				</div>


                <div className="">
					<label for="productName">Product Name</label>
					<input type="text" id="productName"
                     onChange={e=>SetProductName(e.target.value)}
                     value={productName} />
				</div>


                <div className="">
					<label for="companyName">Product Name</label>
					<input type="text" id="companyName"
                     onChange={e=>SetCompanyName(e.target.value)}
                     value={companyName} />
				</div>

                <div className="">
					<label for="productSize">Product Name</label>
					<input type="text" id="productSize"
                     onChange={e=>SetProductSize(e.target.value)}
                     value={productSize} />
				</div>


                <div className="">
					<label for="productPrice">Product Price</label>
					<input type="number" id="productPrice"
                     onChange={e=>SetproductPrice(e.target.value)}
                     value={productPrice} />
				</div>

                <div className="">
					<label for="productOfferPrice">Product Price</label>
					<input type="number" id="productOfferPrice"
                     onChange={e=>SetproductOfferPrice(e.target.value)}
                     value={productOfferPrice} />
				</div>


                <div className="">
					<label for="productQuantity">Product Quantity</label>
					<input type="number" id="productQuantity"
                     onChange={e=>SetproductQuantity(e.target.value)}
                     value={productQuantity} />
				</div>


                <label for="type">Type</label>  <span> </span>
                <select id='type' onClick={e=>setType(e.target.value)}>
                  <option value="#"></option> 
                  <option value="new">New</option> 
                  <option value="second hand">Second Hand</option> 
                  <option value="self made">self made</option> 
                </select>


                <div className="">
					<label for="description">Description</label>
					<input type="text" id="description"
                     onChange={e=>Setdescription(e.target.value)}
                     value={productDetailed} />
				</div>


                <div className="">
					<label for="manufacture">Manufacturing Date</label>
					<input type="date" id="manufacture"
                     onChange={e=>SetmanufactureDate(e.target.value)}
                     value={productManufactureDate} />
				</div>


                <div className="">
					<label for="warranty">Total Warranty Month</label>
					<input type="number" id="warranty"
                     onChange={e=>SetWarrantyMonth(e.target.value)}
                     value={productWarranty} />
				</div>

        <div className="">
        <label for="main_img">Main Img</label>
					<input type='file'className="productImages" id='main_img'
          onChange={e=>setEnteredMain_img(e.target.files[0])} />
				</div>
				<div className="">
        <label for="img1">Image 1</label>
					<input type='file'className="productImages" id='img1'
          onChange={e=>setEnteredImage1(e.target.files[0])} />
				</div>
        <div className="">
        <label for="img2">Image 2</label>
					<input type='file'className="productImages" id='img2' 
          onChange={e=>setEnteredImage2(e.target.files[0])} />
				</div>
        <div className="">
        <label for="img3">Image 3</label>
					<input type='file'className="productImages" id='img3' 
          onChange={e=>setEnteredImage3(e.target.files[0])} />
				</div>
				

				<div className="">
					<input type="submit" className="submit_btn"/>
				</div>
			</div>
		</form>
        </div>

  )
}

export default Add_Product