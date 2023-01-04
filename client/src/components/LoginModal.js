import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/LoginModal.css';
const LoginModal = (props) =>{
    const history = useNavigate();
    const onLoginClick = () =>{
        history(1);
    }
 const {open, close , header, change,userid,password,isAutoLogin} = props;
 return(
    <div className={open ? 'openModal modal' : 'modals'}>
     
    { open ? 
    <section>
    <div className="login_box">
    <p className="id"><span/><input type="text" value= { userid } name="userId" placeholder="아이디" onChange={change} /></p>
    <p className="pw"><span/><input type="password" value={password} name="password" placeholder="비밀번호" onChange={change} /></p>
    <p className="chkBox"><label htmlFor="chk"><input type="checkbox" id="chk" checked={isAutoLogin} name="isAutoLogin" onChange={change}/><span className="checkmark"></span>자동로그인</label></p>
    <button className="login" type="submit" onClick={()=>onLoginClick()}>로그인</button>
    <button className="close" type="submit" onClick={close}>닫기</button>
    </div>
    </section>
    : null
    }
    </div>
 )
}
export default LoginModal;