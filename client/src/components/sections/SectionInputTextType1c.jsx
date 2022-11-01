import React from "react";
import ButtonType2 from "../contents/ButtonType2";

export default function SectionInputTextType1c() {
  return (
    <section className="section_input_text_type1 section_input_text_type1b">
      <div className="title_wrap">
        <h2>신규 공간 등록</h2>
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">No</label>
          <input
            type="text"
            name="text01"
            id="text01"
            placeholder="입력하세요."
          />
        </li>
        <li>
          <label htmlFor="text05">구분</label>
          <input
            type="text"
            name="text05"
            id="text05"
            placeholder="입력하세요."
          />
        </li>
        <li>
          <label htmlFor="text07">장소명</label>
          <input
            type="text"
            name="text07"
            id="text07"
            placeholder="입력하세요."
          />
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text08">설명</label>
          <textarea
            name="text08"
            id="text08"
            cols="30"
            rows="10"
            placeholder="입력하세요."
          ></textarea>
        </li>
        <li>
          <label htmlFor="image1">이미지</label>
          <input type="file" name="image1" id="image1" />
        </li>
      </ul>
      <ButtonType2 btnName="등록"></ButtonType2>
    </section>
  );
}
