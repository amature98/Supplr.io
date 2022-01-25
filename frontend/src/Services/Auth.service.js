import axios from 'axios'

const API_URL = 'http://localhost:8000/api/auth/'

export const signup = (email, password) => {
    return axios.post(API_URL + 'signup', {
        email,
        password,
    })
}

export const login = (email, password) => {
    const response =  axios
        .post(API_URL + 'login', {
            email,
            password,
        })
    if (response.data.accessAToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

export const logout = () => {
    localStorage.removeItem('user')
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}