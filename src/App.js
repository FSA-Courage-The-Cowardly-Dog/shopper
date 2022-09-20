import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
				<Userbar attemptTokenLogin={attemptTokenLogin}/>
			</header>
			<Welcome />
		</div>
	);
}

export default App;
