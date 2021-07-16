import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_COUPON,
  CART_SAVE_ORDERNOTES,
  CART_SAVE_FILEUPLOAD
} from "../constants/cartConstants";

export const addToCart =
  (
    id,
    qty
    // , qty1,
    // qty2,
    // qty3,
    // qty4, qty5
  ) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        specialPrice: data.specialPrice,
        countInStock: data.countInStock,
        // countSmall: data.countSmall,
        // countMedium: data.countMedium,
        // countLarge: data.countLarge,
        // countXLarge: data.countXLarge,
        // countXXLarge: data.countXXLarge,
        qty,
        // qty1,
        // qty2,
        // qty3,
        // qty4,
        // qty5,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const saveOrderNotesMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_ORDERNOTES,
    payload: data,
  });

  
  localStorage.setItem("saveOrderNotesMethod", JSON.stringify(data));
};

export const saveFileUploadMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_FILEUPLOAD,
    payload: data,
  });

  
  localStorage.setItem("saveFileUploadMethod", JSON.stringify(data));
};

export const addCoupon = (coupon) => (dispatch) => {
  let couponDiscount = 0;

  // TODO: Get couponDiscount value from db

  if (coupon.toLowerCase() === "creativeduoadmin") {
    couponDiscount = 0.1;
  }

  if (coupon.toLowerCase() === "militarydiscount5") {
    couponDiscount = 0.05;
  }

  if (coupon.toLowerCase() === "sister") {
    couponDiscount = 0.03;
  }

  dispatch({
    type: CART_ADD_COUPON,
    payload: { coupon, couponDiscount },
  });

  localStorage.setItem("coupon", JSON.stringify(coupon));
  localStorage.setItem("couponDiscount", JSON.stringify(couponDiscount));
};
