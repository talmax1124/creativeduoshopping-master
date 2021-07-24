import {
    COUPONS_GET_REQUEST,
    COUPONS_GET_SUCCESS,
    COUPONS_GET_FAIL,
    COUPON_CREATE_REQUEST,
    COUPON_CREATE_SUCCESS,
    COUPON_CREATE_FAIL,
    COUPON_CREATE_RESET,
    COUPON_DELETE_REQUEST,
    COUPON_DELETE_SUCCESS,
    COUPON_DELETE_FAIL,
  } from '../constants/couponConstants'
  export const couponsListReducer = (state = { coupons: [] }, action) => {
    switch (action.type) {
      case COUPONS_GET_REQUEST:
        return {
          loading: true,
          coupons: [],
        }
      case COUPONS_GET_SUCCESS:
        return {
          loading: false,
          success: true,
          coupons: action.payload,
        }
      case COUPONS_GET_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
 
  export const CreateCouponReducer = (state = {}, action) => {
    switch (action.type) {
      case COUPON_CREATE_REQUEST:
        return {
          loading: true,
        }
      case COUPON_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          coupon: action.payload,
        }
      case COUPON_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      case COUPON_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
 
  export const RemoveCouponReducer = (state = {}, action) => {
    switch (action.type) {
      case COUPON_DELETE_REQUEST:
        return { loading: true }
      case COUPON_DELETE_SUCCESS:
        return { loading: false, success: true }
      case COUPON_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }