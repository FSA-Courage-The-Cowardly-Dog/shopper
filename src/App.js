import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import CreateAccount from "./components/CreateAccount";
import EditAccountPage from "./components/EditAccountPage";
import OrderHistory from "./components/OrderHistory";
// import "./App.css";
import Userbar from "./components/Userbar";
import Welcome from "./components/Welcome";
import { fetchUserByToken } from "./store/userReducer";

function App() {
	const dispatch = useDispatch();
	// const user = useSelector(state => state.user)
	
	React.useEffect(() => {
		attemptTokenLogin();
	},[])

	const attemptTokenLogin = async () => {
		const token = window.localStorage.getItem("token");
		if (token) {
			dispatch(fetchUserByToken(token)) 
		}
	};
	

	return (
		<div className="App">
			<header>
				{/* <Userbar attemptTokenLogin={attemptTokenLogin}/> */}
			</header>
			{/* <Welcome /> */}
			<Routes>
				<Route index element={<Welcome/>}/>
				<Route path='/createaccount' element={<CreateAccount/>}/>
				<Route path='/account' element={<AccountPage/>}/>
				<Route path='/account/editinfo' element={<EditAccountPage/>}/>
				<Route path='/account/orderhistory' element={<OrderHistory/>}/>
			</Routes>
		</div>
	);
}

export default App;
