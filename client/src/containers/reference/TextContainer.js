import React,{useEffect}from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { AddText } from "../../components/pages/PageSub4";
import { AuthLevel } from '../../CommonCode';
import qs from 'qs';
export const TextContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const { search } = useLocation();
    const history = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname;
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    useEffect(() => {
        
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{state:{url:currentUrl}}); }
        
	}, [isLoading, isLoggedIn, authority_level, history])

    const View = query.date ? AddText : AddText;

    return(
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>:
        View? <View query={query}/> : <></>
    )
}   