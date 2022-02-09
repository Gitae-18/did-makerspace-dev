import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';

import { useSelector } from "react-redux";

import '../../../css/common.css';
import '../../../css/style.css';

export default function ({ location, history }) {
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const [categoryItems, setCategoryItems] = useState({
        count: 0,
        items: [],
    });
    const [partnerItems, setPartnerItems] = useState({
        count: 0,
        items: [],
    });
    const [regItem, setRegItem] = useState({
        serialNumber: '',
        categoryIndex: 0,
        companyIndex: 0,
        assetIndex: 0,
        note_content: '',
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

    const getCategoryList = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/equipment/list/category', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }
        setCategoryItems(categoryItems => ({
            ...categoryItems,
            count: Number(json.count),
            items: json.items,
        }));
    }, [token]);

    useEffect(() => {
        getPartnerList();
        getCategoryList();
        return () => {
            mountedRef.current = false
        }
    }, [getPartnerList, getCategoryList])

    const onChange = useCallback((e) => {
        e.preventDefault();
        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        });
    }, [regItem]);

    const onReg = useCallback(async (e) => {
        e.preventDefault();

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/equipment/element', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                equipment_category_no: categoryItems.items[regItem.categoryIndex].equipment_category_no,
                serial_number: regItem.serialNumber,
                company_no: partnerItems.items[regItem.companyIndex].company_no,
                asset_flag: (regItem.assetIndex === 0) ? 'Y' : 'N',
                note_content: regItem.note_content,
            })
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        history.replace('/management');
    }, [regItem, partnerItems, categoryItems, token, history]);

    let PartnerOptions = [];
    for (let i = 0; i < partnerItems.count; i++) {
        PartnerOptions.push(<option value={i} key={i}>{partnerItems.items[i].name}</option>);
    };

    let CategoryOptions = [];
    for (let i = 0; i < categoryItems.count; i++) {
        CategoryOptions.push(<option value={i} key={i}>{categoryItems.items[i].model_name}</option>);
    };

    let AssetOptions = [
        (<option value={0} key={0}>{"등록"}</option>),
        (<option value={1} key={1}>{"미등록"}</option>),
    ];

    return (
        <div id="wrap" className="wrap management10">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>기자재 관리</h2>
                    <div className="form">
                        <h3>기자재 신규 등록</h3>
                        <span>*필수입력</span>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="82%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*기자재 품목</th>
                                    <td>
                                        <select value={regItem.categoryIndex} name="categoryIndex" onChange={onChange}>
                                            {CategoryOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*담당 기업</th>
                                    <td>
                                        <select value={regItem.companyIndex} name="companyIndex" onChange={onChange}>
                                            {PartnerOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*관리번호<small>(Serial No.)</small></th>
                                    <td><input type="text" className="num" value={regItem.serialNumber} name="serialNumber" maxLength={45} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*자산 등록 여부</th>
                                    <td>
                                        <select value={regItem.assetIndex} name="assetIndex" onChange={onChange}>
                                            {AssetOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>비고</th>
                                    <td><input type="text" className="num" value={regItem.note_content} name="note_content" maxLength={250} onChange={onChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button className="btn_cancel" onClick={() => { history.go(-1) }}>취소</button>
                        <button className="btn_apply" onClick={onReg}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
