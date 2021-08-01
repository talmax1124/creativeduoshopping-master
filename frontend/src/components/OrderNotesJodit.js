import React, { useEffect } from 'react'

 const OrderNotesJodit = ({ cart }) => {
   useEffect(() => {
     const orderNotes = document.querySelector('.orderNotes')
     if (orderNotes) {
        orderNotes.innerHTML = cart.orderNotes
       let images = document.querySelectorAll('.orderNotes img')
       if (images) {
         images.forEach((item) => {
           item.style.width = '100%'
         })
       }
     }
   }, [cart])

   return <p className='orderNotes'></p>
 }

 export default OrderNotesJodit