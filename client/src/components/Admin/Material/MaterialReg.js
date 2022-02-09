import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_CATEGORY, SET_MATERIAL_PAGEINFO } from "../../../store/material";

import SideNavi from './SideNavi';

import $ from "jquery";

import '../../../css/common.css';
import '../../../css/style.css';

export default function ({ location, history }) {
    const dispatch = useDispatch();
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const { categoryList } = useSelector(state => state.material);
    const [requestForm, setRequestForm] = useState({
        content: '',
        quantity: 0,
        materialCategoryIndex: 0,
        materialListIndex: 0,
    })

    const [materialList, setMaterialList] = useState();

    let MaterialCategoryOptions = [];
    let MaterialListOptions = [];

    const getItemList = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/material/list/item', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }
        setMaterialList(json);
    }, [token]);

    useEffect(() => {
        getItemList();
        return () => {
            mountedRef.current = false
        }
    }, [getItemList])

    const onChange = useCallback((e) => {
        e.preventDefault();

        const re = /^[0-9\b]+$/;
        if (e.target.name === 'quantity'
            && e.target.value !== '' && !re.test(e.target.value)) {
            return;
        }

        let copy = {
            ...requestForm,
            [e.target.name]: e.target.value,
        };

        if (e.target.name === 'materialCategoryIndex') {
            copy = {
                ...copy,
                'materialListIndex': 0,
                'quantity': 0,
            }
        } else if (e.target.name === 'materialListIndex') {
            copy = {
                ...copy,
                'quantity': 0,
            }
        }

        setRequestForm(copy);
    }, [requestForm]);

    const onReg = useCallback(async (e) => {
        e.preventDefault();

        if (!MaterialListOptions[requestForm.materialListIndex]) {
            return;
        }

        const index = MaterialListOptions[requestForm.materialListIndex].key;
        const material_item_no = materialList[index] ? materialList[index].item_no : undefined;

        if (material_item_no < 1) {
            alert('잘못된 자재 입니다');
            return;
        }

        if (requestForm.quantity < 1) {
            alert('신청 수량을 확인해 주세요');
            return;
        }

        if (requestForm.content.length < 1) {
            alert('신청 수량을 확인해 주세요');
            return;
        }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/material/usage/', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                material_item_no,
                // sortation: "BUY",
                quantity: requestForm.quantity,
                request_content: requestForm.content
            }),
        });

        //console.log(response);
        if (!response.ok) {
            alert('자재 신청을 실패하였습니다');
            return;
        }

        history.go(-1);
    }, [token, MaterialListOptions, materialList, requestForm, history]);

    const onCategory = useCallback((e, index) => {
        dispatch({ type: CHANGE_CATEGORY, target: index });
        dispatch({ type: SET_MATERIAL_PAGEINFO, target: { pageNo: 1, pageOffset: 0, search: '' } });
        history.push('/mmaterial');
    }, [dispatch, history]);

    if (categoryList) {
        for (let i = 0; i < categoryList.length; i++) {
            MaterialCategoryOptions.push(<option value={i} key={i}>{categoryList[i].name}</option>);
        };

        if (categoryList[requestForm.materialCategoryIndex]) {
            const target_no = categoryList[requestForm.materialCategoryIndex].no;
            for (let i = 0, j = 0; materialList && i < materialList.length; i++) {
                if (target_no === -1 || (target_no === 0 && !materialList[i].category_no) || target_no === materialList[i].category_no) {
                    MaterialListOptions.push(<option value={j++} key={i}>{materialList[i].name}</option>);
                }
            }
        }
    }

    return (
        <div id="wrap" className="wrap materials2">
            <div className="content_wrap">
                <SideNavi location={location} history={history} onCategory={onCategory} />
                <div className="content">
                    <div className="form">
                        <h3>자재 신청</h3> <span>*필수입력</span>
                        <table>
                            <tbody>
                                <tr>
                                    <th>*자재 분류</th>
                                    <td>
                                        <select value={requestForm.materialCategoryIndex} name="materialCategoryIndex" onChange={onChange}>
                                            {MaterialCategoryOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*자재 항목</th>
                                    <td>
                                        <select value={requestForm.materialListIndex} name="materialListIndex" onChange={onChange}>
                                            {MaterialListOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*신청수량</th>
                                    <td className="eng"><input type="text" className="num" name="quantity" value={requestForm.quantity} onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*신청내용</th>
                                    <td><textarea name="content" value={requestForm.content} onChange={onChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button onClick={() => { history.go(-1) }} className="btn_left">뒤로 가기</button>
                        <button onClick={() => { $('.pop').css('display', 'block') }} className="reject">자재 신청</button>
                    </div>
                </div>
                <div className="pop">
                    <p>자재 [{requestForm.quantity}] 구매를 신청 하시겠습니까?</p>
                    <ul>
                        <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }} >취소</button></li>
                        <li className="yes" onClick={onReg} ><button>확인</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}