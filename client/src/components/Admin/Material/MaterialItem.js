import React, { useState, useEffect, /*useRef,*/ useCallback } from 'react';
import { CommonHeader, PreUri, Method, AuthLevel, StatusCode, /*ConvertPhoneNumber, ConvertDate2, getFormatDate*/ } from '../../../CommonCode';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_CATEGORY/*, SET_MATERIAL*/ } from "../../../store/material";

import SideNavi from './SideNavi';

import $ from "jquery";

import '../../../css/common.css';
import '../../../css/style.css';

const PopupType = {
    Reject : 0,
    Buy : 1,
}

export default function ({ location, history }) {
    const dispatch = useDispatch();
    const { token, authority_level } = useSelector(state => state.user)
    const { /*categoryList, categoryIndex, */record } = useSelector(state => state.material);
    const [requestForm, setRequestForm] = useState({
        content: '',
        quantity: '',
    })
    const [popupType, setPopupType] = useState(PopupType.Reject);

    const updateStatus = useCallback(async (newStatus) => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/material/usage/' + record.material_usage_no, {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
                status: newStatus,
            }),
        });

        if (!response.ok) {
            console.log('실패');
            return;
        }
    }, [record, token]);

    useEffect(() => {
        if (record) {
            //console.log(record);
            setRequestForm(requestForm => ({
                ...requestForm,
                content: record.request_content,
                quantity: record.quantity,
                reject: ''
            }));
        } else {
            history.replace('/mmaterial')
        }
    }, [record, updateStatus, history])

    const onChange = useCallback((e) => {
        e.preventDefault();
        const re = /^[0-9\b]+$/;
        if (e.target.name === 'quantity'
            && e.target.value !== '' && !re.test(e.target.value)) {
            return;
        }
        setRequestForm({
            ...requestForm,
            [e.target.name]: e.target.value
        });
    }, [requestForm]);

    const onConfirm = useCallback(async (e, confirm) => {
        e.preventDefault();
        CommonHeader.authorization = token;

        if (confirm !== 'REJ') {
            if (requestForm.quantity <= 0) {
                alert('신청 수량을 확인해 주세요');
                return;
            }
        }

        const response = await fetch(PreUri + '/material/usage/' + record.material_usage_no + '/confirm', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                confirm,
                reject_content: (confirm === 'REJ') ? requestForm.reject : undefined,
                quantity: (confirm !== 'REJ') ? requestForm.quantity : undefined
            })
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        history.go(-1);
    }, [token, requestForm, record, history]);

    const onCategory = useCallback((e, index) => {
        dispatch({ type: CHANGE_CATEGORY, target: index });
        // getItemList(1, 0, categoryList[index].no);
        history.push('/mmaterial');
    }, [dispatch, /*categoryList,*/ history]);

    const RejectContent = useCallback((record) => {
        return (
            record.status === 'REJ'
                ? <><tr className="enter" />
                    <tr>
                        <th>*취소 내용</th>
                        <td><textarea name="content" disabled={true} readOnly={true} defaultValue={record.reject_content} /></td>
                    </tr></>
                : <></>
        );
    }, []);

    const onPopup = useCallback((type) => {
        setPopupType(type);
        $('.pop').css('display', 'block');
    }, []);

    const UserButton = useCallback((record, history, onConfirm, authority_level, onPopup) => {
        let ButtonRows = [];
        let key = 0;

        ButtonRows.push(<button onClick={() => { history.go(-1) }} className="btn_left" key={key++}> 뒤로 가기</button >)

        if (authority_level >= AuthLevel.manager) {
            switch (record.status) {
                case 'URD':
                    ButtonRows.push(<button onClick={() => onPopup(PopupType.Reject)} className="btn_center" key={key++}>반려</button>)
                    ButtonRows.push(<button onClick={(e) => onConfirm(e, 'RUN')} key={key++}>진행</button>)
                    break;
                case 'RUN':
                    ButtonRows.push(<button onClick={() => onPopup(PopupType.Reject)} className="btn_center" key={key++}>구매 취소</button>)
                    ButtonRows.push(<button onClick={() => onPopup(PopupType.Buy)} key={key++}>구입 완료</button>)
                    break;
                default:
                    break;
            }
        } 

        return (
            <div className="btn_box">
                {ButtonRows}
            </div>
        );
    }, []);

    return (!record ? <></> :
        <div id="wrap" className="wrap materials3">
            <div className="content_wrap">
                <SideNavi location={location} history={history} onCategory={onCategory} />
                <div className="content">
                    <h2>{record.categoryName + ' - ' + record.materialName}</h2>
                    <div className="form">
                        <h3>자재 신청 ({StatusCode[record.status]})</h3>
                        <span>*필수입력</span>
                        <table>
                            <tbody>
                                <tr>
                                    <th>*신청 내용</th>
                                    <td><textarea name="content" disabled={true} readOnly={true} defaultValue={requestForm.content} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*신청 수량</th>
                                    <td className="eng">
                                        <input type="text" className="num" name="quantity" 
                                            disabled={record.status === 'RUN' ? false : true}
                                            readOnly={record.status === 'RUN' ? false : true}
                                            value={requestForm.quantity} onChange={onChange} />
                                        {record.unit}
                                    </td>
                                </tr>
                                {RejectContent(record)}
                            </tbody>
                        </table>
                    </div>
                    {UserButton(record, history, onConfirm, authority_level, onPopup)}
                </div>
                {popupType === PopupType.Reject /* popup */
                    ? <div className="pop">
                        <p><textarea placeholder="반려 사유를 작성해 주세요" name="reject" value={requestForm.reject} onChange={onChange} /></p>
                        <ul>
                            <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }} >취소</button></li>
                            <li className="yes" onClick={(e) => onConfirm(e, 'REJ')} ><button>반려</button></li>
                        </ul>
                    </div>
                    : <div className="pop">
                        <p>자재 [{requestForm.quantity + ' ' + record.unit}] 구매를 확정 하시겠습니까?
                        {requestForm.quantity !== record.quantity
                                ? <><br /><br />주의 : 신청된 수량 [{record.quantity + ' ' + record.unit}] 에서 변경되었습니다</>
                                : ''}
                        </p>
                        <ul>
                            <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }} >취소</button></li>
                            <li className="yes" onClick={(e) => onConfirm(e, 'END')} ><button>확인</button></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
}