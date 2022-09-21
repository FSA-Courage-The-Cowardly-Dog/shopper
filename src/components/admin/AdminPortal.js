import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AdminPortal = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    React.useEffect(() => {
        // navigate back to home page if user is not admin
        if (!user.isAdmin) {
            navigate('/')
        }
    },[])

    return(
        <div id="admin-links">
            <div id="all-users"><Link to="/adminportal/allusers">All Users Table</Link></div>
            <div id="add-item"><Link to="/adminportal/addproduct">Add Product</Link></div>
            <div id="modify-delete-item"><Link to="/adminportal/allproducts">All Products Table</Link></div>
        </div>
    )
}

export default AdminPortal;

// will work on viewing all user information first; will want to make an express route to serve up all users, but check that user is an admin
// maybe look into passing in the user object calling the route, or some other parameters; could even just pass in the user.isAdmin value
// will likely need to create new slice for the store, maybe allUsersSlice or something

// in express route, check an if statement to make sure user authorized; if not, res.send("unauthorized access");
// that way, I'm thinking that maybe will protect the api route? unsure.