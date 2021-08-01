import React, { useEffect } from 'react'

 const OrderNotesJoditOrder = ({ order }) => {
   useEffect(() => {
     const orderNotes = document.querySelector('.orderNotes')
     if (orderNotes) {
        orderNotes.innerHTML = order.orderNotes
       let images = document.querySelectorAll('.orderNotes img')
       if (images) {
         images.forEach((item) => {
           item.style.width = '100%'
         })
       }
     }
   }, [order])

   return <p className='orderNotes'></p>
 }

 export default OrderNotesJoditOrder