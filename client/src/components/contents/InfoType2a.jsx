import React,{useEffect,useState,useCallback} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import TitleType1 from "./TitleType1";
import { useSelector } from "react-redux";
import {GoBackBtn} from "./ButtonType2";
import ButtonType4 from "./ButtonType4";
import SectionTabType1a from "../sections/SectionTabType1a";
import styled from "styled-components";
import PopupModal2 from "../PopupModal2";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";

export default function InfoType2a() {
  const history = useNavigate();
  const [openModal,setOpenModal] = useState(false);
  const [closemodal,setCloseModal] = useState(false);
  const { token } = useSelector(state => state.user);
  let type = "class";
  let title = '메이커들을 위한 DID 라이브 쇼';


  const onApplicate = useCallback(async() =>{
    setOpenModal(true);

    CommonHeader.authorization = token;
    console.log(type);
    const response = await fetch(PreUri + '/classedu/class_application',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify(
        {
          type: type,
          title : title,
          flag: "Y",
        }
      )
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
  })     
  const onClose = () =>{
    setOpenModal(false);
  }
  return (
    <div className="info_type2">
      <div className="title_part">
        <div className="image_part"><img src="/images/class1.png" alt="no-images"/></div>
        <div className="info_part">
          <TitleType1 title={title}></TitleType1>
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
            <dl >
              <dt>정원</dt>
              <dd>100명</dd>
            </dl>
            <dl>
              <dt>비용</dt>
              <dd>무료</dd>
            </dl>
          </div>
          <div className="btns">
            <StyledBtn onClick={onApplicate}>신청하기</StyledBtn>
            {openModal && <PopupModal2 visible={openModal} closable={true} onclose={onClose}/>}
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