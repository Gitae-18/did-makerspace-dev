export const CHANGE_MENU = "management/CHANGE_MENU";
export const CHANGE_PAGE = "management/CHANGE_PAGE";
export const COMPANY_ITEM = "management/COMPANY_ITEM";
export const USER_ITEM = "management/USER_ITEM";
export const STASTICS_ANALYZE = "management/STASTICS_ANALYZE";
export const EQUIP_CATEGORY_ITEM = "management/EQUIP_CATEGORY_ITEM";
export const EQUIP_ITEM = "management/EQUIP_ITEM";
export const MATERIAL_CATEGORY_ITEM = "management/MATERIAL_CATEGORY_ITEM";
export const MATERIAL_ITEM = "management/MATERIAL_ITEM";
export const SERVICE_CATEGORY_ITEM = "management/SERVICE_CATEGORY_ITEM";
export const OLD_SERVICE_ITEM = "management/OLD_SERVICE_ITEM";

export const SET_MATERIAL_PAGEINFO = "management/MATERIAL_PAGEINFO";

export const PAGE_VIEW = {
    LIST: 0,
    REG: 1,
    EDIT: 2,
}

const initialState = {
    sideNaviPos: 0,
    pageView: 0,

    companyItem: null,
    userItem: null,
    equipCategoryItem: null,
    equipItem: null,
    materialCategoryItem: null,
    materialItem: null,
    serviceCategoryItem: null,
    

    materialPageNo: 1,
    materialPageOffset: 0,
    materialSearch: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MENU:
            return {
                ...state,
                sideNaviPos: action.target,
                pageView: PAGE_VIEW.LIST,
            }
        case CHANGE_PAGE:
            return {
                ...state,
                pageView: action.target,
            }
        case COMPANY_ITEM:
            return {
                ...state,
                companyItem: action.target,
            }
        case USER_ITEM:
            return {
                ...state,
                userItem: action.target,
            }
        case EQUIP_CATEGORY_ITEM:
            return {
                ...state,
                equipCategoryItem: action.target,
            }
        case EQUIP_ITEM:
            return {
                ...state,
                equipItem: action.target,
            }
        case MATERIAL_CATEGORY_ITEM:
            return {
                ...state,
                materialCategoryItem: action.target,
            }
        case MATERIAL_ITEM:
            return {
                ...state,
                materialItem: action.target,
            }
        case SERVICE_CATEGORY_ITEM:
           
            return {
                ...state,
                serviceCategoryItem: action.target,
            }
           
        case OLD_SERVICE_ITEM:
            return {
                ...state,
                oldServiceItem: action.target,
            }
        case SET_MATERIAL_PAGEINFO:
            return {
                ...state,
                materialPageNo: action.target.pageNo,
                materialPageOffset: action.target.pageOffset,
                materialSearch: action.target.search,
            }
        case STASTICS_ANALYZE:
            return{
                ...state,
                stasticsanalyze:action.target,
            }
        default:
            return state;
    }
}