import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import AddNewProduct from "./components/admin/AddNewProduct";
import AdminPortal from "./components/admin/AdminPortal";
import AllUsersAdminView from "./components/admin/AllUsersAdminView";
import CreateAccount from "./components/CreateAccount";
import EditAccountPage from "./components/EditAccountPage";
import OrderHistory from "./components/OrderHistory";
// import "./App.css";
import Userbar from "./components/Userbar";
import Welcome from "./components/Welcome";
import { attemptTokenLogin } from "./store/userSlice";

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(attemptTokenLogin());
	}, [dispatch]);

	return (
		<div className="App">
			<header>
				<Userbar attemptTokenLogin={attemptTokenLogin} />
			</header>
			<Routes>
				<Route index element={<Welcome />} />
				<Route path="/createaccount" element={<CreateAccount />} />
				<Route path="/account" element={<AccountPage />} />
				<Route path="/account/editinfo" element={<EditAccountPage />} />
				<Route path="/account/orderhistory" element={<OrderHistory />} />
				<Route path="/adminportal" element={<AdminPortal/>}/>
				<Route path="/adminportal/allusers" element={<AllUsersAdminView/>}/>
				<Route path="/adminportal/addproduct" element={<AddNewProduct/>}/>
			</Routes>
		</div>
	);
}

export default App;
