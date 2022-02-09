import React from 'react';
import '../../css/common.css';
import '../../css/style.css';

export default function ({ history }) {
    return (
        <div id="wrap" className='wrap utilize8'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_ok.png" alt="img" />
                        <p>서비스 이용 신청이 <strong>완료</strong>되었습니다.</p>
                        <span>서비스 이용 일정은 추후 공지해드리겠습니다.</span>
                    </div>
                    <button type="button" onClick={()=>{history.replace('/uservice')}} className="btn_ok">확인</button>
                </div>
            </div>
        </div>
    );
}
