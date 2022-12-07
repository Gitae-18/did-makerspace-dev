import React from "react";
import { useNavigate } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";

export default function SectionInputTextType1g() {
  const history = useNavigate();
  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
      <div className="title_wrap">
        <TitleType1 title="FAQ"></TitleType1>
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">제목</label>
          <span>운영시간은 어떻게 되나요?</span>
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text02">내용</label>
          <textarea
            readOnly
            name="text02"
            id="text02"
            cols="50"
            rows="6"
          ></textarea>
        </li>
        <li>
          <label htmlFor="file01">파일#1</label>
          <input type="file" name="file01" id="file01" className="w_auto" />
        </li>
      </ul>
      <StyledBtn onClick={()=>history(-1)}>목록</StyledBtn>
    </section>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:40px;
font-size:0.8rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`