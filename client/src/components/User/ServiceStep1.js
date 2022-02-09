import React, { useState, useCallback } from 'react';
import UServiceNavi from './ServiceNavi';
import { PreUri, Method, MaxFileCount, MB, LIMIT} from '../../CommonCode';
import { useSelector } from "react-redux";

import $ from 'jquery';

import '../../css/common.css';
import '../../css/style.css';

export default function ({ history }) {
	const { token } = useSelector(state => state.user);

    const [value, setValue] = useState({
        title: '',
        content: '',
    });
    const [fileInfo, setFileInfo] = useState([]);

    const onChange = useCallback((e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }, [value]);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!value.title || !value.content) {
            alert('제목 또는 내용이 비어있습니다.')
            return;
        }

        const formData = new FormData();
        formData.append('title', value.title);
        formData.append('content', value.content);
        // formData.append('reservation', date);
        for (let i = 0; i < fileInfo.length; i++) {
            formData.append('files', fileInfo[i]);
        }

        $('.loading').css('display', 'block');
        const response = await fetch(PreUri + '/service/consulting', {
            method: Method.post,
            headers: {
                authorization: token,
            },
            body: formData
        });

        $('.loading').css('display', 'none');
        if (!response.ok) {
            alert('예약을 실패하였습니다.');
            return;
        }

        history.replace('/uservice?step=1&next=confirm');
    }, [/*reservDate, reservTime, */fileInfo, value, token, history]);

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
                <th>{props.index === 0 ? '첨부파일' : ''}</th>
                <td>
                    <input type="text" readOnly={true} value={props.filename === undefined ? '' : props.filename.name} />
                    <label><input type={props.type}
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

    return (
        <div id="wrap" className='wrap utilize2'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="top_menu">
                        <UServiceNavi step={1} />
                    </div>
                    <h2>상담 신청서 작성</h2>
                    <p className="info">상담 신청을 하시면 내용을 확인 후 관련 담당자가 연락을 드립니다.</p>
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
                                        <td><input type="text" value={value.title} name="title" onChange={onChange} /></td>
                                    </tr>
                                    <tr className="enter"></tr>
                                    <tr>
                                        <th>내용</th>
                                        <td className="txt" ><textarea value={value.content} name="content" onChange={onChange}></textarea></td>
                                    </tr>
                                    {AttachedFileItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button type="button" onClick={onSubmit} className="btn_book">상담 신청</button>
                </div>
            </div>
            <div className="loading" />
        </div>
    );
}
