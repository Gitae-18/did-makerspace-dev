/* 사용자 - 서비스 신청서 작성 페이지 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method, getRspMsg, MaxFileCount, MB, LIMIT } from '../../CommonCode';
import { useSelector } from "react-redux"; import UServiceNavi from './ServiceNavi';
import { useLocation,useNavigate } from 'react-router';
import SubSideMenu from '../contents/SubSideMenu';
import $ from 'jquery';

import '../../css/common-s.css';
import '../../css/style-s.css';

export default function ({query}) {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    const [categoryItems, setCategoryItems] = useState({
        count: 0,
        items: [],
    });
    const [fileInfo, setFileInfo] = useState([]);
    const [checkValue, setCheckValue] = useState([]);
    const [value, setValue] = useState({
        title: '',
        productName: '',
        content: '',
        businessPlan: '',
        requirement: ''
    });
    const getCategory = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/category/all', {
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
        var arrayInit = new Array(count);
        for (let i = 0; i < count; i++) {
            arrayInit[i] = false;
        }
        setCheckValue(arrayInit);
        setCategoryItems(categoryItems => ({
            ...categoryItems,
            count,
            items: json.items,
        }));
    }, [token]);

    useEffect(() => {
        getCategory();
        return () => {
            mountedRef.current = false
        }
	}, [getCategory])

    const onFileUpload = useCallback((e) => {
        e.preventDefault();

        const fileSize = e.target.files[0].size;
        //console.log('file = ', fileSize, ' limit = ', limit);
        if (fileSize > LIMIT) {
            alert(MB + 'MB 보다 작은 크기여야 합니다.');
            return;
        }

        setFileInfo([
            ...fileInfo,
            e.target.files[0]
        ]);
    }, [fileInfo])

    const onCheckChange = useCallback((e, index) => {
        let temp = [...checkValue];
        temp[index] = e.target.checked;
        setCheckValue(temp);
    }, [checkValue]);

    const onChange = useCallback((e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }, [value]);

    const onReg = useCallback(async (e) => {
        e.preventDefault();

        let categories = '';
        for (let i = 0; i < checkValue.length; i++) {
            if (checkValue[i] === true) {
                if (categories.length > 0) { categories += ','; }
                categories += categoryItems.items[i].service_category_no;
            }
        }


        if (categories.length < 1) { return alert('신청 서비스를 선택해 주세요') }
        if (value.title.length < 1) { return alert('제목 또는 내용이 비어있습니다.') }
        if (value.productName.length < 1) { return alert('시제품명이 비어있습니다') }
        if (value.content.length < 1) { return alert('제품 개념 및 신청 내용이 비어있습니다') }
        if (value.businessPlan.length < 1) { return alert('사업화(상용화) 계획이 비어있습니다') }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/no_consulting', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                service_categories_no: categories,
                title: value.title,
                product_name: value.productName,
                content: value.content,
                business_plan: value.businessPlan,
                requirement: value.requirement
            })
        });

        if (!response.ok) {
            return alert(getRspMsg(response.status));
        }

        const json = await response.json();
        let service_no = json.service_no ? json.service_no : 0;
        
        if (service_no > 0 && fileInfo.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < fileInfo.length; i++) {
                formData.append('files', fileInfo[i]);
            }

            $('.loading').css('display', 'block');
            const response = await fetch(PreUri + '/service/' + service_no + '/service_application/files', {
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
        history('/uservice',{replace:true});
    }, [categoryItems, checkValue, value, fileInfo, token, history]);

    const onFileRemove = useCallback((e, idx) => {
        e.preventDefault();
        const temp = [...fileInfo];
        temp.splice(idx, 1);
        setFileInfo(temp);
    }, [fileInfo])

    const FileInput = useCallback((props) => {
        return (<>
            <tr className="enter"></tr>
            <tr>
                <th>{props.index === 0 ? '첨부파일' : ''}</th>
                <td>
                    <input type="text" readOnly={true} value={props.filename === undefined ? '' : props.filename.name} />
                    <label className="file"><input type={props.type}
                        name="file"
                        onChange={props.onChange}
                        onClick={props.onClick}
                    />{props.label}</label>
                </td>
            </tr>
        </>);
    }, []);

    let AttachedFileItems = [];
    for (let i = 0; i <= fileInfo.length && i < MaxFileCount; i++) {
        let endline = (i === fileInfo.length) ? true : false;
        AttachedFileItems.push(<FileInput index={i}
            filename={fileInfo[i]}
            type={endline ? "file" : "button"}
            label={endline ? '파일선택' : '취소'}
            onChange={endline ? onFileUpload : undefined}
            onClick={endline ? undefined : (e) => onFileRemove(e, i)}
            key={i} />);
    };

    /*
	const CategoryItem = useCallback((props) => {
        return (<>
            <p className="chkBox">
                <label htmlFor={props.categoryNo}>
                    <input type="checkbox" name={props.categoryNo} id={props.categoryNo}
                    checked={props.checked}
                    onChange={props.onChange} />
                <span className="checkmark" />{props.categoryName}
                </label>
            </p>
		</>);
	}, []);

	let CategoryItems = [];
    for (let i = 0; i < categoryItems.count; i++) {
        const item = categoryItems.items[i];
        CategoryItems.push(<CategoryItem index={i} categoryNo={item.service_category_no}
                            checked={checkValue[i]}
                            categoryName={item.service_name} 
                            onChange={(e) => onCheckChange(e, i)}
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
                                    name={props.item_1.service_category_no}
                                    id={props.item_1.service_category_no}
                                    checked={props.checked_1}
                                    onChange={props.onChange_1}
                                    />
                                <span className="checkmark" />{props.item_1.service_name}</label>
                        </p>
                    </td> : <></> }
                {props.item_2 ? 
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_2.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_2.service_category_no}
                                    id={props.item_2.service_category_no}
                                    checked={props.checked_2}
                                    onChange={props.onChange_2}
                                    />
                                <span className="checkmark" />{props.item_2.service_name}</label>
                        </p>
                    </td> : <></> }
                {props.item_3 ? 
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_3.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_3.service_category_no}
                                    id={props.item_3.service_category_no}
                                    checked={props.checked_3}
                                    onChange={props.onChange_3}
                                    />
                                <span className="checkmark" />{props.item_3.service_name}</label>
                        </p>
                    </td> : <></> }
                {props.item_4 ? 
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_4.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_4.service_category_no}
                                    id={props.item_4.service_category_no}
                                    checked={props.checked_4}
                                    onChange={props.onChange_4}
                                    />
                                <span className="checkmark" />{props.item_4.service_name}</label>
                        </p>
                    </td> : <></> }
                {props.item_5 ? 
                    <td>
                        <p className="chkBox">
                            <label htmlFor={props.item_5.service_category_no}>
                                <input type="checkbox"
                                    name={props.item_5.service_category_no}
                                    id={props.item_5.service_category_no}
                                    checked={props.checked_5}
                                    onChange={props.onChange_5}
                                    />
                                <span className="checkmark" />{props.item_5.service_name}</label>
                        </p>
                    </td> : <></> }
            </tr>
        );
    }, []);
 

    let CategoryItems = [];
    const rowCount = (categoryItems.count / 5) + (categoryItems.count % 5);
    for (let row = 0; row < rowCount; row++)
    {
        const front_idx = row * 5;
        CategoryItems.push(
            <CategoryItem row={row} 
                item_1 = {categoryItems.items[front_idx]}
                item_2 = {categoryItems.items[front_idx + 1]}
                item_3 = {categoryItems.items[front_idx + 2]}
                item_4 = {categoryItems.items[front_idx + 3]}
                item_5 = {categoryItems.items[front_idx + 4]}
                checked_1 = {checkValue[front_idx]}
                checked_2 = {checkValue[front_idx + 1]}
                checked_3 = {checkValue[front_idx + 2]}
                checked_4 = {checkValue[front_idx + 3]}
                checked_5 = {checkValue[front_idx + 4]}
                onChange_1={(e) => onCheckChange(e, front_idx)}
                onChange_2={(e) => onCheckChange(e, front_idx + 1)}
                onChange_3={(e) => onCheckChange(e, front_idx + 2)}
                onChange_4={(e) => onCheckChange(e, front_idx + 3)}
                onChange_5={(e) => onCheckChange(e, front_idx + 4)}
                key={row} />
        )
    }
    console.log(value.title)
    return (
        <div id="wrap" className='wrap utilize7'>
            <div className="content_wrap">
            <SubSideMenu title={"시제품제작"} subtitle={"시제품 제작신청"}/>
                <div className="inner_wrap">
                    <div className="top_menu">
                        <UServiceNavi step={3} />
                    </div>
                    <h2>서비스 이용 신청서 작성</h2>
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
                                        <td><input type="text" value={value.title} name="title" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>시제품명(프로젝트 명)</th>
                                        <td><input type="text" value={value.productName} maxLength='90' name="productName" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>제품 개념 및 신청 내용</th>
                                        <td><textarea value={value.content} name="content" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>사업화(상용화) 계획</th>
                                        <td><textarea value={value.businessPlan} name="businessPlan" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>기타 지원 요구 사항</th>
                                        <td><textarea value={value.requirement} name="requirement" onChange={onChange} /></td>
                                    </tr>
                                    {AttachedFileItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className="btn_apply" onClick={onReg}>서비스 이용 신청</button>
                </div>
            </div>
            <div className="loading" />
        </div>
    );
}
