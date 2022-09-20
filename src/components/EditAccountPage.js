import React from "react";
import { useSelector } from "react-redux";

const EditAccountPage = () => {
    const user = useSelector(state => state.user);

    return( user.username ?
        <div>Placeholder for editing stuff</div>
        : <div>Must be logged in to edit account information</div>
    )
}

export default EditAccountPage