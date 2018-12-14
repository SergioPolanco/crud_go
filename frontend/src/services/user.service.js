import Axios from 'axios'
import { resolve } from 'path';
import { rejects } from 'assert';
//import config from 'config'
//import { authHeader } from '../helpers'


export {
    login,
    logout,
    addUser,
    getAll
}

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        url: 'http://localhost:1323/users/authenticate',
        auth: {
            username,
            password
        }
    }

    return await Axios(requestOptions)
        
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}



function getAll() {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // }
    return Axios.get('http://localhost:1323/users')
}

