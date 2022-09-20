import React from "react";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";

const Userbar = ({ attemptTokenLogin }) => {
    const user = useSelector(state => state.user)

    return( user.id ?
        <div className='welcome-user'>
            {`Welcome back, ${user.username}`}
        </div>
        :
        <SignIn attemptTokenLogin={attemptTokenLogin}/>
    )
}

export default Userbar;