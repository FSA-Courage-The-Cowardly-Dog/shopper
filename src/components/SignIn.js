import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptPsswordLogin } from '../store/userSlice';

const SignIn = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleChange = (props) => (event) => {
    setState({
      ...state,
      [props]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      attemptPsswordLogin({
        username: state.username,
        password: state.password,
      })
    );
    // adding for now for edge case when user logs in on cart page
    // still doesn't properly load all items if there were local cart items as well;
    // requires a second manual refresh
    window.location.reload(false)
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <div className="login-line">
        <label htmlFor="username">Username: </label>
        <input
          className="login-input"
          name="username"
          value={state.username}
          autoComplete="userName"
          onChange={handleChange('username')}
        />
      </div>
      <div className="login-line">
        <label htmlFor="password">Password: </label>
        <input
          className="login-input"
          name="password"
          type="password"
          value={state.password}
          autoComplete="current-password"
          onChange={handleChange('password')}
        />
      </div>
      <div className="login-line">
        <Link to="/createaccount" className="create-account-link">
          Create account?
        </Link>
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
};

export default SignIn;
