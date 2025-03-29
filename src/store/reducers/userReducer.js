import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    userInfo: null
}

const appReducer = (state = initialState, action) => {
    console.log('Reducer received action:', action.type, action);// đã thêm
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log('Processing USER_LOGIN_SUCCESS');// đã thêm
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;