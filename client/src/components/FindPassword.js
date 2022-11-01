import React, { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CommonHeader, PreUri, Method, getRspMsg, } from '../CommonCode';


import '../css/common-s.css';
import '../css/style-s.css';

export default function ({ history }) {
	const { token } = useSelector(state => state.user);
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		phone_number: '',
	});
	
	const onClick = useCallback(async (e) => {
		e.preventDefault();

        if (userData.email.length < 1 || userData.name.length < 1 || userData.phone_number.length < 1) {
            alert('필수입력 항목이 비어있습니다. ')
            return;
		}

		let emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
        if (!emailRegex.test(userData.email)) {
            alert('잘못된 이메일 형식입니다.');
            return;
		}

        const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;
        if (!phoneRegex.test(userData.phone_number)) {
            alert('전화번호 입력이 잘못 되었습니다. 숫자만 입력해 주세요.');
            return;
        }

        CommonHeader.authorization = token;
        let response = await fetch(PreUri + '/user/findpassword', {
            method: Method.post,
			headers: CommonHeader,
            body: JSON.stringify({
				name : userData.name,
				phone_number: userData.phone_number,
				email: userData.email
			})
        });

		if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
		}

		if (response.status === 204) {
			alert('입력한 정보의 사용자를 찾을 수 없습니다.');
			return;
		}

		alert('임시 비밀번호가 가입된 이메일로 발송되었습니다.');
		history.replace('/');
	}, [token, userData, history]);

	const onChange = useCallback(async (e) => {
		e.preventDefault();
		setUserData({
			...userData,
			[e.target.name] : e.target.value
		});
	}, [userData]);

	return (
		<div id="wrap" className="wrap myInfo2">
			<div className="content_wrap">
				<div className="inner_wrap">
					<h2>비밀번호 찾기</h2>
					<span>*필수입력</span>
					<div className="join_box">
						<table>
							<tbody>
								<tr>
									<th>*이름</th>
									<td><input type="text" name="name" value={userData.name} onChange={onChange} maxLength={20} /></td>
								</tr>
								<tr className="enter" />
								<tr>
									<th>*전화번호</th>
									<td><input type="text" name="phone_number" value={userData.phone_number} onChange={onChange} maxLength={20}
										placeholder="' - ' 부호없이 숫자만 입력해 주세요." /></td>
								</tr>
								<tr className="enter" />
								<tr>
									<th>*아이디 (가입 이메일)</th>
									<td><input type="text" name="email" value={userData.email} onChange={onChange} maxLength={80} 
										placeholder="가입한 이메일 주소를 입력해 주세요." /></td>
								</tr>
								<tr>
									<td colSpan="2">
										<p style={{ textAlign: "center", color: "black", paddingTop: "24px" }}>
											가입한 이메일 주소로 임시 비밀번호가 전송됩니다. 확인 후 변경해 주시기 바랍니다.</p>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="btn_box">
							{/* <button className="cancel" onClick={() => { history.go(-1) }} >뒤로가기</button> */}
							<button className="right" onClick={onClick}>확인</button>
						</div> 
					</div>
				</div>
			</div>
		</div>
	);
}
