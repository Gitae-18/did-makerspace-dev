import React from "react";
import ButtonType1 from "../contents/ButtonType1";
import CheckboxType1 from "../contents/CheckboxType1";
import ScrBoxType1 from "../contents/ScrBoxType1";

export default function PageSignUp01() {
  return (
    <div id="pageSignUp" className="wrap2">
      <div>
        <h2>이용약관</h2>
        <ScrBoxType1
          innerTitle="DID기술융합공작소 약관확인 및 동의내용"
          innerText1='본 약관은 홈페이지 통합에 있어서 DID기술융합공작소 ("http://didmakerspace.kr/")에 가입되었지만 시제품제작지원(https://didmakerspace.net/)에는 가입되지 않은 사용자분들께 해당 약관 및 관련 운영정책에 대한 동의를 통하여 새로 통합페이지의 회원가입을 하게됩니다. 단, 기존 DID기술융합공작소에 남아있던 사용자의 사용정보와 계정정보는 삭제되오니 이 점 양해 부탁드립니다. 여러분이 쉽게 알 수 있도록 약관 및 운영정책을 게시하며 사전 공지 후 개정합니다.당사는 수시로 본 약관, 계정 및 게시물 운영정책을 개정할 수 있습니다만, 관련 법령을 위배하지 않는 범위 내에서 개정할 것이며, 사전에 그 개정 이유와 적용 일자를 서비스 내에 알리도록 하겠습니다.'
          innerText2='본 약관은 한국어를 정본으로 합니다. 본 약관 또는 홈페이지 서비스와 관련된 여러분과 당사와의 관계에는 대한민국의 법령이 적용됩니다. 그리고 본 약관 또는 홈페이지 서비스와 관련하여 여러분과 당사 사이에 분쟁이 발생할 경우, 그 분쟁의 처리는 대한민국 "민사소송법"에서 정한 절차를 따릅니다.'
        ></ScrBoxType1>
        <CheckboxType1 num="01"></CheckboxType1>
      </div>
      <div>
        <h2>홈페이지 이용관련 안내</h2>
        <ScrBoxType1
          innerTitle="기존 DID기술융합공작소 이용자 정보 삭제 및 DID기술융합공작소 통합사이트 개인정보 수집에 대한 동의 내용"
          innerText1="이용약관 텍스트 123"
        ></ScrBoxType1>
        <CheckboxType1 num="01"></CheckboxType1>
      </div>
      <ButtonType1 btnName="다음"></ButtonType1>
    </div>
  );
}
