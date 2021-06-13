import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList, removeFromWishList } from '../actions/wishListActions'

const Favorites = ({ product }) => {
  const dispatch = useDispatch()
  const [isWish, setIsWish] = useState(false)

  const wishlistStore = useSelector((state) => state.productWishList)
  const { wishlist } = wishlistStore

  const checkWishList = (productId) => {
    if (productId) {
      const item = wishlist.find((item) => {
        return item.product === productId
      })
      setIsWish(item !== undefined)
      console.log(isWish)
      return item
    }
  }
  useEffect(() => {
    checkWishList(product._id)
  })
  const addToWishListHandler = (productId) => {
    if (isWish) {
      dispatch(removeFromWishList(productId))
    } else {
      dispatch(addToWishList(productId, 1))
    }
    checkWishList(productId)
  }

  return (
    <div>
      <div onClick={() => addToWishListHandler(product._id)}>
        {isWish ? (
          <div className='header__cart__icon__product__filled'>
            <i className='fas fa-heart' />{' '}
          </div>
        ) : (
          <div className='header__cart__icon__product'>
            <i className='fas fa-heart' />{' '}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
