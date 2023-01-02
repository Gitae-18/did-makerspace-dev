export const M_NOTICE_SET = "notice/SET";

const initialState = {
    noticeNo: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case M_NOTICE_SET: 
            return {
                ...state,
                noticeNo: action.target.notice_no, 
            }
    default:
            return state;
    }
}