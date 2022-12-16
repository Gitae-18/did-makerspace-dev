import React,{useEffect}from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import SelectDateType1 from "../components/contents/SelectDateType1";
import { SelectReservation } from "../components/pages/PageSub2";
import TableType2a from "../components/contents/TableType2a";
import { AuthLevel } from '../CommonCode';
import qs from 'qs';
export const EquipmentReservationContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.reservation);
    const { search } = useLocation();
    const history = useNavigate();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    useEffect(() => {
        
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{replace:true}); }
        
	}, [isLoading, isLoggedIn, authority_level, history])

    const View = query.date ? TableType2a : TableType2a;

    return(
        (isLoading || !isLoggedIn /* || authority_level < AuthLevel.partner */) ? <></>:
        View? <View query={query}/> : <></>
    )
}   