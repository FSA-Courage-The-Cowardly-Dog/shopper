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
        // setLocalCart: (state) => {
        //     state = JSON.parse(window.localStorage.getItem('cart'));
        //     return state;
        // }
    }
})
export default cartSlice.reducer;
export const { setCart } = cartSlice.actions;

export const attemptGetUserCart = (userId) => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        const { data: userCart } = await axios.get(`/api/users/${userId}/cart`, {
            headers: {
              authorization: token,
            }
        });
        console.log(userCart)
        dispatch(setCart(userCart))
    } 
    else {
        // will need to make sure to setItem cart elsewhere; likely in App.js useEffect function
        // first try to getItem('cart'); if doesn't exist, then setItem('cart','{}')
        const localCart = await JSON.parse(window.localStorage.getItem('cart'));
        // dispatch(setCart(localCart))
        dispatch(setCart(localCart))
    }   
}
// export const setCartFromLocalStorage = () => dispatch => {
//     dispatch(setCart(JSON.parse(window.localStorage.getItem('cart'))))
// }
// thunks for adding items to cart; may want to do similar way as above
// first check if token exists, then use axios cart route
// if doesn't exist, update the localStorage cart