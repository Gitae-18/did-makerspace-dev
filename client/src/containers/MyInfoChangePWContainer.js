import React, { /*useEffect,*/ useState, useCallback, /* useMemo */ } from 'react';
//import { useSelector } from "react-redux";
import { useLocation,useNavigate } from 'react-router-dom';
import MyInfoChangePW from "../components/MyInfoChangePW";
import { CommonHeader, PreUri, Method } from '../CommonCode';

export const MyInfoChangePWContainer = () => {
    // const loginUser = useSelector(state => state.user, []);
    //const dispatch = useDispatch();
    const history = useNavigate();
    const [value, setValues] = useState({
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const onBtnChangePW = useCallback(async (e) => {
        //    const onSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!value.password || !value.newPassword || !value.newPasswordConfirm) {
            return alert('필수입력 항목이 비어있습니다.')
        }

        const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (/*!passwordRegex.test(value.password) ||*/
            !passwordRegex.test(value.newPassword)) {
            return alert('숫자와 문자와 특수문자(!@#$%^&+=)를 포함한 8~20자리 이내로 입력해 주세요.');
        }

        if (value.newPassword !== value.newPasswordConfirm) {
            return alert('비밀번호 확인이 잘못되었습니다.');
        }

        let payload = {
            "password": value.password,
            "new_password": value.newPassword,
        }

        const response = await fetch(PreUri + '/user/password', {
            method: Method.put,
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

        setValues({
            ...value,
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
        });
         //console.log(json);
        alert('수정되었습니다.');
        return history(-1);
    }, [value, history]);

    const onInputChange = useCallback((e) => {
        e.preventDefault();
        setValues({
            ...value,
            [e.target.name]: e.target.value,
        });
    }, [value]);

    const onBtnCancel = useCallback((e) => {
        e.preventDefault();
        return history(-1);
    }, [history]);

    return (
        <MyInfoChangePW
            onInputChange={onInputChange}
            onBtnChangePW={onBtnChangePW}
            onBtnCancel={onBtnCancel}
            value={value} />
    );
}
