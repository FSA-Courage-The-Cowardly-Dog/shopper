import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const reducer = {
    user: userReducer,
}

const store = configureStore({reducer, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableStateInvariant: false,
    }),})

export default store;