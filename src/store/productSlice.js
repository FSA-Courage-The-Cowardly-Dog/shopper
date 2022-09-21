import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const productSlice = createSlice({
  name: 'product',
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
    createNewProduct: (state, action) => {
      state.singleProduct = action.payload;
      return state;
    },
  },
});
export default productSlice.reducer;
export const { getProductList, getSingleProduct, createNewProduct } =
  productSlice.actions;
export const attemptGetProductList = (tag) => async (dispatch) => {
  try {
    const { data: productlist } = await axios.get('/api/product');
    dispatch(getProductList(productlist));
  } catch (error) {
    return error;
  }
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
export const attemptCreateNewProduct =
  (productDetails, user) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: singleProduct } = await axios.post(
        '/api/products/add-product',
        productDetails,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(createNewProduct(singleProduct));
    } catch (err) {
      return err;
    }
  };
