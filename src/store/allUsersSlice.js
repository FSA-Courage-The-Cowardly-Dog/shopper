import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {users: []},
  reducers: {
    _setAllUsers: (state, action) => {
      state.users = action.payload.users;
      state.count = action.payload.count
      return state;
    },
    _unsetAllUsers: (state) => {
      state.users = [];
      return state;
    },
    _setUsersByPage: (state, action) => {
      state.users = action.payload;
      return state;
    }
  },
});

export default allUsersSlice.reducer;
export const { _setAllUsers, _unsetAllUsers, _setUsersByPage } = allUsersSlice.actions;

export const fetchAllUsers = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const { data: users } = await axios.get('/api/users', {
    headers: {
      authorization: token,
    },
  });
  dispatch(_setAllUsers({users, count: users.length}));
};

export const fetchUsersByPage = (page, sort = false) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const urlString = `/api/users?page=${page}` + (sort ? '&sort=true' : '&sort=false')
  const { data: users } = await axios.get(urlString, {
    headers: {
      authorization: token,
    },
  });
  dispatch(_setUsersByPage(users));
};
export const unsetAllUsers = () => (dispatch) => {
  dispatch(_unsetAllUsers());
};
