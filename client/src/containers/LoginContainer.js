import React, { useState, useEffect, useCallback, /*useMemo*/ memo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import LoginForm,{LoggedInForm } from "../components/LoginForm";
import { useLocation,usenavigate } from 'react-router-dom';
import { CHANGE_INPUT, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOAD_USER } from "../store/user";
import { CommonHeader, PreUri, Method } from '../CommonCode';
import {Navigate, useNavigate} from 'react-router-dom';
import { redirect } from 'react-router';
const LoginContainer = () => {
    const { userId, password, isAutoLogin,
        isLoginStart, isLoggedIn, userName } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const history = useNavigate();

    const checkAuthAndAutoLogOut = () =>{
    
    }
    useEffect(() => {
        dispatch({ type: LOAD_USER });
    }, []);

    const logout = useCallback(async (e) => {
        e.preventDefault();
        dispatch({ type: LOGOUT });
        return <Navigate replace to ='/'/> ;
    }, [dispatch]);

    
    const loginStart = useCallback(async (e) => {
        e.preventDefault();
        history(1);
    }, []);
    return (
        <>
            {isLoggedIn
                ? <LoggedInForm onLogout={logout} username={userName} />
                : <LoginForm onLoginStart={loginStart}
                    userId={userId} password={password} isAutoLogin={isAutoLogin}/>
            }
        </>
    );
};
export default React.memo(LoginContainer)