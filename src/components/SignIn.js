import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { attemptSetToken } from "../store/userReducer";

const SignIn = ({ attemptTokenLogin }) => {
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch();

    const handleChange = props => event => {
        setState({
            ...state,
            [props]: event.target.value
        })
    }
    const handleSubmit = async event => {
        event.preventDefault();
        await dispatch(attemptSetToken(state.username, state.password))
        attemptTokenLogin();
    }

    return (
        <form id='login-form' onSubmit={handleSubmit}>
            <div className="login-line">
                <label htmlFor="username">Username: </label>
                <input className="login-input" name="username" value={state.username} onChange={handleChange('username')}/>
            </div>
            <div className="login-line">
                <label htmlFor="password">Username: </label>
                <input className="login-input" name="password" type="password" value={state.password} onChange={handleChange('password')}/>
            </div>
            <div className="log-in-line">
                {/* should make this a Link later */}
                {/* <Link id='create-account' to='/createaccount'>Create Account?</Link> */}
                <div>Create account?</div>
                <button type="submit">Sign In</button>   
            </div>
        </form>
    )
}

export default SignIn;