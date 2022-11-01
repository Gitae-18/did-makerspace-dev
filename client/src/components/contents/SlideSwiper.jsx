import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore from'swiper';
import { Navigation, Pagination, A11y ,Autoplay} from "swiper";
import '../../css/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
SwiperCore.use([Navigation,Pagination,Autoplay])
export default function SlideSwiper1() {
  return (
    <div className="swiper_wrap swiper_type1">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination]}
        autoplay={{delay:2500,disableOnInteraction:false}}
      >
        <SwiperSlide><img src="/images/reservation.jpg"/></SwiperSlide>
        <SwiperSlide><img src="/images/reservation2.jpg"/></SwiperSlide>
        <SwiperSlide><img src="/images/service.jpg"/></SwiperSlide>
        <SwiperSlide><img src="/images/service2.jpg"/></SwiperSlide>
        <SwiperSlide><img src="/images/mentoring.jpg"/></SwiperSlide>
        <SwiperSlide><img src="/images/mentoring2.jpg"/></SwiperSlide>
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
        autoplay={{delay:2500}}
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
