import React,{useEffect}from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { DidReservation4 } from "../components/pages/PageSub2";
import { AuthLevel } from '../CommonCode';
import qs from 'qs';
export const MyReservContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.reservation);
    const { search } = useLocation();
    const history = useNavigate();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    useEffect(() => {
        
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{replace:false}); }
        
	}, [isLoading, isLoggedIn, authority_level, history])

    const View = query.date ? DidReservation4 : DidReservation4;

    return(
        (isLoading || !isLoggedIn /* || authority_level < AuthLevel.partner */) ? <></>:
        View? <View query={query}/> : <></>
    )
}   