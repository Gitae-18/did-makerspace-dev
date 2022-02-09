import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import Schedule from '../components/Admin/Schedule/Schedule';
import qs from 'qs';


export const ScheduleContainer = ({ location, history }) => {
     const { isLoading, isLoggedIn } = useSelector(state => state.user);

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    const CurrentPage = useCallback(() => {
        if (isLoading) {
            return <></>;
        }
        if (!isLoggedIn) {
            history.push('/notmember');
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
