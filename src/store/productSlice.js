import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const productSlice = createSlice({
  name: 'product',
  initialState: { productList: [], singleProduct: {} },
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
    unsetSingleProduct: (state) => {
      state.singleProduct = {};
      return state;
    },
    updateProduct: (state, action) => {
      state.singleProduct = action.payload;
      return state;
    },
    setPageinfo: (state, action) => {
      state.count = action.payload.count;
      state.page = action.payload.page;
      state.category = action.payload.categories;
      return state;
    },
  },
});
export default productSlice.reducer;
export const {
  getProductList,
  getSingleProduct,
  createNewProduct,
  unsetSingleProduct,
  updateProduct,
  setPageinfo,
} = productSlice.actions;
export const attemptGetProductList = () => async (dispatch) => {
  try {
    const { data: productlist } = await axios.get('/api/products');
    dispatch(getProductList(productlist));
  } catch (error) {
    return error;
  }
};
export const attemptGetSingleProduct = (productId) => async (dispatch) => {
  try {
    const { data: singleProduct } = await axios.get(
      `/api/products/${productId}`
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
export const attemptUpdateProduct =
  (productDetails, productId, user) => async (dispatch) => {
    try {
      if (!user.isAdmin) {
        throw new Error(
          'Unauthorized access: do not have permission to add new products'
        );
      }
      const { data: singleProduct } = await axios.put(
        `/api/products/${productId}`,
        { ...productDetails }
      );
      dispatch(updateProduct(singleProduct));
    } catch (err) {
      return err;
    }
  };
export const attemptDeleteProduct = (productId, user) => async (dispatch) => {
  try {
    if (!user.isAdmin) {
      throw new Error(
        'Unauthorized access: do not have permission to add new products'
      );
    }
    await axios.delete(`/api/products/${productId}`);
    dispatch(attemptGetProductList());
  } catch (err) {
    return err;
  }
};

export const attemptUnmountSingleProduct = () => (dispatch) => {
  try {
    dispatch(unsetSingleProduct());
  } catch (err) {}
};

export const attemptGetTagList = (params) => async (dispatch) => {
  try {
    const { data: tagobj } = await axios.get(
      `/api/products/${params.categories}/${params.page}`
    );
    dispatch(getProductList(tagobj.rows));
    dispatch(
      setPageinfo({
        count: tagobj.count,
        page: params.page,
        category: params.categories,
      })
    );
  } catch (error) {
    return error;
  }
};
