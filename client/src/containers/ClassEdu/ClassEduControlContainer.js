import React,{useEffect} from "react"
import { useSelector } from "react-redux";
import { AuthLevel } from "../../CommonCode";
import { useLocation,useNavigate } from "react-router-dom";
import { ClassEduTotalControl } from "../../components/pages/PageSub6";
import qs from 'qs';

export const ClassEduControlContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.reservation);
    const { search } = useLocation();
    const history = useNavigate();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    console.log(query)
    
    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{replace:true}); }
	}, [isLoading, isLoggedIn, authority_level, history])
    const View = query.type ? ClassEduTotalControl: ClassEduTotalControl;
    return(
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>:
        View? <View query={query}/> : <></>
    )
}