import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from 'redux-logger';
import userReducer from './userSlice';
import allUsersReducer from './allUsersSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import orderHistoryReducer from './orderHistorySlice';
export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    allUsers: allUsersReducer,
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'production') {
      getDefaultMiddleware();
    } else {
      getDefaultMiddleware().concat(loggerMiddleware);
    }
  },
});
