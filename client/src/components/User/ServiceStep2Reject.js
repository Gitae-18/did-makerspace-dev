import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../CommonCode'
import { useSelector } from "react-redux";
import '../../css/common-s.css';
import '../../css/style-s.css';
import { useLocation,useNavigate } from 'react-router';
export default function ({ no }) {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const history = useNavigate();
    const [rejectText, setRejectText] = useState('');
    const getPreInfo = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/service_confirm', {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('response error');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }
        setRejectText(json.reject_content);
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

    return (
        <div id="wrap" className='wrap utilize10'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_alert.png" alt="img" />
                        <p>서비스 신청이 취소되었습니다.</p>
                        <span>[취소 사유]{rejectText.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</span>
                    </div>
                    <button type="button" className="btn_ok" onClick={()=>{history(-1)}}>확인</button>
                </div>
            </div>
        </div>
    );
}
