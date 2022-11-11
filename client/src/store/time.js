export const SET_DATE = '/reservation/SET_DATE'

const initialState ={
    date : "2022-11-08",
};

export default(state=initialState,action) => {
    switch(action.type)
    {
        case SET_DATE:
            return{...state,newdate: action.payload};
        default:
            return state;
    }
}

