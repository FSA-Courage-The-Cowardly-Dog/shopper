import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../store/userSlice";

const CreateAccount = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: "",
		password: "",
		email: "",
		firstName: "",
		lastName: "",
	});

	const handleChange = (props) => (event) => {
		setForm({
			...form,
			[props]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await dispatch(createUser(form));
		navigate("/account");
	};

	const checkDisabled = () => {
		return (
			!form.username.length ||
			!form.password.length ||
			!form.email.length ||
			!form.firstName.length ||
			!form.lastName.length
		);
	};

	return !user.id ? (
		<form id="create-account-container" onSubmit={handleSubmit}>
			<div id="create-account-form">
				<h2>New Account Information</h2>
				<div className="form-line">
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						value={form.username}
						onChange={handleChange("username")}
					/>
				</div>
				<div className="form-line">
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						value={form.password}
						onChange={handleChange("password")}
					/>
				</div>
				<div className="form-line">
					<label htmlFor="email">Email: </label>
					<input type="email" value={form.email} onChange={handleChange("email")} />
				</div>
				<div className="form-line">
					<label htmlFor="firstName">First Name: </label>
					<input
						type="text"
						value={form.firstName}
						onChange={handleChange("firstName")}
					/>
				</div>
				<div className="form-line">
					<label htmlFor="lastName">Last Name: </label>
					<input
						type="text"
						value={form.lastName}
						onChange={handleChange("lastName")}
					/>
				</div>
				<button type="submit" disabled={checkDisabled()}>
					Create Account
				</button>
			</div>
		</form>
	) : (
		<div>Cannot create account when already logged in</div>
	);
};

export default CreateAccount;
