export const M_SERVICE_SET = "manager_service/SET";
export const M_SERVICE_RESET = "manager_service/RESET";
export const M_SERVICE_VIEW_CHANGE = "manager_service/VIEW_CHANGE";
export const M_SERVICE_DELETE = "manager_service/VIEW_DELETE";
const initialState = {
    serviceNo: 0,
    progress: '',
    status: '',
    currentView: '',
};

const progressValue = {
    'STEP_01' : 1,
    'STEP_02' : 2,
    'STEP_03' : 3,
    'STEP_04' : 4,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case M_SERVICE_SET: 
            return {
                ...state,
                serviceNo: action.target.service_no,
                progress: action.target.progress,
                status: action.target.status,
                currentView: action.target.progress,
            }
        case M_SERVICE_DELETE:
            return{
                ...state,
                username:'',
                title : '',
                progress: '',
                status: '',
            }
        case M_SERVICE_VIEW_CHANGE: 
        console.log("a");
            if (progressValue[state.progress]
                && progressValue[action.target]
                && progressValue[state.progress] >= progressValue[action.target]) {
                return {
                    ...state,
                    currentView: action.target,
                }
            }
            return state;
        case M_SERVICE_RESET: 
            return {
                ...state,
                serviceNo: 0, 
                progress: '',
                status: '',
                currentView: '',
            }
         default:
            return state;
    }
}