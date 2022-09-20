import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const userSlice = createSlice({
	name: "user",
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
	},
});
export default userSlice.reducer;
export const { login } = userSlice.actions;
export const attemptTokenLogin = () => async (dispatch) => {
	const token = window.localStorage.getItem("token");
	if (token) {
		const { data: userInfo } = await axios.get("/api/user");
		dispatch(login(userInfo));
	}
	return false;
};
export const attemptPssWordLogin = (loginInfo) => async (dispatch) => {
	try {
		const { data: token } = await axios.post("/api/user/login", loginInfo);
		window.localStorage.setItem("token", token);
		attemptTokenLogin()(dispatch);
	} catch (error) {
		return error;
	}
};
