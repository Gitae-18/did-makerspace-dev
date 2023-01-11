import React,{useState}from "react";
import ButtonType3 from "../contents/ButtonType3";
import { Swiper,SwiperSlide} from "swiper/react/swiper-react";
import SwiperCore from'swiper';
import  { Autoplay, Navigation, Pagination, Controller, EffectFade, A11y } from 'swiper'; 
import '../../css/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SlideSwiper1,{SlideSwiper3}from "../contents/SlideSwiper";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
SwiperCore.use([Navigation,Pagination,Autoplay,Controller])

export default function SectionTextType1(props) {
  const { token, authority_level } = useSelector(state => state.user);
  const [text,setText] = useState('');
  const [controlledSwiper,setControlledSwiper] = useState(null);
  const onChange = (e) =>{
    setText(e.target.value);
  }
  return (
    <section className="section_text_type1">
      <div className="section_inner_wrap">
        <div className="flex_wrap flex_wrap_type1">
     
          

          <div className="swiper_part">
          <div className="swiper_wrap swiper_type1">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination][Controller]}
        controller ={{control:controlledSwiper}}
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
          </div>
          <div className="text_part">
            <TitleType1 title={props.title}></TitleType1>
            <div className="swiper_wrap swiper_type3">
         <Swiper
         navigation={false}
         modules={[Controller]}
         onSwiper = {setControlledSwiper}
        >
    <SwiperSlide value={0}>
        <Hline>장비 및 시설예약</Hline>
        <Ptag>DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다.
          DID기술융합공작소에서는 시제품 제작을 위한 3D프린터와 플로터,UV프린터 등의
          장비를 예약하여 사용할 수 있으며 예약정보를 확인 하실 수 있습니다.
        </Ptag>
        <Ptag> 장비 예약은 해당장비의 시험을 치룬 뒤 통과여부를 판단하여 예약을 진행 
          하실 수 있게 됩니다. 예약 후 취소가 불가하니 신중하게 예약하시기 바랍니다.
        </Ptag>
        <Ptag> 
              공간 예약과 전문랩 투어 예약은 각 공간별 설명을 읽어보신 후 오프라인 (전화,이메일)으로 담당자에게 직접
              문의 후 예약이 가능하십니다.
        </Ptag>
       
      </SwiperSlide>
      <SwiperSlide value={1}>
        <Hline>장비 및 시설예약</Hline>
        <Ptag>DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다.
          DID기술융합공작소에서는 시제품 제작을 위한 3D프린터와 플로터,UV프린터 등의
          장비를 예약하여 사용할 수 있으며 예약정보를 확인 하실 수 있습니다.
        </Ptag>
        <Ptag> 장비 예약은 해당장비의 시험을 치룬 뒤 통과여부를 판단하여 예약을 진행 
          하실 수 있게 됩니다. 예약 후 취소가 불가하니 신중하게 예약하시기 바랍니다.
        </Ptag>
        <Ptag> 
              공간 예약과 전문랩 투어 예약은 각 공간별 설명을 읽어보신 후 오프라인 (전화,이메일)으로 담당자에게 직접
              문의 후 예약이 가능하십니다. 
        </Ptag>
        </SwiperSlide>
    < SwiperSlide value={2}>
        <Hline>시제품 제작 신청</Hline> 
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다." 
          시제품 제작신청 메뉴에서는 제작하고 싶은 시제품의 분류를 정하고 시제품을 제작시 필요한 내용을 
          작성하여 신청하실 수 있습니다. 신청하신 시제품은 수정이 가능하며 삭제는 불가능합니다.
          시제품 제작이 완료되면 해당 목록에 대한 보고서가 작성되어집니다.
        </Ptag>
        <Ptag> 시제품 제작시에는 상담 신청과 제작 신청으로 스텝이 나뉘게 되며 
              처음 이용하시는 분들께서는 상담 신청부터 진행하시는 것을 추천드립니다.</Ptag>

      </SwiperSlide>
    <SwiperSlide value={3}>
    <Hline>시제품 제작 신청</Hline> 
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 최신 업데이트 내용을 확인하실 수 있습니다." 
          시제품 제작신청 메뉴에서는 제작하고 싶은 시제품의 분류를 정하고 시제품을 제작시 필요한 내용을 
          작성하여 신청하실 수 있습니다. 신청하신 시제품은 수정이 가능하며 삭제는 불가능합니다.
          시제품 제작이 완료되면 해당 목록에 대한 보고서가 작성되어집니다.
        </Ptag>
        <Ptag> 시제품 제작시에는 상담 신청과 제작 신청으로 스텝이 나뉘게 되며 
              처음 이용하시는 분들께서는 상담 신청부터 진행하시는 것을 추천드립니다.
              </Ptag>
       </SwiperSlide>
    <SwiperSlide value={4}>
        <Hline>멘토링 신청</Hline>
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 멘토링 메뉴에서는 멘토링을 받고 싶은 멘토를 선정하고 분야를 선정하여 멘토에게 멘토링을 받으실 수 있습니다.
               멘토링은 총 5회까지 추가진행이 가능하며 멘토링 후에는 보고서가 작성되어집니다.
        </Ptag>
        <Ptag> 전문 멘토를 희망하시는 분은 전문멘토 신청메뉴를 통하여 전문멘토가 되실 수 있습니다.</Ptag>
       </SwiperSlide>
    <SwiperSlide value={5}>
        <Hline>멘토링 신청</Hline>
        <Ptag>"DID기술융합공작소의 주요 서비스                         
          (장비 및 시설예약, 시제품 제작, 멘토링)로 이동할 수 있고,</Ptag>
        <Ptag> 멘토링 메뉴에서는 멘토링을 받고 싶은 멘토를 선정하고 분야를 선정하여 멘토에게 멘토링을 받으실 수 있습니다.
               멘토링은 총 5회까지 추가진행이 가능하며 멘토링 후에는 보고서가 작성되어집니다.
        </Ptag>
        <Ptag> 전문 멘토를 희망하시는 분은 전문멘토 신청메뉴를 통하여 전문멘토가 되실 수 있습니다.</Ptag>
       </SwiperSlide>
    </Swiper>
  </div>
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