import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { attemptPsswordLogin } from '../store/userSlice';
import Toastify from 'toastify-js'

const SignIn = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  })

  const handleChange = (props) => (event) => {
    setState({
      ...state,
      [props]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        attemptPsswordLogin({
          username: state.username,
          password: state.password,
        })
      );
      navigate('/')
      Toastify({text: `Welcome back, ${state.username}`, duration:2000 ,gravity: "top", position: "right", backgroundColor: "orange"}).showToast();
    } catch (error) {
      Toastify({text: "Invalid username/password", duration:2500 ,gravity: "bottom", position: "left", backgroundColor: "red"}).showToast();
    }
  };

  return (
   
  <div className="signinContainer">

    <form  id="login-form" onSubmit={handleSubmit}>
    <h1 className='signinTitle'>SIGN IN</h1>
      <div className="login-line">
        <input
          className="login-input"
          placeholder='Email or Username'
          name="username"
          value={state.username}
          autoComplete="userName"
          onChange={handleChange('username')}
        />
      </div>
      <div className="login-line">
        <input
        placeholder='Password'
          className="login-input"
          name="password"
          type="password"
          value={state.password}
          autoComplete="current-password"
          onChange={handleChange('password')}
        />
      </div>
      <div className="createAccount">
        <button className='signinBtn' type="submit">Sign In</button>
        <Link to="/createaccount" className="create-account-link">
          <button className='accountBtn'>Create account?</button>
        </Link>
      </div>
    </form>
  </div>
  );
};

export default SignIn;
