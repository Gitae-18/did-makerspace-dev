import React from 'react';

import '../css/common-s.css';
import '../css/style-s.css';

export default function () {

    return (
        <div id="wrap" className="wrap join4">
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_alert.png" alt="alear" />
                        <p>회원가입이 필요합니다.</p>
                    </div>
                    <div className="btn_box">
                        <a href="/" className="btn_home">홈으로</a>
                        <a href="/join" className="btn_join">회원가입</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
