import React from "react";
import ButtonType3 from "../contents/ButtonType3";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore from'swiper';
import '../../css/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SlideSwiper1,{SlideSwiper3}from "../contents/SlideSwiper";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";



export default function SectionTextType1(props) {
 
  return (
    <section className="section_text_type1">
      <div className="section_inner_wrap">
        <div className="flex_wrap flex_wrap_type1">
     
          <div className="text_part">
            <TitleType1 title={props.title}></TitleType1>
            <SlideSwiper3/>
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