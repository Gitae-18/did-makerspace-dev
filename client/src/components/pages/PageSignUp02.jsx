import React from "react";
import ButtonType1 from "../contents/ButtonType1";
import { InputTypePw2, InputTypePw3 } from "../contents/InputTypePw1";
import InputTypeTel from "../contents/InputTypeTel";
import {  InputTypeText1Check}
 from "../contents/InputTypeText1";
import  InputTypeText1  from "../contents/InputTypeText1";

export default function PageSignUp02() {
  return (
    <div id="pageSignUp" className="wrap2">
      <div>
        <h2>회원가입</h2>
        <div className="wrap2 input_wrap_type1">
          <InputTypeText1Check
            title="아이디"
            name="id"
            placeholder="아이디(이메일 주소)"
            checkBtnName="중복체크"
          ></InputTypeText1Check>
          <InputTypePw2 pwHint="on"></InputTypePw2>
          <InputTypePw3></InputTypePw3>
        </div>
      </div>
      <div>
        <h2>개인정보</h2>
        <div className="wrap2 input_wrap_type1">
          <InputTypeText1
            title="이름"
            name="name"
            placeholder=" "
          ></InputTypeText1>
          <InputTypeTel></InputTypeTel>
          <InputTypeText1Check
            title="주소"
            name="address"
            placeholder=" "
            checkBtnName="우편번호 검색"
          ></InputTypeText1Check>
          <InputTypeText1
            title="상세주소"
            name="address_2"
            placeholder=" "
          ></InputTypeText1>
        </div>
      </div>
      <ButtonType1 btnName="회원가입"></ButtonType1>
    </div>
  );
}
