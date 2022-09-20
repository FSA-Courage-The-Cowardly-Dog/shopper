import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../store/userReducer";

const CreateAccount = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    })

    const handleChange = props => event => {
        setForm({
            ...form,
            [props]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await dispatch(createUser(form));
        // maybe after this, navigate to account page? or home page?
    }

    const checkDisabled = () => {
        return (!form.username.length || !form.password.length || !form.email.length || !form.firstName.length || !form.lastName.length) 
    }

    return( !user.id ?
        <form id='create-account-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type='text' value={form.username} onChange={handleChange('username')}/>
            <label htmlFor="password">Password: </label>
            <input type='password' value={form.password} onChange={handleChange('password')}/>
            <label htmlFor="email">Email: </label>
            <input type='email' value={form.email} onChange={handleChange('email')}/>
            <label htmlFor="firstName">First Name: </label>
            <input type='text' value={form.firstName} onChange={handleChange('firstName')}/>
            <label htmlFor="lastName">Last Name: </label>
            <input type='text' value={form.lastName} onChange={handleChange('lastName')}/>
            <button type='submit' disabled={checkDisabled()}>Create Account</button>
        </form>
        : <div>Cannot create account when already logged in</div>
    )
}

export default CreateAccount;