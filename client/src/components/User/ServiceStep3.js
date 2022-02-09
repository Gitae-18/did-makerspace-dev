import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../CommonCode';
import { useSelector } from "react-redux"; import UServiceNavi from './ServiceNavi';

import '../../css/common.css';
import '../../css/style.css';

export default function ({ history, no }) {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const [categoryItems, setCategoryItems] = useState({
        count: 0,
        items: [],
    });

    const [checkValue, setCheckValue] = useState([]);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState({
        productName: '',
        content: '',
        businessPlan: '',
        requirement: ''
    });
    const [attachedFile, setAttachedFile] = useState([]);

    const getCategory = useCallback(async () => {
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
        let arrayInit = new Array(count);
        for (let i = 0; i < count; i++) {
            arrayInit[i] = false;
        }

        response = await fetch(PreUri + '/service/' + no + '/service_application', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        const serviceApp = await response.json();
        if (serviceApp.categories.length > 0) {
            const split = serviceApp.categories.split(',');
            for (let j = 0; j < split.length; j++) {
                for (let i = 0; i < json.count; i++) {
                    if (json.items[i].service_category_no === Number(split[j])) {
                        arrayInit[i] = true;
                    }
                }
            }
        }

        if (!mountedRef.current) { return }
        setCheckValue(arrayInit);
        setCategoryItems(categoryItems => ({
            ...categoryItems,
            count,
            items: json.items,
        }));
        setValue(value => ({
            ...value,
            productName: serviceApp.product_name ? serviceApp.product_name : '',
            content: serviceApp.content ? serviceApp.content : '',
            businessPlan: serviceApp.business_plan ? serviceApp.business_plan : '',
            requirement: serviceApp.requirement ? serviceApp.requirement : '',
        }));
        setAttachedFile(serviceApp.attached_file);
        setTitle(serviceApp.title);
    }, [no, token]);

    useEffect(() => {
        if (!no) {
            alert('Error : Service Number');
            return;
        }

        getCategory();
        return () => {
            mountedRef.current = false
        }
    }, [no, getCategory])

    const onFileDownload = useCallback(async (e, fileInfo) => {
        e.preventDefault();
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/file/' + fileInfo.attached_file_no + '/download', {
            responseType: 'blob',
            method: Method.get,
            headers: {
                authorization: token,
            },
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        var fileDownload = require('js-file-download');
        fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name);
    }, [token]);

    const FileDownload = useCallback((props) => {
        return (<>
            <tr className="enter" ></tr>
            <tr>
                <th>{props.index === 0 ? '첨부파일' : ''}</th>
                <td colSpan="3" className="eng">
                    <button style={{ paddingTop: "12px", border: "0px", backgroundColor: '#fff', cursor: 'pointer' }}
                        onClick={props.onClick}>{props.filename}</button>
                </td>
            </tr>
        </>);
    }, []);

    let DownloadFileItems = [];
    if (attachedFile) {
        const files = attachedFile;
        for (let i = 0; i < files.length; i++) {
            DownloadFileItems.push(<FileDownload index={i}
                filename={files[i].original_name}
                onClick={(e) => onFileDownload(e, files[i])}
                key={i} />);
        };
    }

    /*
    const CategoryItem = useCallback((props) => {
        return (<>
            <p className="chkBox">
                <label htmlFor={props.categoryNo}>
                    <input type="checkbox"
                        disabled={true}
                        name={props.categoryNo}
                        id={props.categoryNo}
                        checked={props.checked}
                        readOnly={true} />
                    <span className="checkmark" />{props.categoryName}</label>
            </p>
        </>);
    }, []);

    let CategoryItems = [];
    for (let i = 0; i < categoryItems.count; i++) {
        const item = categoryItems.items[i];
        CategoryItems.push(<CategoryItem index={i} categoryNo={item.service_category_no}
                            checked={checkValue[i]}
                            categoryName={item.service_name} 
                            key={i} />);
    };
    */

    const CategoryItem = useCallback((props) => {
        return (
            <tr>
                {props.item_1 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_1.service_category_no}>
                                <input type="checkbox"
                                    disabled={true}
                                    name={props.item_1.service_category_no}
                                    id={props.item_1.service_category_no}
                                    checked={props.checked_1}
                                    readOnly={true} />
                                <span className="checkmark" />{props.item_1.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_2 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_2.service_category_no}>
                                <input type="checkbox"
                                    disabled={true}
                                    name={props.item_2.service_category_no}
                                    id={props.item_2.service_category_no}
                                    checked={props.checked_2}
                                    readOnly={true} />
                                <span className="checkmark" />{props.item_2.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_3 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_3.service_category_no}>
                                <input type="checkbox"
                                    disabled={true}
                                    name={props.item_3.service_category_no}
                                    id={props.item_3.service_category_no}
                                    checked={props.checked_3}
                                    readOnly={true} />
                                <span className="checkmark" />{props.item_3.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_4 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_4.service_category_no}>
                                <input type="checkbox"
                                    disabled={true}
                                    name={props.item_4.service_category_no}
                                    id={props.item_4.service_category_no}
                                    checked={props.checked_4}
                                    readOnly={true} />
                                <span className="checkmark" />{props.item_4.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_5 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_5.service_category_no}>
                                <input type="checkbox"
                                    disabled={true}
                                    name={props.item_5.service_category_no}
                                    id={props.item_5.service_category_no}
                                    checked={props.checked_5}
                                    readOnly={true} />
                                <span className="checkmark" />{props.item_5.service_name}</label>
                        </p>
                    </td> : <></>}
            </tr>
        );
    }, []);

    let CategoryItems = [];
    const rowCount = (categoryItems.count / 5) + (categoryItems.count % 5);
    for (let row = 0; row < rowCount; row++) {
        const front_idx = row * 5;
        CategoryItems.push(
            <CategoryItem row={row}
                item_1={categoryItems.items[front_idx]}
                item_2={categoryItems.items[front_idx + 1]}
                item_3={categoryItems.items[front_idx + 2]}
                item_4={categoryItems.items[front_idx + 3]}
                item_5={categoryItems.items[front_idx + 4]}
                checked_1={checkValue[front_idx]}
                checked_2={checkValue[front_idx + 1]}
                checked_3={checkValue[front_idx + 2]}
                checked_4={checkValue[front_idx + 3]}
                checked_5={checkValue[front_idx + 4]}
                key={row} />
        )
    }

    return (
        <div id="wrap" className='wrap utilize9'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="top_menu">
                        <UServiceNavi step={4} />
                    </div>
                    <p className="alert">서비스 이용을 진행중입니다.</p>
                    <div className="form">
                        <h3>서비스 신청서</h3>
                        <div className="box1">
                            <h4>신청 분야<span>(복수선택 가능)</span></h4>
                            <div className="option">
                                <table>
                                    <colgroup>
                                        <col width="20%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                    </colgroup>
                                    <tbody>
                                        {CategoryItems}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box2">
                            <h4>신청 정보</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>제목</th>
                                        <td><input type="text" readOnly={true} value={title} disabled={true} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>시제품명(프로젝트 명)</th>
                                        <td><input type="text" value={value.productName} readOnly={true} disabled={true} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>제품 개념 및 신청 내용</th>
                                        <td><textarea value={value.content} readOnly={true} disabled={true} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>사업화(상용화) 계획</th>
                                        <td><textarea value={value.businessPlan} readOnly={true} disabled={true} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>기타 지원 요구 사항</th>
                                        <td><textarea value={value.requirement} readOnly={true} disabled={true} /></td>
                                    </tr>
                                    {DownloadFileItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="btn_box">
                        {/* <button className="btn_left" onClick={() => { history.go(-1) }}>뒤로 가기</button> */}
                        <button className="btn_cancel" onClick={() => { history.go(-1) }}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


/*
import React from 'react';
import '../../css/common.css';
import '../../css/style.css';

export default function ({ history }) {
    return (
        <div id="wrap" className='wrap utilize11'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_process.png" alt="img" />
                        <p>서비스 이용이 진행중입니다.</p>
                    </div>
                    <button type="button" className="btn_ok" onClick={()=>{history.go(-1)}}>확인</button>
                </div>
            </div>
        </div>
    );
}
*/