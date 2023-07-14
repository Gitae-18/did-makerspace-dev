import React,{useState}from "react";
import "./Footer.css";
import {Link} from "react-router-dom"
import { useNavigate,useLocation} from "react-router-dom";
import styled from "styled-components";
export default function Footer() {
  const [url,SetUrl] = useState('');
  const history = useNavigate();
  const location = useLocation();
  const FooterInfo = () => {
    return (
      <>
      <div className="bar_footer">
        <div className="policy">
        <ul className="footlist">
          <li onClick={(e)=>history('/didterms')}>ㆍ이용약관</li>
          <li onClick={(e)=>history('/personal')}>ㆍ개인정보처리방침</li>
          <li onClick={(e)=>history('/cright')}>ㆍ저작권정책</li>
          <li onClick={(e)=>history('/email')}>ㆍ이메일무단수집거부</li>
          <li><a href="/images/safetyManual.pdf" target="_blank" rel="noopener noreferrer">ㆍ안전관리매뉴얼</a></li>
        </ul>
        </div>
      <div className="dl_wrap footer_info">
        <h3>Contact</h3>
        <div className="contant">
        <dl>
          <dt className="blind">주소</dt>
          <dd>
            대전광역시 중구 중앙로 85, 대전창업 허브 1, 2층 DID기술융합공작소
          </dd>
        </dl>
        <dl>
          <dd>
             (042)385-4200 / info@didmakerspace.kr
          </dd>
        </dl>
        <dl>
          <dt className="blind">Copyright</dt>
          <dd>COPYRIGHT &copy; 2019 DID 기술융합공작소 ALL RIGHTS RESERVED.</dd>
        </dl>
      </div>
      </div>
      </div></>
    );
  };
  const FooterSiteMap = () => {
    const onSiteMove = (e) =>{
      const urlname = e.target.value;
      window.open(urlname);
    }
    return (
      <div className="site_map_wrap footer_site_map">
        <select name="footer_site_map" id="footer_site_map" onChange={onSiteMove}>
          <option value="">관련사이트 바로가기</option>
          <option value="https://d-startup.kr">대전창업온라인</option>
          <option value="https://www.makeall.com/home/kor/main.do">창업진흥원메이크올</option>
          <option value="https://www.etri.re.kr/intro.html">ETRI</option>
          <option value="https://www.daejeon.go.kr/">대전광역시</option>
          <option value="https://ccei.creativekorea.or.kr/daejeon/">대전창조경제혁신센터</option>
        </select>
      </div>
    );
  };
  console.log(location.search);
  const FooterWrap = () => {
    return (
      <>
      {location.search.includes("report_no")||location.search.includes("user_no")?
      null
      :<footer id="footer">
      <div className="wrap2" id="wrap2">
        <div className="footer_position">
        <div className="footer_inner_wrap">
        <FooterInfo>
        </FooterInfo>
        {/* <SnsMap>
          <Imgtag src="/images/instagram_ico.png"/>
          </SnsMap> */}
        </div>        
        </div>
        <FooterSiteMap></FooterSiteMap>
      </div>
    </footer>}
      </>
    );
  };

  return <FooterWrap></FooterWrap>;
}
const SnsMap = styled.div`
width:50px;
height:20px;
position:relative;
display:flex;
`
const Imgtag = styled.img`
  width: 25px;
  height: 15px;
`;