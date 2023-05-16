import React,{useState} from "react";
import styled from "styled-components";
const ModalSend = ({onSendResult,onCloseModal,score,flag}) =>{
    return(
    <div className="notice_popup_wrap open">
      <div className="notice_inner">
        <h1>안내사항</h1>
        {flag==='Y'? <p>
        통과하셨습니다! 점수는 : {score} 점입니다.
        </p>:<p>통과하지 못하셨습니다. 점수는 : {score} 점입니다.</p>
        }
        <p>*확인을 누르시면 목록으로 돌아가게 됩니다.</p>
        <div className="btns_pop_up">
          <div className="btn_close_day" onClick={onSendResult}>확인</div>
          <div className="btn_close" onClick={onCloseModal}>닫기</div>
        </div>
      </div>
    </div>
    )
}
export default ModalSend;

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