import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../store/userSlice';
import Toastify from 'toastify-js'

const CreateAccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (props) => (event) => {
    setForm({
      ...form,
      [props]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createUser(form));
      navigate('/account');
      Toastify({text: `Account created. Welcome ${form.username}`, duration:2500 ,gravity: "top", position: "right", backgroundColor: "orange"}).showToast();
    } catch (error) {
      Toastify({text: 'Username and/or email already registered', duration:2500 ,gravity: "bottom", position: "left", backgroundColor: "red"}).showToast();
    }
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
        <h1 className='createAccounttitle'>Create New Account</h1>
        <div className="form-line">
          <input
          className='login-input'
          placeholder='Username'
            type="text"
            value={form.username}
            onChange={handleChange('username')}
          />
        </div>
        <div className="form-line">
          <input
          className='login-input'
          placeholder='Password'
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
        </div>
        <div className="form-line">
          <input
          className='login-input'
            placeholder='Email address'
            type="email"
            value={form.email}
            onChange={handleChange('email')}
          />
        </div>
        <div className="form-line">
          <input
          className='login-input'
          placeholder='First name'
            type="text"
            value={form.firstName}
            onChange={handleChange('firstName')}
          />
        </div>
        <div className="form-line">
          <input
          className='login-input'
          placeholder='Last name'
            type="text"
            value={form.lastName}
            onChange={handleChange('lastName')}
          />
        </div>
        <button className='createAccountBtn' type="submit" disabled={checkDisabled()}>
          Create Account
        </button>
      </div>
    </form>
  ) : (
    <div>Cannot create account when already logged in</div>
  );
};

export default CreateAccount;
