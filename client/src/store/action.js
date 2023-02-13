export const COUNT_INCREASE = "action/COUNT_INCREASE"


const initialState = {
    count : 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case COUNT_INCREASE:
            return{
                ...state,
                count:action.target,
            }
        default:
            return
        
        
    }
}