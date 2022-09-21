import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const user = useSelector((state) => state.user);

  return user.username ? (
    <div className="user-details">
      <h2>Profile Information:</h2>
      <div className="user-full-name">{`Name: ${user.firstName} ${user.lastName}`}</div>
      <div className="user-username">{`Username: ${user.username}`}</div>
      <div className="user-email">{`Email: ${user.email}`}</div>
      <div className="user-address">{`Address: ${
        user.address.length ? user.address : 'No address on file'
      }`}</div>
      <h3>
        Placeholder for now: below are links to edit user info and view order
        history
      </h3>
      <Link to="/account/orderhistory" id="order-history-link">
        Order History
      </Link>
      <Link to="/account/editinfo" id="edit-info-link">
        Edit Info
      </Link>
      {user.isAdmin ? (
        <Link to="/adminportal" id="admin-portal-link">
          Admin Portal
        </Link>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div>Must be logged in to view account page</div>
  );
};

export default AccountPage;
