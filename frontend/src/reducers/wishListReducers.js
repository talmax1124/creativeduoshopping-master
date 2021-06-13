import {
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    WISHLIST_RESET_ITEM,
  } from '../constants/wishListConstants'
  
  export const wishListReducer = (state = { wishlist: [] }, action) => {
    switch (action.type) {
      case WISHLIST_ADD_ITEM:
        const item = action.payload
        const existItem = state.wishlist.find((x) => x.product === item.product)
        if (existItem) {
          return {
            ...state,
            wishlist: state.wishlist.map((x) =>
              x.product === existItem.product ? item : x
            ),
          }
        } else {
          return {
            ...state,
            wishlist: [...state.wishlist, item],
          }
        }
      case WISHLIST_REMOVE_ITEM:
        return {
          ...state,
          wishlist: state.wishlist.filter((x) => x.product !== action.payload),
        }
      case WISHLIST_RESET_ITEM:
        return {
          ...state,
          wishlist: [],
        }
      default:
        return state
    }
  }