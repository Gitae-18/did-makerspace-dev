import React,{useState,useInterval,useRef} from "react";
import TitleType1 from "../contents/TitleType1";
import { SlideSwiper2 } from "../contents/SlideSwiper";

export default function SectionBannerType1(props) {
  const  [slideIndex,setSlideIndex] = useState(0);
  const  [customInterval, setCustomInterval] = useState(3000);
  const slideRef = useRef<HTMLDivElement>(null);

 /* useInterval(
    () => setSlideIndex((slideIndex) => slideIndex + 1),customInterval
  )
  if(slideIndex === 3){
    setSlideIndex(0);
  }
  if(slideIndex === 5) {
    if(slideRef.current){
      slideRef.current.style.transition = " ";
    }
  }
  setSlideIndex(1);
  setTimeout(() => {
    if (slideRef.current){
        slideRef.current.style.transition = "all 500ms ease-in-out";
    }
  
  },0);*/
  
  return (
    <section className="section_banner_type1">
      <div className="section_inner_wrap">
        <TitleType1 title={props.title}></TitleType1>
        <SlideSwiper2></SlideSwiper2>
      </div>
    </section>
  );
}
