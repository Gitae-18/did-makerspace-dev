import React, { useEffect,useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../css/LoginModal.css';
import { FiLogIn } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { CHANGE_INPUT,LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOAD_USER } from "../store/user";
import { CommonHeader, PreUri, Method } from "../CommonCode";
import { useSelector, useDispatch } from "react-redux";
const LoginModal = (props) =>{
    const history = useNavigate();
    const dispatch = useDispatch();
    const [id,setId] = useState('');
    const [pass,setPass] = useState('');
    const { userId, 
        isLoginStart, isLoggedIn, userName } = useSelector(state => state.user);
    const onLoginClick = () =>{
        history(1);
    }
    const {open, close , header, change,userid,password,isAutoLogin} = props;
    const onChangeId = useCallback((e) => {
        e.preventDefault();
        //dispatch({ type: CHANGE_INPUT, target: e.target });
        setId(e.target.value);

    }, []);
    const onChangePwd = useCallback((e) => {
        e.preventDefault();
        //dispatch({ type: CHANGE_INPUT, target: e.target });
        setPass(e.target.value);
    }, []);


    const loginCheck = useCallback(async (e) => {
        e.preventDefault();
        
        /* if (isLoginStart === true) {
            alert('로그인 중입니다.');
            return;
        }

        if (id.length <= 0) {
            alert('아이디를 입력해 주세요.');
            return;
        }

        if (pass.length <= 0) {
            alert('패스워드를 입력해 주세요.');
            return;
        }

        dispatch({ type: LOGIN_START }); */
        const response = await fetch(PreUri + '/user/login', {
            method: Method.post,
            body: JSON.stringify({
                "user_id": id,
                "password": pass,
            }),
            headers: CommonHeader
        });

        if (!response.ok) {
            dispatch({ type: LOGIN_FAIL });
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
        dispatch({ type: LOGIN_SUCCESS, payload: json });
        history(1);
    }, [dispatch,id,pass]);
    console.log(id);
    console.log(pass);
/*     useEffect(()=>{
    },[]) */
    return(
    <div className={open ? 'openModal modalsh' : 'modals'}>
     
    { open ? 
    <section>
    <div className="login_box">
    <div className="image_part"><img src="/images/logo.png"></img></div>
    <div className="title_part"><span>DID 로그인</span></div>
    <div className="id_pw">
    <p className="id"><span/><input type="text" value= { id } name="userId" placeholder="아이디" onChange={onChangeId}/></p><div></div>
    <p className="pw"><span/><input type="password" value={ pass } name="password" placeholder="비밀번호" onChange={onChangePwd}/></p>
    </div>
    <p className="chkBox"><label htmlFor="chk"><input type="checkbox" id="chk" defaultChecked={isAutoLogin} name="isAutoLogin" onChange={change}/><span className="checkmark"></span>자동로그인</label></p>
  
    <div className="but_box">
    <button className="loginsh" type="submit" onKeyPress={(e) => { if (e.key === 'Enter') { loginCheck(e) }}} onClick={(e)=>loginCheck(e)}><FiLogIn/>로그인</button>
    <div/>
    <button className="closesh" type="submit"   onClick={close}><AiFillCloseCircle/>닫기</button>
    </div>
    </div>
    </section>
    : null
    }
    </div>
 )
}
export default React.memo(LoginModal);