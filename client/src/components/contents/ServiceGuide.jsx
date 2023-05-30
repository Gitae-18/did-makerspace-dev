import React from "react";
import { GoBackBtn } from "./ButtonType2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function MServiceGuide({authority}) {
  const history = useNavigate();
    return (
      <div className="guide" style={{"justifyItems":"center","justifyContent":"center"}}>
         <img src="/images/servicehelp.png" alt="no-image"/>
         <StyledBtn onClick={()=>{authority>10?history('/mservice'):history('/uservice')}}>시제품제작</StyledBtn>
      </div>
    );
  };

  const StyledBtn= styled.button`
  color:#fff;
  background-color:#313f4f;
  width:120px;
  height:30px;
  font-size:0.7rem;
  cursor:pointer;
  border:1px solide #313f4f;
  position:relative;
  top:100px;
  display:inline-block;
  text-align:center;
  right:320px;
   `