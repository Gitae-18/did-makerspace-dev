import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/LoginModal.css';
import { FiLogIn } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
const LoginModal = (props) =>{
    const history = useNavigate();
    const onLoginClick = () =>{
        history(1);
    }
 const {open, close , header, change,userid,password,isAutoLogin} = props;

 return(
    <div className={open ? 'openModal modalsh' : 'modals'}>
     
    { open ? 
    <section>
    <div className="login_box">
    <div className="image_part"><img src="/images/logo.png"></img></div>
    <div className="title_part"><span>DID 로그인</span></div>
    <div className="id_pw">
    <p className="id"><span/><input type="text" value= { userid } name="userId" placeholder="아이디" onChange={change} /></p><div></div>
    <p className="pw"><span/><input type="password" value={password} name="password" placeholder="비밀번호" onChange={change} /></p>
    </div>
    <p className="chkBox"><label htmlFor="chk"><input type="checkbox" id="chk" checked={isAutoLogin} name="isAutoLogin" onChange={change}/><span className="checkmark"></span>자동로그인</label></p>
  
    <div className="but_box">
    <button className="loginsh" type="submit" onClick={()=>onLoginClick()}><FiLogIn/>로그인</button>
    <div/>
    <button className="closesh" type="submit" onClick={close}><AiFillCloseCircle/>닫기</button>
    </div>
    </div>
    </section>
    : null
    }
    </div>
 )
}
export default LoginModal;