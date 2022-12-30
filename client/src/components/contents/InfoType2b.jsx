import React,{useEffect,useState,useCallback}from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import TitleType1 from "./TitleType1";
import ButtonType2,{GoBackBtn}from "./ButtonType2";
import ButtonType4 from "./ButtonType4";
import SectionTabType1a from "../sections/SectionTabType1a";
import styled from "styled-components";
import PopupModal2 from "../PopupModal2";
import SubSideMenu from "./SubSideMenu";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import { useMemo } from "react";
import { COUNT_INCREASE } from "../../store/action";
export default function InfoType2b() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [openModal,setOpenModal] = useState(false);
  const [closemodal,setCloseModal] = useState(false);
  const [getFlag,setGetFlag] = useState([]);
  const [count,setCount] = useState(true);
  const { token } = useSelector(state => state.user);
  let type = "edu";
  let title = '마파벌 원목 트레이 만들기';
  
  const getEduList = useCallback(async()=>{
    CommonHeader.authorization = token;
    const tit = 0;
    let requri = PreUri + '/classedu/class_receive?title=' + tit;

    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }

    const json = await response.json();
    console.log(json);
    setGetFlag(json);
  },[token])

  useEffect(()=>{
    getEduList();
  },[getEduList,token])
  let  button_click = document.getElementById('button_id');


  const onApplicate = useCallback(async() =>{
    setOpenModal(true);
   
    dispatch({ type: COUNT_INCREASE, target: count });
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/classedu/class_application',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify(
        {
          type: type,
          title : title,
          flag : 'Y',
        }
      )
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
  })     
 /*  const memo = useMemo(()=>{
    return onApplicate();
  }) */
  if(getFlag.length > 6){
    alert("정원이 초과되었습니다");
    button_click.disabled = true;
  }
  const onClose = () =>{
    setOpenModal(false);
  }
  return (
    <div id="sub_page_wrap">
    <SubSideMenu title={"교육프로그램"}></SubSideMenu>
    <div className="sub_page_inner_wrap">
      <div className="sub_inner">
    <div className="info_type2">
      <div className="title_part">
        <div className="image_part"><img className="woodtray" src="/images/woodtray.png" alt="no-image"/></div>
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
            <StyledBtn id="button_id" onClick={onApplicate}>신청하기</StyledBtn>
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
    </div>
    </div>
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