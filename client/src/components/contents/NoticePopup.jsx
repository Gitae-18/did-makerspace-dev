import React from "react";
import ButtonType1 from "./ButtonType1";

export default function NoticePopup() {
  return (
    // 아래의 className에 closed를 추가하면 해당 팝업이 보임
    <div className="notice_popup_wrap closed">
      <div className="notice_inner">
        <h1>안내사항</h1>
        <p>
          DID기술융합공작소를 찾아주셔서 감사합니다.
          <br />
          <br />
          저희 DID기술융합공작소의 기존 웹사이트와 서비스 제작지원 사이트가
          기술적 통합을 하게 되어 안내사항을 전달 하게 되었습니다. 사용자분들 중
          현재 서비스 제작 지원 사이트에 회원가입이 되어있는 분들은 계정을
          그대로 사용하실 수 있습니다. 그러나 기존 홈페이지에만 가입되어있던
          분들은 약관 동의를 통하여 새로 통합 사이트 회원가입을 해야 서비스를
          이용하실 수 있습니다. 번거로우시겠지만 서비스 제작 지원 사이트에
          회원가입이 되어 있지 않던 사용자들께서는 새로 통합사이트 회원가입을
          진행하여 주시기 부탁드립니다.
        </p>
        <ButtonType1 btnName="통합로그인"></ButtonType1>
        <div className="btns_pop_up">
          <div className="btn_close_day">오늘 하루동안 보지 않기</div>
          <div className="btn_close">닫기</div>
        </div>
      </div>
    </div>
  );
}
