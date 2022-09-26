import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState: [],
    reducers: {
        setOrderHistory: (state, action) => {
            state = action.payload;
            return state;
        },
        unsetOrderHistory: (state) => {
            state = [];
            return state;
        }
    }
})
export default orderHistorySlice.reducer;
export const {
  setOrderHistory,
  unsetOrderHistory
} = orderHistorySlice.actions;
export const attemptGetOrderHistory = () => async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: orders } = await axios.get(
        '/api/auth/orderhistory', 
        {
            headers: {
            authorization: token,
            }
        }
    );
    dispatch(setOrderHistory(orders))
}
export const unmountOrderHistory = () => (dispatch) => {
    dispatch(unsetOrderHistory())
}