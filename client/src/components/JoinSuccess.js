import React from 'react';

import '../css/common-s.css';
import '../css/style-s.css';

export default function () {

    return (
        <div id="wrap" className="wrap join3">
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_ok.png" alt="Join Success" />
                        <p>회원가입이 <strong>완료</strong>되었습니다.</p>
                    </div>
                    <div className="btn_box">
                        <a href="/" className="btn_home">홈으로</a>
                        <a href="/" className="btn_login">로그인</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
