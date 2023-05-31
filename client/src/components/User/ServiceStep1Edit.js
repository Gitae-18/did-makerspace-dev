import React, { useState, useEffect, useRef, useCallback } from 'react';
import UServiceNavi from './ServiceNavi';
import {
	CommonHeader, PreUri, Method, getRspMsg, MaxFileCount, MB, LIMIT,
	ConvertPhoneNumber
} from '../../CommonCode';
import { useLocation,useNavigate } from 'react-router';
import { useSelector } from "react-redux";

import $ from 'jquery';

import '../../css/common-s.css';
import '../../css/style-s.css';

export default function ({ no }) {
	const mountedRef = useRef(true);
	const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();

 	const [consultingItem, setConsultingItem] = useState({
		serviceNo: '',
		name: '',
		email: '',
		phoneNumber: '',
		company: '',
		title: '',
		content: '',
		created_at: '',
		attached_file: [],
	});

	const [editTitle, setEditTitle] = useState('');
	const [editContent, setEditContent] = useState('');

	const getConsultingApplication = useCallback(async () => {
		CommonHeader.authorization = token;

		const response = await fetch(PreUri + '/service/' + no + '/consulting', {
			method: Method.get,
			headers: CommonHeader
		});

		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}

		const consulting = await response.json();
		if (!mountedRef.current) { return }
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
			attached_file: consulting.attached_file ? consulting.attached_file : [],
		}));

        setEditTitle(consulting.title);
        setEditContent(consulting.content);

	}, [no, token]);

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

	const onEdit = useCallback(async (e) => {
        e.preventDefault();
        CommonHeader.authorization = token;

        let body = {}
        if (consultingItem.title !== editTitle) { body.title = editTitle; }
        if (consultingItem.content !== editContent) { body.content = editContent; }
        if (Object.keys(body).length > 0) {
            const response = await fetch(PreUri + '/service/' + no + '/consulting', {
                method: Method.put,
                headers: CommonHeader,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                alert('상담 신청서 수정을 실패하였습니다.');
                return;
            }

            setConsultingItem(consultingItem => ({
                ...consultingItem,
                title: editTitle,
                content: editContent,
            }))
        }

        let file_count = 0
        if (consultingItem.attached_file) {
            const formData = new FormData();
            for (let i = 0; i <consultingItem.attached_file.length; i++) {
                if (consultingItem.attached_file[i].attached_file_no === 0) {
                    formData.append('files', consultingItem.attached_file[i].clientfile);
                    file_count++;
                }
            }

            if (file_count > 0) {
                $('.loading').css('display', 'block');
                const response = await fetch(PreUri + '/service/' + no + '/consulting/files', {
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

        if (Object.keys(body).length > 0 || file_count > 0) {
            alert("수정되었습니다.");
            history(0)
        }
    }, [no, token, consultingItem, editTitle, editContent, history]);

    const onFileUpload = useCallback((e, i) => {
        e.preventDefault();

        if (!e.target.files.length === 0) {
            return;
        }

        const fileSize = e.target.files[0].size;
        if (fileSize > LIMIT) {
            alert(MB + 'MB 보다 작은 크기여야 합니다.');
            return;
        }

        let copy = { ...consultingItem };
        copy.attached_file[i] = {
            ...copy.attached_file[i],
            attached_file_no: 0,
            original_name: e.target.files[0].name,
            clientfile: e.target.files[0]
        }

        setConsultingItem(copy);
        e.target.value = null;
    }, [consultingItem])

    const onFileRemove = useCallback(async (e, i) => {
        e.preventDefault();

        let copy = { ...consultingItem };
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
        setConsultingItem(copy);
    }, [consultingItem, token]);

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
                <td>
                    <div>
                        <input type="text" readOnly={true} value={props.filename === undefined ? '' : props.filename} onClick={props.onDownload} style={props.style} />
                        <label><input type={props.type} name="attached_files" onChange={props.onChange} onClick={props.onClick} />{props.label}</label>
                    </div>
                </td>
            </tr>
        </>);
    }, []);

    let AttachedFileItems = [];
    for (let i = 0; i <= consultingItem.attached_file.length && i < MaxFileCount; i++) {
        let file = (i === consultingItem.attached_file.length) ? undefined : consultingItem.attached_file[i];
        const isReadOnly = false;
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
                    onChange={file ? undefined : (e) => onFileUpload(e, i)}
                    onClick={file ? (e) => onFileRemove(e, i) : undefined}
                    onDownload={file ? (e) => onFileDownload(e, file) : undefined}
                    style={file ? { cursor: 'pointer' } : undefined}
                    key={i} />);
        }
    }

    return (
        <div id="wrap" className='wrap utilize2'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="top_menu">
                        <UServiceNavi step={1} />
                    </div>
                    <h2>상담 신청서</h2>
                    <p className="info">담당자가 상담 신청을 확인 중입니다, 확인 전 까지 내용을 수정할 수 있습니다.</p>
                    <div className="reservation">
                        <div className="text_box">
                            <table className="t2">
                                <colgroup>
                                    <col width="15%" />
                                    <col width="85%" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>제목</th>
                                        <td><input type="text" value={editTitle} name="title" onChange={(e) => setEditTitle(e.target.value)} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>내용</th>
                                        <td className="txt" ><textarea value={editContent} name="content" onChange={(e) => setEditContent(e.target.value)}></textarea></td>
                                    </tr>
                                    {AttachedFileItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="btn_box">
                        <button className="btn_left" onClick={() => { history(-1) }} >뒤로 가기</button>
                        <button type="button" className="btn_book" onClick={(e) => onEdit(e)}>내용 수정</button>
                    </div>
                </div>
            </div>
            <div className="pop">
                <p>정말 상담을 취소하시겠습니까?</p>
                <ul>
                    <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
                    {/* <li className="yes"><button onClick={}>학인</button></li> */}
                </ul>
            </div>
            <div className="loading" />
        </div>
    );
}
