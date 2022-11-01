import React from "react";
import ButtonType3 from "../contents/ButtonType3";
import SlideSwiper1 from "../contents/SlideSwiper";
import TitleType1 from "../contents/TitleType1";

export default function SectionTextType1(props) {
  return (
    <section className="section_text_type1">
      <div className="section_inner_wrap">
        <div className="flex_wrap flex_wrap_type1">
          <div className="text_part">
            <TitleType1 title={props.title}></TitleType1>
            <h4>{props.subTitle}</h4>
            <p>{props.desc}</p>
            <ButtonType3></ButtonType3>
          </div>
          <div className="swiper_part">
            <SlideSwiper1></SlideSwiper1>
          </div>
        </div>
      </div>
    </section>
  );
}
