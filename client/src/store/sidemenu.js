export const SET_SIDEMENU = "sidemenu/SET_SIDEMENU";
export const MENU_CHANGE = "sidemenu/MENU_CHANGE";
export const CHANGE_DEPTH = "sidemenu/CHANGE_DEPTH";



export const PAGE_VIEW = {
    LIST: 0,
    REG: 1,
    EDIT: 2,
}
const initialState={
    sideNaviMenu: 0,
    menuDepth:1,
}

export default (state = initialState, action) => {
    switch (action.type) {        
        case MENU_CHANGE:
            console.log(state.sideNaviMenu);
        return{
            ...state,
            sideNaviMenu:action.target,
            pageView: PAGE_VIEW.LIST,
        }
        case CHANGE_DEPTH:
            return{
            ...state,
            menuDepth:action.target,
            }
        default:
            return state;
    }
}