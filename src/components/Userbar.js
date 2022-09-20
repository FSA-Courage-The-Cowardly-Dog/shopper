import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userReducer";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";

const Userbar = ({ attemptTokenLogin }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return( user.id ?
        <div className='welcome-user'>
            {`Welcome back, ${user.username}`}
            <button onClick={() => dispatch(logoutUser())}>Sign Out</button>
        </div>
        :
        <div className="testing-div">
            <SignIn attemptTokenLogin={attemptTokenLogin}/>
            <CreateAccount/>
        </div>
       
    )
}

export default Userbar;