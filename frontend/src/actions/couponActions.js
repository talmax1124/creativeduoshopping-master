import axios from 'axios'
 import {
   COUPONS_GET_REQUEST,
   COUPONS_GET_SUCCESS,
   COUPONS_GET_FAIL,
   COUPON_CREATE_REQUEST,
   COUPON_CREATE_SUCCESS,
   COUPON_CREATE_FAIL,
   COUPON_DELETE_REQUEST,
   COUPON_DELETE_SUCCESS,
   COUPON_DELETE_FAIL,
 } from '../constants/couponConstants'
 import { logout } from './userActions'

 export const getCoupons = () => async (dispatch) => {
   try {
     dispatch({ type: COUPONS_GET_REQUEST })
     const { data } = await axios.get(`/api/coupons`)
     dispatch({ type: COUPONS_GET_SUCCESS, payload: data })
   } catch (error) {
     dispatch({
       type: COUPONS_GET_FAIL,
       payload:
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message,
     })
   }
 }

 export const createCoupon = (coupon) => async (dispatch, getState) => {
   try {
     dispatch({
       type: COUPON_CREATE_REQUEST,
     })

     const {
       userLogin: { userData },
     } = getState()

     const config = {
       headers: {
         Authorization: `Bearer ${userData.token}`,
       },
     }

     const { data } = await axios.post(`/api/coupons/coupon`, coupon, config)

     dispatch({
       type: COUPON_CREATE_SUCCESS,
       payload: data,
     })
   } catch (error) {
     const message =
       error.response && error.response.data.message
         ? error.response.data.message
         : error.message
     if (message === 'Not authorized, token failed') {
       dispatch(logout())
     }
     dispatch({
       type: COUPON_CREATE_FAIL,
       payload: message,
     })
   }
 }

 export const removeCoupon = (couponId) => async (dispatch, getState) => {
   try {
     dispatch({
       type: COUPON_DELETE_REQUEST,
     })

     const {
       userLogin: { userData },
     } = getState()

     const config = {
       headers: {
         Authorization: `Bearer ${userData.token}`,
       },
     }

     await axios.delete(`/api/coupons/coupon/${couponId}`, config)

     dispatch({
       type: COUPON_DELETE_SUCCESS,
     })
   } catch (error) {
     const message =
       error.response && error.response.data.message
         ? error.response.data.message
         : error.message
     if (message === 'Not authorized, token failed') {
       dispatch(logout())
     }
     dispatch({
       type: COUPON_DELETE_FAIL,
       payload: message,
     })
   }
 }