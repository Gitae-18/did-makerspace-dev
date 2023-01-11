import React,{useState}from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { useSelector } from "react-redux";
import SwiperCore, { Controller } from'swiper';
import { NavLink } from "react-router-dom";
import { Navigation, Pagination, A11y ,Autoplay} from "swiper";
import '../../css/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styled from "styled-components";
SwiperCore.use([Navigation,Pagination,Autoplay])

export default function SlideSwiper1() {
  const { token, authority_level } = useSelector(state => state.user);
  const [text,setText] = useState('');
  const onChange = (e) =>{
    setText(e.target.value);
  }
  console.log(text);
  return (
    <div className="swiper_wrap swiper_type1">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination][Controller]}
        autoplay={{delay:2400,disableOnInteraction:false}}
      >
        <SwiperSlide value={0} onChange={onChange}><NavLink to="didreservation"><img src="/images/reservation.jpg"/></NavLink></SwiperSlide>
        <SwiperSlide value={1}><NavLink to="didreservation"><img src="/images/reservation2.jpg"/></NavLink></SwiperSlide>
        <SwiperSlide value={2}><NavLink to={authority_level<10?'uservice':'mservice'}><img src="/images/service.jpg"/></NavLink></SwiperSlide>
        <SwiperSlide value={3}><NavLink to={authority_level<10?'uservice':'mservice'}><img src="/images/service2.jpg"/></NavLink></SwiperSlide>
        <SwiperSlide value={4}><NavLink to={authority_level<10?'umentoring':'mentoring'}><img src="/images/mentoring.jpg"/></NavLink></SwiperSlide>
        <SwiperSlide value={5}><NavLink to={authority_level<10?'umentoring':'mentoring'}><img src="/images/mentoring2.jpg"/></NavLink></SwiperSlide>
      </Swiper>
    </div>
  );
}

export function SlideSwiper2() {
  return (
    <div className="swiper_wrap swiper_type2">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={6}
        slidesPerView={5}
        autoplay={{delay:3500}}
        loop = {[false]}
      >
        <SwiperSlide><img src="/images/banner_01.png"/></SwiperSlide>
        <SwiperSlide><img src="/images/banner_02.png"/></SwiperSlide>
        <SwiperSlide><img src="/images/banner_03.png"/></SwiperSlide>
        <SwiperSlide><img src="/images/banner_04.png"/></SwiperSlide>
        <SwiperSlide><img src="/images/banner_05.png"/></SwiperSlide>
        <SwiperSlide><img src="/images/banner_06.png"/></SwiperSlide>
      </Swiper>
    </div>
  );
}
export function SlideSwiper3(){
  return(
    <div className="swiper_wrap swiper_type3">
      <Swiper
        navigation={false}
        modules={[Controller]}
        autoplay={{delay:2500,disableOnInteraction:false}}
      >
    <SwiperSlide value={0}>
        <Hline>장비 및 시설예약</Hline>
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다."</Ptag></SwiperSlide>
    <SwiperSlide value={1}>
        <Hline>장비 및 시설예약</Hline>
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다."</Ptag></SwiperSlide>
    <SwiperSlide value={2}>
        <Hline>시제품 제작 신청</Hline> 
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다."</Ptag></SwiperSlide>
    <SwiperSlide value={3}>
        <Hline>시제품 제작 신청</Hline>
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다."</Ptag></SwiperSlide>
    <SwiperSlide value={4}>
        <Hline>멘토링 신청</Hline>
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다."</Ptag></SwiperSlide>
    <SwiperSlide value={5}>
        <Hline>멘토링 신청</Hline>
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다."</Ptag></SwiperSlide>
    </Swiper>
  </div>
)
}
const Ptag = styled.p`
font-size:0.8rem;
`
const Hline = styled.h4`
font-size:0.9rem;
`