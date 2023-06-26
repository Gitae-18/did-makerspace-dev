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
    const { isLoggedIn } = useSelector(state => state.user);
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
        <form onSubmit={onLoginStart} style={{marginLeft:'134px'}}>
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
    const length = username.length;
    return (
        <Form onSubmit={onLogout} length={length} authority_level={authority_level}>
            
		<div className="member_box">
			<span style={length===2?{marginLeft:'39px'}:length===3?{marginLeft:'26px'}:length===4?{marginLeft:'15px'}:length===5?{marginLeft:"12px"}:length===6?{marginLeft:"2px"}:{marginLeft:"1px"}}><strong>{username}</strong> 님</span>
			<span className="my_info"><Link to="/myinfo">내 정보</Link></span>
        <button className="logout" type="submit" onClick={()=>onLogoutClick()}>로그아웃</button>
        </div>
        </Form>
    );
}

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
const Form = styled.form`
position:relative;
left:${(props) => (props.length===6? "3px" : props.length===5?"6px":props.length===4?"15px":props.length===3?'16px':'17px')} !important;
margin-left:${(props)=>(props.authority_level<10?"267px !important":"0px")}
`