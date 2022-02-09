import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';

import { useSelector } from "react-redux";

import '../../../css/common.css';
import '../../../css/style.css';

export default function ({ location, history }) {
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const { serviceCategoryItem } = useSelector(state => state.management);
    const [partnerItems, setPartnerItems] = useState({
        count: 0,
        items: [],
    });
    const [regItem, setRegItem] = useState({
        companyIndex: 0,
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

        let companyIndex = 0;
        for (let i = 0; i < json.count; i++) {
            if (json.items[i].company_no === serviceCategoryItem.company_no) {
                companyIndex = i;
                break;
            }
        }

        setRegItem(regItem => ({
            ...regItem,
            categoryName: serviceCategoryItem.service_name,
            companyIndex
        }));

        setPartnerItems(partnerItems => ({
            ...partnerItems,
            count: Number(json.count),
            items: json.items,
        }));
    }, [token, serviceCategoryItem]);

    useEffect(() => {
        if (!mountedRef.current) { return }

        if (serviceCategoryItem) {
            getPartnerList();
        } else {
            history.replace('/management')
        }

        return () => {
            mountedRef.current = false
        }
    }, [getPartnerList, serviceCategoryItem, history])

    const onChange = useCallback((e) => {
        e.preventDefault();
        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        })
    }, [regItem]);

    const onUpdate = useCallback(async (e) => {
        e.preventDefault();

        if (partnerItems.count === 0) { return; }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/category/' + serviceCategoryItem.service_category_no, {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                company_no: partnerItems.items[regItem.companyIndex].company_no
            })
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        // dispatch({ type: CHANGE_PAGE, target: PAGE_VIEW.LIST });
        history.go(-1);
    }, [token, partnerItems, regItem, serviceCategoryItem, history]);

    // const onChangeView = useCallback((e, index) => {
    // 	e.preventDefault();
    // 	dispatch({ type: CHANGE_PAGE, target: index });
    // }, [dispatch]);

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
                        <h3>{serviceCategoryItem ? serviceCategoryItem.service_name : ''}</h3>
                        <span>*필수입력</span>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="82%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*서비스명</th>
                                    <td><input type="text" disabled={true} readOnly={true} defaultValue={regItem.categoryName} name="categoryName" /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*담당 기업</th>
                                    <td>
                                        <select value={regItem.companyIndex} name="companyIndex" onChange={onChange}>
                                            {OptionItems}
                                        </select>
                                    </td>
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