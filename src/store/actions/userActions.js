import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => {
    console.log('userLoginSuccess action creator called with:', userInfo);// đã thêm
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        userInfo: userInfo
    }
}

export const userLoginFail = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})