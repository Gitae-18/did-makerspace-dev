import React from "react";
import ButtonType3 from "../contents/ButtonType3";
import SlideSwiper1 from "../contents/SlideSwiper";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
export default function SectionTextType1(props) {
  return (
    <section className="section_text_type1">
      <div className="section_inner_wrap">
        <div className="flex_wrap flex_wrap_type1">
          <div className="text_part">
            <TitleType1 title={props.title}></TitleType1>
            <Hline>{props.subTitle}</Hline>
            <Ptag>"DID기술융합공작소의 주요 서비스                         
              (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
            <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다."</Ptag>
           
          </div>
          <div className="swiper_part">
            <SlideSwiper1></SlideSwiper1>
          </div>
        </div>
      </div>
    </section>
  );
}
const Ptag = styled.p`
font-size:0.8rem;
`
const Hline = styled.h4`
font-size:0.9rem;
`