import React from "react";
import ButtonType1 from "../contents/ButtonType1";

export default function PageLoginError() {
  return (
    <div id="pageLoginError" className="wrap2">
      <div className="login_wrap_inner shadow_box">
        <div className="login_top">
          <div className="logo_wrap">
            <img src="./images/logo.png" alt="DID 기술융합공작소 로고" />
          </div>
          <div>DID기술융합공작소 통합페이지 가입여부 확인</div>
        </div>
        <div className="login_error_message">
          <h2>일치하는 아이디가 없습니다.</h2>
          <p>통합회원가입을 새로 해주시기 바랍니다.</p>
          <ButtonType1 btnName="이전"></ButtonType1>
        </div>
      </div>
    </div>
  );
}
