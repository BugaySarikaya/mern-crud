import axios from 'axios'
import { SET_CURRENT_USER } from './types'
import setAuthToken from './setAuthToken'
import jwt_decode from 'jwt-decode'
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const registerUser = (user, history) => dispatch => {
    api.post('/register', user)
        .then(res => history.push('/users/login'))
        .catch(err => {
            console.log(err);
        });
}

export const loginUser = (user, history) => dispatch => {
    api.post('/login', user)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
            history.push('/users/list')
        })
        .catch(err => {
            console.log(err);
        });
}

export const getAllUsers = () => api.get(`/users`, {
    headers: {
        'Authorization': `${localStorage.jwtToken}`
    }
})
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload, {
    headers: {
        'Authorization': `${localStorage.jwtToken}`
    }
})
export const deleteUserById = id => api.delete(`/user/${id}`, {
    headers: {
        'Authorization': `${localStorage.jwtToken}`
    }
})
export const getUserById = id => api.get(`/user/${id}`, {
    headers: {
        'Authorization': `${localStorage.jwtToken}`
    }
})

const apis = {
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default apis

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/users/login');
}
