import axios from 'axios'
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
  WISHLIST_RESET_ITEM,
} from '../constants/wishListConstants'

export const addToWishList = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  localStorage.setItem(
    'wishList',
    JSON.stringify(getState().productWishList.wishlist)
  )
}

export const removeFromWishList = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem(
    'wishList',
    JSON.stringify(getState().productWishList.wishlist)
  )
}

export const resetWishList = (id) => (dispatch) => {
  dispatch({
    type: WISHLIST_RESET_ITEM,
    payload: id,
  })
  localStorage.removeItem('wishList')
}
