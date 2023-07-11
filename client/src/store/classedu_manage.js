export const M_CLASS_SET= "classedu_manage/SET";
export const M_EDU_SET= "classedu_manage/EDUSET";
export const M_CLASS_RESET = "classedu_manage/RESET";
export const M_CLASS_DELETE = "classedu_manage/DELETE";
const initialState = {
    programNo: 0,
    eduNo: 0,
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case M_CLASS_SET:
            console.log(state.programNo);
            return {
                ...state,
                programNo: action.target,
            }
        case M_EDU_SET:
            console.log(state.eduNo);
            return{
                ...state,
                eduNo: action.target,
            }
            
        case M_CLASS_DELETE:
            return{
                ...state,
                username:'',
                title : '',
            }
        case M_CLASS_RESET: 
            return {
                ...state,
                programNo: 0, 
            }
         default:
            return state;
    }
}