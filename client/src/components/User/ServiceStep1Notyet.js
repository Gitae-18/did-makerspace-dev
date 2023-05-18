import React, { /*useState, useEffect, useRef,*/ useCallback } from 'react';
import { useSelector } from "react-redux";
import { CommonHeader, PreUri, Method } from '../../CommonCode';

import $ from 'jquery';
import { useLocation,useNavigate } from 'react-router';
import '../../css/common-s.css';
import '../../css/style-s.css';
export default function ({  no }) {
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    const onClick = useCallback(async (e) => {
        e.preventDefault();
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/consulting/usercancel', {
            method: Method.post,
            headers: CommonHeader
        });

        if (!response.ok) {
            alert('상담취소를 실패하였습니다.');
            return;
        }

        history('/uservice',{replace:true});
    }, [token, history, no]);

    return (
        <div id="wrap" className='wrap utilize4'>
            <div className="content_wrap">
                <div className="content">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_alert.png" alt="img" />
                        <p>상담이 완료되지 않았습니다.</p>
                        <span>담당자와 상담 후 결과를 보내드립니다.<br/>이 후 서비스 이용 신청서를 작성하실 수 있습니다.</span>
                    </div>
                    <div className="btn_box">
                        <button className="back" onClick={(e) => {history('/uservice',{replace:true})}} >뒤로 가기</button>
                        <button onClick={(e) => { $('.pop').css('display', 'block'); }}>상담예약 취소</button>
                    </div>
                    {/* <button type="button" className="btn_cancel" onClick={onClick}>상담 취소</button> */}
                </div>
                <div className="pop">
                    <p>정말 상담을 취소하시겠습니까?</p>
					<ul>
						<li className="no"><button onClick={(e) => { $('.pop').css('display', 'none'); }}>취소</button></li>
						<li className="yes"><button onClick={onClick}>학인</button></li>
					</ul>
				</div>
            </div>
          </div>
        </div>
    );
}
