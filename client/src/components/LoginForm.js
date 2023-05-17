import React,{useState,useEffect,memo} from 'react';
import { Link, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LoginModal from './LoginModal';
//import { BrowserRouter, Route, Link as RouterLink} from 'react-router-dom';
//import { CommonHeader, PreUri, Method } from '../CommonCode';
//import { useDispatch, useSelector } from 'react-redux'

import '../css/common-s.css';
import '../css/style-s.css'; 

  function LoginForm ({onLoginStart, onChange, userId, password, isAutoLogin}){
    const history = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };
    const onLoginClick = () =>{
        history(1);
    }   
    return (
        <form onSubmit={onLoginStart}>
        
            <div className='join_box'>
            <Link className="join" to="/join">회원가입</Link>
            <Link className="find_pw" to="/findpw">비밀번호 찾기</Link>
            </div>
            <div className="login_button">
                <LoginButton className="log_on" onClick={openModal}>로그인하기</LoginButton>
        
                {modalOpen && <LoginModal open={modalOpen} close={closeModal} change={onChange} userid={userId} password={password} isAutoLogin={isAutoLogin} onLoginClick={onLoginClick}/>}
            </div>
        </form>
    );
}
export default React.memo(LoginForm)
export function LoggedInForm({onLogout, username}) {
    const { token, authority_level } = useSelector(state => state.user);
    //let alarmOn = (false) ? "name on" : "name off";
    
   // const[alarm,setAlarm] = useState(false);
	//const showAlarm = () => setAlarm(!alarm);
   // const [show,setShow] = useState(false);
    //const showList = () => setShow(!show);
    const history = useNavigate();
    const onLogoutClick = () =>{
        history('/');
    }
    return (
        <form onSubmit={onLogout}>
            
		<div className="member_box" style={authority_level<10&&username.length>3?{"left":"321px"}:authority_level<10?{"left":"311px"}:username.length>3?{"left":"2px"}:{}}>
			<span ><strong>{username}</strong> 님</span>
			<span className="my_info"><Link to="/myinfo">내 정보</Link></span>
        <button className="logout" type="submit" onClick={()=>onLogoutClick()}>로그아웃</button>
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
const LoginButton = styled.button`
 width:120px;
 height:8vh;
 background-color:#313f4f;
 color:#ffffff;
 font-size:0.8rem;
`
const SnsMap = styled.div`
width:100px;
height:auto;
display:flex;
position:absolute;
left:160px;
`
const Imgtag = styled.img`
  width: 25px;
  height: 15px;
  position:relative;
  padding:0px;
  bottom:0px;
`;