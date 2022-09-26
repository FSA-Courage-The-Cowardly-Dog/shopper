import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js'
import './Admin.css'

const AdminPortal = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if ((user.id && !user.isAdmin) || !token) {
      navigate('/');
      Toastify({text: `Not authorized for admin portal`, duration:2500 ,gravity: "bottom", position: "right", backgroundColor: "red"}).showToast();
    }
  }, [user.id]);

  return (
    <div className="admin-links">
      <h1 className='adminTitle'>Welcome back to the Admin Portal</h1>

      <div className="adminLinks">
         <div id="all-users">
            <Link className='links' to="/adminportal/allusers">All Users Table</Link>
         </div>
          <div id="add-item">
           <Link className='links' to="/adminportal/addproduct">Add Product</Link>
         </div>
          <div id="modify-delete-item">
           <Link className='links' to="/adminportal/allproducts">All Products Table</Link>
         </div>
      </div>
    </div>
  );
};

export default AdminPortal;
