import React, { useState, useCallback } from 'react'
import DaumPostcode from 'react-daum-postcode';

import '../css/common-s.css';
import '../css/style-s.css';

export default function JoinForm({ onJoinTry, onCheckEmail, onCompletePostcode, onInputChange, onChangeCheckbox, value }) {

	const [hiddenUserPostcode, setHiddenUserPostcode] = useState(true);
	const [hiddenCompanyPostcode, setHiddenCompanyPostcode] = useState(true);

	const userComplete = useCallback((data) => {
		onCompletePostcode(true, data);
		setHiddenUserPostcode(true);
	}, [onCompletePostcode]);

	const companyComplete = useCallback((data) => {
		onCompletePostcode(false, data);
		setHiddenCompanyPostcode(true);
	}, [onCompletePostcode]);

	function UserPostcode() {
		return (hiddenUserPostcode) ? (<></>) : (<DaumPostcode onComplete={userComplete} width="100%" height="444px" />);
	}

	function CompanyPostcode() {
		return (hiddenCompanyPostcode) ? (<></>) : (<DaumPostcode onComplete={companyComplete} width="100%" height="444px" />);
	}

	return (
		<div id="wrap" className="wrap join2">
			<div className="content_wrap">
				<div className="inner_wrap">
					<h2>회원가입</h2>
					<span>*필수입력</span>
					<form onSubmit={onJoinTry}>
						<div className="join_box">
							<table>
								<tbody>
									<tr>
										<th>*아이디 (이메일 주소)</th>
										<td>
											<input type="text" className="short" maxLength={80} value={value.user.email} name="user.email"
												placeholder="아이디 (이메일 주소)" onChange={onInputChange} />
											<button type="button" onClick={onCheckEmail}>중복체크</button>
										</td>
									</tr>
									<tr className="enter" />
									<tr>
										<th>*비밀번호</th>
										<td><input type="password" className="middle" maxLength={20} value={value.user.password} name="user.password" 
											placeholder="숫자,문자,특수문자(!@#$%^&+=)를 포함해 8~20자리입니다." onChange={onInputChange} /></td>
									</tr>
									<tr className="enter" />
									<tr>
										<th>*비밀번호 확인</th>
										<td><input type="password" className="middle" maxLength={20} value={value.user.passwordConfirm} name="user.passwordConfirm"
											onChange={onInputChange} /></td>
									</tr>
								</tbody>
							</table>
							<h3>개인정보</h3>
							<table>
								<tbody>
									<tr>
										<th>*고객명</th>
										<td><input type="text" className="middle" maxLength={20} value={value.user.name} name="user.name" onChange={onInputChange} /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>*전화번호</th>
										<td><input type="text" className="short" maxLength={20} value={value.user.phoneNumber} name="user.phoneNumber"
											placeholder="' - ' 부호없이 숫자만 입력해 주세요." onChange={onInputChange} /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>직급</th>
										<td><input type="text" className="short" maxLength={20} value={value.user.position} name="user.position" onChange={onInputChange} /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>*우편번호</th>
										<td>
											<input type="text" className="short" maxLength={6} value={value.user.zip} name="user.zip" disabled />
											<button type="button" onClick={() => setHiddenUserPostcode(false)}>우편번호 검색</button>
										</td>
									</tr>
									<tr hidden={hiddenUserPostcode}>
										<th></th>
										<td className="close">
											<button type="button" className="close_btn" onClick={() => setHiddenUserPostcode(true)}> </button>
										</td>
									</tr>
									<tr hidden={hiddenUserPostcode}>
										<th></th>
										<td className="postcode">
											<UserPostcode />
										</td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>*주소</th>
										<td><input type="text" className="middle" maxLength={100} value={value.user.address} name="user.address" disabled  /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>주소상세</th>
										<td><input type="text" maxLength={50} value={value.user.addressDetail} name="user.addressDetail" onChange={onInputChange} /></td>
									</tr>
								</tbody>
							</table>
							<h3>회사정보<p className="chkBox">
								<label htmlFor="chk3">
									<input type="checkbox" id="chk3" checked={value.isAddCompanyInfo} name="isAddCompanyInfo" onChange={onChangeCheckbox} />
									<span className="checkmark"></span>
								</label>
							</p></h3>
							<table>
								<tbody>
									<tr>
										<th>*회사명</th>
										<td><input type="text" className="middle" disabled={!value.isAddCompanyInfo} maxLength={45} value={value.company.name} name="company.name" onChange={onInputChange} /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>*사업자등록번호</th>
										<td><input type="text" className="short" disabled={!value.isAddCompanyInfo} maxLength={10} value={value.company.registrationNumber} name="company.registrationNumber"
											placeholder="' - ' 부호없이 숫자만 입력해 주세요." onChange={onInputChange} /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>전화번호</th>
										<td><input type="text" className="short" disabled={!value.isAddCompanyInfo} maxLength={20} value={value.company.phoneNumber} name="company.phoneNumber"
											placeholder="' - ' 부호없이 숫자만 입력해 주세요." onChange={onInputChange} /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>*주요 사업분야</th>
										<td><input type="text" className="middle" disabled={!value.isAddCompanyInfo} maxLength={45} value={value.company.businessField} name="company.businessField" onChange={onInputChange} /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>우편번호</th>
										<td>
											<input type="text" className="short" maxLength={6} value={value.company.zip} name="company.zip" disabled />
											<button type="button" onClick={() => setHiddenCompanyPostcode(false)}>우편번호 검색</button>
										</td>
									</tr>
									<tr hidden={hiddenCompanyPostcode}>
										<th></th>
										<td className="close">
											<button type="button" className="close_btn" onClick={() => setHiddenCompanyPostcode(true)}> </button>
										</td>
									</tr>
									<tr hidden={hiddenCompanyPostcode}>
										<th></th>
										<td className="postcode">
											<CompanyPostcode />
										</td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>주소</th>
										<td><input type="text" className="middle" maxLength={100} value={value.company.address} name="company.address" disabled /></td>
									</tr>
									<tr className="enter"></tr>
									<tr>
										<th>주소상세</th>
										<td><input type="text" maxLength={50} disabled={!value.isAddCompanyInfo} value={value.company.addressDetail} name="company.addressDetail" onChange={onInputChange} /></td>
									</tr>
								</tbody>
							</table>
						</div>
						<button type="submit" className="btn_join" >회원가입</button>
					</form>
				</div>
			</div>
		</div >
	);
}