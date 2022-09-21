import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";

const Userbar = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return user.id ? (
		<div className="welcome-user">
			{`Welcome back, `} <Link to="/account">{user.username}</Link>
			<button onClick={logout}>Sign Out</button>
		</div>
	) : (
		<div className="testing-div">
			<SignIn />
			{/* <CreateAccount/> */}
			{/* this div just for testing purposes since no routing in place yet; will likely only have SignIn component in here */}
		</div>
	);
};

export default Userbar;
