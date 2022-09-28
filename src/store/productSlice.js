import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const algoliasearch = require('algoliasearch');
const ALGOLIA_WRITE_KEY = '7fb3d68d816c23dcfa25c6df36eff2b1';
const requestOptions = {
  timeouts: { connect: 2, read: 20 },
};
const client = algoliasearch('0STO802E4O', ALGOLIA_WRITE_KEY, requestOptions);
const index = client.initIndex('test_index');
const productSlice = createSlice({
  name: 'product',
  initialState: { productList: [], singleProduct: {} },
  reducers: {
    getProductList: (state, action) => {
      state.productList = action.payload.productList;
      if (action.payload.count) {
        state.count = action.payload.count;
      }
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
      state.category = action.payload.category;
      return state;
    },
    getTagsList: (state, action) => {
      state.tagsList = action.payload;
      return state;
    },
    setProductsByPage: (state, action) => {
      state.productList = action.payload;
      return state;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      return state;
    },
    setPriceOrder: (state, action) => {
      state.priceOrder = action.payload;
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
  setProductsByPage,
  setItemsPerPage,
  setPriceOrder,
} = productSlice.actions;
export const attemptGetProductList =
  (tag = '') =>
  async (dispatch) => {
    try {
      const { data: productList } = await axios.get('/api/products', {
        headers: {
          tagfilter: tag,
        },
      });
      dispatch(getProductList({ productList, count: productList.length }));
    } catch (error) {
      throw error;
    }
  };
export const attemptGetSingleProduct = (productId) => async (dispatch) => {
  try {
    const { data: singleProduct } = await axios.get(
      `/api/products/${productId}`
    );
    if (singleProduct === null) {
      throw new Error('Product does not exist');
    }
    dispatch(getSingleProduct(singleProduct));
  } catch (error) {
    throw error;
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
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
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
    throw err;
  }
};

export const attemptUnmountSingleProduct = () => (dispatch) => {
  try {
    dispatch(unsetSingleProduct());
  } catch (err) {}
};

export const attemptGetTagList =
  (params, itemsPerPage = 24, priceOrder = false, query = null) =>
  async (dispatch) => {
    try {
      if (query) {
        console.log(params);
        const requestOptions = {
          hitsPerPage: Number(itemsPerPage),
          page: Number(params.page) - 1,
        };
        let products = await index.search(query, requestOptions);
        console.log(products.hits);
        dispatch(getProductList({ productList: products.hits }));
        dispatch(
          setPageinfo({
            count: products.nbHits,
            page: params.page,
            category: 'search',
          })
        );
      } else {
        const { data: tagobj } = await axios.get(
          `/api/products/${params.categories}/${
            params.page
          }?items=${itemsPerPage}${priceOrder ? `&price=${priceOrder}` : ''}`,
          { hi: '12' }
        );
        dispatch(getProductList({ productList: tagobj.rows }));
        dispatch(
          setPageinfo({
            count: tagobj.count,
            page: params.page,
            category: params.categories,
          })
        );
      }
    } catch (error) {
      return error;
    }
  };

export const attemptGetAllTags = () => async (dispatch) => {
  try {
    const { data: tags } = await axios.get('/api/products/tags');
    dispatch(getTagsList(tags));
  } catch (error) {
    throw error;
  }
};

export const getProductsByPage =
  (page, sort = false, tag = '') =>
  async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const urlString =
        `/api/products?page=${page}` +
        (sort ? '&sort=true' : '&sort=false') +
        (tag.length ? `&tag=${tag}` : '');
      const { data: products } = await axios.get(urlString, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setProductsByPage(products));
    } catch (error) {
      throw error;
    }
  };
