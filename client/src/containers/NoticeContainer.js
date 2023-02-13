import React,{useEffect}from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { Contact6,Contact6_User } from "../components/pages/PageSub4";
import { AuthLevel } from '../CommonCode';
import qs from 'qs';
export const NoticeContainer = (props) =>{
    const { /* isLoading, isLoggedIn, */ authority_level } = useSelector(state => state.user);
    const { search } = useLocation();
    const history = useNavigate();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    useEffect(() => {
        
	}, [])

    const View =  authority_level < AuthLevel.partner ? Contact6_User : Contact6   ;
 
    return(
 
      <View query={query}/> 
    )
}   