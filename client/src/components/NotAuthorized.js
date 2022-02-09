import React from 'react';

import '../css/common.css';
import '../css/style.css';

export default function () {

    return (
        <div id="wrap" className="wrap join4">
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_alert.png" alt="alear" />
                        <p>접근 권한이 없습니다.</p>
                    </div>
                    <div className="btn_box">
                        <a href="/" className="btn_join">홈으로</a>
                        {/* <a href="/join" className="btn_join">회원가입</a> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
