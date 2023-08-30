import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { CommonHeader, PreUri, Method, getRspMsg, /*AuthLevel,*/ MaxFileCount/*, MB, LIMIT*/ } from '../../../CommonCode';
import TopNavi from './TopNavi';
import SideNavi from './SideNavi';
import SubSideMenu from '../../contents/SubSideMenu';
import '../../../css/common-s.css';
import '../../../css/style-s.css';
import { MdContentPaste } from 'react-icons/md';

export default ({  no }) => {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const history = useNavigate();
    const query = useParams();
    const [categoryItems, setCategoryItems] = useState({
        count: 0,
        items: [],
    });
    const [checkValue, setCheckValue] = useState([]);
    const [serviceAppItem, setServiceAppItem] = useState({});
    const [content,setContent] = useState('');
    const [data,setData] = useState({
        support_content:'',
        support_result:'',
    });
    const [result,setResult] = useState('');
    const [text,setText] = useState([]);
    
    const {support_content,support_result} = data;
    const getData = useCallback(async() =>{
        CommonHeader.authorization = token;
        const res = await fetch(PreUri + '/service/'+ no +'/content',{
            method: Method.get,
            headers: CommonHeader
        })
        if (!res.ok) {
            alert(getRspMsg(res.status));
            return history(-1);
		}
        const dataJson = await res.json();
        for(let i = 0; i<dataJson.length; i++)
        {
        setData(data=>({
            ...data,
            support_content:dataJson[0].support_content,
            support_result:dataJson[0].support_result,
        }))
        }
    },[])
    const getCategory = useCallback(async () => {
        CommonHeader.authorization = token;
        let response = await fetch(PreUri + '/service/category/all', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
        }

        const json = await response.json();
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
            alert(getRspMsg(response.status));
            return history(-1);
		}

		if (response.status === 204) {
			alert('해당 데이터를 찾을 수 없습니다.');
            return history(-1);
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
        let newTextElement = [];
        let textElement;
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
                textElement = {
                    support_content: serviceElement.support_content ? serviceElement.support_content : '',
                    support_result: serviceElement.support_result ? serviceElement.support_result : '',
                    service_category_no:categoryItem.service_category_no,
                }
                
            }
      
            newServiceElement[i] = { ...newElement };
            newTextElement[i] = { ...textElement };
        }
        serviceJson.service_element = newServiceElement;
        
        setText(newTextElement);
        setServiceAppItem(serviceJson);
    }, [no, token, history]);

    const textresult=Object.values(text);

    useEffect(() => {
        if (!no) {
            alert('Error : Service Number');
            return;
        }

        getCategory();
        getData();
        return () => {
            mountedRef.current = false
        }
    }, [no, getCategory, getData])

    const onDone = useCallback(async (e) => {
        e.preventDefault();
        history(-1);
    }, [history]);

    const onUpdateContent = useCallback(async()=>{
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no +'/update', {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                support_content:content,
                support_result:result,
            })
        });
        if (!response.ok) {
            console.log('response error');
            return;
        }
        alert('수정되었습니다.')
        history('/mservice')
    },[content,result])
    const handleChangeText = (e) => {
        const {name,value} = e.target;
        setData({
          ...data,
          suppport_content:value,
        })
        setContent(...content,value);
      };
      const handleChangeResult = (event) => {
        const { name, value } = event.target;
       /*  setText((prevText) =>
          prevText.some((item) => item.service_category_no === name)
            ? prevText.map((item) =>
                item.service_category_no === name
                  ? { ...item, support_result: value }
                  : item
              )
            : [...prevText, { service_category_no: name, support_result: value }] 
        );*/
        setResult(...result,value);
      };
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
                <td colSpan="3" className="eng"><button style={{ border: "0px", backgroundColor: '#fff', cursor: 'pointer' }}
                    onClick={props.onClick}>{props.filename}</button></td>
            </tr>
        </>);
    }, []);

    let DownloadFileItems = [];
    if (serviceAppItem.attached_files && serviceAppItem.attached_files) {
        const files = serviceAppItem.attached_files;
        for (let i = 0; i < files.length; i++) {
            DownloadFileItems.push(<FileDownload index={i}
                filename={files[i].original_name}
                onClick={(e) => onFileDownload(e, files[i])}
                key={i} />);
        };
    }

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

    const CategoryElement = useCallback(({ index, categoryData, elementData,textData,contentData,resultData}) => {
/*         const content = text[index].support_content;
        const result = text[index].support_result; */
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

        let AttachedFileItems = [];
        for (let i = 0; i <= elementData.attached_files.length && i < MaxFileCount; i++) {
            let file = (i === elementData.attached_files.length) ? undefined : elementData.attached_files[i];
            if (file !== undefined) {
                AttachedFileItems.push(
                    <FileDownload index={i} filename={file.original_name} onClick={(e) => onFileDownload(e, file)} key={i} />);
            }
        }

        return (
            <div className="box3">
                <p className="border"></p>
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
                 
                        
                              <tr className="enter"></tr>
                              <tr key={index}>
                                 <th className="textarea">지원 내용</th>
                                 <td colSpan="3" className="textarea"><textarea name='content' id="content" value={data.support_content} onChange={handleChangeText}></textarea></td>
                             </tr>
                             <tr className="enter"></tr>
                            <tr>
                            <th className="textarea">지원 결과</th>
                            <td colSpan="3" className="textarea"><textarea name='result'  id="result" value={data.support_result} onChange={handleChangeResult}></textarea></td>
                             </tr>
                            
                        {AttachedFileItems}
                    </tbody>
                </table>
            </div>
        );
    }, [onFileDownload,text,data]);



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
                    </td> : <></> }
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
                    </td> : <></> }
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
                    </td> : <></> }
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
                    </td> : <></> }
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
                key={row} />
        )
    }

    let CategoryElements = [];
    const categories = serviceAppItem.category_items;
    const serviceElement = serviceAppItem.service_element;
    for (let i = 0; categories && i < categories.length; i++) {
        let element;
        let content;
        let result;
        for (let j = 0; serviceElement && j < serviceElement.length; j++) {
            if (categories[i].service_category_no === serviceElement[j].service_category_no) {
                element = serviceElement[j];
                content = serviceElement[j].support_content;
                result = serviceElement[j].support_result;
            }
        }

        CategoryElements.push(
            <CategoryElement
                index={i}
                categoryData={categories[i]}
                elementData={element}
                contentData={content}
                resultData={result}
                isReadOnly={true}
                key={i} />
        );
    };

    return (
        <div id="wrap" className="wrap service8">
            <div className="content_wrap">
            <SubSideMenu title={"시제품제작관리"}/>
                <div className="content">
                    <div className="top_menu">
                        <TopNavi step={4} />
                    </div>
                    <div className="form">
                        <h2>서비스 이용 결과서</h2>
                        <div className="box1">
                            <h3>신청 분야</h3>
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
                        <p className="border"></p>
                        <div className="box2">
                            <h3>신청 정보</h3>
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
                                </tbody>
                            </table>
                        </div>
                        {CategoryElements}
                    </div>
                    <button className="btn_ok" onClick={onDone}>확인</button>
                    <button className="btn_edit" onClick={onUpdateContent}>수정</button>
                </div>
            </div>
        </div>
    );
}
