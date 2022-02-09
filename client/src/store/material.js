export const SET_CATEGORY = "material/SET_CATEGORY";
export const SET_MATERIAL = "material/SET_MATERIAL";
export const SET_RECORD = "material/SET_RECORD";

export const SET_MATERIAL_PAGEINFO = "material/SET_MATERIAL_PAGEINFO";
export const SET_LIST_PAGEINFO = "material/SET_LIST_PAGEINFO";

export const CHANGE_CATEGORY = "material/CHANGE_CATEGORY";
export const CHANGE_MENU = "material/CHANGE_MENU";
export const CHANGE_PAGE = "material/CHANGE_PAGE";

const initialState = {
    categoryIndex: 0,
    categoryList: [{ 'name': '전체', 'no': -1 }],
    material: null,
    record: null,

    materialPageNo: 1,
    materialPageOffset: 0,
    materialSearch: '',

    listPageNo: 1,
    listPageOffset: 0,
    listSearchYear: '0',
    listSearchMonth: '0',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            let list = [{ 'name': '전체', 'no': -1 }]
            if (action.target && action.target.length > 0) {
                for (let i = 0; i < action.target.length; i++) {
                    list.push({
                        'name': action.target[i].name,
                        'no': action.target[i].material_category_no
                    });
                }

                list.push({ 'name': '미지정', 'no': 0 });
            }

            return {
                ...state,
                categoryList: list
            }
        case CHANGE_CATEGORY:
            return {
                ...state,
                categoryIndex: action.target,
            }
        case SET_MATERIAL:
            return {
                ...state,
                material: action.target,
            }
       case SET_RECORD:
            return {
                ...state,
                record: action.target,
            }
        case SET_MATERIAL_PAGEINFO:
            return {
                ...state,
                materialPageNo: action.target.pageNo,
                materialPageOffset: action.target.pageOffset,
                materialSearch: action.target.search,
            }
        case SET_LIST_PAGEINFO:
            return {
                ...state,
                listPageNo: action.target.pageNo,
                listPageOffset: action.target.pageOffset,
                listSearchYear: action.target.year,
                listSearchMonth: action.target.month,
            }
        default:
            return state;
    }
}