import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
import userReducer from "./userSlice";
// import userReducer from "./userReducer";
import productReducer from "./productSlice";
// import cartReducer from './cartSlice'
export default configureStore({
	reducer: {
		user: userReducer,
		product: productReducer,
		// cart: cartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(loggerMiddleware),
});
