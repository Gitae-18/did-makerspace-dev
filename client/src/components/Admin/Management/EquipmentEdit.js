import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';

import { useSelector } from "react-redux";

import '../../../css/common.css';
import '../../../css/style.css';

export default function ({ location, history }) {
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const { equipItem } = useSelector(state => state.management);
    const [partnerItems, setPartnerItems] = useState({
        count: 0,
        items: [],
    });
    const [regItem, setRegItem] = useState({
        serialNumber: '',
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

        let companyIndex = 0;
        for (let i = 0; i < json.count; i++) {
            if (json.items[i].company_no === equipItem.company_no) {
                companyIndex = i;
                break;
            }
        }

        setRegItem(regItem => ({
            ...regItem,
            serialNumber: equipItem.serial_number,
            companyIndex,
            assetIndex: (equipItem.asset_flag === 'Y') ? 0 : 1,
            note_content: equipItem.note_content
        }));

        setPartnerItems(partnerItems => ({
            ...partnerItems,
            count: Number(json.count),
            items: json.items,
        }));
    }, [token, equipItem]);

    useEffect(() => {
        if (!mountedRef.current) { return }
        if (equipItem) {
            getPartnerList();
        } else {
            history.replace('/management')
        }
        return () => {
            mountedRef.current = false
        }
    }, [getPartnerList, equipItem, history])

    const onChange = useCallback((e) => {
        e.preventDefault();
        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        });
    }, [regItem]);

    const onUpdate = useCallback(async (e) => {
        e.preventDefault();

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/equipment/element/' + equipItem.equipment_element_no, {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
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

        history.go(-1);
    }, [regItem, partnerItems, token, equipItem, history]);

    let PartnerOptions = [];
    for (let i = 0; i < partnerItems.count; i++) {
        PartnerOptions.push(<option value={i} key={i}>{partnerItems.items[i].name}</option>);
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
                        <h3>{equipItem ? equipItem.serial_number : ''}</h3>
                        <span>*필수입력</span>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="82%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*기자재 품목</th>
                                    <td><input type="text" className="num" disabled={true} readOnly={true} defaultValue={equipItem ? equipItem.model_name : ''} name="modelName" /></td>
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
                                    <td><input type="text" value={regItem.note_content} name="note_content" maxLength={250} onChange={onChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button className="btn_cancel" onClick={() => { history.go(-1) }}>취소</button>
                        <button className="btn_apply" onClick={onUpdate}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
