import React from 'react'
import $ from 'jquery';
import '../css/common.css';
import '../css/style.css';

export default function () {
    $(document).ready(function () {
        $('.content_wrap').css('min-height', $(window).height() - 120);
        $(window).resize(function () {
            $('.content_wrap').css('min-height', $(window).height() - 120);
        });
    });

    return (
        <div id="wrap" className="wrap intro">
            <div className="content_wrap">
                <div className="text_box">
                    <p>Digital Factory in Daejeon</p>
                    <span>DID 기술융합공작소는 기업·창업자·메이커들에게 멘토링과 컨설팅을 지원하고,<br />메이킹 장비를 활용하여 창업과 사업화를 이룰 수 있도록<br />One-Stop 서비스를 제공하는 전문 메이커 스페이스입니다.</span>
                </div>
            </div>
        </div>
    );
}
