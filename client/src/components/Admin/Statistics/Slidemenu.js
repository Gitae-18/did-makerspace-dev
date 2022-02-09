import React from 'react';
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import "../../../css/common-s.css";
import '../../../css/style-s.css';
import '../../../css/swiper-bundle.min.css';
import Sidebar from './Sidebar';






SwiperCore.use([Navigation, Pagination]);


class Slidemenu extends React.Component {
	componentDidMount() {
	}

	constructor(props) {
		super(props);

	}


	render() {
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
				<div id="wrap" class="wrap statistics statistics1">

					<div className="content_wrap">
						<Sidebar className="side_menu" />
						<div className="content">

							<h2><img src="images/logo2.png" alt="no" /> 통계/분석</h2>

							<div className="main_banner">

								<div className="left slick-initialized slick-slider slick-dotted">
									<div className='slick-list draggable'>
										<div className='slick-track' >
											<Slider {...settings}>
												<div className='slick-slide slick-current slick-active' id="slick-slide00" aria-describedby='slick-slide-control00' >
													<ul>
														<li><span>사용자 수('22)</span><span class="dashed"></span><span>227명</span></li>
														<li><span>서비스 총 이용('22)</span><span class="dashed"></span><span>1000명</span></li>
														<li><span>서비스 제품화('22)</span><span class="dashed"></span><span>95.5%</span></li>
													</ul>
												</div>
												<div className='slick-slide ' id="slick-slide01" aria-describedby='slick-slide-control01'>
													<ul>
														<li><span>사용자 수('22)</span><span class="dashed"></span><span>3000명</span></li>
														<li><span>서비스 총 이용('22)</span><span class="dashed"></span><span>1000명</span></li>
														<li><span>서비스 제품화('22)</span><span class="dashed"></span><span>95.5%</span></li>
													</ul>
												</div>
												<div className='slick-slide ' id="slick-slide02" aria-describedby='slick-slide-control02'>
													<ul>
														<li><span>사용자 수('22)</span><span class="dashed"></span><span>3000명</span></li>
														<li><span>서비스 총 이용('22)</span><span class="dashed"></span><span>1000명</span></li>
														<li><span>서비스 제품화('22)</span><span class="dashed"></span><span>95.5%</span></li>
													</ul>
												</div>
											</Slider>



										</div>
									</div>

								</div>

								<div className="right">
									<Swiper
										style={{ height: "220px" }}
										spacebetween={30}
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
															<li><span>기자재</span><strong>100 EA</strong></li>
															<li><span>생산가능</span><strong>60.0%</strong></li>
														</ul>
													</div>
												</SwiperSlide>
												<SwiperSlide className='Swiperslide' style={{ height: "230px" }}>
													<div className="swiper-slide" role="group" aria-label=' 3/ 3'>
														<p><span>사용자</span></p>
														<ul>
															<li><span>상담</span><strong>1,500 건</strong></li>
															<li><span>진행</span><strong>80.0 %</strong></li>
															<li><span>완료</span><strong>70.0 %</strong></li>
														</ul>
													</div>
												</SwiperSlide>
											</div>

										</div>
									</Swiper>
								</div>

							</div>
							<div class="company">
								<div>
									<h3>기업 개요</h3>
									<select>
										<option>(주) 디엠비</option>
										<option></option>
										<option></option>
									</select>
									<div class="info">
										<p><strong>시제품 의뢰 담당</strong><span>50건</span></p>
										<p><strong>소재지</strong><span>인천 서구 건지로 121번길 33-12</span></p>
										<p><strong>대표 담당자</strong><span>디엠비</span></p>
										<p><strong>주요 지원분야</strong><span>CNC가공</span></p>
										<p><strong>등록일</strong><span>2020-10-07</span></p>
									</div>
								</div>
								<div>
									<h4>서비스 항목</h4>
									<p>CNC가공(3D)</p>
									<p>CNC가공(2D)</p>
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
}
export default Slidemenu;
