import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';

import { useSelector } from "react-redux";

import '../../../css/common.css';
import '../../../css/style.css';

export default function ({ location, history }) {
    const authLevelList = [{ name: "일반 사용자", level: 1 },
    { name: "파트 담당자", level: 10 }, { name: '스케줄 관리자', level: 50 },
    { name: '운영자', level: 70 }, { name: '최고관리자', level: 90 }];
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const { userItem } = useSelector(state => state.management);
    const [regItem, setRegItem] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        coName: '',
        authLevelIndex: 0,
    });

    const getPreInfo = useCallback(() => {
        let authLevelIndex = 0;
        for (let i = 0; i < authLevelList.length; i++) {
            if (authLevelList[i].level === userItem.authority_level) {
                authLevelIndex = i;
            }
        }

        setRegItem(regItem => ({
            ...regItem,
            name: userItem.name,
            coName: userItem.co_name,
            email: userItem.email,
            phoneNumber: userItem.phone_number,
            authLevelIndex
        }));
    }, [authLevelList, userItem]);

    useEffect(() => {
        if (!mountedRef.current) { return }

        if (userItem) {
            getPreInfo();
        } else {
            history.replace('/management')
        }

        return () => {
            mountedRef.current = false
        }
    }, [userItem, getPreInfo, history])

    const onChange = useCallback((e) => {
        e.preventDefault();

        /*
        const re = /^[0-9\b]+$/;
        if (e.target.name === 'phoneNumber' &&
            e.target.value !== '' && !re.test(e.target.value)) {
            return;
        }
        */

        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        })
    }, [regItem]);

    // const onCheckEmail = useCallback(async (e) => {
    //     e.preventDefault();

    // 	setRegItem({
    // 		...regItem,
    // 		isCheckedEmail: false
    // 	})

    //     let emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
    //     if (!emailRegex.test(regItem.email)) {
    //         alert('잘못된 이메일 형식입니다.');
    //         return false;
    //     }

    //     CommonHeader.authorization = token;
    //     const response = await fetch(PreUri + '/user/checkId', {
    //         method: Method.post,
    //         body: JSON.stringify({
    //             "email": regItem.email,
    //         }),
    //         headers: CommonHeader,
    //     });

    //     if (!response.ok) {
    //         switch (response.status) {
    //             case 400: alert('잘못된 정보입니다.'); break;
    //             case 404: alert('페이지를 찾을 수 없습니다.'); break;
    //             case 500: alert('서버 문제'); break;
    //             default: alert('Unknown Error'); break;
    //         }
    //         return;
    //     }

    //     const json = await response.json();
    //     console.log(json.result);

    //     if (json.result === 'success') {
    //         setRegItem({
    //             ...regItem,
    //             isCheckedEmail: true
    //         })
    //         alert('가입이 가능합니다');
    //     } else {
    //         alert('이미 사용중입니다');
    //     }
    // }, [regItem, token]);

    const onModify = useCallback(async (e) => {
        e.preventDefault();
        // if (partnerItems.count === 0) { return; }

        /*
        if (!regItem.email || !regItem.password || !regItem.passwordConfirm || !regItem.name || !regItem.phoneNumber) {
            alert('필수입력 항목이 비어있습니다. ')
            return;
        }

        if (regItem.isCheckedEmail === false) {
            alert('이메일 중복검사가 필요합니다.');
            return;
        }

        const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (!passwordRegex.test(regItem.password)) {
            alert('숫자와 문자와 특수문자를 포함한 8~20자리 이내로 입력해 주세요.');
            return;
        }

        if (regItem.password !== regItem.passwordConfirm) {
            alert('비밀번호 확인이 잘못되었습니다.');
            return;
        }

        const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;
        if (!phoneRegex.test(regItem.phoneNumber)) {
            alert('잘못된 전화번호 입력입니다. 숫자, - 를 포함해 입력해 주세요.');
            return;
        }
        */

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/user/partner/' + userItem.user_no, {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                //email: regItem.email,
                // password: regItem.password,
                // name: regItem.nam,
                //phone_number: regItem.phoneNumber,
                authority_level: authLevelList[regItem.authLevelIndex].level,
                // company_no: partnerItems.items[regItem.companyIndex].company_no,
            })
        });

        if (!response.ok) {
            switch (response.status) {
                case 401: alert('인증되지 않았습니다.'); break;
                case 404: alert('페이지를 찾을 수 없습니다.'); break;
                case 406: alert('권한이 없습니다.'); break;
                case 500: alert('서버 문제'); break;
                default: alert('Unknown Error'); break;
            }
            return;
        }

        history.go(-1);
    }, [token, userItem, regItem, authLevelList, history]);

    const onDrop = useCallback(async (e) => {
        e.preventDefault();

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/user/partner/' + userItem.user_no, {
            method: Method.delete,
            headers: CommonHeader,
        });

        if (!response.ok) {
            switch (response.status) {
                case 400: alert('이미 가입된 회원입니다.'); break;
                case 404: alert('페이지를 찾을 수 없습니다.'); break;
                case 500: alert('서버 문제'); break;
                default: alert('Unknown Error'); break;
            }
            return;
        }

        history.replace('/management');
    }, [token, userItem, history]);

    let AuthLevelOptions = [];
    for (let i = 0; i < authLevelList.length; i++) {
        AuthLevelOptions.push(<option value={i} key={i}>{authLevelList[i].name}</option>);
    };

    return (
        <div id="wrap" className="wrap management5">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>회원 관리</h2>
                    <div className="form">
                        <h3>{regItem.name}</h3>
                        <span>*필수입력</span>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="82%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*아이디(이메일 주소)</th>
                                    <td>
                                        <input type="text" className="eng" disabled={true} defaultValue={regItem.email} readOnly={true} name="email" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="border"></p>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="32%" />
                                <col width="18%" />
                                <col width="32%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*고객명</th>
                                    <td><input type="text" disabled={true} defaultValue={regItem.name} readOnly={true} name="name" /></td>
                                    <th>*등급</th>
                                    <td>
                                        <select value={regItem.authLevelIndex} name="authLevelIndex" onChange={onChange}>
                                            {AuthLevelOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*전화번호</th>
                                    <td><input type="text" className="num" disabled={true} defaultValue={regItem.phoneNumber}
                                        readOnly={true} name="phoneNumber" /></td>
                                    <th>*기업</th>
                                    <td><input type="text" disabled={true} defaultValue={regItem.coName} readOnly={true} name="coName" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button className="btn_cancel" onClick={onDrop}>탈퇴</button>
                        <button className="btn_apply" onClick={onModify}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
