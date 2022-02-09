import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import { CommonHeader, PreUri, Method, getRspMsg, AuthLevel, MaxFileCount, MB, LIMIT } from '../../../CommonCode';
import TopNavi from './TopNavi';
import SideNavi from './SideNavi';

import $ from 'jquery';

import '../../../css/common.css';
import '../../../css/style.css';

const ElementSec = 0;
const AttemptSec = 1;
const EquipSec = 2;

function StringToDate(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    return new Date(y, m - 1, d);
}

export default ({ history, no }) => {
    const mountedRef = useRef(true);
    const { token, authority_level } = useSelector(state => state.user);
    const [serviceAppItem, setServiceAppItem] = useState({});
    const viewState = useSelector(state => state.managerService);

    const getPreInfo = useCallback(async () => {
        CommonHeader.authorization = token;
        let response = await fetch(PreUri + '/service/' + no + '/running', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        const serviceJson = await response.json();
        if (!mountedRef.current) { return }

        let newServiceElement = [];
        for (let i = 0; serviceJson.category_items && i < serviceJson.category_items.length; i++) {
            let categoryItem = serviceJson.category_items[i];

            /* Service Element 초기 값 */
            let newElement = {
                service_element_no: 0,
                service_category_no: categoryItem.service_category_no,
                service_category_name: categoryItem.service_name,
                //edit_enable: categoryItem.edit_enable,   /* 수정권한이 있는지 없는지*/
                //service_no: serviceElement ? 
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
                        equip_option_index: 0,
                        material_option_index: 0,
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
                    equip_option_index: 0,
                    material_option_index: 0,
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
                    let equip_option_index = 0;
                    let material_option_index = 0;
                    let newMaterialUsages = [{
                        material_usage_no: 0,
                        equipment_category_no: 0,
                        material_item_no: 0,
                        quantity: 0,
                        equip_option_index: 0,
                        material_option_index: 0,
                    }];

                    const materials = attempt.material_usages ? attempt.material_usages : [];
                    for (let k = 0; k < materials.length; k++) {
                        let material = materials[k];
                        console.log(j, k, material);

                        // 사용장비
                        equip_option_index = 0;
                        if (Number(material.equipment_category_no) > 0) {
                            for (let z = 0; z < serviceJson.equip_category.length; z++) {
                                if (serviceJson.equip_category[z].equipment_category_no === Number(material.equipment_category_no)) {
                                    equip_option_index = z + 1;
                                }
                            }
                        }

                        // 적용재료
                        material_option_index = 0;
                        for (let z = 0; z < serviceJson.material_items.length; z++) {
                            if (serviceJson.material_items[z].material_item_no === material.material_item_no) {
                                material_option_index = z + 1;
                            }
                        }

                        newMaterialUsages[k] = {
                            material_usage_no: material.material_usage_no ? material.material_usage_no : 0,
                            equipment_category_no: material.equipment_category_no ? material.equipment_category_no : 0,
                            material_item_no: material.material_item_no ? material.material_item_no : 0,
                            quantity: material.quantity ? material.quantity : 0,
                            equip_option_index,
                            material_option_index,
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

        serviceJson.service_element = newServiceElement;
        setServiceAppItem(serviceJson);
        //setProgress(serviceJson.progress);
    }, [no, token]);

    useEffect(() => {
        if (!no) {
            alert('Error : Service Number');
            return;
        }

        getPreInfo();
        return () => {
            mountedRef.current = false
        }
    }, [no, getPreInfo])

    const onFileUpload = useCallback((e, index, i) => {
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

        let copy = { ...serviceAppItem };
        copy.service_element[index].attached_files[i] = {
            ...copy.service_element[index].attached_files[i],
            attached_file_no: 0,
            original_name: e.target.files[0].name,
            clientfile: e.target.files[0]
        }

        setServiceAppItem(copy);
        e.target.value = null;
    }, [serviceAppItem])

    const onFileRemove = useCallback(async (e, index, i) => {
        e.preventDefault();

        let copy = { ...serviceAppItem };
        const file_no = copy.service_element[index].attached_files[i].attached_file_no;
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

        copy.service_element[index].attached_files.splice(i, 1);;
        setServiceAppItem(copy);
    }, [serviceAppItem, token]);

    const onAddEquipRow = useCallback(async (e, elementIdx, attemptIdx, equipIdx, isAdd) => {
        e.preventDefault();

        let copy = { ...serviceAppItem };
        if (isAdd) {
            const addIdx = copy.service_element[elementIdx].service_element_attempts[attemptIdx].material_usages.length;
            copy.service_element[elementIdx].service_element_attempts[attemptIdx].material_usages[addIdx] = {
                ...copy.service_element[elementIdx].service_element_attempts[attemptIdx].material_usages[addIdx],
                material_usage_no: 0,
                equipment_category_no: 0,
                material_item_no: 0,
                quantity: 0,
                equip_option_index: 0,
                material_option_index: 0,
            }
        } else {
            const service_no = copy.service_no;
            const element_no = copy.service_element[elementIdx].service_element_no;
            const attempt_no = copy.service_element[elementIdx].service_element_attempts[attemptIdx].service_element_attempt_no;
            const material_usage_no = copy.service_element[elementIdx].service_element_attempts[attemptIdx].material_usages[equipIdx].material_usage_no;

            if (material_usage_no > 0) {
                CommonHeader.authorization = token;
                let response = await fetch(PreUri + '/service/' + service_no +
                    '/element/' + element_no +
                    '/attempt/' + attempt_no +
                    '/material_usage/' + material_usage_no, {
                    method: Method.delete,
                    headers: CommonHeader
                });

                if (!response.ok) {
                    console.log('delet error');
                    return;
                }
            }
            copy.service_element[elementIdx].service_element_attempts[attemptIdx].material_usages.splice(equipIdx, 1);
        }
        setServiceAppItem(copy);
    }, [serviceAppItem, token]);

    const onAddAttemptRow = useCallback(async (e, elementIdx, attemptIdx, isAdd) => {
        e.preventDefault();
        let copy = { ...serviceAppItem };
        if (isAdd) {
            copy.service_element[elementIdx].service_element_attempts[attemptIdx + 1] = {
                ...copy.service_element[elementIdx].service_element_attempts[attemptIdx + 1],
                service_element_attempt_no: 0,
                attempt_number: attemptIdx + 2,
                time_required: 0,
                production_method: '',
                production_specification: '',
                support_effect: 0,
                material_usages: [{
                    material_usage_no: 0,
                    equipment_category_no: 0,
                    material_item_no: 0,
                    quantity: 0,
                    equip_option_index: 0,
                    material_option_index: 0,
                }]
            }
        } else {
            const element = copy.service_element[elementIdx];
            const attempt = copy.service_element[elementIdx].service_element_attempts[attemptIdx + 1];
            if (attempt.service_element_attempt_no > 0) {
                CommonHeader.authorization = token;
                let response = await fetch(PreUri + '/service/' + copy.service_no +
                    '/element/' + element.service_element_no +
                    '/attempt/' + attempt.service_element_attempt_no, {
                    method: Method.delete,
                    headers: CommonHeader
                });

                if (!response.ok) {
                    console.log('delet error');
                    return;
                }
            }

            copy.service_element[elementIdx].service_element_attempts.splice(attemptIdx + 1, 1);
        }
        setServiceAppItem(copy);
    }, [serviceAppItem, token]);

    const onChange = useCallback((e, elementIdx, attemptIdx, equipIdx, section) => {
        e.preventDefault();

        let copy = { ...serviceAppItem };

        switch (section) {
            case ElementSec:
                copy.service_element[elementIdx] = {
                    ...copy.service_element[elementIdx],
                    [e.target.name]: e.target.value
                }
                break;

            case AttemptSec:
                copy.service_element[elementIdx].service_element_attempts[attemptIdx] = {
                    ...copy.service_element[elementIdx].service_element_attempts[attemptIdx],
                    [e.target.name]: e.target.value
                }
                break;

            case EquipSec:
                const updated = {
                    ...copy.service_element[elementIdx].service_element_attempts[attemptIdx].material_usages[equipIdx],
                    [e.target.name]: e.target.value
                }
                if (e.target.name === 'equip_option_index') {
                    updated.material_option_index = 0;
                }

                copy.service_element[elementIdx].service_element_attempts[attemptIdx].material_usages[equipIdx] = updated;
                break;
            default:
                return;
        }

        setServiceAppItem(copy);
        /*
        const old = element[index];
        const updated = { ...old, [e.target.name]: e.target.value }
        if (e.target.name === 'equip_option_index') {
            updated.material_option_index = 0;
        }
        const clone = [...element];
        clone[index] = updated;
        setElement(clone);
        */
    }, [serviceAppItem]);

    const onRelease = useCallback(async (e, index) => {
        e.preventDefault();

        let saItem = { ...serviceAppItem };
        let element = saItem.service_element[index];
        // console.log(saItem);
        // console.log(element);

        for (let i = 0; i < element.service_element_attempts.length; i++) {
            let attempt = element.service_element_attempts[i];

            for (let j = 0; j < attempt.material_usages.length; j++) {
                let equip = attempt.material_usages[j];

                const equipNo = (equip.equip_option_index > 0) ? saItem.equip_category[equip.equip_option_index - 1].equipment_category_no : 0;
                const materialNo = (equip.material_option_index > 0) ? saItem.material_items[equip.material_option_index - 1].material_item_no : 0;

                equip.equipment_category_no = equipNo;
                equip.material_item_no = materialNo;
            }
        }

        /*
        if (item.startDate.length === 0
            || item.endDate.length === 0
            || !Number(item.attemptNumber)
            || !Number(item.timeRequired)
            || item.supportContent.length === 0
            || item.supportResult.length === 0
            || (item.materialConsumption.length > 0 && !Number(item.materialConsumption))
            || (item.supportEffect.length > 0 && !Number(item.supportEffect))
        ) {
            alert('필수입력 항목이 비어있거나 잘못 입력되어 있습니다.');
            return;
        }
        */

        if (element.start_date.length > 0 && element.end_date.length > 0 &&
            StringToDate(element.start_date) > StringToDate(element.end_date)) {
            alert('종료일이 시작일 보다 빠릅니다.');
            return;
        }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + saItem.service_no + '/running', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify(element)
        });

        if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
        }

        const json = await response.json();
        const serviceNo = serviceAppItem.service_no;
        const elementNo = json.service_element_no;
        if (elementNo > 0 && element.attached_files) {
            const formData = new FormData();
            let count = 0;
            for (let i = 0; i < element.attached_files.length; i++) {
                if (element.attached_files[i].attached_file_no === 0) {
                    formData.append('files', element.attached_files[i].clientfile);
                    count++;
                }
            }

            if (count > 0) {
                $('.loading').css('display', 'block');
                const response = await fetch(PreUri + '/service/' + serviceNo + '/element/' + elementNo + '/files', {
                    method: Method.post,
                    headers: { authorization: token },
                    body: formData
                });

                $('.loading').css('display', 'none');
                if (!response.ok) {
                    console.log('response error');
                    return;
                }
            }
        }

        alert("수정되었습니다");
        //history.go(-1);
    }, [token, serviceAppItem]);

    const onDone = useCallback(async (e) => {
        e.preventDefault();

        CommonHeader.authorization = token;
        let response = await fetch(PreUri + '/service/' + no + '/running/confirm', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                confirm_flag: 'Y',
            })
        });
        if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
        }

        alert("진행이 완료 되었습니다");
        history.go(-1);
        //history.replace('/mservice');
    }, [no, token, history]);

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

    // let DownloadFileItems = [];
    // if (serviceAppItem.attached_files && serviceAppItem.attached_files) {
    //     const files = serviceAppItem.attached_files;
    //     for (let i = 0; i < files.length; i++) {
    //         DownloadFileItems.push(<FileDownload index={i}
    //             filename={files[i].original_name}
    //             onClick={(e) => onFileDownload(e, files[i])}
    //             key={i} />);
    //     };
    // }

    const MaterialUsageItem = useCallback(({ eleIdx, atpIdx, index, lastIndex, categoryData, equipCategory, materialItems, usageItem, onChange, onAddEquipRow, isReadOnly }) => {
        let EquipOptions = [];
        let MaterialOptions = [];

        EquipOptions.push(<option value={0} key={0}>없음</option>);
        for (let i = 0; i < equipCategory.length; i++) {
            const isHidden = (categoryData.service_category_no === equipCategory[i].service_category_no) ? false : true;
            EquipOptions.push(<option value={i + 1} key={i + 1} hidden={isHidden} >{equipCategory[i].model_name}</option>);
        };

        MaterialOptions.push(<option value={0} key={0}>없음</option>);
        if (usageItem.equip_option_index > 0) {
            const index = usageItem.equip_option_index - 1;
            for (let i = 0; i < materialItems.length; i++) {
                const isHidden = (equipCategory[index].equipment_category_no === materialItems[i].equipment_category_no) ? false : true;
                MaterialOptions.push(<option value={i + 1} key={i + 1} hidden={isHidden} >{materialItems[i].name}</option>);
            };
        }

        const onChangeEquip = useCallback((e) => {
            if (isReadOnly) { return; }
            onChange(e, eleIdx, atpIdx, index, EquipSec);
        }, [onChange, eleIdx, atpIdx, index, isReadOnly]);

        const onAdd2 = useCallback((e, isAdd) => {
            onAddEquipRow(e, eleIdx, atpIdx, index, isAdd);
        }, [onAddEquipRow, eleIdx, atpIdx, index]);

        return (<>
            <tr className="enter"></tr>
            <tr>
                <th>{index === 0 ? "사용 장비" : ""}</th>
                <td colSpan="2">
                    <select name='equip_option_index' value={usageItem.equip_option_index} onChange={onChangeEquip}>
                        {EquipOptions}
                    </select>
                </td>
                <th>적용 재료</th>
                <td colSpan="2">
                    <select name='material_option_index' value={usageItem.material_option_index} onChange={onChangeEquip}>
                        {MaterialOptions}
                    </select>
                </td>
                <th>재료 소모량</th>
                <td colSpan="2"><input type="text" className="num" name='quantity' value={usageItem.quantity} placeholder="숫자만 입력해 주세요" onChange={onChangeEquip} /></td>
                {!isReadOnly ? <td className="ext"><button className="add2" onClick={(e) => onAdd2(e, (index === 0) ? true : false)}>{index === 0 ? "+" : "-"}</button></td> : <></>}
            </tr>
        </>);
    }, []);

    const AttemptItem = useCallback(({ eleIdx, index, lastIndex, item, categoryData, equipCategory, materialItems, onChange, onAddAttemptRow, onAddEquipRow, isReadOnly }) => {

        let MaterialUsageList = [];
        for (let i = 0; i < item.material_usages.length; i++) {
            const usageItem = item.material_usages[i];
            MaterialUsageList.push(
                <MaterialUsageItem
                    eleIdx={eleIdx}
                    atpIdx={index}
                    index={i}
                    lastIndex={item.material_usages.length - 1}
                    categoryData={categoryData}
                    equipCategory={equipCategory}
                    materialItems={materialItems}
                    usageItem={usageItem}
                    onChange={onChange}
                    onAddEquipRow={onAddEquipRow}
                    isReadOnly={isReadOnly}
                    key={i} />);
        }

        const onChangeAttempt = useCallback((e) => {
            onChange(e, eleIdx, index, -1, AttemptSec);
        }, [onChange, eleIdx, index]);

        const onAdd = useCallback((e, isAdd) => {
            onAddAttemptRow(e, eleIdx, index, isAdd);
        }, [onAddAttemptRow, eleIdx, index]);

        return (<>
            <tr className="enter"></tr>
            <tr>
                <th>*지원 차시</th>
                <td colSpan="2"><input type="text" readOnly={true} name="attempt_number" value={item.attempt_number} placeholder="숫자만 입력해 주세요" onChange={onChangeAttempt} /></td>
                <th>*소요 시간 (분)</th>
                <td colSpan="2"><input type="text" readOnly={isReadOnly} name="time_required" value={item.time_required} placeholder="숫자만 입력해 주세요" onChange={onChangeAttempt} /></td>
                <th>지원 효과(원)</th>
                <td colSpan="2"><input type="text" readOnly={isReadOnly} className="num" name='support_effect' value={item.support_effect} placeholder="숫자만 입력해 주세요" onChange={onChangeAttempt} /></td>
            </tr>
            {MaterialUsageList}
            <tr className="enter"></tr>
            <tr>
                <th>제작 방식</th>
                <td colSpan="2"><input type="text" readOnly={isReadOnly} name="production_method" value={item.production_method} onChange={onChangeAttempt} /></td>
                <th>제작 규격</th>
                <td colSpan="5"><input type="text" readOnly={isReadOnly} className="num" name='production_specification' value={item.production_specification} onChange={onChangeAttempt} /></td>
            </tr>
            <tr className="enter"></tr>
            <tr>
                <td />
                <td colSpan="7"><p className="dottedLine"></p>
                </td>
                {(!isReadOnly && ((index + 1 === lastIndex) || (index === lastIndex)))
                    ? <td colSpan="2"><button className="add" onClick={(e) => onAdd(e, (index === lastIndex) ? true : false)}>{index === lastIndex ? "+" : "-"}</button></td>
                    : <></>}
            </tr>
        </>);
    }, []);

    // Service Element 
    const CategoryElement = useCallback(({ index, categoryData, elementData, equipCategory, materialItems,
        onChange, onAddAttemptRow, onAddEquipRow, onRelease,
        onFileUpload, onFileRemove, isReadOnly }) => {

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
                    equipCategory={equipCategory}
                    materialItems={materialItems}
                    onChange={onChange}
                    onAddAttemptRow={onAddAttemptRow}
                    onAddEquipRow={onAddEquipRow}
                    isReadOnly={isReadOnly}
                    key={i} />);
        }

        const FileInput = useCallback((props) => {
            return (<>
                <tr className="enter"></tr>
                <tr>
                    <th className="more">{props.index === 0 ? '첨부파일' : ''}</th>
                    <td colSpan="3" className="file">
                        <div>
                            <input type="text" readOnly={true} value={props.filename === undefined ? '' : props.filename} onClick={props.onDownload} style={props.style} />
                            <label><input type={props.type} name="attached_files" onChange={props.onChange} onClick={props.onClick} />{props.label}</label>
                        </div>
                    </td>
                </tr>
            </>);
        }, []);

        let AttachedFileItems = [];
        for (let i = 0; i <= elementData.attached_files.length && i < MaxFileCount; i++) {
            let file = (i === elementData.attached_files.length) ? undefined : elementData.attached_files[i];
            if (isReadOnly) {
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
                        onChange={file ? undefined : (e) => onFileUpload(e, index, i)}
                        onClick={file ? (e) => onFileRemove(e, index, i) : undefined}
                        onDownload={file ? (e) => onFileDownload(e, file) : undefined}
                        style={file ? { cursor: 'pointer' } : undefined}
                        key={i} />);

                /*
                if (file === undefined) {
                    AttachedFileItems.push(
                        <FileInput index={i}
                            type={"file"}
                            label={"파일선택"}
                            onChange={(e) => onFileUpload(e, index, i)}
                            onClick={undefined}
                            key={i} />);
                } else {
                    const isServer = (Number(file.attached_file_no) > 0) ? true : false;
                    AttachedFileItems.push(
                        <FileInput index={i}
                            //filename={isServer ? file.original_name : file.clientfile.name}
                            filename={file.original_name}
                            type={"file"}
                            label={isServer ? '삭제' : '취소'}
                            onChange={onFileUpload}
                            onClick={(e) => onFileRemove(e, index, i)}
                            key={i} />);
                }
                */
            }
        };

        const onChangeElement = useCallback((e) => {
            onChange(e, index, -1, -1, ElementSec);
        }, [onChange, index]);

        return (
            <div className="box3">
                <p className="border"></p>
                <h3>{categoryData.service_name}</h3>
                <span className="tip">*필수입력</span>
                <table>
                    <colgroup>
                        <col width="15%" />
                        <col width="35%" />
                        <col width="15%" />
                        <col width="35%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>*지원 기간</th>
                            <td><input type="date" name="start_date" readOnly={isReadOnly} value={elementData.start_date} onChange={onChangeElement} className="num date" /> 부터</td>
                            <td colSpan="2"><input type="date" name="end_date" readOnly={isReadOnly} value={elementData.end_date} onChange={onChangeElement} className="num date" /> 까지</td>
                        </tr>
                        <tr className="enter"></tr>
                        <tr>
                            <td className="attempt" colSpan="4">
                                <table>
                                    <colgroup>
                                        <col width="15%" />
                                        <col width="9%" />
                                        <col width="9%" />
                                        <col width="15%" />
                                        <col width="9%" />
                                        <col width="9%" />
                                        <col width="15%" />
                                        <col width="9%" />
                                        <col width="9%" />
                                        <col width="1%" />
                                    </colgroup>
                                    <tbody>
                                        {AttemptList}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="enter"></tr>
                        <tr>
                            <th>*지원 내용</th>
                            <td colSpan="3"><textarea name='support_content' readOnly={isReadOnly} value={elementData.support_content} onChange={onChangeElement} placeholder="제작 방식, 제작 규격, 사용 장비와 지원 및 상담 내용을 입력해주세요."></textarea></td>
                        </tr>
                        <tr className="enter"></tr>
                        <tr>
                            <th>*지원 결과</th>
                            <td colSpan="3"><textarea name='support_result' readOnly={isReadOnly} value={elementData.support_result} onChange={onChangeElement} placeholder="지원 결과를 입력해주세요."></textarea></td>
                        </tr>
                        {AttachedFileItems}
                    </tbody>
                </table>
                {!isReadOnly ? <button className="btn_modify" onClick={onRelease}>수정</button> : <></>}
            </div>
        );
    }, [onFileDownload]);

    let CategoryElements = [];
    const categoryItems = serviceAppItem.category_items;
    const serviceElement = serviceAppItem.service_element;

    for (let i = 0; categoryItems && i < categoryItems.length; i++) {
        let element;
        for (let j = 0; serviceElement && j < serviceElement.length; j++) {
            if (categoryItems[i].service_category_no === serviceElement[j].service_category_no) {
                element = serviceElement[j];
            }
        }

        CategoryElements.push(
            <CategoryElement
                index={i}
                categoryData={categoryItems[i]}
                elementData={element}
                equipCategory={serviceAppItem.equip_category}
                materialItems={serviceAppItem.material_items}
                //onChange={(e) => onChange(e, i, -1, -1, ElementSec)}
                onChange={onChange}
                onAddAttemptRow={onAddAttemptRow}
                onAddEquipRow={onAddEquipRow}
                onRelease={(e) => onRelease(e, i)}
                onFileUpload={onFileUpload}
                onFileRemove={onFileRemove}
                isReadOnly={viewState.currentView === viewState.progress ? categoryItems[i].readonly : true}
                key={i} />
        );
    };

    return (
        <div id="wrap" className="wrap service6">
            <div className="content_wrap">
                <SideNavi history={history} />
                <div className="content">
                    <div className="top_menu">
                        <TopNavi step={3} />
                    </div>
                    <div className="form">
                        <h2>서비스 진행</h2>
                        <div className="box2">
                            <h3>신청자 정보</h3>
                            <table>
                                <colgroup>
                                    <col width="15%" />
                                    <col width="35%" />
                                    <col width="15%" />
                                    <col width="35%" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>고객명</th>
                                        <td>{serviceAppItem.name}</td>
                                        <th>이메일</th>
                                        <td className="eng">{serviceAppItem.email}</td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td className="num">{serviceAppItem.phone_number}</td>
                                        <th>회사명</th>
                                        <td>{serviceAppItem.co_name ? serviceAppItem.co_name : "없음"}</td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>신청제목</th>
                                        <td>{serviceAppItem.title}</td>
                                        <th>신청일</th>
                                        <td>{serviceAppItem.created_at ? serviceAppItem.created_at.substr(0, 10) : ''}</td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>시제품명</th>
                                        <td colSpan="3" className="noborder">{serviceAppItem.product_name}</td>
                                    </tr>
                                    {/* {DownloadFileItems} */}
                                </tbody>
                            </table>
                            {/* <p className="border"></p> */}
                        </div>
                        {CategoryElements}
                    </div>
                    {viewState.currentView === viewState.progress ?
                        authority_level < AuthLevel.manager
                            ? <></>
                            : <button className="btn_modify" onClick={() => { $('.pop').css('display', 'block'); }}>진행 완료</button>
                        : <button className="btn_modify" onClick={() => { history.go(-1) }}>확인</button>
                    }
                </div>
            </div>
            <div className="loading" />
            <div className="pop">
                <p>서비스 진행을 완료하시겠습니까?</p>
                <ul>
                    <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }} >취소</button></li>
                    <li className="yes" onClick={onDone} ><button>확인</button></li>
                </ul>
            </div>
        </div>
    );
}