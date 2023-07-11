import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector } from "react-redux";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function () {
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    const { materialCategoryItem } = useSelector(state => state.management);
    const [regItem, setRegItem] = useState({
        name: '',
        code: '',
    });

    const getPreInfo = useCallback(async () => {
        setRegItem(regItem => ({
            ...regItem,
            name: materialCategoryItem.name,
            code: materialCategoryItem.code,
        }));

    }, [materialCategoryItem]);

    useEffect(() => {
        if (!mountedRef.current) { return }

        if (materialCategoryItem) {
            getPreInfo();
        } else {
            history('/management',{replace:true})
        }

        return () => {
            mountedRef.current = false
        }
    }, [getPreInfo, materialCategoryItem, history])

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

    const onUpdate = useCallback(async (e) => {
        e.preventDefault();

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/material/category/' + materialCategoryItem.material_category_no, {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                //code: regItem.code,
                name: regItem.name,
            })
        });

        if (!response.ok) {
            const json = await response.json();
            alert(json.message);
            return;
        }

        history(-1);
    }, [token, regItem, materialCategoryItem, history]);

    return (
        <div id="wrap" className="wrap management16">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                   
                    <div className="box">
                        <h3>{materialCategoryItem ? materialCategoryItem.name : ''}</h3>
                        <span>*필수입력</span>
                        <div className="table">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>*자재 분류 코드</th>
                                        <td><input type="text" value={regItem.code} name="code" disabled={true} readOnly={true} onChange={onChange} /></td>
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
                        <button className="btn_apply" onClick={onUpdate}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
