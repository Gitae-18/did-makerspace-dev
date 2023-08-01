import React,{useEffect} from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { AuthLevel } from "../../CommonCode";
import { MentorApplicationAdd, MentorApplication, MentorAddPage} from "../../components/pages/PageSub6";
import qs from 'qs';
export const MentorApplicationContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.reservation);
    const { search } = useLocation();
    const history = useNavigate();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    const location = useLocation();
    const currentUrl = location.pathname;
    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{state:{url:currentUrl}});
    }
	}, [isLoading, isLoggedIn, authority_level, history])
    const View = authority_level<10 && currentUrl==='/mentorcontrol/mentorapplication'? MentorAddPage:authority_level<10 && currentUrl.includes('/mentorcontrol/mentorapplication/add')?MentorApplicationAdd:MentorApplication;
    return(
        (isLoading || !isLoggedIn) ? <></>:
        View? <View query={query}/> : <></>
    )
}