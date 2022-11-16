import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import ConsultingApplication from '../components/Admin/Service/ConsultingApplication';
import ServiceApplication from '../components/Admin/Service/ServiceApplication';
import ServiceRunning from '../components/Admin/Service/ServiceRunning';
import ServiceDone from '../components/Admin/Service/ServiceDone';
import { AuthLevel } from '../CommonCode';
// import qs from 'qs';

export const MServiceDetailContainer = () => {
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.managerService);
    const history = useNavigate();
    const location = useLocation();
    const { search } = useLocation();
    
 
    // const query = qs.parse(location.search, {
    //     ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    // });

    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{reaplace:true}); }
        if (authority_level < AuthLevel.partner) { return history('/notauthhorized',{replace:true}); }
        if (viewState.serviceNo < 1) { history('/mservice',{replace:true}); }
    }, [isLoading, isLoggedIn, authority_level, viewState.serviceNo, history])

    let View;
    switch (viewState.currentView) {
        case 'STEP_01': View = ConsultingApplication; break;
        case 'STEP_02': View = ServiceApplication; break;
        case 'STEP_03': View = ServiceRunning; break;
        case 'STEP_04': View = ServiceDone; break;
        default: break;
    }

    return (
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner || viewState.serviceNo < 1) ? <></>
            : View ? <View location={location} history={history} no={viewState.serviceNo} /> : <></>
    )
}