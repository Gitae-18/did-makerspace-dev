import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ButtonType1 from "./ButtonType1";
import { PreUri, CommonHeader, Method } from "../../CommonCode";
import TitleType1 from "./TitleType1";
import { BsListUl } from "react-icons/bs";
import styled from "styled-components";
export default function InfoType1a() {
  const history = useNavigate();
  const location = useLocation();
  const eqno = location.state.no;
  const headpath = "/images/equipment";
  const [imagesrc, setImagesrc] = useState("");
  const [info, setInfo] = useState([]);
  const getequipInfo = useCallback(async () => {
    let requri = PreUri + "/equipment/" + eqno + "/detail";
    const response = await fetch(requri, {
      method: Method.get,
      headers: CommonHeader,
    });

    if (!response.ok) {
      console.log("잘못된 접근입니다.");
      return;
    }
    const json = await response.json();
    setInfo(json);
    setImagesrc(json.src);
  }, [eqno]);
  useEffect(() => {
    getequipInfo();
  }, [getequipInfo]);
  console.log(info)
  const Desc1 = () => {
    return <p>{info.model_detail}</p>;
  };
  const DescImage = () => {
    return (
      <div className="images_wrap" style={{height:"500px"}}>
        <div className="image_part">
          <StyledImg src={headpath + imagesrc} alt="no-image" />
        </div>
      </div>
    );
  };
  const Desc2 = () => {
    return (
      <dl className="dl_wrap">
        <dt>상세 설명</dt>
        <dd>
          <dl>
            <dt>Model Name</dt>
            <dd>{info.model_name}</dd>
          </dl>
          <dl>
            <dt>Model Detail</dt>
            <dd>{info.model_detail}</dd>
          </dl>
          <dl>
            <dt>Model Specification</dt>
            <dd>{info.model_specification}</dd>
          </dl>
        </dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <Desc1></Desc1>
        <DescImage></DescImage>
        <Desc2></Desc2>
      </div>
    );
  };
  return (
    <div className="info_type1">
      <div className="info_inner_wrap">
        <TitleType1 title={info.model_name}></TitleType1>
        <InfoDescWrap></InfoDescWrap>
        <StyledBtn onClick={(e) => history(-1)}>
          <BsListUl />
          목록
        </StyledBtn>
      </div>
    </div>
  );
}
const StyledBtn = styled.button`
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
 `;
const StyledImg = styled.img`
  width: 450px;
  height: 400px;
  cursor: pointer;
  position: relative;
  left: 70px;
`;
