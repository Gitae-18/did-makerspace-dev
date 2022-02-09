import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import ServiceList from '../components/Admin/Service/ServiceList';
import ServiceReport from '../components/Admin/Service/ServiceReport';
import { AuthLevel } from '../CommonCode';
import qs from 'qs';

export const MServiceContainer = ({ location, history }) => {
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history.replace('/notmember'); }
        if (authority_level < AuthLevel.partner) { return history.replace('/notauthhorized'); }
    }, [isLoading, isLoggedIn, authority_level, history])

    const View = query.report_no ? ServiceReport : ServiceList;

    return (
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>
            : View ? <View location={location} history={history} query={query} /> : <></>
    )
}