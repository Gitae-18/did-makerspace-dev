import React from 'react';
import '../../css/common.css';
import '../../css/style.css';

export default function ({ history }) {
    return (
        <div id="wrap" className='wrap utilize3'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_ok.png" alt="img" />
                        <p>상담신청이 되었습니다.</p>
                        {/* <span><strong className="num">2020년 4월 30일 13시 13분</strong>에 방문해 주시기 바랍니다.</span> */}
                    </div>
                    <button type="button" onClick={()=>{history.replace('/uservice')}} className="btn_ok">확인</button>
                </div>
            </div>
        </div>
    );
}
