import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/userSlice';
import '../styling/Mainpage.css'
import Toastify from 'toastify-js'

const Userbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
    Toastify({text: "Hope to see you again soon!", duration:2000 ,gravity: "top", position: "right", backgroundColor: "#ff8300"}).showToast();
  };

  return user.id ? (
    <div className="welcome-user">
      <span>
        {`Welcome back, `}{' '}
        <Link to="/account" className="username">
          {user.username}
        </Link>
      </span>
      <div className="signoutbtn">
        <button onClick={logout} className="sign-out-button">
           Sign Out
        </button>
      </div>
    </div>
  ) : (
    'hu'
    // <Link className='signIn' to='/signin'>
    //   <p className='loginLink'>Sign In</p>
    //   </Link>
  );
};

export default Userbar;
