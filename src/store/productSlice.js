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
    getTagsList: (state, action) => {
      state.tagsList = action.payload;
      return state;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
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
  getTagsList,
  setItemsPerPage,
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
  (productDetails, tag) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: singleProduct } = await axios.post(
        '/api/products/add-product',
        { productDetails, tag },
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
  (productDetails, productId, newTag) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: singleProduct } = await axios.put(
        `/api/products/${productId}`,
        { action: 'update-product-details', productDetails, newTag },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateProduct(singleProduct));
    } catch (err) {
      return err;
    }
  };
export const attemptRemoveTagFromProduct =
  (productId, tagName) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: singleProduct } = await axios.put(
        `/api/products/${productId}`,
        { action: 'remove-tag', tagName },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateProduct(singleProduct));
    } catch (err) {
      return err;
    }
  };
export const attemptChangeProductTag =
  (productId, prevName, newName) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: singleProduct } = await axios.put(
        `/api/products/${productId}`,
        { action: 'change-tag', prevName, newName },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateProduct(singleProduct));
    } catch (err) {
      return err;
    }
  };
export const attemptDeleteProduct = (productId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    await axios.delete(`/api/products/${productId}`, {
      headers: {
        authorization: token,
      },
    });
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

export const attemptGetTagList =
  (params, itemsPerPage = 24) =>
  async (dispatch) => {
    try {
      const { data: tagobj } = await axios.get(
        `/api/products/${params.categories}/${params.page}?items=${itemsPerPage}`,
        { hi: '12' }
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

export const attemptGetAllTags = () => async (dispatch) => {
  try {
    const { data: tags } = await axios.get('/api/products/tags');
    dispatch(getTagsList(tags));
  } catch (error) {
    return error;
  }
};
