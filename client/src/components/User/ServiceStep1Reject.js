import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../CommonCode'
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from 'react-router';
import '../../css/common-s.css';
import '../../css/style-s.css';
export default function ({  no }) {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
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

    return (
        <div id="wrap" className='wrap utilize6'>
            <div className="content_wrap">
              <div className="content">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_alert.png" alt="img" />
                        <p>전문가 상담이 취소되었습니다.</p>
                        <span>[취소 사유]{consultingResult.content.split('\n').map((line, index) => { return (<span key={index}>{line}<br /></span>) })}</span>
                    </div>
                    <button type="button" className="btn_ok" onClick={()=>{history(-1)}}>확인</button>
                </div>
            </div>
          </div>
        </div>
    );
}
