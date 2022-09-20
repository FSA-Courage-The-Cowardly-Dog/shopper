import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const userSlice = createSlice({
	name: "product",
	initialState: {},
	reducers: {
		getProductList: (state, action) => {
			state.productList = action.payload;
			return state;
		},
		getSingleProduct: (state, action) => {
			state.singleProduct = action.payload;
			return state;
		},
	},
});
export default userSlice.reducer;
export const { getProductList, getSingleProduct } = userSlice.actions;
export const attemptGetProductList = (tag) => async (dispatch) => {
	try {
		const { data: productlist } = await axios.get("/api/user");
		dispatch(getList(productlist));
	} catch (error) {}
};
export const attemptGetSingleProduct = (productId) => async (dispatch) => {
	try {
		const { data: singleProduct } = await axios.get(
			`/api/product/:${productId}`
		);
		dispatch(getSingleProduct(singleProduct));
	} catch (error) {
		return error;
	}
};
