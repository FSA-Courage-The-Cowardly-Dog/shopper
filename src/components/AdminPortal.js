import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
            <div id="all-users">Placeholder for all users link; admin will be able to click in to view list of all user info, probably in paginated format</div>
            <div id="add-item">Placeholder for link adding new item</div>
            <div id="modify-delete-item">Placeholder for link to modify/delete existing items; another thought could be to give admins modify/delete privileges on singleProduct components</div>
        </div>
    )
}

export default AdminPortal;