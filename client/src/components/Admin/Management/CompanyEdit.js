import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector } from "react-redux";

import '../../../css/common-s.css';
import '../../../css/style-s.css';
export default function () {
    const mountedRef = useRef(true);
    const location = useLocation();
    const history = useNavigate();
    const { token } = useSelector(state => state.user);
    const { companyItem } = useSelector(state => state.management);
    const [userItems, setUserItems] = useState([]);
    const [regItem, setRegItem] = useState({
        name: '',
        address: '',
        registrationNumber: '',
        phoneNumber: '',
        userIndex: 0,
    });

    const getUserList = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/user/partner/' + companyItem.company_no, {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }

        for (let i = 0; i < json.length; i++) {
            if (json[i].user_no === companyItem.user_no) {
                setRegItem(regItem => ({
                    ...regItem,
                    userIndex: i + 1,
                }));
            }
        }

        setUserItems(json);
    }, [token, companyItem]);

    useEffect(() => {
        if (companyItem) {
            setRegItem(regItem => ({
                ...regItem,
                name: companyItem.name,
                address: companyItem.address,
                registrationNumber: companyItem.registration_number,
                phoneNumber: companyItem.telephone_number
            }));

            getUserList();
        } else {
            history('/management',{replace:true})
        }

        return () => {
            mountedRef.current = false
        }
    }, [companyItem, getUserList, history])

    const onChange = useCallback((e) => {
        e.preventDefault();
        const re = /^[0-9\b]+$/;
        if (e.target.name === 'registrationNumber' || e.target.name === 'phoneNumber') {
            if (e.target.value !== '' && !re.test(e.target.value)) {
                return;
            }
        }

        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        });
    }, [regItem]);

    const onUpdate = useCallback(async (e) => {
        e.preventDefault();

        const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;
        if (!phoneRegex.test(regItem.phoneNumber)) {
            alert('잘못된 전화번호 입력입니다. 숫자, - 를 포함해 입력해 주세요.');
            return;
        }

        let user_no = null;
        if (regItem.userIndex > 0) {
            user_no = userItems[regItem.userIndex - 1].user_no;
        }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/company/' + companyItem.company_no, {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                co_name: regItem.name,
                co_address: regItem.address,
                co_number: regItem.registrationNumber,
                co_telephone: regItem.phoneNumber,
                partner_user_no: user_no
            })
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        history(-1);
    }, [regItem, token, companyItem, userItems, history]);

    let UserOptions = [];
    UserOptions.push(<option value={0} key={0}>없음</option>);
    for (let i = 0; i < userItems.length; i++) {
        UserOptions.push(<option value={i + 1} key={i + 1}>{userItems[i].name}</option>);
    };

    return (
        <div id="wrap" className="wrap management3">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>기업 관리</h2>
                    <div className="form">
                        <h3>{companyItem && companyItem.name ? companyItem.name : ''}</h3>
                        <span>*필수입력</span>
                        <table>
                            <tbody>
                                <tr>
                                    <th>*회사명</th>
                                    <td><input type="text" value={regItem.name} name="name" maxLength={45} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*소재지</th>
                                    <td><input type="text" value={regItem.address} name="address" maxLength={100} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*사업자등록번호</th>
                                    <td><input type="text" className="num" disabled={true} readOnly={true} defaultValue={regItem.registrationNumber} name="registrationNumber" maxLength={10} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*전화번호</th>
                                    <td><input type="text" className="num" value={regItem.phoneNumber} name="phoneNumber" maxLength={20} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>대표 담당자</th>
                                    <td>
                                        <select value={regItem.userIndex} name="userIndex" onChange={onChange}>
                                            {UserOptions}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button className="btn_delete" onClick={() => { history(-1) }}>취소</button>
                        <button className="btn_modify" onClick={onUpdate}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
