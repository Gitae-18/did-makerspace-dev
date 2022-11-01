import React from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";

export default function SectionInputTextType1a() {
  return (
    <section className="section_input_text_type1">
      <div className="title_wrap">
        <TitleType1 title="신청자 정보"></TitleType1>
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">고객명</label>
          <input
            type="text"
            name="text01"
            id="text01"
            placeholder="입력하세요."
          />
          <label htmlFor="text02">이메일</label>
          <input
            type="email"
            name="text02"
            id="text02"
            placeholder="입력하세요."
          />
        </li>
        <li>
          <label htmlFor="text03">전화번호</label>
          <input
            type="tel"
            name="text03"
            id="text03"
            placeholder="입력하세요."
          />
          <label htmlFor="text04">회사명</label>
          <input
            type="text"
            name="text04"
            id="text04"
            placeholder="입력하세요."
          />
        </li>
        <li>
          <label htmlFor="text05">신청제목</label>
          <input
            type="text"
            name="text05"
            id="text05"
            placeholder="입력하세요."
          />
          <label htmlFor="text06">신청일</label>
          <input type="date" name="text06" id="text06" />
        </li>
        <li>
          <label htmlFor="text07">시제품명</label>
          <input
            type="text"
            name="text07"
            id="text07"
            placeholder="입력하세요."
          />
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text08">제품개념 및 신청내용</label>
          <textarea
            name="text08"
            id="text08"
            cols="30"
            rows="10"
            placeholder="입력하세요."
          ></textarea>
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text09">사업화 계획</label>
          <textarea
            name="text09"
            id="text09"
            cols="30"
            rows="10"
            placeholder="입력하세요."
          ></textarea>
        </li>
        <li>
          <label htmlFor="text10">기타지원 요구사항</label>
          <input
            type="text"
            name="text10"
            id="text10"
            placeholder="입력하세요."
          />
        </li>
        <li>
          <label htmlFor="text11">첨부파일</label>
          <input type="file" name="text11" id="text11" />
        </li>
        <li>
          <label htmlFor="text12">관리자메모</label>
          <input
            type="text"
            name="text12"
            id="text12"
            placeholder="입력하세요."
          />
        </li>
        <li>
          <label htmlFor="text13">산정평가 요청</label>
          <input
            type="text"
            name="text13"
            id="text13"
            placeholder="입력하세요."
          />
        </li>
      </ul>
      <div className="btns">
        <ButtonType2 btnName="수락"></ButtonType2>
        <ButtonType2 btnName="반려" bgc="gray"></ButtonType2>
      </div>
    </section>
  );
}
