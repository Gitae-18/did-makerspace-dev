import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import ServiceList from '../components/Admin/Service/ServiceList';
import ServiceReport from '../components/Admin/Service/ServiceReport';
import { AuthLevel } from '../CommonCode';
import qs from 'qs';

export const MServiceContainer = (props) => {
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.managerService);
    const { search } = useLocation();
    const location = useLocation();
    const currentUrl = location.pathname;
    const qu = useParams();
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    const history = useNavigate();

    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{state:{url:currentUrl}}); }
        if (authority_level < AuthLevel.partner) { return history('/notauthhorized',{return:true}); }
    }, [isLoading, isLoggedIn, authority_level, history])

    const View = query.report_no ? ServiceReport : ServiceList;
    return (
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>
            : View ? <View query={query} no={viewState.serviceNo}/> : <></>
    )
}