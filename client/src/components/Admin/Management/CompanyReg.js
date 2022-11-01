import React, { useState, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector } from "react-redux";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function () {
	const { token } = useSelector(state => state.user);
	const [regItem, setRegItem] = useState({
		name: '',
		address: '',
		registrationNumber: '',
		phoneNumber: '',
	});
	const location = useLocation();
	const history = useNavigate();
	const onChange = useCallback((e) => {
		e.preventDefault();
		const re = /^[0-9\b]+$/;
		if (e.target.name === 'registrationNumber' || e.target.name === 'phoneNumber') {
			if (e.target.value !== '' && !re.test(e.target.value)) {
				return;
			}
		}

		setRegItem({
			...regItem,
			[e.target.name]: e.target.value
		});
	}, [regItem]);

	const onReg = useCallback(async (e) => {
		e.preventDefault();

		const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;
		if (!phoneRegex.test(regItem.phoneNumber)) {
			alert('잘못된 전화번호 입력입니다. 숫자, - 를 포함해 입력해 주세요.');
			return;
		}

		CommonHeader.authorization = token;
		const response = await fetch(PreUri + '/company', {
			method: Method.post,
			headers: CommonHeader,
			body: JSON.stringify({
				co_name: regItem.name,
				co_address: regItem.address,
				co_number: regItem.registrationNumber,
				co_telephone: regItem.phoneNumber,
			})
		});

		if (!response.ok) {
			console.log('response error');
			return;
		}

		history('/management',{replace:true});
	}, [regItem, token, history]);

	return (
		<div id="wrap" className="wrap management2">
			<div className="content_wrap">
				<SideNavi location={location} history={history} viewDepth={2} />
				<div className="content">
					<h2>기업 관리</h2>
					<div className="form">
						<h3>신규 등록</h3>
						<span>*필수입력</span>
						<table>
							<tbody>
								<tr>
									<th>*회사명</th>
									<td><input type="text" value={regItem.name} name="name" maxLength={45} onChange={onChange} /></td>
								</tr>
								<tr className="enter"></tr>
								<tr>
									<th>*소재지</th>
									<td><input type="text" value={regItem.address} name="address" maxLength={100} onChange={onChange} /></td>
								</tr>
								<tr className="enter"></tr>
								<tr>
									<th>*사업자등록번호</th>
									<td><input type="text" className="num" value={regItem.registrationNumber} name="registrationNumber" maxLength={10} onChange={onChange} /></td>
								</tr>
								<tr className="enter"></tr>
								<tr>
									<th>*전화번호</th>
									<td><input type="text" className="num" value={regItem.phoneNumber} name="phoneNumber" maxLength={20} onChange={onChange} /></td>
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
