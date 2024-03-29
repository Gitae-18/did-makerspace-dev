import React from "react";
import {GoBackBtn} from "../contents/ButtonType2";
import TitleType1 from "../contents/TitleType1";
import {useNavigate} from "react-router-dom";
export default function SectionTextType2a() {
 // const history = useNavigate();
  
  return (
    <section className="section_text_type2">
      <ul className="text_wrap">
        <li>
          <dl>
            <dt>
              <TitleType1 title="신청명"></TitleType1>
            </dt>
            <dd>신청명이 출력됩니다.</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <TitleType1 title="신청자 정보"></TitleType1>
            </dt>
            <dd>
              <dl>
                <dt>이름</dt>
                <dd>김길동</dd>
                <dt>직책</dt>
                <dd>연구원</dd>
                <dt>부서</dt>
                <dd>개발팀</dd>
                <dt>휴대폰</dt>
                <dd>010-1234-5678</dd>
                <dt>전화번호</dt>
                <dd>02-1234-5678</dd>
                <dt>이메일</dt>
                <dd>gildong@naver.com</dd>
              </dl>
            </dd>
          </dl>
        </li>
        <br/>
        <li>
          <dl>
            <dt>
              <TitleType1 title="신청분야"></TitleType1>
            </dt>
            <dd>신청분야가 출력됩니다.</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <TitleType1 title="세부내용"></TitleType1>
            </dt>
            <dd>세부내용이 출력됩니다.</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <TitleType1 title="기타 요청사항"></TitleType1>
            </dt>
            <dd>기타 요청사항이 출력됩니다.</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <TitleType1 title="희망 진행 방식"></TitleType1>
            </dt>
            <dd>온라인 코멘트 방식</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <TitleType1 title="매칭 희망 전문멘토"></TitleType1>
            </dt>
            <dd>
              <span>홍길동</span>멘토
            </dd>
          </dl>
        </li>
      </ul>
      <div className="btns">
        <GoBackBtn btnName="확인"></GoBackBtn>
      </div>
    </section>
  );
}
