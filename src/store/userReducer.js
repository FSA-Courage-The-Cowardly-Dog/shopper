import axios from "axios";

const SET_USER = 'SET_USER';

const _setUser = user => ({
    type: SET_USER,
    user
});

//thunks
export const fetchUserByToken = token => {
    return async dispatch => {
        const {data: user} = await axios.get('/api/auth', {
            headers: {
                authorization: token
            }
        });
        dispatch(_setUser(user));
    }
};
export const logoutUser = () => {
    return dispatch => {
        dispatch(_setUser({}))
        window.localStorage.setItem("token", '')
    }
}
export const attemptSetToken = (username, password) => {
    return async () => {
        const {data: token} = await axios.post('/api/auth', {username,password});
        window.localStorage.setItem("token", token);
    }
}
export const createUser = (userDetails, isAdmin=false) => {
    return async (dispatch) => {
        const {data: user} = await axios.post('/api/users', {...userDetails,isAdmin})
        const {data: token} = await axios.post('/api/auth', {username: userDetails.username,password: userDetails.password})
        window.localStorage.setItem("token",token)
        dispatch(_setUser(user))
    }
}

// can add in createUser thunk here

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;