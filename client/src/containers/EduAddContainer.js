import React,{useEffect} from "react"
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { AuthLevel } from "../CommonCode";
import   { ClassEduControl, ClassEduControl2 } from "../components/pages/PageSub6";
import SectionInputTextType1d from "../components/sections/SectionInputTextType1d";
import ListType2b from "../components/contents/ListType2b";
import qs from 'qs';
import ListType2a from "../components/contents/ListType2a";
export const EduAddContainer = (props) =>{
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.reservation);
    const { search } = useLocation();
    const history = useNavigate();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{replace:true});}
        if (authority_level < AuthLevel.partner) { return history('/notauthhorized',{replace:true});}
	}, [isLoading, isLoggedIn, authority_level, history])
    const View = query ? SectionInputTextType1d: SectionInputTextType1d;
    return(
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>:
        View? <View query={query}/> : <></>
    )
}