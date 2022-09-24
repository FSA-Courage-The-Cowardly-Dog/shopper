import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/userSlice';
import '../styling/Mainpage.css'

const Userbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return user.id ? (
    <div className="welcome-user">
      <span>
        {`Welcome back, `}{' '}
        <Link to="/account" className="username">
          {user.username}
        </Link>
      </span>
      <button onClick={logout} className="sign-out-button">
        Sign Out
      </button>
    </div>
  ) : (
    'hu'
    // <Link className='signIn' to='/signin'>
    //   <p className='loginLink'>Sign In</p>
    //   </Link>
  );
};

export default Userbar;
