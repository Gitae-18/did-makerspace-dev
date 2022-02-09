export const CHANGE_INPUT = "userInfo/CHANGE_INPUT";
export const CHANGE_CHECKBOX = "userInfo/CHANGE_CHECKBOX";
export const CHECK_EMAIL_SUCCESS = "userInfo/CHECK_EMAIL_SUCCESS";
export const FIND_POSTCODE = "userInfo/FIND_POSTCODE";
export const USER_ADDRESS = "userInfo/USER_ADDRESS";
export const USER_ZIP = "userInfo/USER_ZIP";
export const COMPANY_ADDRESS = "userInfo/COMPANY_ADDRESS";
export const COMPANY_ZIP = "userInfo/COMPANY_ZIP";
export const CLEAR = "userInfo/CLEAR";

const initialState = {
    user: {
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        phoneNumber: '',
        zip: '',
        address: '',
        addressDetail: '',
        position: '',
    },
    company: {
        name: '',
        registrationNumber: '',
        phoneNumber: '',
        businessField: '',
        zip: '',
        address: '',
        addressDetail: '',
    },
    isAgreeTerms: false,
    isAgreePersonalInfo: false,
    isAddCompanyInfo: true,
    isCheckedEmail: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_INPUT:
            let strArray = action.target.name.split('.');
            if (strArray[0] === 'user') {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        [strArray[1]]: action.target.value,
                    }
                }
            } else if (strArray[0] === 'company') {
                return {
                    ...state,
                    company: {
                        ...state.company,
                        [strArray[1]]: action.target.value,
                    }
                }
            } else {
                return {
                    ...state,
                }
            }
        case CHANGE_CHECKBOX:
            return {
                ...state,
                [action.target.name]: action.target.checked
            }
       case CHECK_EMAIL_SUCCESS:
            return {
                ...state,
                isCheckedEmail: action.value
            }
        case USER_ADDRESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    address: action.target
                }
            }
        case USER_ZIP:
            return {
                ...state,
                user: {
                    ...state.user,
                    zip: action.target
                }
            }
        case COMPANY_ADDRESS:
            return {
                ...state,
                company: {
                    ...state.company,
                    address: action.target
                }
            }
        case COMPANY_ZIP:
            return {
                ...state,
                company: {
                    ...state.company,
                    zip: action.target
                }
            }
        case CLEAR:
            return state = initialState

        default:
            return state;
    }
};