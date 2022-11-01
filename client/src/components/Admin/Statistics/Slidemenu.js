import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import "../../../css/chart/chart-style.css";
import "../../../css/chart/chart-common.css"
import '../../../css/swiper-bundle.min.css';
import Sidebar from './Sidebar';
import { DataList } from './DataList'
import create from 'zustand'
const useStore = create((set)=>({
	count : 0,
	increase(){
		set((state)=>({count:state.count+1}))
	}
}))
SwiperCore.use([Navigation, Pagination]);


function Slidemenu() {

	const [data, setData] = useState([]);
	const [select, setSelect] = useState("");
	const handleChange = (e) => {
		setSelect(e.target.value);

	}
	const {count} = useStore();
	


	if (!data) return null;
	const settings = {
		centerMode: true,
		dots: true,
		infinite: true,
		slidesToshow: 1,
		slidesToScroll: 1,
		arrows: false,
	}


	return (
		<body>
			<div id="wrap" className="wrap statistics statistics1">

				<div className="content_wrap">

					<Sidebar className="side_menu" />

					<div className="content">

						<div className="logo_box">
							<div className="logo"/>
							<h2 className="title"> 메이커 스페이스</h2>
						</div>

						<div className="main_banner">

							<div className="left slick-initialized slick-slider slick-dotted">
								<div className='slick-list draggable'>
									<div className='slick-track' >
										<Slider {...settings}>
											<div className='slick-slide slick-current slick-active' id="slick-slide00" aria-describedby='slick-slide-control00' >
												<ul>
													<li><span>사용자 수('22)</span><span className="dashed"></span><span>227명</span></li>
													<li><span>서비스 총 이용('22)</span><span className="dashed"></span><span>1000명</span></li>
													<li><span>서비스 제품화('22)</span><span className="dashed"></span><span>85.0%</span></li>
												</ul>
											</div>
											<div className='slick-slide ' id="slick-slide01" aria-describedby='slick-slide-control01'>
												<ul>
													<li><span>기자재 수('22)</span><span className="dashed"></span><span>100개</span></li>
													<li><span>자재 종류('22)</span><span className="dashed"></span><span>500종</span></li>
													<li><span>제품 생산가능('22)</span><span className="dashed"></span><span>60.0%</span></li>
												</ul>
											</div>
											<div className='slick-slide ' id="slick-slide02" aria-describedby='slick-slide-control02'>
												<ul>
													<li><span>사용자 수('22)</span><span className="dashed"></span><span>1000명</span></li>
													<li><span>사용자 가입률('22)</span><span className="dashed"></span><span>80.0%</span></li>
												</ul>
											</div>
										</Slider>



									</div>
								</div>

							</div>

							<div className="right">
								<Swiper
									style={{ height: "220px" }}
									spaceBetween={30}
									slidesPerView='auto'
									navigation
									pagination={{ "type": "progressbar" }}
								>


									<div className="swiper mySwiper ">
										<div className="swiper-wrapper" id="swiper-wrapper-2152f458af9d755f" aria-live='polite'>

											<SwiperSlide className='Swiperslide' style={{ height: "230px" }}>
												<div className="swiper-slide swiper-slide-active" role="group" aria-label='1 / 3' >

													<p><span>서비스</span></p>
													<ul>
														<li><span>상담</span><strong>1,500 건</strong></li>
														<li><span>진행</span><strong>80.0 %</strong></li>
														<li><span>완료</span><strong>70.0 %</strong></li>
													</ul>

												</div>
											</SwiperSlide>
											<SwiperSlide className='Swiperslide' style={{ height: "230px" }}>
												<div className="swiper-slide swiper-slide-next" role="group" aria-label='2 / 3'>
													<p><span>기자재</span></p>
													<ul>
														<li><span>자재</span><strong>150 EA</strong></li>
														<li><span>기자재</span><strong>500 EA</strong></li>
														<li><span>생산가능</span><strong>60.0%</strong></li>
													</ul>
												</div>
											</SwiperSlide>
											<SwiperSlide className='Swiperslide' style={{ height: "230px" }}>
												<div className="swiper-slide" role="group" aria-label=' 3/ 3'>
													<p><span>사용자</span></p>
													<ul>
														<li><span>총인원</span><strong>1000 명</strong></li>
														<li><span>가입인원</span><strong>600  명 </strong></li>
														<li><span>가입률</span><strong>60.0 %</strong></li>
													</ul>
												</div>
											</SwiperSlide>
										</div>

									</div>
								</Swiper>
							</div>

						</div>
						<div className="company">
							<div className="company_option">
								<h3>기업 개요</h3>
								<select onChange={handleChange}>
									<option value="(주)디엠비">(주)디엠비</option>
									<option value="아이피하트">아이피하트</option>
									<option value="따뜻한메이커연구소">따뜻한메이커연구소</option>
									<option value="(주)새온">(주)새온</option>
									<option value="라이프트리">라이프트리</option>
									<option value="이노플러스">이노플러스</option>
									<option value="한국전자통신연구원">한국전자통신연구원</option>
								</select>

								{DataList.map((item, index) => {
									return (
										<div className='info' key={index}>
											<p><strong>{item.value}</strong><span>{select === "한국전자통신연구원" ? item.a : (select === "아이피하트" ? item.b : (select === "따뜻한메이커연구소" ? item.c : (select === "(주)새온" ? item.d : (select === "라이프트리" ? item.e : (select === "이노플러스" ? item.f : item.g)))))}</span></p>
										</div>
									)
								})}
							</div>
						</div>

					</div>
				</div>

				<script type='text/javascript' src="../js/slick.min.js"></script>
				<Helmet>
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" type="text/javascript"></script>
				</Helmet>
			</div>

		</body>

	);
}
export default Slidemenu;
