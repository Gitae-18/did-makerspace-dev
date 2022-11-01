import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import Schedule from '../components/Admin/Schedule/Schedule';
import qs from 'qs';


export const ScheduleContainer = () => {
     const { isLoading, isLoggedIn } = useSelector(state => state.user);
     const { location } = useLocation;
     const history = useNavigate();
     const query = location ==='?detail=true';

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
