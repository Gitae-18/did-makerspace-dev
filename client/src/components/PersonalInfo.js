import React from 'react'
import $ from 'jquery';
import '../css/common-s.css';
import '../css/style-s.css';
import {TermsPolicy} from './Terms';
import {PrivacyPolicy} from './Privacy';


function reSizeWindow(heightMargin) {
	$(document).ready(function () {
		$('.content_wrap').css('min-height', $(window).height() - heightMargin);
		$(window).resize(function () {
			$('.content_wrap').css('min-height', $(window).height() - heightMargin);
		});
	});
}

export default function ({ onNext, onChangeCheckbox, value }) {
	reSizeWindow(186);

	return (
		<div id="wrap" className="wrap join1">
			<div className="content_wrap" stlye={{height:'1200px'}}>
				<div className="inner_wrap">
					<div className="box box1">
						<h2>이용약관</h2>

						<div className="term-bg-box">
							<div className="term-text">
								<TermsPolicy />
							</div>
						</div>

						<p className="chkBox"><label htmlFor="chk1">
							<input type="checkbox" id="chk1" checked={value.isAgreeTerms} name="isAgreeTerms" onChange={onChangeCheckbox} />
							<span className="checkmark"></span>[필수] 위 약관에 동의합니다.</label></p>
					</div>
					<div className="box box2">
						<h2>개인정보 수집 및 이용에 대한 안내</h2>

						<div className="term-bg-box">
							<div className="term-text">
								<PrivacyPolicy />
							</div>
						</div>
						<p className="chkBox"><label htmlFor="chk2">
							<input type="checkbox" id="chk2" checked={value.isAgreePersonalInfo} name="isAgreePersonalInfo" onChange={onChangeCheckbox} />
							<span className="checkmark"></span>[필수] 위와 같이 개인정보 수집 및 이용에 동의합니다.</label></p>
					</div>
					<button className="btn_next" onClick={onNext}>다음</button>
				</div>
			</div>
		</div>
	);
}
