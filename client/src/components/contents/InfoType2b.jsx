import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import TitleType1 from "./TitleType1";
import ButtonType2,{GoBackBtn}from "./ButtonType2";
import ButtonType4 from "./ButtonType4";
import SectionTabType1a from "../sections/SectionTabType1a";
import styled from "styled-components";
export default function InfoType2b() {
  const history = useNavigate();
  const onClick = () => {
    history('/notcomplete')
  }
  return (
    <div className="info_type2">
      <div className="title_part">
        <div className="image_part"><img className="woodtray" src="/images/woodtray.png" alt="no-image"/></div>
        <div className="info_part">
          <TitleType1 title="마파벌 원목 트레이 만들기"></TitleType1>
          <div className="dl_wrap">
            <dl>
              <dt>일시</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>장소</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>점수 및 등록 기간</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>신청 가능 여부</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>정원</dt>
              <dd>7명</dd>
            </dl>
            <dl>
              <dt>비용</dt>
              <dd>25,000원</dd>
            </dl>
          </div>
          <div className="btns">
            <StyledBtn onClick={onClick}>신청하기</StyledBtn>
            <ButtonType4></ButtonType4>
          </div>
        </div>
      </div>
      <div className="desc_part">
        <SectionTabType1a></SectionTabType1a>
      </div>
      <GoBackBtn btnName="목록"></GoBackBtn>
    </div>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:40px;
font-size:0.8rem;
cursor:pointer;
position:relative;
bottom:5px;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `