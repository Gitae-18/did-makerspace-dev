import React,{useEffect} from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import InfoType2b from "../../components/contents/InfoType2b";
import { ClassEdu_program4 ,ClassEdu_program3} from "../../components/pages/PageSub3";

import qs from 'qs';
export const ClassEduContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.classeduManage);
    const { search } = useLocation();
    const location = useLocation();
    const history = useNavigate();
    const currentUrl = location.pathname;
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{state:{url:currentUrl,no:viewState.programNo}}); }
	}, [isLoading, isLoggedIn, authority_level, history])
    const View = location.pathname === "/eduprogram/detail" ?  ClassEdu_program4:location.pathname === "/classprogram/detail" ? ClassEdu_program3:<></> ;
    return(
        (isLoading || !isLoggedIn /* || authority_level < AuthLevel.partner */) ? <></>:
        View? <View query={query}  no={ location.pathname === "/classprogram/detail"? viewState.programNo : location.pathname === "/eduprogram/detail"?viewState.eduNo: null}/> : <></>
    )
}