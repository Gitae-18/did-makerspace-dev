import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PAGE, PAGE_VIEW } from "../../../store/management";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function () {
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();
    const [partnerItems, setPartnerItems] = useState({
        count: 0,
        items: [],
    });

    const [value, setValue] = useState({
        selectIndex: 0,
        categoryName: '',
    });

    const getPartnerList = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/company/list/partner', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }
        setPartnerItems(partnerItems => ({
            ...partnerItems,
            count: Number(json.count),
            items: json.items,
        }));
    }, [token]);

    useEffect(() => {
        getPartnerList();
        return () => {
            mountedRef.current = false
        }
    }, [getPartnerList])

    const onChange = useCallback((e) => {
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }, [value]);

    const onReg = useCallback(async (e) => {
        e.preventDefault();

        if (partnerItems.count === 0) { return; }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/category', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                service_name: value.categoryName,
                company_no: partnerItems.items[value.selectIndex].company_no
            })
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }
        dispatch({ type: CHANGE_PAGE, target: PAGE_VIEW.LIST });
        history('/management',{replace:true});
    }, [token, partnerItems, value, dispatch, history]);

    const OptionItem = useCallback((props) => {
        return (<>
            <option value={props.index}>{props.partner}</option>
        </>);
    }, []);

    let OptionItems = [];
    for (let i = 0; i < partnerItems.count; i++) {
        OptionItems.push(<OptionItem index={i} partner={partnerItems.items[i].name}
            key={i} />);
    };

    return (
        <div id="wrap" className="wrap management13">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>서비스 항목 관리</h2>
                    <div className="form">
                        <h3>서비스 항목 신규 등록</h3>
                        <span>*필수입력</span>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="82%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*서비스명</th>
                                    <td><input type="text" value={value.categoryName} name="categoryName" onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*담당 기업</th>
                                    <td>
                                        <select value={value.selectIndex} name="selectIndex" onChange={onChange}>
                                            {OptionItems}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
