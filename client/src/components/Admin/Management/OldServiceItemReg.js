import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method, getRspMsg, MaxFileCount, MB, LIMIT } from '../../../CommonCode';
import SideNavi from './SideNavi';

import { useSelector } from "react-redux";

import $ from 'jquery';

import '../../../css/common.css';
import '../../../css/style.css';

function StringToDate(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    return new Date(y, m - 1, d);
}

const fieldList = ['없음', '3D프린팅', 'CNC', '기구설계', '모션캡쳐', '회로설계', '영상제작', '유투브라이브', '크라우드펀딩', '교육장대관', '제품제작', '레이저가공'];

export default function ({ location, history }) {
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);
    const [partnerItems, setPartnerItems] = useState({
        count: 0,
        items: [],
    });
    const [regItem, setRegItem] = useState({
        title: '',
        customer: '',
        registration_date: '',
        completion_date: '',
        selectFieldIndex: 0,
        selectPartnerIndex: 0,
        attached_files: []
    });

    const getPreInfo = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/company/list/partner', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }
        setPartnerItems(partnerItems => ({
            ...partnerItems,
            count: Number(json.count),
            items: json.items,
        }));
    }, [token]);

    useEffect(() => {
        if (!mountedRef.current) { return }
        getPreInfo();
        return () => {
            mountedRef.current = false
        }
    }, [getPreInfo])

    const onChange = useCallback((e) => {
        e.preventDefault();
        setRegItem({
            ...regItem,
            [e.target.name]: e.target.value
        })
    }, [regItem]);

    const onReg = useCallback(async (e) => {
        e.preventDefault();

        if (partnerItems.count === 0) { return; }
        if (regItem.title.length === 0 || regItem.customer.length === 0
            || regItem.registration_date.length === 0 || regItem.completion_date.length === 0) {
            alert('필수입력 항목이 비어 있습니다.');
            return;
        }

        if (StringToDate(regItem.registration_date) > StringToDate(regItem.completion_date)) {
            alert('종료일이 신청일 보다 빠릅니다.');
            return;
        }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/oldservice/new', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                application_title: regItem.title,
                application_field: fieldList[regItem.selectFieldIndex],
                customer: regItem.customer,
                registration_date: regItem.registration_date,
                completion_date: regItem.completion_date,
                company_no: partnerItems.items[regItem.selectPartnerIndex].company_no
            })
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        const json = await response.json();
        const oldServiceNo = json.old_service_no;
        if (!oldServiceNo) {
            console.log('response error');
            return;
        }

        const formData = new FormData();
        let count = 0;
        for (let i = 0; i < regItem.attached_files.length; i++) {
            if (regItem.attached_files[i].old_service_file_no === 0) {
                formData.append('files', regItem.attached_files[i].clientfile);
                count++;
            }
        }

        if (count > 0) {
            $('.loading').css('display', 'block');
            const response = await fetch(PreUri + '/oldservice/' + oldServiceNo + '/files', {
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

        history.replace('/management');
    }, [token, partnerItems, regItem, history]);

    const OptionPartnerItem = useCallback((props) => {
        return (<>
            <option value={props.index}>{props.partner}</option>
        </>);
    }, []);

    let OptionPartnerItems = [];
    for (let i = 0; i < partnerItems.count; i++) {
        OptionPartnerItems.push(<OptionPartnerItem index={i} partner={partnerItems.items[i].name} key={i} />);
    };

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

        let copy = { ...regItem };
        copy.attached_files[i] = {
            ...copy.attached_files[i],
            old_service_file_no: 0,
            original_name: e.target.files[0].name,
            clientfile: e.target.files[0]
        }

        setRegItem(copy);
        e.target.value = null;
    }, [regItem])

    const onFileRemove = useCallback(async (e, i) => {
        e.preventDefault();

        let copy = { ...regItem };
        const file_no = copy.attached_files[i].old_service_file_no;
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

        copy.attached_files.splice(i, 1);;
        setRegItem(copy);
    }, [token, regItem]);

    const FileInput = useCallback((props) => {
        return (<>
            <tr className="enter"></tr>
            <tr>
                <th>{props.index === 0 ? '첨부파일' : ''}</th>
                <td>
                    <div>
                        <input type="text" readOnly={true} value={props.filename === undefined ? '' : props.filename} />
                        <label><input type={props.type} name="attached_files" onChange={props.onChange} onClick={props.onClick} />{props.label}</label>
                    </div>
                </td>
            </tr>
        </>);
    }, []);

    let AttachedFileItems = [];
    for (let i = 0; i <= regItem.attached_files.length && i < MaxFileCount; i++) {
        let file = (i === regItem.attached_files.length) ? undefined : regItem.attached_files[i];
        AttachedFileItems.push(
            <FileInput index={i}
                type={"file"}
                filename={file ? file.original_name : undefined}
                label={file ? ((Number(file.old_service_file_no) > 0) ? "삭제" : "취소") : "파일선택"}
                onChange={file ? undefined : (e) => onFileUpload(e, i)}
                onClick={file ? (e) => onFileRemove(e, i) : undefined}
                key={i} />);
    }
    return (
        <div id="wrap" className="wrap management13">
            <div className="content_wrap">
                <SideNavi location={location} history={history} viewDepth={2} />
                <div className="content">
                    <h2>2020년 자료 관리</h2>
                    <div className="form">
                        <h3>2020년 자료 신규 등록</h3>
                        <span>*필수입력</span>
                        <table>
                            <colgroup>
                                <col width="18%" />
                                <col width="82%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>*지원 서비스</th>
                                    <td><input type="text" value={regItem.title} name="title" onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*지원 분야</th>
                                    <td>
                                        <select value={regItem.selectFieldIndex} name="selectFieldIndex" onChange={onChange}>
                                            <option value={0}>{fieldList[0]}</option>
                                            <option value={1}>{fieldList[1]}</option>
                                            <option value={2}>{fieldList[2]}</option>
                                            <option value={3}>{fieldList[3]}</option>
                                            <option value={4}>{fieldList[4]}</option>
                                            <option value={5}>{fieldList[5]}</option>
                                            <option value={6}>{fieldList[6]}</option>
                                            <option value={7}>{fieldList[7]}</option>
                                            <option value={8}>{fieldList[8]}</option>
                                            <option value={9}>{fieldList[9]}</option>
                                            <option value={10}>{fieldList[10]}</option>
                                            <option value={11}>{fieldList[11]}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*신청자명<br />(회사 또는 개인 이름)</th>
                                    <td><input type="text" value={regItem.customer} name="customer" onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*담당 기업</th>
                                    <td>
                                        <select value={regItem.selectPartnerIndex} name="selectPartnerIndex" onChange={onChange}>
                                            {OptionPartnerItems}
                                        </select>
                                    </td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*신청일</th>
                                    <td><input type="date" style={{ width: "258px", textAlign: "center", paddingLeft: "40px" }} value={regItem.registration_date} name="registration_date" onChange={onChange} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*종료일</th>
                                    <td><input type="date" style={{ width: "258px", textAlign: "center", paddingLeft: "40px" }} value={regItem.completion_date} name="completion_date" onChange={onChange} /></td>
                                </tr>
                                {AttachedFileItems}
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button className="btn_cancel" onClick={() => { history.go(-1) }}>취소</button>
                        <button className="btn_apply" onClick={onReg}>등록</button>
                    </div>
                </div>
            </div>
            <div className="loading" />
        </div>
    );
}