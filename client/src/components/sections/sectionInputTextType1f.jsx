import React from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";

export default function SectionInputTextType1f() {
  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
      <div className="title_wrap">
        <TitleType1 title="FAQ"></TitleType1>
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">제목</label>
          <input
            type="text"
            name="text01"
            id="text01"
            placeholder="제목을 입력하세요."
          />
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text02">내용</label>
          <textarea
            name="text02"
            id="text02"
            cols="30"
            rows="6"
            placeholder="내용을 입력하세요."
          ></textarea>
        </li>
        <li>
          <label htmlFor="file01">파일#1</label>
          <input type="file" name="file01" id="file01" className="w_auto" />
        </li>
      </ul>
      <ButtonType2 btnName="추가"></ButtonType2>
    </section>
  );
}
