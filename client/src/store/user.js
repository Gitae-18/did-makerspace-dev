export const CHANGE_INPUT = "user/CHANGE_INPUT";
export const LOGIN_START = "user/LOGIN_START";
export const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
export const LOGIN_FAIL = "user/LOGIN_FAIL";
export const LOGOUT = "user/LOGOUT";
export const LOAD_USER = "user/LOAD_USER";

const initialState = {
    userId: '',
    password: '',
    isAutoLogin: false,
    isLoginStart: false,
    isLoggedIn: false,
    isLoading: true,
    userName: '',
    token: '',
    authority_level: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                [action.target.name]: (action.target.name === 'isAutoLogin') ? action.target.checked : action.target.value
            }
        case LOGIN_START:
            return {
                ...state,
                isLoginStart: true,
            }
        case LOGIN_SUCCESS:
            console.log(action);
           // if (state.isAutoLogin) {
                localStorage.setItem(
                    "loggedinUser",
                    JSON.stringify({
                        userId: state.userId,
                        isLoggedIn: true,
                        userName: action.payload.name,
                        token: action.payload.token,
                        authority_level: action.payload.authority_level,
                    })
                );
            //}

            return {
                ...state,
                isLoginStart: false,
                isLoggedIn: true,
                isLoading: false,
                password: '',
                userName: action.payload.name,
                token: action.payload.token,
                authority_level: action.payload.authority_level,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoginStart: false,
                password: '',
            }
        case LOGOUT:
            localStorage.removeItem("loggedinUser");
            return {
                ...state,
                userId: '',
                password: '',
                isLoginStart: false,
                isLoggedIn: false,
                isLoading: false,
                isAutoLogin: false,
                userName: '',
                token: '',
                authority_level: 0,
            }
        case LOAD_USER: {
            const loggedinUser = localStorage.getItem("loggedinUser");
            if (loggedinUser) {
                console.log('load_user')
                return {
                    ...state,
                    isLoginStart: false,
                    isLoading: false,
                    isLoggedIn: true,
                    password: '',
                    userName: JSON.parse(loggedinUser).userName,
                    token: JSON.parse(loggedinUser).token,
                    authority_level: JSON.parse(loggedinUser).authority_level,
                }
            } 
            return {
                ...state,
                isLoading: false,
            }
        }
        default:
            return state;
    }
};