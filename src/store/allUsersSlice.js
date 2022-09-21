import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    _setAllUsers: (state, action) => {
      state = action.payload;
      return state;
    },
    _unsetAllUsers: (state) => {
      state = [];
      return state;
    },
  },
});

export default allUsersSlice.reducer;
export const { _setAllUsers, _unsetAllUsers } = allUsersSlice.actions;

export const fetchAllUsers = (user) => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  const { data: users } = await axios.get('/api/users', {
    headers: {
      authorization: token,
    },
  });
  console.log('Logging users in slice: ', users);
  dispatch(_setAllUsers(users));
};
export const unsetAllUsers = () => (dispatch) => {
  dispatch(_unsetAllUsers());
};
