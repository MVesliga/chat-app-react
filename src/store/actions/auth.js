import * as actionTypes from './actionTypes';
import axiosAuth from '../../axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (userCredentials) => {
    return dispatch => {
        dispatch(authStart());
        axiosAuth.post('/login', userCredentials).then(response => {
            dispatch(authSuccess(response.data));
        }).catch(error => {
            console.log(error.response.data);
            dispatch(authFail(error.response.data));
        })
    };
};

export const logout = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};

//Channel
export const setCurrentChannel = (channel) => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        currentChannel: channel
    }
}

export const setPrivateChannel = (isPrivateChannel) => {
    return {
        type: actionTypes.SET_PRIVATE_CHANNEL,
        isPrivateChannel: isPrivateChannel
    }
}

