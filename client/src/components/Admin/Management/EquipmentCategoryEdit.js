import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector } from "react-redux";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function () {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);

    const location = useLocation();
    const history = useNavigate();
    const { equipCategoryItem } = useSelector(state => state.management);
    const [regItem, setRegItem] = useState({
        modelName: '',
        modelNumber: '',
        specification: '',
        purpose: '',
        serviceCategoryIndex: 0,
    });
    const [serviceCategoryItems, setServiceCategoryItems] = useState({
        count: 0,
        items: [],
    });

    const getServiceCategory = useCallback(async () => {
        CommonHeader.authorization = token;
        let response = await fetch(PreUri + '/service/category/all', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }

        const count = Number(json.count);
        setServiceCategoryItems(serviceCategoryItems => ({
            ...serviceCategoryItems,
            count,
            items: json.items,
        }));

        let index = 0;
        if (equipCategoryItem.service_category_no) {
            for (let i = 0; i < count; i++) {
                if (json.items[i].service_category_no === equipCategoryItem.service_category_no) {
                    index = i + 1;
                    break;
                }
            }
        }

        setRegItem(regItem => ({
            ...regItem,
            modelName: equipCategoryItem.model_name,
            modelNumber: equipCategoryItem.model_number,
            serviceCategoryIndex: index,
            specification: equipCategoryItem.model_specification,
            purpose: equipCategoryItem.purpose
        }));
    }, [equipCategoryItem, token]);

    useEffect(() => {
        if (!mountedRef.current) { return }
        if (equipCategoryItem) {
            getServiceCategory();
        } else {
            history.replace('/management')
        }

        return () => {
            mountedRef.current = false
        }
    }, [equipCategoryItem, getServiceCategory, history])

    const onChange = useCallback((e) => {
        e.preventDefault();
        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        });
    }, [regItem]);

    const onReg = useCallback(async (e) => {
        e.preventDefault();

        let service_category_no = undefined;
        if (regItem.serviceCategoryIndex > 0) {
            service_category_no = serviceCategoryItems.items[regItem.serviceCategoryIndex - 1].service_category_no;
        }

        const id = equipCategoryItem.equipment_category_no;

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/equipment/category/' + id, {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                // model_name: regItem.modelName,
                // model_number: regItem.modelNumber,
                service_category_no,
                model_specification: regItem.specification,
                purpose: regItem.purpose,
            })
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        history.go(-1);
    }, [equipCategoryItem, serviceCategoryItems, regItem, token, history]);

    let ServiceCategoryOptions = [];
    ServiceCategoryOptions.push(<option value={0} key={0}>{"없음"}</option>);
    for (let i = 0; i < serviceCategoryItems.count; i++) {
        ServiceCategoryOptions.push(<option value={i + 1} key={i + 1}>{serviceCategoryItems.items[i].service_name}</option>);
    };

    return (
        <div id="wrap" className="wrap management8">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>기자재 품목 관리</h2>
                    <div className="form">
                        <h3>{regItem.modelName}</h3>
                        <span>*필수입력</span>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="82%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*기자재명</th>
                                    <td><input type="text" disabled={true} readOnly={true} defaultValue={regItem.modelName} name="modelName" maxLength={45} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>모델번호</th>
                                    <td><input type="text" className="num" disabled={true} readOnly={true} defaultValue={regItem.modelNumber} name="modelNumber" maxLength={45} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>지정 서비스 항목</th>
                                    <td>
                                        <select value={regItem.serviceCategoryIndex} name="serviceCategoryIndex" onChange={onChange}>
                                            {ServiceCategoryOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th className="pa">규격</th>
                                    <td><input type="text" className="num" value={regItem.specification} name="specification" maxLength={45} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th className="pa">용도</th>
                                    <td><input type="text" value={regItem.purpose} name="purpose" maxLength={45} onChange={onChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button className="btn_cancel" onClick={() => { history.go(-1) }}>취소</button>
                        <button className="btn_apply" onClick={onReg}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
