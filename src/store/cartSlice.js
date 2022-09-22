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
        }
    }
})
export default cartSlice.reducer;
export const { setCart, removeFromCart, updateQtyInCart } = cartSlice.actions;

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

// thunks for adding items to cart; may want to do similar way as above
// first check if token exists, then use axios cart route
// if doesn't exist, update the localStorage cart