import React, { useState, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector, } from "react-redux";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function () {
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    const [regItem, setRegItem] = useState({
        name: '',
        code: '',
    });

    const onChange = useCallback((e) => {
        e.preventDefault();

        const re = /^[0-9\b]+$/;
        if (e.target.name === 'phoneNumber' &&
            e.target.value !== '' && !re.test(e.target.value)) {
            return;
        }

        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        })
    }, [regItem]);

    const onReg = useCallback(async (e) => {
        e.preventDefault();

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/material/category', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                name: regItem.name,
                code: regItem.code,
            })
        });

        if (!response.ok) {
            const json = await response.json();
            alert(json.message);
            return;
        }

        history('/management',{replace:true});
    }, [token, regItem, history]);

    return (
        <div id="wrap" className="wrap management16">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>자재 분류 관리</h2>
                    <div className="box">
                        <h3>자재 분류 신규 등록</h3>
                        <span>*필수입력</span>
                        <div className="table">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>*자재 분류 코드</th>
                                        <td><input type="text" value={regItem.code} name="code" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>*자재 분류 명</th>
                                        <td><input type="text" value={regItem.name} name="name" onChange={onChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="btn_box">
                        <button className="btn_cancel" onClick={() => { history(-1) }}>취소</button>
                        <button className="btn_apply" onClick={onReg}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
}