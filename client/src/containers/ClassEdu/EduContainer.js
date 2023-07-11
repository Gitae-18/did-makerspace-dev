import React,{useEffect} from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import  ClassEdu_program, { ClassEdu_Program2 } from "../../components/pages/PageSub3";
import qs from 'qs';

export const EduContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.classeduManage);
    const { search } = useLocation();
    const location = useLocation();
    const history = useNavigate();
    const currentUrl = location.pathname;
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    console.log(viewState.programNo);
    useEffect(() => {
        if (isLoading) { return; }
       /*  if (!isLoggedIn) { return history('/notmember',{state:{url:currentUrl,no:viewState.programNo}}); } */
	}, [isLoading, isLoggedIn, authority_level, history])
    const View = query.type === "class"? ClassEdu_Program2: ClassEdu_Program2;
    return(
 /*        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>: */
        View? <View query={query} /* program_no={viewState.programNo} *//> : <></>
    )
}