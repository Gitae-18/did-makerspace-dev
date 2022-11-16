import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate} from 'react-router';
import {
	CommonHeader, PreUri, Method, getRspMsg, AuthLevel, MaxFileCount, MB, LIMIT,
	ConvertPhoneNumber/*, ConvertDate*/
} from '../../../CommonCode';
import TopNavi from './TopNavi';
import SideNavi from './SideNavi';

import $ from 'jquery';

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default ({ no }) => {
	const mountedRef = useRef(true);
    const history = useNavigate();
	const { token, authority_level } = useSelector(state => state.user);
	const viewState = useSelector(state => state.managerService);
    const [consultingFlag, setConsultingFlag] = useState(true);
	const [status, setStatus] = useState('UNKNOWN');
	const [consultingItem, setConsultingItem] = useState({
		serviceNo: '',
		name: '',
		email: '',
		phoneNumber: '',
		company: '',
		title: '',
		content: '',
		created_at: '',
		attachedFile: [],
	});

	const [editTitle, setEditTitle] = useState('');
	const [editContent, setEditContent] = useState('');
	const [confirmContent, setConfirmContent] = useState('');
	const [rejectContent, setRejectContent] = useState('');
	const [fileInfo, setFileInfo] = useState([]);
	const [myFiles, setMyFiles] = useState([]);

	const getConsultingApplication = useCallback(async () => {
		CommonHeader.authorization = token;

		let response = await fetch(PreUri + '/service/' + no, {
			method: Method.get,
			headers: CommonHeader
		});

		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}

		const service = await response.json();
        if (service.consulting_flag === 'N') {
            if (!mountedRef.current) { return }
            setConsultingFlag(false);
            return;
        }

		response = await fetch(PreUri + '/service/' + no + '/consulting', {
			method: Method.get,
			headers: CommonHeader
		});

		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}
        let cons  = await response.json();
		const consulting = await response.json();
		let cResult = undefined;
            
		if ((consulting.progress === 'STEP_01' && (consulting.status === 'REJ' || consulting.status === 'RES' || consulting.status === 'DRP'))
			|| viewState.currentView !== viewState.progress) {	// 게시물 진입 때의 서비스 진행상태와 현재 서비스 진행뷰가 차이날 때도
			response = await fetch(PreUri + '/service/' + no + '/consulting/result', {
				method: Method.get,
				headers: CommonHeader
			});

			if (!response.ok) {
				alert(getRspMsg(response.status));
				return;
			}
			cResult = await response.json();
		}
		if (!mountedRef.current) { return }
        setConsultingFlag(true);
		setStatus(consulting.progress === 'STEP_01' ? consulting.status : 'END');
		setConsultingItem(consultingItem => ({
			...consultingItem,
			serviceNo: consulting.service_no,
			name: consulting.name,
			email: consulting.email,
			phoneNumber: ConvertPhoneNumber(consulting.phone_number),
			company: consulting.co_name,
			title: consulting.title,
			content: consulting.content,
			created_at: consulting.created_at,
			// reservation: ConvertDate(consulting.reservation_date),
			attachedFile: consulting.attached_file,
		}));

        setEditTitle(consulting.title);
        setEditContent(consulting.content);

		if (cResult) {
			setConfirmContent(cResult.content);
			setMyFiles(cResult.attached_file);
		}
	}, [no, token, viewState]);
    
	useEffect(() => {
		if (!no) {
			alert('Error : Service Number');
			return;
		}

		getConsultingApplication();
		return () => {
			mountedRef.current = false
		}
	}, [no, getConsultingApplication])

	const onReserv = useCallback(async (e, flag) => {
		e.preventDefault();

		const content = (flag === 'Y') ? undefined : rejectContent;
		const response = await fetch(PreUri + '/service/' + no + '/consulting/reserv', {
			method: Method.post,
			headers: CommonHeader,
			body: JSON.stringify({
				confirm_flag: flag,
				content,
			})
		});

		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}

		history('/mservice',{replace:true});
	}, [rejectContent, history, no])

	const onConfirm = useCallback(async (e, flag) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('result_flag', flag);
		if (flag === 'Y') {
			if (confirmContent.length < 1) {
				alert('상담내용이 비어있습니다.');
				return;
			}

			formData.append('content', confirmContent);
			for (let i = 0; i < fileInfo.length; i++) {
				formData.append('files', fileInfo[i]);
			}
		} else {
			if (rejectContent.length < 1) {
				alert('반려사유가 비어있습니다.');
				return;
			}
			formData.append('content', rejectContent);
		}

		$('.loading').css('display', 'block');
		const response = await fetch(PreUri + '/service/' + no + '/consulting/result', {
			method: Method.post,
			headers: {
				authorization: token,
			},
			body: formData
		});

		$('.loading').css('display', 'none');
		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}

		history('/mservice',{replace:true});
	}, [confirmContent, rejectContent, fileInfo, token, no, history]);

	// DID 요청에 의해 관리자가 사용자 서비스 종료를 할 수 있게 수정	2021.05.25
    const onDropClick = useCallback(async (e) => {
        e.preventDefault();
        CommonHeader.authorization = token;

        const response = await fetch(PreUri + '/service/' + no + '/consulting/drop', {
            method: Method.post,
            headers: CommonHeader
        });

        if (!response.ok) {
            alert('서비스 종료를 실패하였습니다.');
            return;
        }

        history('/mservice',{replace:true});
    }, [no, token, history]);

	const onEdit = useCallback(async (e) => {
        e.preventDefault();
        CommonHeader.authorization = token;

        let body = {}
        if (consultingItem.title !== editTitle) { body.title = editTitle; }
        if (consultingItem.content !== editContent) { body.content = editContent; }
        if (Object.keys(body).length === 0) { return; }

        const response = await fetch(PreUri + '/service/' + no + '/consulting', {
            method: Method.put,
            headers: CommonHeader,
			body: JSON.stringify(body)
        });

        if (!response.ok) {
            alert('서비스 종료를 실패하였습니다.');
            return;
        }

        setConsultingItem(consultingItem=>({
            ...consultingItem,
			title: editTitle,
			content: editContent,
        }))

        alert("수정되었습니다.");

    }, [no, token, consultingItem, editTitle, editContent]);

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
			< tr className="enter" ></tr >
			<tr>
				<th>{props.index === 0 ? '첨부파일' : ''}</th>
				<td colSpan="3" className="eng"><button style={{ border: "0px", backgroundColor: '#fff', cursor: 'pointer' }} onClick={props.onClick}>{props.filename}</button></td>
			</tr>
		</>);
	}, []);

	let DownloadMyFileItems = [];
	if (myFiles && myFiles.length > 0) {
		for (let i = 0; i < myFiles.length; i++) {
			DownloadMyFileItems.push(
				<FileDownload index={i}
					filename={myFiles[i].original_name}
					onClick={(e) => onFileDownload(e, myFiles[i])}
					key={i} />);
		};
	}

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
				<th className="more">{props.index === 0 ? '첨부파일' : ''}</th>
				<td colSpan="3" className="file">
					<div>
						<input type="text" readOnly={true} value={props.filename === undefined ? '' : props.filename.name} />
						<label><input type={props.type} name="file" onChange={props.onChange} onClick={props.onClick} />{props.label}</label>
					</div>
				</td>
			</tr>
		</>);
	}, []);

	let AttachedFileItems = [];
	for (let i = 0; i <= fileInfo.length && i < MaxFileCount; i++) {
		let endline = (i === fileInfo.length) ? true : false;
		AttachedFileItems.push(
			<FileInput index={i}
				filename={fileInfo[i]}
				type={endline ? "file" : "button"}
				label={endline ? '파일선택' : '취소'}
				onChange={endline ? onFileUpload : undefined}
				onClick={endline ? undefined : (e) => onFileRemove(e, i)}
				key={i} />);
	};

	let DownloadFileItems = [];
	if (consultingItem.attachedFile && consultingItem.attachedFile.length > 0) {
		const files = consultingItem.attachedFile;
		for (let i = 0; i < files.length; i++) {
			DownloadFileItems.push(
				<FileDownload index={i}
					filename={files[i].original_name}
					onClick={(e) => onFileDownload(e, files[i])}
					key={i} />);
		};
	}
   
	return (
        (consultingFlag === false)
            ? <div id="wrap" className="wrap service2">
                <div className="content_wrap">
                    <SideNavi history={history} />
                    <div className="content">
                        <div className="top_menu">
                            <TopNavi step={1} />
                        </div>
                        <div className="form">
                            <h2>상담없이 서비스 이용을 신청하였습니다.</h2>
                        </div>
                        <div className="btn_box"><button onClick={() => { history(-1) }}>확인</button></div>
                    </div>
                </div>
            </div>
            : <div id="wrap" className="wrap service2">
                <div className="content_wrap">
                    <SideNavi history={history} />
                    <div className="content">
                        <div className="top_menu">
                            <TopNavi step={1} />
                        </div>
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
                                            <th>이름</th>
                                            <td>{consultingItem.name}</td>
                                            <th>이메일</th>
                                            <td className="eng">{consultingItem.email}</td>
                                        </tr>
                                        <tr className="enter"></tr>
                                        <tr>
                                            <th>전화번호</th>
                                            <td className="num">{consultingItem.phoneNumber}</td>
                                            <th>회사명</th>
                                            <td>{consultingItem.company ? consultingItem.company : "-"}</td>
                                        </tr>
                                        <tr className="enter"></tr>
                                        <tr>
                                            <th>신청일</th>
                                            <td className="num">{consultingItem.created_at.substr(0, 10)}</td>
                                            {/* <th>예약일시</th>
                                            <td className="num">{consultingItem.reservation}</td> */}
                                        </tr>
                                        <tr className="enter"></tr>
                                        <tr>
                                            <th className="textarea">제목</th>
                                            {status === 'URD'
                                                ? <td colSpan="3" className="noborder">
                                                    <input className="title" type="text" value={editTitle} name="title" onChange={(e) => setEditTitle(e.target.value)} /></td>
                                                : <td colSpan="3">{consultingItem.title}</td>
                                            }
                                        </tr>
                                        <tr className="enter"></tr>
                                        <tr>
                                            <th className="textarea">내용</th>
                                            <td colSpan="3" className="noborder">
                                                {status === 'URD'
                                                    ? <textarea readOnly={false} value={editContent} name="content" onChange={(e) => setEditContent(e.target.value)} />
                                                    : <textarea readOnly={true} value={consultingItem.content} name="content" />
                                                }
                                            </td>
                                        </tr>
                                        {DownloadFileItems}
                                        {status === 'URD' 
                                            ? <tr>
                                                <td colSpan="4">
                                                    <button type="button" className="btn_edit" onClick={(e) => onEdit(e)}>내용 수정</button>
                                                </td>
                                            </tr>
                                            : <></>
                                        }
                                    </tbody>
                                </table>
                                {status === 'URD' ?
                                    <></> :
                                    <div>
                                        <p className="border"></p>
                                        <table>
                                            <colgroup>
                                                <col width="15%" />
                                                <col width="35%" />
                                                <col width="15%" />
                                                <col width="35%" />
                                            </colgroup>
                                            {viewState.currentView === viewState.progress ?
                                                status === 'CXL' ?
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="4" className="noborder">
                                                                <p style={{ textAlign: "center", color: "black", fontWeight: "bold", paddingTop: "24px" }}>사용자에 의해 상담신청 예약이 취소되었습니다.</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    : status === 'REJ' ?
                                                        <tbody>
                                                            <tr>
                                                                <th className="textarea">종료 내용<br />(반려)</th>
                                                                <td colSpan="3" className="noborder">
                                                                    <textarea readOnly={true} value={confirmContent} name="content" /></td>
                                                                {/* <td colSpan="3">{confirmContent.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</td> */}
                                                            </tr>
                                                        </tbody>
                                                        : (status === 'RES' || status === 'DRP') ?
                                                            <tbody>
                                                                <tr>
                                                                    <th className="textarea">작업/견적 내용<br />(응답)</th>
                                                                    <td colSpan="3" className="noborder">
                                                                        <textarea readOnly={true} value={confirmContent} />
                                                                    </td>
                                                                </tr>
                                                                {DownloadMyFileItems}
                                                                <tr>
                                                                    <td colSpan="4" className="noborder">
                                                                        <p style={{ textAlign: "center", color: "black", fontWeight: "bold", paddingTop: "24px" }}>
                                                                            {status === 'DRP' ? "사용자에 의해 상담으로 종료되었습니다." : "사용자의 서비스 신청을 기다리고 있습니다."}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            : <tbody>
                                                                <tr>
                                                                    <th className="textarea">작업/견적 내용</th>
                                                                    <td colSpan="3" className="noborder">
                                                                        {authority_level < AuthLevel.scheduler ?
                                                                            <textarea readOnly={true} value={confirmContent} placeholder={"파트너 계정은 상담내용 작성 권한이 없습니다."} />
                                                                            : <textarea value={confirmContent} name="content" onChange={(e) => { setConfirmContent(e.target.value) }} />}
                                                                    </td>
                                                                </tr>
                                                                {authority_level < AuthLevel.scheduler
                                                                    ? <></>
                                                                    : AttachedFileItems
                                                                }
                                                            </tbody>
                                                : <tbody>
                                                    <tr>
                                                        <th className="textarea">작업/견적 내용<br />(응답)</th>
                                                        <td colSpan="3" className="noborder">
                                                            <textarea readOnly={true} value={confirmContent} />
                                                        </td>
                                                    </tr>
                                                    {DownloadMyFileItems}
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                        {viewState.currentView === viewState.progress ?
                            authority_level < AuthLevel.scheduler ?
                                <div className="btn_box"><button onClick={() => { history(-1) }}>뒤로 가기</button></div>
                                : (status === 'URD') ?
                                    <div className="btn_box">
                                        <button className="back" onClick={() => { history(-1) }}>뒤로 가기</button>
                                        <button className="reject" onClick={() => { $('.pop').css('display', 'block'); }} >반려</button>
                                        <button className="complete" onClick={(e) => onReserv(e, 'Y')}>신청 확인</button>
                                    </div>
                                    : (status === 'RUN') ?
                                        <div className="btn_box">
                                            <button className="back" onClick={() => { history(-1) }}>뒤로 가기</button>
                                            <button className="reject" onClick={() => { $('.pop').css('display', 'block'); }} >반려</button>
                                            <button className="complete" onClick={(e) => onConfirm(e, 'Y')}>상담 완료</button>
                                        </div>
                                        : (status === 'RES') ?
                                            <div className="btn_box">
                                                <button className="back" onClick={() => { history(-1) }}>뒤로 가기</button>
                                                <button onClick={() => { $('.pop').css('display', 'block'); }}>사용자 종료</button>
                                            </div>
                                            : <div className="btn_box">
                                                <button className="back" onClick={() => { history(-1) }}>뒤로 가기</button>
                                            </div>
                            : <div className="btn_box"><button onClick={() => { history(-1) }}>확인</button></div>
                        }
                    </div>
                    {authority_level < AuthLevel.scheduler ? <></>
                        : (status === 'URD' || status === 'RUN') ?
                            <div className="pop">
                                <p><textarea value={rejectContent} name="rejectContent" onChange={(e) => { setRejectContent(e.target.value) }} placeholder="사유를 작성해 주세요"></textarea></p>
                                <ul>
                                    <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
                                    <li className="yes"><button onClick={(e) => { status === 'URD' ? onReserv(e, 'N') : onConfirm(e, 'N') }}>반려</button></li>
                                </ul>
                            </div>
                            : <div className="pop">
                                <p>사용자의 요청에 의해 상담신청에서 서비스를 종료합니다</p>
                                <ul>
                                    <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
                                    <li className="yes"><button onClick={onDropClick}>확인</button></li>
                                </ul>
                            </div>}
                </div>
                <div className="loading" />
            </div>
    );
}