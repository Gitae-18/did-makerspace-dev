import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import ServiceList from '../components/Admin/Service/ServiceList';
import ServiceReport from '../components/Admin/Service/ServiceReport';
import { AuthLevel } from '../CommonCode';
import qs from 'qs';

export const MServiceContainer = (props) => {
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const location = useLocation();
    const query = location ==='?detail=true';
    const history = useNavigate();
    
    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{replace:true}); }
        if (authority_level < AuthLevel.partner) { return history('/notauthhorized',{replace:true}); }
    }, [isLoading, isLoggedIn, authority_level, history])

    const View = query.report_no ? ServiceReport : ServiceList;

    return (
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>
            : View ? <View location={location} history={history} query={query} /> : <></>
    )
}