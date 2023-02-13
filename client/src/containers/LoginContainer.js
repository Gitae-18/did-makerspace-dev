import React, { /*useState,*/ useEffect, useCallback, /*useMemo*/ memo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import LoginForm,{LoggedInForm } from "../components/LoginForm";
import { useLocation,usenavigate } from 'react-router-dom';
import { CHANGE_INPUT, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOAD_USER } from "../store/user";
import { CommonHeader, PreUri, Method } from '../CommonCode';
import {Navigate, useNavigate} from 'react-router-dom';
import { redirect } from 'react-router';
export const LoginContainer = memo(() => {
    const { userId, password, isAutoLogin,
        isLoginStart, isLoggedIn, userName } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        dispatch({ type: LOAD_USER });
    }, []);

    const loginStart = useCallback(async (e) => {
        e.preventDefault();

        if (isLoginStart === true) {
            alert('로그인 중입니다.');
            return;
        }

        if (userId.length <= 0) {
            //alert('아이디를 입력해 주세요.');
            return;
        }

        if (password.length <= 0) {
            alert('패스워드를 입력해 주세요.');
            return;
        }

        dispatch({ type: LOGIN_START });
        const response = await fetch(PreUri + '/user/login', {
            method: Method.post,
            body: JSON.stringify({
                "user_id": userId,
                "password": password
            }),
            headers: CommonHeader
        });

        if (!response.ok) {
            dispatch({ type: LOGIN_FAIL });
            switch (response.status) {
                case 400: alert('사용자 정보가 잘못되었습니다.'); break;
                case 404: alert('페이지를 찾을 수 없습니다.'); break;
                case 500: alert('서버 문제'); break;
                default: alert('Unknown Error'); break;
            }
            return;
        }

        const json = await response.json();
        dispatch({ type: LOGIN_SUCCESS, payload: json });
    }, [userId, password, isLoginStart, dispatch]);

    const logout = useCallback(async (e) => {
        e.preventDefault();
        dispatch({ type: LOGOUT });
        return <Navigate replace to ='/'/> ;
    }, [dispatch]);

    const onChange = useCallback((e) => {
        console.log(e.target)
        e.preventDefault();
        dispatch({ type: CHANGE_INPUT, target: e.target });
    }, []);
/*    useEffect(()=>{

   },[]) */
    return (
        <>
            {isLoggedIn
                ? <LoggedInForm onLogout={logout} username={userName} />
                : <LoginForm onLoginStart={loginStart} onChange={onChange}
                    userId={userId} password={password} isAutoLogin={isAutoLogin}/>
            }
        </>
    );
});