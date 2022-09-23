import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        setCart: (state, action) => {
            state = action.payload;
            return state;
        },
        removeFromCart: (state, action) => {
            state = action.payload;
            return state;
        },
        updateQtyInCart: (state, action) => {
            state = action.payload;
            return state;
        },
        addToCart: (state, action) => {
            state = action.payload;
            return state;
        },
        updateAddress: (state, action) => {
            state = action.payload;
            return state;
        },
        checkout: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})
export default cartSlice.reducer;
export const { setCart, addToCart, removeFromCart, updateQtyInCart, updateAddress, checkout } = cartSlice.actions;

export const attemptGetUserCart = () => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        const { data: userCart } = await axios.get(`/api/auth/usercart`, {
            headers: {
              authorization: token,
            }
        });
        dispatch(setCart(userCart))
    } 
    else {
        const localCart = await JSON.parse(window.localStorage.getItem('cart'));
        dispatch(setCart(localCart))
    }   
}

export const attemptRemoveFromCart = (lineItemId) => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: userCart } = await axios.delete(`/api/auth/usercart/${lineItemId}`, {
        headers: {
          authorization: token,
        }
    });
    dispatch(removeFromCart(userCart));
}

export const attemptUpdateQtyInCart = (lineItemId, qty) => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: userCart } = await axios.put(
        `/api/auth/usercart/${lineItemId}`,
        {qty}, 
        {
            headers: {
            authorization: token,
            }
        }
    );
    dispatch(updateQtyInCart(userCart))
}

export const attemptAddToCart = (productId, qty) => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: userCart } = await axios.post(
        `/api/auth/usercart`,
        {productId, qty}, 
        {
            headers: {
            authorization: token,
            }
        }
    );
    dispatch(addToCart(userCart))
}
export const attemptUpdateOrderAddress = (address) => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: userCart } = await axios.put(
        `/api/auth/usercart`,
        {address}, 
        {
            headers: {
            authorization: token,
            }
        }
    );
    dispatch(updateAddress(userCart))
}
export const attemptCheckout = () => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: order } = await axios.put(
        `/api/auth/usercart/checkout`,
        {}, 
        {
            headers: {
            authorization: token,
            }
        }
    );
    dispatch(checkout(order))
}

// thunks for adding items to cart; may want to do similar way as above
// first check if token exists, then use axios cart route
// if doesn't exist, update the localStorage cart