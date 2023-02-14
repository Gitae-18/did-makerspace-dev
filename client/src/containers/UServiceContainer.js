import React, { useCallback ,useEffect} from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import Service from '../components/User/Service';
import ServiceStep1 from '../components/User/ServiceStep1';
import ServiceStep1Confirm from '../components/User/ServiceStep1Confirm';
import ServiceStep1Reserv from '../components/User/ServiceStep1Reserv';
import ServiceStep1Edit from '../components/User/ServiceStep1Edit';
import ServiceStep1Notyet from '../components/User/ServiceStep1Notyet';
import ServiceStep1Response from '../components/User/ServiceStep1Response';
import ServiceStep1Reject from '../components/User/ServiceStep1Reject';
import ServiceStep2 from '../components/User/ServiceStep2';
import ServiceStep2NoConsulting from '../components/User/ServiceStep2NoConsulting';
import ServiceStep2Ready from '../components/User/ServiceStep2Ready';
import ServiceStep2Reject from '../components/User/ServiceStep2Reject';
import ServiceStep3 from '../components/User/ServiceStep3';
import ServiceStep4 from '../components/User/ServiceStep4';
import ServiceStep5 from '../components/User/ServiceStep5';
import qs from 'qs';

export const UServiceContainer = () => {
     const { isLoading, isLoggedIn } = useSelector(state => state.user);
     const  location  = useLocation;
     const history = useNavigate();
     const { search } = useLocation();
     const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    useEffect(() => {
        
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{replace:true}); }
        
	}, [isLoading, isLoggedIn,history])
    const CurrentPage = useCallback(() => {
        switch (query.step) {
        case '1':
            if (query.next === 'confirm') {
                return <ServiceStep1Confirm history={history} />
            } else if (query.next === 'reserv') {
                return <ServiceStep1Reserv history={history} no={query.no} />
            } else if (query.next === 'edit') {
                return <ServiceStep1Edit history={history} no={query.no} />
            } else if (query.next === 'notyet') {
                return <ServiceStep1Notyet history={history} no={query.no} />
            } else if (query.next === 'res') {
                return <ServiceStep1Response history={history} no={query.no}/>
            } else if (query.next === 'rej') {
                return <ServiceStep1Reject history={history} no={query.no}/>
            }
            return <ServiceStep1 history={history} />
        case '2':
            if (query.next === 'app') {
                return query.no ? <ServiceStep2 history={history} no={query.no} /> : <ServiceStep2NoConsulting history={history} /> 
            } else if (query.next === 'urd') {
                return <ServiceStep2Ready history={history} no={query.no} />
            } else if (query.next === 'rej') {
                return <ServiceStep2Reject history={history} no={query.no}/>
            }
            return <Service history={history} />
        case '3':
            return <ServiceStep3 history={history} no={query.no}/>
        case '4':
            return <ServiceStep4 history={history} no={query.no} />
        case '5':
            return <ServiceStep5 history={history} no={query.no} />
        default:
            return <Service history={history} />
        }
    }, [query, history, isLoading, isLoggedIn]);

   
    return (
        <CurrentPage />
    )
}
