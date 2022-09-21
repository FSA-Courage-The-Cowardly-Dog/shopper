import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AccountPage = () => {
    const user = useSelector(state => state.user) 

    return( user.username ?
        <div className="user-details">
            <h2>Profile Information:</h2>
            <div className="user-full-name">{`Name: ${user.firstName} ${user.lastName}`}</div>
            <div className="user-username">{`Username: ${user.username}`}</div>
            <div className="user-email">{`Email: ${user.email}`}</div>
            <div className="user-address">{`Address: ${user.address.length ? user.address : 'No address on file'}`}</div>
            <h3>Placeholder for now: below are links to edit user info and view order history</h3>
            <Link to='/account/orderhistory'>Order History</Link>
            <Link to='/account/editinfo'>Edit Info</Link>
            {user.isAdmin ?
                <div>Placedholder for admin portal link; will be able to add/edit/delete items, see all users and user information</div>
                : <></>
            }
        </div>
        : <div>Must be logged in to view account page</div>
    )
}

export default AccountPage;