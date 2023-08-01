import React,{useCallback,useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router";
import { PreUri,CommonHeader,Method} from "../../CommonCode";
import ButtonType1 from "./ButtonType1";
import { BsListUl } from "react-icons/bs";
import TitleType1 from "./TitleType1";
import styled from "styled-components";
export default function InfoTypeSpace() {
  const location = useLocation();
  const history = useNavigate();
  const [info,setInfo] = useState([]);
  const no = location.state.no;

  let src,src2;
  let introduce;
  const getspaceInfo = useCallback(async()=>{
    let requri = PreUri + '/space/' + no + '/detail';
    const response = await fetch(requri, {
      method:Method.get,
      headers:CommonHeader
    });
    
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setInfo(json);
  },[no])
  useEffect(()=>{
    getspaceInfo();
  },[getspaceInfo])
  const onBackpage = () =>{
    history(-1);
  }
  const Desc1 = () => {
    return <p className="subtitle">{info.space_info}</p>;
  };
  const DescImage = () => {
    return (
      <div className="images_wrap" style={info.src2!==null&&info.src2!==undefined?{height:"800px"}:{height:'500px'}}>
        <div className="images">
        <div id="image2" className="image_part1"><img className="img1" src={'/images/'+info.src} alt="no-image"/></div>
        {info.src2!==null&&info.src2!==undefined?<div id='images' className="image_part2"><img className="img2" src={'/images/'+info.src2} alt="no-image"/></div>:null}
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
            <dt style={{width:"20%"}}>{info.space_name}</dt>
            <dd style={{"whiteSpace":"pre-wrap",textIndent:'10px'}}>{info.space_info}</dd>
          </dl>
        </dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap" >
        <DescImage></DescImage>
        <Desc2></Desc2>
      </div>
    );
  };
  return (
    <div className="info_type1">
      <div className="info_inner_wrap">
        <TitleType1 title={info.space_name}></TitleType1>
        <InfoDescWrap></InfoDescWrap>
      </div>
      <StyledBtn onClick={(e) => history(-1)}>
          <BsListUl />
          목록
        </StyledBtn>
    </div>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
position:relative;
left:45%;
margin-top:50px;
margin-bottom:50px;
cursor:pointer;
border:1px solide #313f4f;
 `