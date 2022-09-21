import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllUsersAdminView = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
    },[])


    return(
        <div>Placeholder for all users list in admin portal</div>
    )
}

export default AllUsersAdminView;