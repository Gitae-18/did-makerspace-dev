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
    const [equipCategoryItems, setEquipCategoryItems] = useState({
        count: 0,
        items: [],
    });
    const [partnerItems, setPartnerItems] = useState({
        count: 0,
        items: [],
    });
    const [materialCategoryItems, setMaterialCategoryItems] = useState({
        count: 0,
        items: [],
    });
    const [regItem, setRegItem] = useState({
        name: '',
        unit: '',
        quantity: '',
        seller: '',
        phoneNumber: '',
        comment: '',
        equipCategoryIndex: 0,
        companyIndex: 0,
        materialCategoryIndex: 0,
    });

    const getPreInfo = useCallback(async () => {
        CommonHeader.authorization = token;
        let response = await fetch(PreUri + '/equipment/list/category', {
            method: Method.get,
            headers: CommonHeader
        });

        const jsonEquip = await response.json();
        if (!response.ok) {
            alert(jsonEquip.message);
            return;
        }

        response = await fetch(PreUri + '/company/list/partner', {
            method: Method.get,
            headers: CommonHeader
        });

        const json = await response.json();
        if (!response.ok) {
            alert(json.message);
            return;
        }

        response = await fetch(PreUri + '/material/list/category', {
            method: Method.get,
            headers: CommonHeader
        });

        const jsonMaterial = await response.json();
        if (!response.ok) {
            alert(jsonMaterial.message);
            return;
        }

        if (!mountedRef.current) { return }

        setEquipCategoryItems(equipCategoryItems => ({
            ...equipCategoryItems,
            count: Number(jsonEquip.count),
            items: jsonEquip.items,
        }));

        setPartnerItems(partnerItems => ({
            ...partnerItems,
            count: Number(json.count),
            items: json.items,
        }));

        setMaterialCategoryItems(materialCategoryItems => ({
            ...materialCategoryItems,
            count: jsonMaterial.length,
            items: jsonMaterial,
        }));
    }, [token]);

    useEffect(() => {
        if (!mountedRef.current) { return }
        getPreInfo();
        return () => {
            mountedRef.current = false
        }
    }, [getPreInfo])

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

        if (partnerItems.count === 0) { return; }

        let equipment_category_no = undefined;
        if (regItem.equipCategoryIndex > 0) {
            equipment_category_no = equipCategoryItems.items[regItem.equipCategoryIndex - 1].equipment_category_no;
        }

        let material_category_no = undefined;
        if (regItem.materialCategoryIndex > 0) {
            material_category_no = materialCategoryItems.items[regItem.materialCategoryIndex - 1].material_category_no;
        }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/material/item', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                name: regItem.name,
                unit: regItem.unit,
                quantity: regItem.quantity,
                equipment_category_no,
                material_category_no,
                seller: regItem.seller,
                phone_number: regItem.phoneNumber,
                comment: regItem.comment,
                company_no: partnerItems.items[regItem.companyIndex].company_no
            })
        });

        if (!response.ok) {
            const json = await response.json();
            alert(json.message);
            return;
        }

        //dispatch({ type: CHANGE_PAGE, target: PAGE_VIEW.LIST });
        history('/management',{replace:true});
    }, [token, equipCategoryItems, partnerItems, regItem, materialCategoryItems, history]);

    // const onChangeView = useCallback((e, index) => {
    // 	e.preventDefault();
    // 	dispatch({ type: CHANGE_PAGE, target: index });
    // }, [dispatch]);

    let EquipCategoryOptions = [];
    EquipCategoryOptions.push(<option value={0} key={0}>{"없음"}</option>);
    for (let i = 0; i < equipCategoryItems.count; i++) {
        EquipCategoryOptions.push(<option value={i + 1} key={i + 1}>{equipCategoryItems.items[i].model_name}</option>);
    };

    let PartnerOptions = [];
    for (let i = 0; i < partnerItems.count; i++) {
        PartnerOptions.push(<option value={i} key={i}>{partnerItems.items[i].name}</option>);
    };

    let MaterialCategoryOptions = [];
    MaterialCategoryOptions.push(<option value={0} key={0}>{"없음"}</option>);
    for (let i = 0; i < materialCategoryItems.count; i++) {
        MaterialCategoryOptions.push(<option value={i + 1} key={i + 1}>{materialCategoryItems.items[i].name}</option>);
    };

    return (
        <div id="wrap" className="wrap management16">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>자재 항목 관리</h2>
                    <div className="box">
                        <h3>자재 항목 신규 등록</h3>
                        <span>*필수입력</span>
                        <div className="table">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>*자재명</th>
                                        <td><input type="text" value={regItem.name} name="name" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>*단위</th>
                                        <td><input type="text" value={regItem.unit} name="unit" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>*재고</th>
                                        <td><input type="text" value={regItem.quantity} name="quantity" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>*자재 분류</th>
                                        <td>
                                            <select value={regItem.materialCategoryIndex} name="materialCategoryIndex" onChange={onChange}>
                                                {MaterialCategoryOptions}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>*지정 기자재 품목</th>
                                        <td>
                                            <select value={regItem.equipCategoryIndex} name="equipCategoryIndex" onChange={onChange}>
                                                {EquipCategoryOptions}
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
                                </tbody>
                            </table>
                            <p className="border"></p>
                            <h4>구매처 정보</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>구매처명</th>
                                        <td><input type="text" value={regItem.seller} name="seller" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td><input type="text" className="num" value={regItem.phoneNumber} name="phoneNumber" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>비고</th>
                                        <td><input type="text" value={regItem.comment} name="comment" onChange={onChange} /></td>
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
