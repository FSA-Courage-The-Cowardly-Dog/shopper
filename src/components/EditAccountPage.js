import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../store/userSlice';
import Toastify from 'toastify-js'

const EditAccountPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
  });
  // may want a different component to be able to change/reset password

  React.useEffect(() => {
    // quick fix for edgecase when reloading on edit page
    const token = window.localStorage.getItem('token');
    if (!user.username) {
      navigate('/account');
    }
    setForm({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
    });
  }, []);
  const handleChange = (props) => (event) => {
    setForm({
      ...form,
      [props]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(updateUser(form, user.id));
      navigate('/account');
      Toastify({text: 'Account changes saved!', duration:2500 ,gravity: "bottom", position: "left", backgroundColor: "DodgerBlue"}).showToast();
    } catch (error) {
      Toastify({text: 'Username and/or email already registered', duration:2500 ,gravity: "bottom", position: "left", backgroundColor: "red"}).showToast();
    }
    
  };

  const checkDisabled = () => {
    return (
      !form.username.length ||
      !form.email.length ||
      !form.firstName.length ||
      !form.lastName.length
    );
  };

  return user.username ? (
    <div id="edit-account-form-container">
      <form id="edit-account-form" onSubmit={handleSubmit}>
        <h2 className='editTitle'>Edit Account Information</h2>
        <div className="form-line">
          <input
          className='editInput'
          placeholder='Username'
            name="username"
            value={form.username}
            onChange={handleChange('username')}
          />
        </div>
        <div className="form-line">
          
          <input
          className='editInput'
          placeholder='Email address'
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
          />
        </div>
        <div className="form-line">
      
          <input
          className='editInput'
          placeholder='FirstName'
            name="firstName"
            value={form.firstName}
            onChange={handleChange('firstName')}
          />
        </div>
        <div className="form-line">
         
          <input
          className='editInput'
          placeholder='LastName'
            name="lastName"
            value={form.lastName}
            onChange={handleChange('lastName')}
          />
        </div>
        <div className="form-line">
          
          <input
          className='editInput'
            placeholder='Address'
            name="address"
            value={form.address}
            onChange={handleChange('address')}
          />
        </div>
        <button className='editButton' type="submit" disabled={checkDisabled()}>
          Save Changes
        </button>
      </form>
    </div>
  ) : (
    <div>Must be logged in to edit account information</div>
  );
};

export default EditAccountPage;
