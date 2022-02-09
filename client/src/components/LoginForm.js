import React,{useState} from 'react';
import { Link} from 'react-router-dom';
//import { BrowserRouter, Route, Link as RouterLink} from 'react-router-dom';
//import { CommonHeader, PreUri, Method } from '../CommonCode';
//import { useDispatch, useSelector } from 'react-redux'

import '../css/common.css';
import '../css/style.css'; 
import '../css/common-s.css';
import '../css/style-s.css'; 
import { FaToggleOn } from 'react-icons/fa';

export function LoginForm({onLoginStart, onChange, userId, password, isAutoLogin}) {
   
    return (
        <form onSubmit={onLoginStart}>
		<div className="login_box">
            <Link className="join" to="/join">회원가입</Link>
            <Link className="find_pw" to="/findpw">비밀번호 찾기</Link>
            <p className="id"><span/><input type="text" value={userId} name="userId" placeholder="아이디" onChange={onChange} /></p>
            <p className="pw"><span/><input type="password" value={password} name="password" placeholder="비밀번호" onChange={onChange} /></p>
			<p className="chkBox"><label htmlFor="chk"><input type="checkbox" id="chk" checked={isAutoLogin} name="isAutoLogin" onChange={onChange}/><span className="checkmark"></span>자동로그인</label></p>
            <button className="login" type="submit">로그인</button>
		</div>
        </form>
    );
}

export function LoggedInForm({onLogout, username}) {
    let alarmOn = (false) ? "name on" : "name off";
    
    const[alarm,setAlarm] = useState(false);
	const showAlarm = () => setAlarm(!alarm);
    const [show,setShow] = useState(false);
    const showList = () => setShow(!show);

    return (
        <form onSubmit={onLogout}>
            
		<div className="member_box"alarm={alarm} onClick={showAlarm}>
			<span className="alarm on" onClick={showList}>
            
            </span>
			<span className={alarmOn}><strong>{username}</strong> 님</span>
			<span className="my_info"><Link to="/myinfo">내 정보</Link></span>
            <button className="logout" type="submit">로그아웃</button>
            <div className={show ?"alarm_list on":"alarm_list off"} >
            <p>알림</p>
				    <ul>
					    <li><span className="time">New!</span><span class="txt">새로운 멘토 신청</span><a href="#">이동하기</a></li>
					    <li><span className="time">1시간 전</span><span class="txt">멘토 신청</span><a href="#">이동하기</a></li>
					    <li><span className="time">어제</span><span class="txt">멘토 신청</span><a href="#">이동하기</a></li>
				    </ul>
            </div>
		
        </div>
        </form>
    );
}

/*
export default function LoginForm(user) {
    const [form, setValues] = useState({
        userId: '',
        password: '',
    });

    const [keepLogin, setKeepLogin] = useState(false);

    const loginTry = useCallback (async (e) => {
        e.preventDefault();
        console.log("aa");

        if (form.userId.length <= 0) {
            alert('아이디를 입력해 주세요.');
            return;
        }

        if (form.password.length <= 0) {
            alert('패스워드를 입력해 주세요.');
            return;
        }

        const response = await fetch(PreUri + '/user/login', {
            method: Method.post,
            body: JSON.stringify({
                "user_id": form.userId,
                "password": form.password
            }),
            headers: CommonHeader
        });

        if (!response.ok) {

            switch (response.status) {
                case 400: alert('사용자 정보가 잘못되었습니다.'); break;
                case 404: alert('페이지를 찾을 수 없습니다.'); break;
                case 500: alert('서버 문제'); break;
                default: alert('Unknown Error'); break;
            }
            return;
        }

        const json = await response.json();
        console.log(json);
    }, []);

    const updateField = useCallback ((e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    }, []);
     
    // const BeforeLoginForm = () => (
    //     <form onSubmit={loginTry}>
    //         <input value={form.userId} name="userId" placeholder="아이디" onChange={updateField} /> //         <input value={form.password} name="password" type="password" placeholder="패스워드" onChange={updateField} /> //         <input value={keepLogin} name="keepLogin" type="checkbox" onChange={() => setKeepLogin(!keepLogin)} />
    //         <label>자동 로그인</label>
    //         <button type="submit" >로그인</button>
    //     </form>
    // );

    // const AfterLoginForm = () => (
    //     <form onSubmit={logout}>
    //         <a>{user.name}</a>
    //         <button type="submit" >로그아웃</button>
    //     </form>
    // );

    // //console.log('islogin ', user.isLogind);
    // const CurrentForm = (true) ? BeforeLoginForm : AfterLoginForm;

    return (
        <form onSubmit={loginTry}>
            <input value={form.userId} name="userId" placeholder="아이디" onChange={updateField} />
            <input value={form.password} name="password" type="password" placeholder="패스워드" onChange={updateField} />
            <input value={keepLogin} name="keepLogin" type="checkbox" onChange={() => setKeepLogin(!keepLogin)} />
            <label>자동 로그인</label>
            <button type="submit" >로그인</button>
        </form>
    );
}
*/
