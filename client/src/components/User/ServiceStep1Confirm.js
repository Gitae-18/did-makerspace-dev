import React from 'react';
import '../../css/common-s.css';
import '../../css/style-s.css';
import SubSideMenu from '../contents/SubSideMenu';
import { useLocation,useNavigate } from 'react-router';
export default function () {
    const location = useLocation();
    const history = useNavigate();
    return (
        <div id="wrap" className='wrap utilize3'>
            <div className="content_wrap">
            <SubSideMenu title={"시제품제작지원"} subtitle={"시제품 상담신청"}/>
                <div className="content">
                <div className="inner_wrap">
                    <div className="text_box">
                        <img src="/images/ico_ok.png" alt="img" />
                        <p>상담신청이 되었습니다.</p>
                        {/* <span><strong className="num">2020년 4월 30일 13시 13분</strong>에 방문해 주시기 바랍니다.</span> */}
                    </div>
                    <button type="button" onClick={()=>{history('/uservice',{replace:true})}} className="btn_ok">확인</button>
                </div>
            </div>
            </div>
        </div>
    );
}
