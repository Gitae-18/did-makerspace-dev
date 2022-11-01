import React from "react";
import ButtonType2 from "../contents/ButtonType2";

export default function SectionReportType1a() {
  return (
    <section className="section_input_text_type1 section_report_type1">
      <div className="title_wrap"></div>
      <ul className="text_wrap">
        <li>
          <dl>
            <dt>멘토</dt>
            <dd>멘토입니다.</dd>
          </dl>
        </li>
        <li>
          <label htmlFor="text01">멘토링 제목</label>
          <input
            type="text"
            name="text01"
            id="text01"
            placeholder="입력하세요."
          />
        </li>
        <li>
          <dl>
            <dt>멘티</dt>
            <dd>멘티입니다.</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>기간</dt>
            <dd>기간입니다.</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>회차</dt>
            <dd>3회</dd>
          </dl>
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text08">진행 내용</label>
          <textarea
            name="text08"
            id="text08"
            rows="5"
            placeholder="입력하세요."
          ></textarea>
        </li>
        <li>
          <label htmlFor="text11">첨부파일</label>
          <input type="file" name="text11" id="text11" />
        </li>
      </ul>
      <div className="btns">
        <ButtonType2 btnName="확인"></ButtonType2>
      </div>
    </section>
  );
}
