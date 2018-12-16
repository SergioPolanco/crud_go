import { userConstants } from '../constants/user.constants'
import {
    login as userLogin,
    getAll as getAllUsers,
    logout as userLogout
} from '../services/user.service'
import { alertActions } from './alert.actions'
import { history } from '../helpers/history'

export {
    login,
    logout,
    getAll
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }))

        userLogin(username, password)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch(success(response.data))
            history.push('/')
        })
        .catch(error => {
            dispatch(failure(error))
            dispatch(alertActions.error(error))
        })
    }

    function request(user) {
        return {
            type: userConstants.LOGIN_REQUEST, user
        }
    }

    function success(user) {
        return {
            type: userConstants.LOGIN_SUCCESS, user
        }
    }

    function failure(error) {
        return {
            type: userConstants.LOGIN_FAILURE, error
        }
    }
}

function logout() {
    userLogout()
    return {
        type: userConstants.LOGOUT
    }
}

function getAll() {
    return dispatch => {
        dispatch(request())
        getAllUsers()
            .then(response => dispatch(success(response.data)))
            .catch(error => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            })
    }

    function request() {
        return {
            type: userConstants.GETALL_REQUEST
        }
    }
    function success(users) {
        return {
            type: userConstants.GETALL_SUCCESS, users
        }
    }
    function failure(error) {
        return {
            type: userConstants.GETALL_FAILURE, error
        }
    }
}