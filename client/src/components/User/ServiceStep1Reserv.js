import React, { /*useState, useEffect, useRef,*/ useCallback } from 'react';
import { useSelector } from "react-redux";
import { CommonHeader, PreUri, Method } from '../../CommonCode';

import $ from 'jquery';

import '../../css/common-s.css';
import '../../css/style-s.css';
import { useLocation,useNavigate } from 'react-router';
export default function ({ no }) {
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
                        <p>상담 신청을 확인 중 입니다.</p>
                        <span>신청해 주신 상담 내용을 확인하고 있습니다.</span>
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
						<li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
						<li className="yes"><button onClick={onClick}>학인</button></li>
					</ul>
				</div>
            </div>
          </div>
        </div>
    );
}

