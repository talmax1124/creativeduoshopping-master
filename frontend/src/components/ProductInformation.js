import React, { useEffect } from 'react'

 const ProductInformation = ({ Product }) => {
   useEffect(() => {
     const productImportantInformation = document.querySelector('.productImportantInformation')
     if (productImportantInformation) {
      productImportantInformation.innerHTML = Product.productImportantInformation
       let images = document.querySelectorAll('.productImportantInformation img')
       if (images) {
         images.forEach((item) => {
           item.style.width = '100%'
         })
       }
     }
   }, [Product])

   return <p className='productImportantInformation'></p>
 }

 export default ProductInformation