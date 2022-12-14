import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state) => {
      state = {};
      return state;
    },
    update: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export default userSlice.reducer;
export const { login, logout, update } = userSlice.actions;

export const attemptTokenLogin = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    try {
      const { data: userInfo } = await axios.post(
        '/api/auth',
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      await _mergeLocalCartWithUserCart(userInfo.id, token)
      dispatch(login(userInfo));
    } catch (err) {
      window.localStorage.removeItem('token');
    }
  }
};
export const attemptPsswordLogin = (loginInfo) => async (dispatch) => {
  try {
    const { data: token } = await axios.post('/api/auth/login', loginInfo);
    window.localStorage.setItem('token', token);
    dispatch(attemptTokenLogin());
  } catch (error) {
    throw error;
  }
};
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };
};
export const createUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.post('/api/users', {
        ...userDetails,
      });
      if (user) {
        attemptPsswordLogin({
          username: userDetails.username,
          password: userDetails.password,
        })(dispatch);
      }
    } catch (error) {
      throw error;
    }
  };
};
export const updateUser = (userDetails, userId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    const { data: user } = await axios.put(
      `/api/users/${userId}`,
      userDetails,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(update(user));
  } catch (error) {
    throw error;
  }
};
const _mergeLocalCartWithUserCart = async (userId, token) => {
  let localCart = JSON.parse(window.localStorage.getItem('cart'));
  let lineItems = Object.entries(localCart);
  await axios.put(`/api/users/${userId}/cart`, 
    lineItems, 
    {
      headers: {
        authorization: token,
      },
  })
  window.localStorage.setItem('cart',JSON.stringify({}))
}