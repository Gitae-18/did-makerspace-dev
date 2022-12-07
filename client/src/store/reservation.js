export const RES_EQUIP_SET = "reservation/SET";

const initialState={
    reservationNo:0,
    status:"",
    datetime:"",
}
export default (state = initialState, action) =>{
    switch(action.type){
        case RES_EQUIP_SET:
            return{
                ...state,
                reservationNo:action.target.reservation_no,
                status:action.target.reservation_status,
                datetime:action.target.reservation_date,
            }
        default:
            return state;
    }
}