import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers, unsetAllUsers } from "../../store/allUsersSlice";

const AllUsersAdminView = () => {
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.allUsers)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
        dispatch(fetchAllUsers(user))
        return () => {
            dispatch(unsetAllUsers())
        }
    },[])

    // will likely want to add pagination functionality later when enough users
    return(
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
                    {users.map((user,idx) => {
                        return(
                            <tr key={(idx)}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.Address}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AllUsersAdminView;