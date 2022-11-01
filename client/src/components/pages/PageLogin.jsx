import React from "react";
import InputTypeText1 from "../contents/InputTypeText1";
import InputTypePw1 from "../contents/InputTypePw1";
import ButtonType1 from "../contents/ButtonType1";
import ButtonType2 from "../contents/ButtonType2";

export default function PageLogin() {
  return (
    <div id="pageLogin" className="wrap2">
      <div className="login_wrap_inner shadow_box">
        <div className="login_top">
          <div className="logo_wrap">
            <img src="./images/logo.png" alt="DID 기술융합공작소 로고" />
          </div>
          <div>DID기술융합공작소 통합페이지 가입여부 확인</div>
        </div>
        <div className="login_form">
          <div className="form_inner_wrap">
            <InputTypeText1 title="아이디" name="id"></InputTypeText1>
            <InputTypePw1></InputTypePw1>
          </div>
          <ButtonType1 btnName="로그인"></ButtonType1>
        </div>
        <div className="btns_find">
          <ButtonType2 btnName="아이디 찾기"></ButtonType2>
          <ButtonType2 btnName="비밀번호 찾기"></ButtonType2>
        </div>
      </div>
    </div>
  );
}
