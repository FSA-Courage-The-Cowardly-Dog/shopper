import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import AdminPortal from "./components/AdminPortal";
import CreateAccount from "./components/CreateAccount";
import EditAccountPage from "./components/EditAccountPage";
import OrderHistory from "./components/OrderHistory";
// import "./App.css";
import Userbar from "./components/Userbar";
import Welcome from "./components/Welcome";
import { attemptTokenLogin } from "./store/userSlice";

function App() {
	const dispatch = useDispatch();
	// const user = useSelector(state => state.user)

	React.useEffect(() => {
		dispatch(attemptTokenLogin());
	}, [dispatch]);

	return (
		<div className="App">
			<header>
				<Userbar attemptTokenLogin={attemptTokenLogin} />
			</header>
			{/* <Welcome /> */}
			<Routes>
				<Route index element={<Welcome />} />
				<Route path="/createaccount" element={<CreateAccount />} />
				<Route path="/account" element={<AccountPage />} />
				<Route path="/account/editinfo" element={<EditAccountPage />} />
				<Route path="/account/orderhistory" element={<OrderHistory />} />
				<Route path="/adminportal" element={<AdminPortal/>}/>
			</Routes>
		</div>
	);
}

export default App;
