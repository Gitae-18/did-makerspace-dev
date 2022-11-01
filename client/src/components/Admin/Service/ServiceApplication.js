import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { CommonHeader, PreUri, Method, getRspMsg, AuthLevel, ConvertPhoneNumber/*, MaxFileCount, MB, LIMIT*/ } from '../../../CommonCode';
import TopNavi from './TopNavi';
import SideNavi from './SideNavi';

import $, { data } from 'jquery';

import '../../../css/common-s.css';
import '../../../css/style-s.css';


export default ({ no }) => {
	const mountedRef = useRef(true);
	const { token, authority_level } = useSelector(state => state.user);
    const viewState = useSelector(state => state.managerService);
    const history = useNavigate();

    const [categoryItems, setCategoryItems] = useState({
        count: 0,
        items: [],
	});
	const [checkValue, setCheckValue] = useState([]);
	const [serviceAppItem, setServiceAppItem] = useState({
		serviceNo: '',
		name: '',
		email: '',
		phoneNumber: '',
		company: '',
		title: '',
		productName: '',
		content: '',
		businessPlan: '',
		requirement: '',
		categoriesNo: '',
		created_at:'',
        memo:'',
		attachedFile: [],
	});
    const [info,setInfo] = useState("");
    const [clicked,setClicked] = useState(true);
    const [memo,setMemo] = useState("");
    const [insert,setInsert] = useState([]);
    const [text,setText] = useState("");
	const [status, setStatus] = useState('URD');
	const [confirmContent, setConfirmContent] = useState('');
	const [rejectContent, setRejectContent] = useState('');

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
        console.log(serviceApp);
        setInfo(info=> ({
            ...info,
            serviceNo: serviceApp.service_no,
            categoriesNo: serviceApp.categories,
        }));
       
        if (serviceApp.categories.length > 0) {
            const split = serviceApp.categories.split(',');
            for (let j = 0; j < split.length; j++ ) {
                for (let i = 0; i < json.count; i++) {
                    if (json.items[i].service_category_no === Number(split[j])) {
                        arrayInit[i] = true;
                    }
                }
            }
		}
   
    
        
		let confirm;
		if (serviceApp.status === 'EVA' || serviceApp.status === 'REJ') {
			response = await fetch(PreUri + '/service/' + no + '/service_confirm', {
				method: Method.get,
				headers: CommonHeader,
               
			});

			if (!response.ok) {
				console.log('response error');
				return;
			}
			confirm = await response.json();
		}


        if (!mountedRef.current) { return }
		setCheckValue(arrayInit);
        setCategoryItems(categoryItems => ({
            ...categoryItems,
            count,
            items: json.items,
		}));
        console.log(serviceAppItem);
		setServiceAppItem(serviceAppItem =>({
			...serviceAppItem,
			serviceNo: serviceApp.service_no,
			name: serviceApp.name,
			email: serviceApp.email,
			phoneNumber: ConvertPhoneNumber(serviceApp.phone_number),
			company: serviceApp.co_name,
			title: serviceApp.title,
			productName: serviceApp.product_name ? serviceApp.product_name : '',
			content: serviceApp.content ? serviceApp.content : '',
			businessPlan: serviceApp.business_plan ? serviceApp.business_plan : '',
			requirement: serviceApp.requirement ? serviceApp.requirement : '',
			categoriesNo: serviceApp.categories,
			created_at: serviceApp.created_at,
			attachedFile: serviceApp.attached_file,
            memo: serviceApp.memo,
		}));

		//setProgress(serviceApp.progress);
		setStatus(serviceApp.status);
		if (confirm) {
			setConfirmContent((serviceApp.status === 'EVA') ? confirm.request_content : confirm.reject_content);
		}
        
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

    const reqConfirm = useCallback(async () => {
		if (confirmContent.length < 1) {
			alert('산정평가 요청내용이 없습니다.');
			return;
		}
		
		CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/service_confirm', {
            method: Method.post,
			headers: CommonHeader,
            body: JSON.stringify({
				content: confirmContent,
			})
        });

		if (!response.ok) {
			alert(getRspMsg(response.status));
            return;
		}
        //const json = await response.json();
        history('/mservice',{replace:true});
	}, [no, token, confirmContent, history]);

    const responseConfirm = useCallback(async (confirmFlag) => {
		CommonHeader.authorization = token;

		let body = {
			confirm_flag: confirmFlag,
		}

		if (confirmFlag === 'N') {
			body.reject_content = rejectContent;
		}

        const response = await fetch(PreUri + '/service/' + no + '/service_confirm/response', {
            method: Method.post,
			headers: CommonHeader,
            body: JSON.stringify(body)
        });

		if (!response.ok) {
			alert(getRspMsg(response.status));
			if (response.status === 400) {
				history('/mservice',{replace:true});
			}
            return;
		}
        //const json = await response.json();
        history.replace('/mservice');
	}, [no, token, rejectContent, history]);

    const onChange = useCallback((e) => {
        setServiceAppItem({
            ...serviceAppItem,
            [e.target.name]: e.target.value
        });
    }, [serviceAppItem]);

	const onRequestConfirm = useCallback((e) => {
		e.preventDefault();
		if (!(status === "URD" || status === "RUN")) {
			alert("산정평가 진행중 입니다.");
			return;
		}
		reqConfirm();
	}, [status, reqConfirm])

	const onResponseConfirm = useCallback((e) => {
		e.preventDefault();
		if (status !== "EVA") {
			alert("산정평가 요청이 필요합니다.");
			return;
		}

		responseConfirm('Y');
	}, [status, responseConfirm])

	const onAccept = useCallback(async (e) => {
		e.preventDefault();
		CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/service_confirm/accept', {
            method: Method.post,
			headers: CommonHeader,
        });

		if (!response.ok) {
			alert(getRspMsg(response.status));
			if (response.status === 400) {
				history('/mservice',{replace:true});
			}
            return;
		}

        history('/mservice',{replace:true});
	}, [no, token, history])

	const onReject = useCallback((e) => {
		e.preventDefault();
		switch (authority_level) {
		case AuthLevel.manager:
			if (!(status === "URD" || status === "RUN")) {
				alert("산정평가 진행중 입니다.");
				return;
			}
			break;
		case AuthLevel.superAdmin:
			if (status !== "EVA") {
				alert("산정평가 요청이 필요합니다.");
				return;
			}
			break;
		default: return;
		}

		if (rejectContent.length < 1) {
			alert("반려사유가 비어있습니다.")
		}
		responseConfirm('N');
	}, [status, rejectContent, authority_level, responseConfirm])

    const onRejectChange = useCallback((e) => {
		e.preventDefault();
        setRejectContent(e.target.value);
    }, []);

    const onCheckChange = useCallback((e, index) => {
        let temp = [...checkValue];
        temp[index] = e.target.checked;
        setCheckValue(temp);
    }, [checkValue]);

    /*const ServiceCheck = async() =>{
        try{
     const response = await fetch(PreUri + '/service/check_service',{
         method:Method.get,
         headers: CommonHeader
     })       
     const data = await response.json();
     setCheck(data);
    }catch (e){
            console.log(e);
    }
    if (serviceAppItem.serviceNo.include(check.service_no))
    {
        
    }
    
    };*/
    const onMemoChange = (e) =>{ 
       setText(e.target.value);
    };
    const checkClick = (e)=>{
        setClicked(!clicked);
    }
    const memoClick = async (e) => {
        setClicked(!clicked);
        CommonHeader.authorization = token;
        let categories = '';
        for (let i = 0; i < checkValue.length; i++) {
            if (checkValue[i] === true) {
                if (categories.length > 0) { categories += ','; }
                categories += categoryItems.items[i].service_category_no;
            }
        }
        try {

            let option = {
                method: "put",
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                    memo:text,
                    service_categories_no: categories,
                    product_name: serviceAppItem.productName,
                    content: serviceAppItem.content,
                    business_plan: serviceAppItem.businessPlan,
                })
            };  
            const memo_response = await fetch(PreUri + '/service/' + no + '/memo'
                , option);
            const response = await memo_response.json();
            setMemo({...memo,response});
        }
        catch (error) {
            console.log(error);
        }
  
    };
    const getData = async () => {
        try {
            const memolize = await fetch(PreUri + '/service/' + no + '/memolize', {
                method: Method.get,
                headers: CommonHeader
            });
            const response = await memolize.json();
            console.log(response);
            setInsert(response.memo)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
      getData();
    }, [no,memo,clicked]);
   
    
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
        if (serviceAppItem.productName.length < 1) { return alert('시제품명이 비어있습니다') }
        if (serviceAppItem.content.length < 1) { return alert('제품 개념 및 신청 내용이 비어있습니다') }
        if (serviceAppItem.businessPlan.length < 1) { return alert('사업화(상용화) 계획이 비어있습니다') }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/service_application', {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                service_categories_no: categories,
                product_name: serviceAppItem.productName,
                content: serviceAppItem.content,
                business_plan: serviceAppItem.businessPlan,
                requirement: serviceAppItem.requirement,
            })
        });

        if (!response.ok) {
            return alert(getRspMsg(response.status));
        }

        alert("수정되었습니다.");
    }, [categoryItems, checkValue, serviceAppItem, token, no]);

	const onCheck = useCallback(async (e) => {
		e.preventDefault();

		CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/service_application/check', {
			method: Method.post,
			headers: CommonHeader,
		});

		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}

        setStatus('RUN');
	}, [no, token]);
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
			alert(getRspMsg(response.status));
            console.log(response.status);
            return;
		}

		var fileDownload = require('js-file-download');
        fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name);
    }, [token]);

	const FileDownload = useCallback((props) => {
		return (<>
			< tr className="enter" ></tr >
			<tr>
				<th>{props.index === 0 ? '첨부파일' : ''}</th>
				<td colSpan="3" className="eng"><button style={{ border: "0px", backgroundColor: '#fff', cursor: 'pointer' }} onClick={props.onClick}>{props.filename}</button></td>
			</tr>
		</>);
	}, []);
    
    let DownloadFileItems = [];
	if (serviceAppItem.attachedFile && serviceAppItem.attachedFile.length > 0) {
		const files = serviceAppItem.attachedFile;
        for (let i = 0; i < files.length; i++) {
            DownloadFileItems.push(<FileDownload index={i}
                filename={files[i].original_name}
                onClick={(e) => onFileDownload(e, files[i]) }
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
                isReadonly={status === 'URD' ? false : true}
                key={row} />
        )
    }
	return (
		<div id="wrap" className="wrap service3">
			<div className="content_wrap">
                <SideNavi history={history} />
				<div className="content">
					<div className="top_menu">
						<TopNavi step={2} />
					</div>
					<div className="form">
						<h2>{status === "EVA" ? "서비스 신청 산정평가" :"서비스 신청서"}</h2>
						<div className="box1">
							<h3>신청 분야<span>(복수선택 가능)</span></h3>
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
										<td className="num">{serviceAppItem.phoneNumber}</td>
										<th>회사명</th>
										<td>{serviceAppItem.company ? serviceAppItem.company : "-"}</td>
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
										<th className="textarea">시제품명 (프로젝트 명)</th>
                                        {status === 'URD'
                                            ? <td colSpan="3" className="noborder">
                                                <input className="prdname" type="text" value={serviceAppItem.productName}
                                                    maxLength='90' name="productName" onChange={onChange} /></td>
                                            : <td colSpan="3">{serviceAppItem.productName}</td>
                                        }
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th className="textarea">제품 개념 및<br />신청 내용</th>
										<td colSpan="3" className="noborder">
                                            <textarea readOnly={status === 'URD' ? false : true} onChange={onChange}
                                                name="content" value={serviceAppItem.content} />
										</td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th className="textarea">사업화(상용화)<br />계획</th>
										<td colSpan="3" className="noborder">
                                            <textarea readOnly={status === 'URD' ? false : true} onChange={onChange}
                                                name="businessPlan" value={serviceAppItem.businessPlan} />
										</td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th className="textarea">기타 지원<br />요구 사항</th>
										<td colSpan="3" className="noborder">
                                            <textarea readOnly={status === 'URD' ? false : true} onChange={onChange}
                                                name="requirement" value={serviceAppItem.requirement} />
										</td>
									</tr>
									{DownloadFileItems}
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th className='textarea'>관리자메모</th>
                                        <td colSpan="3" className="noborder">
                                            <div>
                                            {clicked===true?<textarea onClick={checkClick} readOnly={true} value={insert}/>
                                            :<textarea  rows='5' cols='10'className="textmemo"  onChange={onMemoChange} >{insert}</textarea>
                                            }
                                            <button type="button" onClick={memoClick} className="button1"><span>메모</span></button>
                                            </div>
                                        </td>
                                        
                                    </tr>
								</tbody>
							</table>
                            {status !== 'URD' ? <p className="border"></p> : <></>}
							<table>
								<colgroup>
									<col width="15%" />
									<col width="35%" />
									<col width="15%" />
									<col width="35%" />
								</colgroup>
								<tbody>
									{status === 'CXL' ? 
										<tr>
											<td colSpan="4" className="noborder">
												<p style={{ textAlign: "center", color: "black", fontWeight: "bold", paddingTop: "24px" }}>사용자에 의해 서비스 신청이 취소되었습니다.</p>
											</td>
										</tr>
									: status === 'REJ' ? 
										<tr>
											<th className="textarea">종료 내용<br />(반려)</th>
												<td colSpan="3" className="noborder">
													<textarea readOnly={true} value={confirmContent} name="content" /></td>
										</tr>
									: status === 'RUN' ?
                                        <tr>
                                            <th className="textarea">산정평가 요청</th>
                                            <td colSpan="3" className="noborder">
                                                {authority_level < AuthLevel.manager ?
                                                    <textarea readOnly={true} placeholder="파트너, 상담(스케쥴) 계정은 산정평가 요청을 할 수 없습니다." />
                                                    : authority_level < AuthLevel.superAdmin ?
                                                        <textarea readOnly={status === "EVA" ? true : false} value={confirmContent}
                                                            placeholder="산정평가 요청 내용을 적어주세요. 만약 산정평가가 필요없다면 '검토 완료'를 선택하세요."
                                                            name="content" onChange={(e) => { setConfirmContent(e.target.value) }} />
                                                        : <textarea readOnly={true} value={confirmContent} placeholder="아직 산정평가 요청이 없습니다." />}
                                            </td>
                                        </tr>
                                    : <></>
                                    }
									{(status === "EVA" && authority_level < AuthLevel.superAdmin)
										? <tr>
											<td colSpan="4" className="noborder">
												<p style={{ textAlign: "center", color: "black", fontWeight: "bold", paddingTop: "24px" }}>
													산정평가 승인을 기다리고 있습니다.
											</p>
											</td>
										</tr>
										: <></>}
								</tbody>
							</table>
						</div>
					</div>
                    <div>
                      
                    </div>
					{viewState.currentView === viewState.progress ?
						(status === 'CXL' || status === 'REJ' || (status === "EVA" && authority_level < AuthLevel.superAdmin))
							? <div className="btn_box"><button onClick={() => { /*history.go(-1);*/ history(-1) }}>뒤로가기</button></div>
							: authority_level < AuthLevel.manager ? <></>
                                : status === 'URD'
                                    ? <div className="btn_box">
                                        <button className="reject" onClick={()=>{/*  history.go(-1); */history(-1) }} >뒤로가기</button>
                                        <button className="ask" onClick={onEdit}>내용 수정</button>
                                        <button className="success" onClick={onCheck}>신청서 확인</button>
                                    </div>
                                    : authority_level < AuthLevel.superAdmin
                                        // 운영자
                                        ? <div className="btn_box">
                                            <button className="reject" onClick={() => { $('.pop').css('display', 'block'); }} >반려</button>
                                            <button className="ask" onClick={onRequestConfirm}>산정 평가 문의</button>
                                            <button className="success" onClick={onAccept}>검토 완료</button>
                                        </div>
                                        // 관리자
                                        : <div className="btn_box">
                                            <button className="reject" onClick={() => { $('.pop').css('display', 'block'); }} >반려</button>
                                            <button className="success" onClick={onResponseConfirm}>수락</button>
                                        </div>
						: <div className="btn_box"><button className="success" onClick={() => { history(-1) }}>확인</button></div>
					}
				</div>
				{authority_level < AuthLevel.manager ? <></> :
					<div className="pop">
						<p><textarea value={rejectContent} name="rejectContent" onChange={onRejectChange} placeholder="사유를 작성해 주세요."></textarea></p>
						<ul>
							<li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
							<li className="yes"><button onClick={onReject}>반려</button></li>
						</ul>
					</div>}
			</div>
		</div>
	);
}
