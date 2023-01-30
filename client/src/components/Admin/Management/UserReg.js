import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector } from "react-redux";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function () {
	const authLevelList = [{ name: "파트 담당자", level: 10 }, { name: '스케줄 관리자', level: 50 },
	{ name: '운영자', level: 70 }, { name: '최고관리자', level: 90 }];
	const mountedRef = useRef(true)
	const { token } = useSelector(state => state.user);
	const location = useLocation();
    const history = useNavigate();
	const [partnerItems, setPartnerItems] = useState({
		count: 0,
		items: [],
	});

	const [regItem, setRegItem] = useState({
		isCheckedEmail: false,
		email: '',
		password: '',
		passwordConfirm: '',
		name: '',
		phoneNumber: '',
		authLevelIndex: 0,
		companyIndex: 0,
	});

	const getPartnerList = useCallback(async () => {
		CommonHeader.authorization = token;
		const response = await fetch(PreUri + '/company/list/partner', {
			method: Method.get,
			headers: CommonHeader
		});

		if (!response.ok) {
			console.log('잘못된 접근입니다.');
			return;
		}

		const json = await response.json();
		if (!mountedRef.current) { return }
		setPartnerItems(partnerItems => ({
			...partnerItems,
			count: Number(json.count),
			items: json.items,
		}));
	}, [token]);

	useEffect(() => {
		if (!mountedRef.current) { return }
		getPartnerList();
		return () => {
			mountedRef.current = false
		}
	}, [getPartnerList])

	const onChange = useCallback((e) => {
		e.preventDefault();

		const re = /^[0-9\b]+$/;
		if (e.target.name === 'phoneNumber' &&
			e.target.value !== '' && !re.test(e.target.value)) {
			return;
		}

		setRegItem({
			...regItem,
			[e.target.name]: e.target.value
		})
	}, [regItem]);

	const onCheckEmail = useCallback(async (e) => {
		e.preventDefault();

		setRegItem({
			...regItem,
			isCheckedEmail: false
		})

		let emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
		if (!emailRegex.test(regItem.email)) {
			alert('잘못된 이메일 형식입니다.');
			return false;
		}

		CommonHeader.authorization = token;
		const response = await fetch(PreUri + '/user/checkId', {
			method: Method.post,
			body: JSON.stringify({
				"email": regItem.email,
			}),
			headers: CommonHeader,
		});

		if (!response.ok) {
			switch (response.status) {
				case 400: alert('잘못된 정보입니다.'); break;
				case 404: alert('페이지를 찾을 수 없습니다.'); break;
				case 500: alert('서버 문제'); break;
				default: alert('Unknown Error'); break;
			}
			return;
		}

		const json = await response.json();
		console.log(json.result);

		if (json.result === 'success') {
			setRegItem({
				...regItem,
				isCheckedEmail: true
			})
			alert('가입이 가능합니다');
		} else {
			alert('이미 사용중입니다');
		}
	}, [regItem, token]);

	const onReg = useCallback(async (e) => {
		e.preventDefault();
		if (partnerItems.count === 0) { return; }

		if (!regItem.email || !regItem.password || !regItem.passwordConfirm || !regItem.name || !regItem.phoneNumber) {
			alert('필수입력 항목이 비어있습니다. ')
			return;
		}

		if (regItem.isCheckedEmail === false) {
			alert('이메일 중복검사가 필요합니다.');
			return;
		}

		const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
		if (!passwordRegex.test(regItem.password)) {
			alert('숫자와 문자와 특수문자(!@#$%^&+=)를 포함한 8~20자리 이내로 입력해 주세요.');
			return;
		}

		if (regItem.password !== regItem.passwordConfirm) {
			alert('비밀번호 확인이 잘못되었습니다.');
			return;
		}

		const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;
		if (!phoneRegex.test(regItem.phoneNumber)) {
			alert('잘못된 전화번호 입력입니다. 숫자, - 를 포함해 입력해 주세요.');
			return;
		}

		CommonHeader.authorization = token;
		const response = await fetch(PreUri + '/user/join/partner', {
			method: Method.post,
			headers: CommonHeader,
			body: JSON.stringify({
				email: regItem.email,
				password: regItem.password,
				name: regItem.name,
				phone_number: regItem.phoneNumber,
				authority_level: authLevelList[regItem.authLevelIndex].level,
				company_no: partnerItems.items[regItem.companyIndex].company_no,
			})
		});

		if (!response.ok) {
			switch (response.status) {
				case 400: alert('이미 가입된 회원입니다.'); break;
				case 401: alert('인증되지 않았습니다.'); break;
				case 404: alert('페이지를 찾을 수 없습니다.'); break;
				case 406: alert('권환이 없습니다.'); break;
				case 500: alert('서버 문제'); break;
				default: alert('Unknown Error'); break;
			}
			return;
		}

		history('/management',{replace:true});
	}, [token, partnerItems, regItem, history, authLevelList]);

	let PartnerOptions = [];
	for (let i = 0; i < partnerItems.count; i++) {
		PartnerOptions.push(<option value={i} key={i}>{partnerItems.items[i].name}</option>);
	};

	let AuthLevelOptions = [];
	for (let i = 0; i < authLevelList.length; i++) {
		AuthLevelOptions.push(<option value={i} key={i}>{authLevelList[i].name}</option>);
	};

	return (
		<div id="wrap" className="wrap management5">
			<div className="content_wrap">
				<SideNavi location={location} history={history} viewDepth={2} />
				<div className="content">

					<div className="form">
						<h3>운영자/전문 상담사/파트 담당자 신규 등록</h3>
						<span>*필수입력</span>
						<table>
							<colgroup>
								<col width="18%" />
								<col width="82%" />
							</colgroup>
							<tbody>
								<tr>
									<th>*아이디(이메일 주소)</th>
									<td>
										<input type="text" className="eng" value={regItem.email} name="email" onChange={onChange} />
										<button className="btn_check" onClick={onCheckEmail}>중복확인</button>
									</td>
								</tr>
								<tr className="enter"></tr>
								<tr>
									<th>*비밀번호</th>
									<td><input type="password" value={regItem.password} name="password" onChange={onChange} /></td>
								</tr>
								<tr className="enter"></tr>
								<tr>
									<th>*비밀번호 확인</th>
									<td><input type="password" value={regItem.passwordConfirm} name="passwordConfirm" onChange={onChange} /></td>
								</tr>
							</tbody>
						</table>
						<p className="border"></p>
						<table>
							<colgroup>
								<col width="18%" />
								<col width="32%" />
								<col width="18%" />
								<col width="32%" />
							</colgroup>
							<tbody>
								<tr>
									<th>*고객명</th>
									<td><input type="text" value={regItem.name} name="name" onChange={onChange} /></td>
									<th>*등급</th>
									<td>
										<select value={regItem.authLevelIndex} name="authLevelIndex" onChange={onChange}>
											{AuthLevelOptions}
										</select>
									</td>
								</tr>
								<tr className="enter"></tr>
								<tr>
									<th>*전화번호</th>
									<td><input type="text" className="num" value={regItem.phoneNumber} name="phoneNumber" onChange={onChange} /></td>
									<th>*기업</th>
									<td>
										<select value={regItem.companyIndex} name="companyIndex" onChange={onChange}>
											{PartnerOptions}
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="btn_box">
						<button className="btn_cancel" onClick={() => { history(-1) }}>취소</button>
						<button className="btn_apply" onClick={onReg}>등록</button>
					</div>
				</div>
			</div>
		</div>
	);
}
