import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { CommonHeader, PreUri, Method, getRspMsg, ConvertPhoneNumber, ConvertRegNumber } from '../../../CommonCode';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

import '../../../css/common-s.css';
import '../../../css/style-s.css';
export default () => {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const query = useParams();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        company: '',
        companyPosition: '',
        companyRegNumber: '',
        companyBusiness: '',
        companyAddress: '',
    })

    const [consultingFlag, setConsultingFlag] = useState(false);
    const [consulting, setConsulting] = useState({
        serviceNo: '',
        name: '',
        email: '',
        phoneNumber: '',
        company: '',
        companyPosition: '',
        companyRegNumber: '',
        companyBusiness: '',
        companyAddress: '',
        title: '',
        content: '',
        //reservation: '',
        created_at: '',
        attachedFile: [],
    });

    const [consultingResult, setConsultingResult] = useState({
        serviceNo: '',
        content: '',
        resultFlag: '',
        attachedFile: [],
        updatedAt: '',
    });

    const [serviceAppConfirm, setServiceAppConfirm] = useState({
        updatedAt: '',
    });

    const [categoryItems, setCategoryItems] = useState({
        count: 0,
        items: [],
    });
    const [checkValue, setCheckValue] = useState([]);
    const [serviceAppItem, setServiceAppItem] = useState({});

    const [isDrop, setIsDrop] = useState(false);

    const [isSurveyDone, setIsSurveyDone] = useState(false);
    const [surveyList, setSurveyList] = useState([{
        ask_text: "본 서비스 자원이 필요하다고 느껴지는 정도는?",
        answer: 0,
    }, {
        ask_text: "제품화 지원센터 서비스가 도움이 된다고 생각합니까?",
        answer: 0,
    }, {
        ask_text: "본 서비스 자원이 필요하다고 느껴지는 정도는?",
        answer: 0,
    }, {
        ask_text: "본 서비스 지원의 전반적인 만족도는 어떠합니까?",
        answer: 0,
    }, {
        ask_text: "서비스 지원 처리 속도가 어떠합니까?",
        answer: 0,
    }, {
        ask_text: "서비스 지원 담당자와 소통이 잘 되었습니까?",
        answer: 0,
    }, {
        ask_text: "서비스 요청에 따른 결과가 잘 나왔습니까?",
        answer: 0,
    }, {
        ask_text: "서비스 지원장소와 시설은 어떠합니까?",
        answer: 0,
    }]);

    const [surveyText, setSurveyText] = useState('');
    const [surveyDate, setSurveyDate] = useState('');

    const [supportPartner, setSupportPartner] = useState('');
    const getData = useCallback(async (no) => {
        CommonHeader.authorization = token;
        let response;

		response = await fetch(PreUri + '/service/' + no, {
			method: Method.get,
			headers: CommonHeader
		});

		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}

		let json = await response.json();
        if (!mountedRef.current) { return }

        const progress = json.progress;
        const status = json.status;
        const consulting_flag = json.consulting_flag === 'Y' ? true : false;
        setConsultingFlag(consulting_flag);

        if (consulting_flag) {
            response = await fetch(PreUri + '/service/' + no + '/consulting', {
                method: Method.get,
                headers: CommonHeader
            });

            if (!response.ok) {
                console.log('response error');
                return;
            }

            json = await response.json();
            if (!mountedRef.current) { return }

            setConsulting(consulting => ({
                ...consulting,
                serviceNo: json.service_no,
                name: json.name,
                email: json.email,
                phoneNumber: json.phone_number,
                company: json.co_name,
                companyPosition: json.co_position,
                companyRegNumber: json.co_reg,
                companyBusiness: json.co_business,
                companyAddress: json.co_address,
                title: json.title,
                content: json.content,
                //reservation: json.reservation_date,
                created_at: json.created_at,
                attachedFile: json.attached_file,
            }));

            response = await fetch(PreUri + '/service/' + no + '/consulting/result', {
                method: Method.get,
                headers: CommonHeader
            });

            if (!response.ok) {
                console.log('response error');
                return;
            }

            json = await response.json();
            setConsultingResult(consultingResult => ({
                ...consultingResult,
                serviceNo: json.service_no,
                content: json.content,
                resultFlag: json.consulting_done_flag,
                attachedFile: json.attached_file,
                updatedAt: json.updated_at.substring(0, 10)
            }));
        }

        if ((progress === 'STEP_01' && (status === 'RES' || status === 'DRP'))) {
            setIsDrop(true);
            return;
        }

        response = await fetch(PreUri + '/service/' + no + '/service_confirm', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        json = await response.json();
        setServiceAppConfirm(serviceAppConfirm => ({
            ...serviceAppConfirm,
            updatedAt: json.updated_at.substring(0, 10)
        }))

        response = await fetch(PreUri + '/service/category/all', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
        }

        json = await response.json();
        if (!mountedRef.current) { return }
        const count = Number(json.count);
        let arrayInit = new Array(count);
        for (let i = 0; i < count; i++) {
            arrayInit[i] = false;
        }

        response = await fetch(PreUri + '/service/' + no + '/done', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        const serviceJson = await response.json();
        if (serviceJson.categories.length > 0) {
            const split = serviceJson.categories.split(',');
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

        let newServiceElement = [];
        for (let i = 0; serviceJson.category_items && i < serviceJson.category_items.length; i++) {
            let categoryItem = serviceJson.category_items[i];

            /* Service Element 초기 값 */
            let newElement = {
                service_element_no: 0,
                service_category_no: categoryItem.service_category_no,
                service_category_name: categoryItem.service_name,
                start_date: '',
                end_date: '',
                support_content: '',
                support_result: '',
                service_element_attempts: [{
                    service_element_attempt_no: 0,
                    attempt_number: 1,
                    time_required: 0,
                    production_method: '',
                    production_specification: '',
                    support_effect: 0,
                    material_usages: [{
                        material_usage_no: 0,
                        equipment_category_no: 0,
                        material_item_no: 0,
                        quantity: 0,
                        equipment_category_name: '',
                        material_item_name: '',
                    }]
                }],
                attached_files: [],
            }
            /* 초기 값 end */

            // 신청된 서비스 카테고리에 작성된 서비스 카테고리가 있는지 검사
            let newAttempts = [{
                service_element_attempt_no: 0,
                attempt_number: 1,
                time_required: 0,
                production_method: '',
                production_specification: '',
                support_effect: 0,
                material_usages: [{
                    material_usage_no: 0,
                    equipment_category_no: 0,
                    material_item_no: 0,
                    quantity: 0,
                    equipment_category_name: '',
                    material_item_name: '',
                }]
            }];
            let serviceElement = [];
            for (let j = 0; serviceJson.service_element && j < serviceJson.service_element.length; j++) {
                if (categoryItem.service_category_no === serviceJson.service_element[j].service_category_no) {
                    serviceElement = serviceJson.service_element[j];
                    break;
                }
            }

            // 작성된 것이 있습니다.
            if (serviceElement) {
                const attempts = serviceElement.service_element_attempts ? serviceElement.service_element_attempts : [];
                for (let j = 0; j < attempts.length; j++) {
                    let attempt = attempts[j];
                    let newMaterialUsages = [{
                        material_usage_no: 0,
                        equipment_category_no: 0,
                        material_item_no: 0,
                        quantity: 0,
                        equipment_category_name: '',
                        material_item_name: '',
                    }];

                    const materials = attempt.material_usages ? attempt.material_usages : [];
                    for (let k = 0; k < materials.length; k++) {
                        let material = materials[k];
                        const equip_name = (material.equipment_category && material.equipment_category.name)
                            ? material.equipment_category.name : '-';

                        const material_name = (material.material_item && material.material_item.name)
                            ? material.material_item.name : '-';

                        newMaterialUsages[k] = {
                            material_usage_no: material.material_usage_no ? material.material_usage_no : 0,
                            equipment_category_no: material.equipment_category_no ? material.equipment_category_no : 0,
                            material_item_no: material.material_item_no ? material.material_item_no : 0,
                            quantity: material.quantity ? material.quantity : 0,
                            equipment_category_name: equip_name,
                            material_item_name: material_name,
                        }
                    }

                    newAttempts[j] = {
                        service_element_attempt_no: attempt.service_element_attempt_no ? attempt.service_element_attempt_no : 0,
                        attempt_number: attempt.attempt_number ? attempt.attempt_number : 0,
                        time_required: attempt.time_required ? attempt.time_required : 0,
                        production_method: attempt.production_method ? attempt.production_method : '',
                        production_specification: attempt.production_specification ? attempt.production_specification : '',
                        support_effect: attempt.support_effect ? attempt.support_effect : '',
                        material_usages: [...newMaterialUsages],
                    }
                }

                newElement = {
                    service_element_no: serviceElement.service_element_no ? serviceElement.service_element_no : 0,
                    service_category_no: categoryItem.service_category_no,
                    service_category_name: categoryItem.service_name,
                    start_date: serviceElement.start_date ? serviceElement.start_date.substr(0, 10) : '',
                    end_date: serviceElement.end_date ? serviceElement.end_date.substr(0, 10) : '',
                    support_content: serviceElement.support_content ? serviceElement.support_content : '',
                    support_result: serviceElement.support_result ? serviceElement.support_result : '',
                    service_element_attempts: [...newAttempts],
                    attached_files: serviceElement.attached_files ? serviceElement.attached_files : [],
                }
            }

            newServiceElement[i] = { ...newElement };
        }

        setUserInfo(userInfo => ({
            ...userInfo,
            name: serviceJson.name,
            email: serviceJson.email,
            phoneNumber: serviceJson.phone_number,
            company: serviceJson.co_name,
            companyPosition: serviceJson.co_position,
            companyRegNumber: serviceJson.co_reg,
            companyBusiness: serviceJson.co_business,
            companyAddress: serviceJson.co_address,
        }));

        serviceJson.service_element = newServiceElement;
        setServiceAppItem(serviceJson);

        if (serviceJson.support_partner) {
            setSupportPartner(serviceJson.support_partner);
        }

        response = await fetch(PreUri + '/service/' + no + '/survey', {
            method: Method.get,
            headers: CommonHeader,
        });

        if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
        }

        if (response.status === 204) {
            return;
        }

        json = await response.json();
        if (!mountedRef.current) { return }

        if (json.answer_numbers) {
            let copy = [...surveyList];
            const split = json.answer_numbers.split(',');
            for (let i = 0; i < split.length; i++) {
                copy[i].answer = Number(split[i]);
            }
            setSurveyList(copy);
        }

        setSurveyText(json.answer_text ? json.answer_text : '');
        setSurveyDate(json.updated_at ? json.updated_at.substring(0, 10) : '');
        setIsSurveyDone(true);

    }, [surveyList, token]);

    useEffect(() => {
        if (!query.report_no) {
            alert('Error : Service Number');
            return;
        }

        getData(query.report_no);
        return () => {
            mountedRef.current = false
        }
    }, [query, getData])

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
    /*
    for (let i = 0; i < categoryItems.count; i++) {
        const item = categoryItems.items[i];
        CategoryItems.push(
            <CategoryItem index={i} categoryNo={item.service_category_no}
            checked={checkValue[i]}
            categoryName={item.service_name}
            key={i} />);
    };
    */
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

    const Footer = useCallback((props) => {
        return (
            <div className="foot">
                <div className="inner">
                    <div className="date">
                        <span className="i1">{props.dateText ? props.dateText + ' : ' : ''}</span>
                        {/* <span className="num year">2020</span>년 <span className="num month">05</span>월 <span className="num day">11</span>일 */}
                        <span className="num year">{props.date}</span>
                    </div>
                    <div className="info">
                        <span className="i1">지원 담당</span><span>{props.partner}</span>
                    </div>
                </div>
            </div>
        );
    }, []);

    /*--------------*/
    const MaterialUsageItem = useCallback(({ index, usageItem }) => {
        return (<>
            <tr className="enter"></tr>
            <tr>
                <th>{index === 0 ? "사용 장비" : ""}</th>
                <td> {usageItem.equipment_category_name} </td>
                <th>적용 재료</th>
                <td> {usageItem.material_item_name} </td>
                <th>재료 소모량</th>
                <td>{usageItem.quantity}</td>
            </tr>
        </>);
    }, []);

    const AttemptItem = useCallback(({ eleIdx, index, lastIndex, item, categoryData }) => {

        let MaterialUsageList = [];
        for (let i = 0; i < item.material_usages.length; i++) {
            const usageItem = item.material_usages[i];
            MaterialUsageList.push(<MaterialUsageItem index={i} usageItem={usageItem} key={i} />);
        }

        return (<>
            <tr className="enter"></tr>
            <tr>
                <th>지원 차시</th>
                <td>{item.attempt_number}</td>
                <th>소요 시간 (분)</th>
                <td>{item.time_required}</td>
            </tr>
            {MaterialUsageList}
            <tr className="enter"></tr>
            <tr>
                <th>제작 방식</th>
                <td>{item.production_method}</td>
                <th>제작 규격</th>
                <td>{item.production_specification}</td>
                <th>지원 효과(원)</th>
                <td>{item.support_effect}</td>
            </tr>
            {/*
            <tr className="enter"></tr>
            <tr>
                <td />
                <td colSpan="7"><p className="dottedLine"></p>
                </td>
            </tr>
            */}
        </>);
    }, []);

    // Service Element 
    const CategoryElement = useCallback(({ index, categoryData, elementData }) => {
        let AttemptList = [];
        for (let i = 0; i < elementData.service_element_attempts.length; i++) {
            const item = elementData.service_element_attempts[i];
            AttemptList.push(
                <AttemptItem
                    eleIdx={index}
                    index={i}
                    lastIndex={elementData.service_element_attempts.length - 1}
                    item={item}
                    categoryData={categoryData}
                    key={i} />);
        }

        return (
            <div className="box3">
                <h3>{categoryData.service_name}</h3>
                <table>
                    <colgroup>
                        <col width="15%" />
                        <col width="35%" />
                        <col width="15%" />
                        <col width="35%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>지원 기간</th>
                            <td className="num" colSpan="3"> {elementData.start_date} ~ {elementData.end_date} </td>
                        </tr>
                        <tr>
                            <td className="attempt" colSpan="4">
                                <table>
                                    <colgroup>
                                        <col width="15%" />
                                        <col width="20%" />
                                        <col width="15%" />
                                        <col width="20%" />
                                        <col width="15%" />
                                        <col width="15%" />
                                    </colgroup>
                                    <tbody>
                                        {AttemptList}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="enter"></tr>
                        <tr>
                            <th>지원 내용</th>
                            <td colSpan="3">{elementData.support_content.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</td>
                        </tr>
                        <tr className="enter"></tr>
                        <tr>
                            <th>지원 결과</th>
                            <td colSpan="3">{elementData.support_result.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }, []);

    let CategoryElements = [];
    const categories = serviceAppItem.category_items;
    const serviceElement = serviceAppItem.service_element;

    for (let i = 0; categories && i < categories.length; i++) {
        let element;
        for (let j = 0; serviceElement && j < serviceElement.length; j++) {
            if (categories[i].service_category_no === serviceElement[j].service_category_no) {
                element = serviceElement[j];
            }
        }

        CategoryElements.push(
            <CategoryElement
                index={i}
                categoryData={categories[i]}
                elementData={element}
                isReadOnly={true}
                key={i} />
        );
    };

    const AskItem = useCallback(({ index, item }) => {
        const val = index * 5;
        const id = [val + 1, val + 2, val + 3, val + 4, val + 5];
        return (
            <div className="qu">
                <h3>{(index + 1) + '. ' + item.ask_text}</h3>
                <div className="option">
                    <p><label htmlFor={id[0]}><input type="radio" readOnly={true} id={id[0]} value={5} checked={item.answer === 5 ? true : false} /> 매우만족</label></p>
                    <p><label htmlFor={id[1]}><input type="radio" readOnly={true} id={id[1]} value={4} checked={item.answer === 4 ? true : false} /> 만족</label></p>
                    <p><label htmlFor={id[2]}><input type="radio" readOnly={true} id={id[2]} value={3} checked={item.answer === 3 ? true : false} /> 보통</label></p>
                    <p><label htmlFor={id[3]}><input type="radio" readOnly={true} id={id[3]} value={2} checked={item.answer === 2 ? true : false} /> 불만족</label></p>
                    <p><label htmlFor={id[4]}><input type="radio" readOnly={true} id={id[4]} value={1} checked={item.answer === 1 ? true : false} /> 매우 불만족</label></p>
                </div>
            </div>);
    }, []);

    let SurveyAsk = [];
    for (let i = 0; i < surveyList.length; i++) {
        SurveyAsk.push(<AskItem index={i} item={surveyList[i]} key={i} />);
    }

    /////////////////
    const Consulting = useCallback(({ item, result, partner }) => {
        return (
            <div id="wrap" className="wrap print">
                <div className="form">
                    <h2>상담 신청서</h2>
                    <div className="table">
                        <table>
                            <colgroup>
                                <col width="15%" />
                                <col width="35%" />
                                <col width="15%" />
                                <col width="35%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>신청인</th>
                                    <td colSpan="3">{item.name}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>전화번호</th>
                                    <td className="num">{ConvertPhoneNumber(item.phoneNumber)}</td>
                                    <th>이메일</th>
                                    <td className="eng">{item.email}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>회사명</th>
                                    <td>{item.company ? item.company : "-"}</td>
                                    <th>사업자등록번호</th>
                                    <td>{item.companyRegNumber ? ConvertRegNumber(item.companyRegNumber) : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>직급</th>
                                    <td>{item.companyPosition ? item.companyPosition : "-"}</td>
                                    <th>주요 사업분야</th>
                                    <td>{item.companyBusiness ? item.companyBusiness : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>회사주소</th>
                                    <td colSpan="3">{item.companyAddress ? item.companyAddress : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>상담 신청일</th>
                                    <td colSpan="3">{item.created_at ? item.created_at.substring(0, 10) : ""}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>제목</th>
                                    <td colSpan="3">{item.title}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>신청 내용</th>
                                    <td colSpan="3">{item.content.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</td>
                                </tr>
                                {/* <tr>
								<th></th>
								<td className="more" colSpan="3">붙임1. 신청 내용 보충자료</td>
							</tr> */}
                                <tr className="enter"></tr>
                                <tr>
                                    <th>상담 내용</th>
                                    <td colSpan="3">{result.content.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</td>
                                </tr>
                                {/* <tr>
								<th></th>
								<td className="more" colSpan="3">붙임2. 상담 내용 보충자료</td>
							</tr> */}
                            </tbody>
                        </table>
                    </div>
                    <Footer dateText={"상담 완료"} date={result.updatedAt} partner={partner} />
                </div>
            </div>
        );
    }, []);

    const Application = useCallback(({ item, application, date, partner }) => {
        console.log(item)
        return (
            <div id="wrap" className="wrap print">
                <div className="form">
                    <h2>서비스 신청서</h2>
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
                    <p className="nop"></p>
                    <div className="table">
                        <table>
                            <colgroup>
                                <col width="15%" />
                                <col width="35%" />
                                <col width="15%" />
                                <col width="35%" />
                            </colgroup>
                            <tbody>
                                {/* <tr>
                                    <th>제목</th>
                                    <td colSpan="3">{item.title}</td>
                                </tr>
                                <tr className="enter"></tr> */}
                                <tr>
                                    <th>신청인</th>
                                    <td colSpan="3">{item.name}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>전화번호</th>
                                    <td className="num">{ConvertPhoneNumber(item.phoneNumber)}</td>
                                    <th>이메일</th>
                                    <td className="eng">{item.email}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>회사명</th>
                                    <td>{item.company ? item.company : "-"}</td>
                                    <th>사업자등록번호</th>
                                    <td>{item.companyRegNumber ? ConvertRegNumber(item.companyRegNumber) : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>직급</th>
                                    <td>{item.companyPosition ? item.companyPosition : "-"}</td>
                                    <th>주요 사업분야</th>
                                    <td>{item.companyBusiness ? item.companyBusiness : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>회사주소</th>
                                    <td colSpan="3">{item.companyAddress ? item.companyAddress : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>서비스신청일</th>
                                    <td colSpan="3">{application.created_at ? application.created_at.substring(0, 10) : ""}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>시제품명<br />(프로젝트 명)</th>
                                    <td colSpan="3">{application.product_name}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>제품 개념 및<br />신청 내용</th>
                                    <td colSpan="3">{application.content ? application.content.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) }) : ''}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>사업화<br />(상용화)계획</th>
                                    <td colSpan="3">{application.business_plan ? application.business_plan.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) }) : ''}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>기타 지원<br />요구 사항</th>
                                    <td colSpan="3">{application.requirement ? application.requirement.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) }) : ''}</td>
                                </tr>
                                {/* <tr>
									<th></th>
									<td className="more" colSpan="3">붙임1. 신청 내용 보충자료</td>
								</tr> */}
                            </tbody>
                        </table>
                    </div>
                    <Footer dateText={'검토 완료'} date={date} partner={partner} />
                </div>
            </div>
        );
    }, [CategoryItems]);

    const ApplicationResult = useCallback(({ item, application, partner }) => {
        return (
            <div id="wrap" className="wrap print print3">
                <div className="form">
                    <h2>서비스 이용 결과서</h2>
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
                    <p className="nop"></p>
                    <div className="table">
                        <table>
                            <colgroup>
                                <col width="15%" />
                                <col width="35%" />
                                <col width="15%" />
                                <col width="35%" />
                            </colgroup>
                            <tbody>
                                {/* <tr>
                                    <th>제목</th>
                                    <td colSpan="3">{item.title}</td>
                                </tr>
                                <tr className="enter"></tr> */}
                                <tr>
                                    <th>신청인</th>
                                    <td colSpan="3">{item.name}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>전화번호</th>
                                    <td className="num">{ConvertPhoneNumber(item.phoneNumber)}</td>
                                    <th>이메일</th>
                                    <td className="eng">{item.email}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>회사명</th>
                                    <td>{item.company ? item.company : "-"}</td>
                                    <th>사업자등록번호</th>
                                    <td>{item.companyRegNumber ? ConvertRegNumber(item.companyRegNumber) : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>직급</th>
                                    <td>{item.companyPosition ? item.companyPosition : "-"}</td>
                                    <th>주요 사업분야</th>
                                    <td>{item.companyBusiness ? item.companyBusiness : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>회사주소</th>
                                    <td colSpan="3">{item.companyAddress ? item.companyAddress : "-"}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>시제품명<br />(프로젝트 명)</th>
                                    <td colSpan="3">{application.product_name ? application.product_name.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) }) : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                        {CategoryElements}
                    </div>
                    <Footer dateText={'서비스 완료'} date={application.updated_at ? application.updated_at.substring(0, 10) : ''} partner={partner} />
                </div>
            </div>
        );
    }, [CategoryItems, CategoryElements]);

    const Survey = useCallback(({ item, date, partner }) => {
        return (
            <div id="wrap" className="wrap print print4">
                <div className="form">
                    <h2>서비스 이용 설문</h2>
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
                    <p className="nop"></p>
                    <div className="table">
                        <table>
                            <colgroup>
                                <col width="15%" />
                                <col width="35%" />
                                <col width="15%" />
                                <col width="35%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>제목</th>
                                    <td colSpan="3">{item.title}</td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>신청인</th>
                                    <td colSpan="3">{item.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="qu_box">
                        {SurveyAsk}
                        <div className={"qu"}>
                            <h3>9. 기타의견</h3>
                            <p>{surveyText.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</p>
                        </div>
                    </div>
                    <Footer dateText={'설문 작성'} date={date} partner={partner} />
                </div>
            </div>
        );
    }, [CategoryItems, SurveyAsk, surveyText]);

    return (
        <>
            {consultingFlag ? <Consulting item={consulting} result={consultingResult} partner={isDrop ? '아이피하트' : supportPartner} /> : <></>}
            {isDrop ? <></> : <Application item={userInfo} application={serviceAppItem} date={serviceAppConfirm.updatedAt} partner={supportPartner} />}
            {isDrop ? <></> : <ApplicationResult item={userInfo} application={serviceAppItem} partner={supportPartner} />}
            {isSurveyDone ? <Survey item={userInfo} date={surveyDate} partner={supportPartner} /> : <></>}
        </>
    );
}
