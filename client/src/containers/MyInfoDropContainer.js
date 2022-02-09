import React, { /*useEffect,*/ useState, useCallback, /* useMemo */ } from 'react';
import { /*useSelector,*/ useDispatch } from "react-redux";
import MyInfoDrop from "../components/MyInfoDrop";
import { CommonHeader, PreUri, Method } from '../CommonCode';
import { LOGOUT } from "../store/user";

export const MyInfoDropContainer = ({ location, history, email }) => {
    //const loginUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [value, setValues] = useState({
        password: '',
    });

    const onBtnDrop = useCallback(async (e) => {
        e.preventDefault();

        if (!value.password) {
            return alert('패스워드를 입력해주시기 바랍니다.');
        }

        const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (!passwordRegex.test(value.password)) {
            return alert('숫자와 문자와 특수문자(!@#$%^&+=)를 포함한 8~20자리 이내로 입력해 주세요.');
        }

        let payload = {
            "password": value.password,
        }

        const response = await fetch(PreUri + '/user/drop', {
            method: Method.delete,
            body: JSON.stringify(payload),
            headers: CommonHeader
        });

        const json = await response.json();
        if (!response.ok) {
            switch (response.status) {
                case 400: alert(json.message); break;
                default: alert('Unknown Error'); break;
            }
            return;
        }

        dispatch({ type: LOGOUT });
        setValues({
            ...value,
            password: '',
            newPassword: '',
        });

        alert('탈퇴가 완료 되었습니다.');
        history.replace('/');
    }, [value, history, dispatch]);

    const onInputChange = useCallback((e) => {
        e.preventDefault();
        setValues({
            ...value,
            [e.target.name]: e.target.value,
        });
    }, [value]);

    const onBtnCancel = useCallback((e) => {
        e.preventDefault();
        return history.go(-1);
    }, [history]);

    return (
        <MyInfoDrop
            onInputChange={onInputChange}
            onBtnDrop={onBtnDrop}
            onBtnCancel={onBtnCancel}
            email={email}
            value={value} />
    );
}
