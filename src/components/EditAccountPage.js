import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../store/userSlice";

const EditAccountPage = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        address: ''
    })
    // may want a different component to be able to change/reset password
    
    React.useEffect(() => {
        // quick fix for edgecase when reloading on edit page
        if(!user.username) {
            navigate('/account')
        }
        setForm({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address
        })
    },[])
    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser(form, user.id))
        navigate('/account')
    }

    const checkDisabled = () => {
        return (
            !form.username.length ||
            !form.email.length ||
            !form.firstName.length ||
            !form.lastName.length
        );	
	};

    return( user.username ?
        <div id="edit-account-form-container">
            <form id="edit-account-form" onSubmit={handleSubmit}>
                <h2>Edit Account Information</h2>
                <div className="form-line">
                    <label htmlFor="username">Username: </label>
                    <input name="username" value={form.username} onChange={handleChange('username')}/>
                </div>    
                <div className="form-line">
                    <label htmlFor="email">Email: </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange('email')}/>
                </div>
                <div className="form-line">
                    <label htmlFor="firstName">First Name: </label>
                    <input name="firstName" value={form.firstName} onChange={handleChange('firstName')}/>
                </div>
                <div className="form-line">
                    <label htmlFor="lastName">Last Name: </label>
                    <input name="lastName" value={form.lastName} onChange={handleChange('lastName')}/>
                </div>
                <div className="form-line">
                    <label htmlFor="address">Address: </label>
                    <input name="address" value={form.address} onChange={handleChange('address')}/>
                </div>
                <button type="submit" disabled={checkDisabled()}>Save Changes</button>
            </form>
        </div> 
        : <div>Must be logged in to edit account information</div>
    )
}

export default EditAccountPage