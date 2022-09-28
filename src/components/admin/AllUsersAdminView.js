import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAllUsers, fetchUsersByPage, unsetAllUsers } from '../../store/allUsersSlice';
import Toastify from 'toastify-js'

const AllUsersAdminView = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.allUsers.users);
  const totalUsers = useSelector((state) => state.allUsers.count)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage]  = useState(searchParams.get('page'))
  const [sortByLastName, setSortByLastName] = useState(false)

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    async function loadAllAndPage () {
      await dispatch(fetchAllUsers);
      await dispatch(fetchUsersByPage(page, sortByLastName))
    }
    if ((user.id && !user.isAdmin) || !token) {
      navigate('/');
      Toastify({text: `Not authorized for admin portal`, duration:2500 ,gravity: "bottom", position: "right", backgroundColor: "red"}).showToast();
    }
    if (page) {
      if (!totalUsers) {
        loadAllAndPage()
      } else {
        dispatch(fetchUsersByPage(page, sortByLastName))
      }
    } else {
      dispatch(fetchAllUsers());
    }
    return () => {
      dispatch(unsetAllUsers());
    };
  }, [user.id, page, sortByLastName]);

  return ( users.length ?
    <>
    <div className='allusers-header'>
      <h1>All User Information ({totalUsers})</h1>
      <div>
        <input type='checkbox' name='sort-lastName' defaultChecked={sortByLastName} onChange={() => setSortByLastName(!sortByLastName)}/>
        <label htmlFor='sort-lastName'>Sort by Last Name (Asc.)</label>
      </div>
      <div className='display-info'>
        <div className='display-text'>Displaying 25 users per page:</div>
        <div className="prev-next">
          <Link to={`/adminportal/allusers?page=${Number(page)-1}`} className={Number(page) === 1 ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page-1)}>Prev</Link>
          <Link to={`/adminportal/allusers?page=${Number(page)+1}`} className={page*25 >= totalUsers ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page+1)}>Next</Link>
        </div>
      </div>
    </div>
    <div id="all-users-table-container">
      <table id="all-users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            {/* May later add functionality where admins can change admin status */}
            <th>Admin?</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            return (
              <tr key={idx}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='footer-nav-links'>
        <Link to="/adminportal" className='back-to-admin-link'>Back to portal</Link>
        <div className="prev-next">
          <Link to={`/adminportal/allusers?page=${Number(page)-1}`} className={Number(page) === 1 ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page-1)}>Prev</Link>
          <Link to={`/adminportal/allusers?page=${Number(page)+1}`} className={page*25 >= totalUsers ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page+1)}>Next</Link>
        </div>
      </div>
    </div>
    </>
    : <div>Loading...</div>
    
  );
};

export default AllUsersAdminView;
