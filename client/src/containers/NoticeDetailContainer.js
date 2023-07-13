import React,{useEffect}from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { ContactNoticeDetail } from "../components/pages/PageSub4";
import { AuthLevel } from '../CommonCode';
import qs from 'qs';
export const NoticeDetailContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.notice);

    const { search } = useLocation();
    const history = useNavigate();
    const location  = useLocation();
    const currentUrl = location.pathname;
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    useEffect(() => {
       /*  if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{state:{url:currentUrl}}); } */
	}, [/* isLoading, isLoggedIn, authority_level, */ history])

    const View = query ? ContactNoticeDetail : ContactNoticeDetail ;

    return(
    /*     (isLoading || !isLoggedIn ) ? <></>: */
       /*  View?  */<View query={query}/>/*  : <></> */
    )
}   