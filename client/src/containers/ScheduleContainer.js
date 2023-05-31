import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import Schedule from '../components/Admin/Schedule/Schedule';
import qs from 'qs';


export const ScheduleContainer = () => {
     const { isLoading, isLoggedIn } = useSelector(state => state.user);
     const history = useNavigate();
     const { search } = useLocation();
     const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    const CurrentPage = useCallback(() => {
        if (isLoading) {
            return <></>;
        }
        if (!isLoggedIn) {
            history('/notmember');
            return <></>;
        }

        switch (query.step) {
        default:
            return <Schedule history={history} />
        }
    }, [query, history, isLoading, isLoggedIn]);

    return (
        <CurrentPage />
    )
}
