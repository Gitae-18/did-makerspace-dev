import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method, getRspMsg, MaxFileCount, MB, LIMIT } from '../../CommonCode';
import { useSelector } from "react-redux"; import UServiceNavi from './ServiceNavi';

import $ from 'jquery';

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
        requirement: '',
		attached_file: [],
    });
	const [isReadonly, setIsReadonly] = useState(true);

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
        setIsReadonly(serviceApp.status === 'URD' ? false : true)
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
            attached_file: serviceApp.attached_file ? serviceApp.attached_file : []
        }));
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

    // DID 요청에 의해 삭제 2021.05.25(나의 임의)
    // const onCancel = useCallback(async (e) => {
    //     e.preventDefault();

    //     const response = await fetch(PreUri + '/service/' + no + '/service_application/usercancel', {
    //         method: Method.post,
    //         headers: {
    //             authorization: token,
    //         },
    //     });

    //     if (!response.ok) {
    //         console.log('response error');
    //         return;
    //     }

    //     history.replace('/uservice');
    // }, [token, no, history]);

    const onChange = useCallback((e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }, [value]);

    const onCheckChange = useCallback((e, index) => {
        let temp = [...checkValue];
        temp[index] = e.target.checked;
        setCheckValue(temp);
    }, [checkValue]);

	const onEdit = useCallback(async (e) => {
        e.preventDefault();

        let categories = '';
        for (let i = 0; i < checkValue.length; i++) {
            if (checkValue[i] === true) {
                if (categories.length > 0) { categories += ','; }
                categories += categoryItems.items[i].service_category_no;
            }
        }

        if (categories.length < 1) { return alert('신청 서비스를 선택해 주세요') }
        if (value.productName.length < 1) { return alert('시제품명이 비어있습니다') }
        if (value.content.length < 1) { return alert('제품 개념 및 신청 내용이 비어있습니다') }
        if (value.businessPlan.length < 1) { return alert('사업화(상용화) 계획이 비어있습니다') }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/service_application', {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                service_categories_no: categories,
                product_name: value.productName,
                content: value.content,
                business_plan: value.businessPlan,
                requirement: value.requirement
            })
        });

        if (!response.ok) {
            alert(getRspMsg(response.status));
            history.go(0)
        }

        let file_count = 0
        if (value.attached_file) {
            const formData = new FormData();
            for (let i = 0; i < value.attached_file.length; i++) {
                if (value.attached_file[i].attached_file_no === 0) {
                    formData.append('files', value.attached_file[i].clientfile);
                    file_count++;
                }
            }

            if (file_count > 0) {
                $('.loading').css('display', 'block');
                const response = await fetch(PreUri + '/service/' + no + '/service_application/files', {
                    method: Method.post,
                    headers: { authorization: token, },
                    body: formData
                });

                $('.loading').css('display', 'none');
                if (!response.ok) {
                    console.log('response error');
                    return;
                }
            }
        }

        alert("수정되었습니다.");
        history.go(0)
    }, [categoryItems, checkValue, value, token, no, history]);

    const onFileUpload = useCallback((e, i) => {
        e.preventDefault();

        if (!e.target.files.length === 0) {
            console.log(e.target.files);
            return;
        }

        const fileSize = e.target.files[0].size;
        if (fileSize > LIMIT) {
            alert(MB + 'MB 보다 작은 크기여야 합니다.');
            return;
        }

        let copy = { ...value };
        copy.attached_file[i] = {
            ...copy.attached_file[i],
            attached_file_no: 0,
            original_name: e.target.files[0].name,
            clientfile: e.target.files[0]
        }

        setValue(copy);
        e.target.value = null;
    }, [value])

    const onFileRemove = useCallback(async (e, i) => {
        e.preventDefault();

        let copy = { ...value };
        const file_no = copy.attached_file[i].attached_file_no;
        if (file_no > 0) { // from Server
            CommonHeader.authorization = token;
            let response = await fetch(PreUri + '/file/' + file_no, {
                method: Method.delete,
                headers: CommonHeader
            });

            if (!response.ok) {
                alert(getRspMsg(response.status));
                console.log('remove error');
                return;
            }
        }

        copy.attached_file.splice(i, 1);;
        setValue(copy);
    }, [value, token]);

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
            < tr className="enter" ></tr>
            <tr>
                <th>{props.index === 0 ? '첨부파일' : ''}</th>
                <td colSpan="3" className="eng"><button style={{ border: "0px", backgroundColor: '#fff', cursor: 'pointer' }} onClick={props.onClick}>{props.filename}</button></td>
            </tr>
        </>);
    }, []);

    const FileInput = useCallback((props) => {
        return (<>
            <tr className="enter"></tr>
            <tr>
                <th>{props.index === 0 ? '첨부파일' : ''}</th>
                <td className="file">
                    <div>
                        <input type="text" readOnly={true} value={props.filename === undefined ? '' : props.filename} onClick={props.onDownload} style={props.style} />
                        <label><input type={props.type} name="attached_files" onChange={props.onChange} onClick={props.onClick} />{props.label}</label>
                    </div>
                </td>
            </tr>
        </>);
    }, []);

    let AttachedFileItems = [];
    for (let i = 0; i <= value.attached_file.length && i < MaxFileCount; i++) {
        let file = (i === value.attached_file.length) ? undefined : value.attached_file[i];
        if (isReadonly) {
            if (file !== undefined) {
                AttachedFileItems.push(
                    <FileDownload index={i}
                        filename={file.original_name}
                        onClick={(e) => onFileDownload(e, file)}
                        key={i} />);
            }
        } else {
            AttachedFileItems.push(
                <FileInput index={i}
                    type={"file"}
                    filename={file ? file.original_name : undefined}
                    label={file ? ((Number(file.attached_file_no) > 0) ? "삭제" : "취소") : "파일선택"}
                    onChange={file ? undefined : (e) => onFileUpload(e, i)}
                    onClick={file ? (e) => onFileRemove(e, i) : undefined}
                    onDownload={file ? (e) => onFileDownload(e, file) : undefined}
                    style={file ? { cursor: 'pointer' } : undefined}
                    key={i} />);
        }
    };

    const CategoryItem = useCallback((props) => {
        return (
            <tr>
                {props.item_1 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_1.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_1.service_category_no}
                                    id={props.item_1.service_category_no}
                                    checked={props.checked_1}
                                    onChange={props.onChange_1}
                                    disabled={props.isReadonly}
                                    readOnly={props.isReadonly} />
                                <span className="checkmark" />{props.item_1.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_2 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_2.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_2.service_category_no}
                                    id={props.item_2.service_category_no}
                                    checked={props.checked_2}
                                    onChange={props.onChange_2}
                                    disabled={props.isReadonly}
                                    readOnly={props.isReadonly} />
                                <span className="checkmark" />{props.item_2.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_3 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_3.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_3.service_category_no}
                                    id={props.item_3.service_category_no}
                                    checked={props.checked_3}
                                    onChange={props.onChange_3}
                                    disabled={props.isReadonly}
                                    readOnly={props.isReadonly} />
                                <span className="checkmark" />{props.item_3.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_4 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_4.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_4.service_category_no}
                                    id={props.item_4.service_category_no}
                                    onChange={props.onChange_4}
                                    checked={props.checked_4}
                                    disabled={props.isReadonly}
                                    readOnly={props.isReadonly} />
                                <span className="checkmark" />{props.item_4.service_name}</label>
                        </p>
                    </td> : <></>}
                {props.item_5 ?
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_5.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_5.service_category_no}
                                    id={props.item_5.service_category_no}
                                    checked={props.checked_5}
                                    onChange={props.onChange_5}
                                    disabled={props.isReadonly}
                                    readOnly={props.isReadonly} />
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
                onChange_1={(e) => onCheckChange(e, front_idx)}
                onChange_2={(e) => onCheckChange(e, front_idx + 1)}
                onChange_3={(e) => onCheckChange(e, front_idx + 2)}
                onChange_4={(e) => onCheckChange(e, front_idx + 3)}
                onChange_5={(e) => onCheckChange(e, front_idx + 4)}
                isReadonly={isReadonly}
                key={row} />
        )
    }

    return (
        <div id="wrap" className='wrap utilize9'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="top_menu">
                        <UServiceNavi step={3} />
                    </div>
                    {isReadonly ? <p className="alert">서비스 이용 신청서를 검토중입니다.<br />서비스 이용 일정은 추후 공지해드리겠습니다.</p> : <></>}
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
                                        <td><input type="text" value={value.productName} maxLength='90' name="productName" onChange={onChange} readOnly={isReadonly} disabled={isReadonly} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>제품 개념 및 신청 내용</th>
                                        <td><textarea value={value.content} name="content" onChange={onChange} readOnly={isReadonly} disabled={isReadonly} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>사업화(상용화) 계획</th>
                                        <td><textarea value={value.businessPlan} name="businessPlan" onChange={onChange} readOnly={isReadonly} disabled={isReadonly} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>기타 지원 요구 사항</th>
                                        <td><textarea value={value.requirement} name="requirement" onChange={onChange} readOnly={isReadonly} disabled={isReadonly} /></td>
                                    </tr>
                                    {AttachedFileItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="btn_box">
                        <button className="btn_left" onClick={() => { history.go(-1) }}>뒤로 가기</button>
                        {isReadonly ? <></> : <button className="btn_cancel" onClick={(e) => { onEdit(e) }}>내용 수정</button>}
                        {/* <button className="btn_cancel" onClick={(e) => { $('.pop').css('display', 'block'); }}>서비스 신청 취소</button> */}
                    </div>
                </div>
                {/* <div className="pop">
                    <p>정말 서비스 신청을 취소하시겠습니까?</p>
                    <ul>
                        <li className="no"><button onClick={(e) => { $('.pop').css('display', 'none'); }}>취소</button></li>
                        <li className="yes"><button onClick={onCancel}>학인</button></li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
}
