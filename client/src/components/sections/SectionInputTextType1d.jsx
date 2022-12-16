import React,{useState,useEffect} from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";
import styled from "styled-components";

export default function SectionInputTextType1d() {
  const [input,setInput] = useState({
    className: '',
    location: '',
    sdate: '',
    edate: '',
    fnum: '',
    cost: '',
    map: '',
    popup: '',
  })

  const onChangeInput = (e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })
  }

  return (
    <section className="section_input_text_type1 section_input_text_type1d">
      <div className="title_wrap">
        <TitleType1 title="교육 프로그램 등록"></TitleType1>
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">교육명</label>
          <input
            type="text"
            name="text01"
            id="text01"
            placeholder="입력하세요."
          />
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text02">내용</label>
          <textarea
            name="text02"
            id="text02"
            cols="30"
            rows="6"
            placeholder="입력하세요."
          ></textarea>
        </li>
        <li>
          <label htmlFor="select01">유/무료</label>
          <select name="select01" id="select01">
            <option value="0">유료</option>
            <option value="1">무료</option>
          </select>
        </li>
        <li className="input_date_wrap">
          <label htmlFor="date01_1">교육기간</label>
          <input type="date" name="date01_1" id="date01_1" />
          <span>~</span>
          <input type="date" name="date01_2" id="date01_2" />
        </li>
        <li>
          <label htmlFor="text03">장소</label>
          <input
            type="text"
            name="text03"
            id="text03"
            placeholder="입력하세요."
          />
        </li>
        <li className="input_date_wrap">
          <label htmlFor="date02_1">접수기간</label>
          <input type="date" name="date02_1" id="date02_1" />
          <span>~</span>
          <input type="date" name="date02_2" id="date02_2" />
        </li>
        <li className="input_number_wrap">
          <label htmlFor="number01">정원</label>
          <input
            type="number"
            name="number01"
            id="number01"
            placeholder="00"
            className="w_auto"
          />
          <span>명</span>
        </li>
        <li className="input_number_wrap">
          <label htmlFor="number02">비용</label>
          <input
            type="number"
            name="number02"
            id="number02"
            placeholder="00"
            className="w_auto"
          />
          <span>원</span>
        </li>
        <li>
          <label htmlFor="text04">지도 URL</label>
          <input type="text" name="text04" id="text04" />
        </li>
        <li>
          <label htmlFor="file01">파일#1</label>
          <input type="file" name="file01" id="file01" className="w_auto" />
        </li>
        <li>
          <label htmlFor="checkbox01">팝업등록</label>
          <input
            type="checkbox"
            name="checkbox01"
            id="checkbox01"
            className="input_checkbox w_auto"
          />
        </li>
      </ul>
    
        <StyledBtn className="apply">등록</StyledBtn>
        <StyledGrayBtn className='cancel'>취소</StyledGrayBtn>
     
    </section>
  );
}

const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledGrayBtn= styled.button`
color:#fff;
background-color:#7f7f7f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `