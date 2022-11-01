import React from "react";

export default function InputTypePw1(props) {
  return (
    <div className="input_wrap">
      <span>비밀번호</span>
      <input
        type="password"
        name="login_pw"
        id="login_pw"
        placeholder={
          props.pwHint ? "숫자,문자,특수문자를 포함하여 8~20자리" : "비밀번호"
        }
      />
    </div>
  );
}
export function InputTypePw2(props) {
  return (
    <div className="input_wrap">
      <span>패스워드</span>
      <input
        type="password"
        name="login_pw2"
        id="login_pw2"
        placeholder={
          props.pwHint ? "숫자,문자,특수문자를 포함하여 8~20자리" : "비밀번호"
        }
      />
    </div>
  );
}
export function InputTypePw3(props) {
  return (
    <div className="input_wrap">
      <span>패스워드 확인</span>
      <input type="password" name="login_pw3" id="login_pw3" />
    </div>
  );
}
