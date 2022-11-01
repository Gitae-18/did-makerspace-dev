import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../CommonCode';
import UServiceNavi from './ServiceNavi';
import { useSelector } from "react-redux";

//import $ from 'jquery';
import { useLocation,useNavigate } from 'react-router';
import '../../css/common-s.css';
import '../../css/style-s.css';

export default function ({ no }) {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    const [consultingResult, setConsultingResult] = useState({
        serviceNo: '',
        content: '',
        resultFlag: '',
        attachedFile: [],
    });

    const getConsultingResult = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/consulting/result', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }
        setConsultingResult(consultingResult => ({
            ...consultingResult,
            serviceNo: json.service_no,
            content: json.content,
            resultFlag: json.consulting_done_flag,
            attachedFile: json.attached_file,
        }));
    }, [no, token]);

    useEffect(() => {
        if (!no) {
            alert('Error : Service Number');
            return;
        }

        getConsultingResult();
        return () => {
            mountedRef.current = false
        }
    }, [no, getConsultingResult])

    // DID 요청에 의해 사용자가 서비스 종료를 할 수 없게 수정 2021.05.25
    // const onDropClick = useCallback(async (e) => {
    //     e.preventDefault();
    //     CommonHeader.authorization = token;

    //     const response = await fetch(PreUri + '/service/' + no + '/consulting/drop', {
    //         method: Method.post,
    //         headers: CommonHeader
    //     });

    //     if (!response.ok) {
    //         alert('서비스 종료를 실패하였습니다.');
    //         return;
    //     }

    //     history.replace('/uservice');
    // }, [no, token, history]);

    const onNextClick = useCallback(async (e) => {
        e.preventDefault();

        history('/uservice?step=2&next=app&no=' + no);
    }, [no, history]);

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
    if (consultingResult.attachedFile && consultingResult.attachedFile.length > 0) {
        const files = consultingResult.attachedFile;
        for (let i = 0; i < files.length; i++) {
            DownloadFileItems.push(<FileDownload index={i}
                filename={files[i].original_name}
                onClick={(e) => onFileDownload(e, files[i]) }
                key={i} />);
        };
    }

    return (
        <div id="wrap" className='wrap utilize5'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="top_menu">
                        <UServiceNavi step={2} />
                    </div>
                    <h2>전문가 상담/견적 산정</h2>
                    <div className="form">
                        <table>
                            <tbody>
                                <tr>
                                    <th>작업/견적 내용</th>
                                    <td><textarea readOnly={true} value={consultingResult.content}></textarea></td>
                                </tr>
                                {DownloadFileItems}
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button className="btn_back" onClick={() => {history(-1)}} >뒤로 가기</button>
                        {/* <button className="btn_quit" onClick={() => { $('.pop').css('display', 'block'); }}>이용 종료</button> */}
                        <button className="btn_next" onClick={onNextClick}>서비스 신청서 작성</button>
                    </div>
                </div>
                {/* <div className="pop">
                    <p>정말 서비스 이용을 종료하시겠습니까?</p>
					<ul>
						<li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
						<li className="yes"><button onClick={onDropClick}>학인</button></li>
					</ul>
				</div> */}
            </div>
        </div>
    );
}
