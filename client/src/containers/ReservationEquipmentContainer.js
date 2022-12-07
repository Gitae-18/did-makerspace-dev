import React from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import SelectDateType1 from "../components/contents/SelectDateType1";
export const ReservationEquipmentContainer = (props) =>{
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
        if (authority_level < AuthLevel.partner) { return history('/notauthhorized',{replace:true}); }
	}, [isLoading, isLoggedIn, authority_level, history])
    
    return(
        <SelectDateType1 query={query} no={viewState.reservationNo}/>
    )
}