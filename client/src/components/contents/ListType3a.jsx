import React from "react";
import ButtonType2 from "../contents/ButtonType2";
import TitleType1 from "./TitleType1";

export default function ListType3a() {
  const Desc1 = () => {
    return (
      <div>
        <TitleType1 title="신청자 정보"></TitleType1>
        <ol>
          <li>
            <dl>
              <dt>이름</dt>
              <dd>홍길동</dd>
              <dt>나이</dt>
              <dd>32</dd>
              <dt>생년월일</dt>
              <dd>1993.02.10</dd>
              <dt>주소</dt>
              <dd>경기도 수원시</dd>
              <dt>소속</dt>
              <dd>투브플러스</dd>
              <dt>전공</dt>
              <dd>프론트엔드</dd>
              <dt>연락처</dt>
              <dd>010-9256-1438</dd>
              <dt>전문분야</dt>
              <dd>프론트엔드</dd>
              <dt>이메일</dt>
              <dd>kdh@toobplus.com</dd>
              <dt></dt>
              <dd></dd>
            </dl>
          </li>
        </ol>
      </div>
    );
  };
  const Desc2 = () => {
    return (
      <div>
        <TitleType1 title="프로젝트"></TitleType1>
        <div className="project_wrap">
          <p>이전 대형프로젝트 혹은 작품설명</p>
        </div>
      </div>
    );
  };
  return (
    <div className="table_wrap list_type3">
      <Desc1></Desc1>
      <Desc2></Desc2>
      <div className="btns">
        <ButtonType2 btnName="승인"></ButtonType2>
        <ButtonType2 btnName="반려" bgc="gray"></ButtonType2>
      </div>
    </div>
  );
}
