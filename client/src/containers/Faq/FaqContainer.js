import React,{useEffect}from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { DidInfo9,DidInfo10 } from "../../components/pages/PageSub";
import { AuthLevel } from '../../CommonCode';
import qs from 'qs';
export const FaqContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.reservation);
    const { search } = useLocation();
    const history = useNavigate();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    useEffect(() => {

	}, [])

    const View =  authority_level < AuthLevel.partner ? DidInfo10 : DidInfo9  ;

    return(
        
        <View query={query}/> 
    )
}   