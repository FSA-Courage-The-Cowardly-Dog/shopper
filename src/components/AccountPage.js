import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styling/AccountPage.css'

const AccountPage = () => {
  const user = useSelector((state) => state.user);

  return user.username ? (
    <div className="user-details">
      <h2 className='accountinfoheader'>Profile Information:</h2>
      <div className="userDetails">{`Username: ${user.username}`}</div>
      <div className="userDetails">{`Email: ${user.email}`}</div>
      <div className="userDetails">{`Address: ${
        user.address.length ? user.address : 'No address on file'
      }`}</div>
      <div className="profileLinks">
      <Link className='profLinks' to="/account/editinfo" id="edit-info-link">
        Edit Info
      </Link>
      <Link className='profLinks' to="/account/orderhistory" id="order-history-link">
        Order History
      </Link>
      {user.isAdmin ? (
        <Link className='profLinks' to="/adminportal" id="admin-portal-link">
          Admin Portal
        </Link>
      ) : (
        <></>
      )}
      </div>
    </div>
  ) : (
    <div>Must be logged in to view account page</div>
  );
};

export default AccountPage;
