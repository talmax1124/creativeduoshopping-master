import React, { useEffect } from 'react'

 const ProductDescription = ({ Product }) => {
   useEffect(() => {
     const description = document.querySelector('.description')
     if (description) {
       description.innerHTML = Product.description
       let images = document.querySelectorAll('.description img')
       if (images) {
         images.forEach((item) => {
           item.style.width = '100%'
         })
       }
     }
   }, [Product])

   return <p className='description'></p>
 }

 export default ProductDescription