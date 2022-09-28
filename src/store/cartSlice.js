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

export const attemptAddToCart = (productId, qty, size) => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: userCart } = await axios.post(
        `/api/auth/usercart`,
        {productId, qty, size}, 
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
export const attemptCheckout = (total) => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: order } = await axios.put(
        `/api/auth/usercart/checkout`,
        {total}, 
        {
            headers: {
            authorization: token,
            }
        }
    );
    dispatch(checkout(order))
}

export const attemptStripeCheckout = (lineItems) => async (dispatch) => {
    try {
        const stripeItems = lineItems.map(lineItem => ({price_data: {currency: 'usd', product_data: {name: lineItem.product.name}, unit_amount: lineItem.product.price}, quantity: lineItem.quantity}))
        const { data } = await axios.post('/api/auth/usercart/create-checkout-session', {
            lineItems: JSON.stringify(stripeItems)
        })
        window.location.assign(data.url)
    } catch (err) {
        throw (err)
    }
}