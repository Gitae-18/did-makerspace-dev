import React,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate,useLocation} from 'react-router-dom';
import '../css/common-s.css';
import '../css/style-s.css';

export default function () {
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const history  = useNavigate();
    const location = useLocation();
    const url = location.state.url;
    console.log(url);
    useEffect(()=>{
        if(isLoggedIn)
        {
            if(authority_level>10)
            {
                if(url.includes('mentoring'))
                {
                    history('/mentoring')
                }
                else if(url.includes('service'))
                {
                    history('/mservice')
                }
                else{
                    history(`${url}`)
                }
            }
            else{
            history(`${url}`)
            }
        }
    },[isLoading,isLoggedIn])
    return (
        <div id="wrap" className="wrap join4">
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_alert.png" alt="alear" />
                        <p>회원가입이 필요합니다.</p>
                    </div>
                    <div className="btn_box">
                        <a href="/" className="btn_home">홈으로</a>
                        <a href="/join" className="btn_join">회원가입</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
