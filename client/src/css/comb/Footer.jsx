import React from "react";
import "./Footer.css";
export default function Footer() {
  const FooterInfo = () => {
    return (
      <div className="dl_wrap footer_info">
        <dl>
          <dt className="blind">주소</dt>
          <dd>
            대전광역시 중구 중앙로 85, 대전창업 허브 1, 2층 DID기술융합공작소
          </dd>
        </dl>
        <dl>
          <dt>대표전화</dt>
          <dd>
            (042)385-4200
          </dd>
        </dl>
        <dl>
          <dt>E-Mail</dt>
          <dd>
              info@didmakerspace.co.kr
            
          </dd>
        </dl>
        <dl>
          <dt className="blind">Copyright</dt>
          <dd>COPYRIGHT &copy; 2019 DID 기술융합공작소 ALL RIGHTS RESERVED.</dd>
        </dl>
      </div>
    );
  };
  const FooterSiteMap = () => {
    return (
      <div className="site_map_wrap footer_site_map">
        <select name="footer_site_map" id="footer_site_map">
          <option value="">관련사이트 바로가기</option>
          <option value="">관련사이트1</option>
          <option value="">관련사이트2</option>
          <option value="">관련사이트3</option>
        </select>
      </div>
    );
  };

  const FooterWrap = () => {
    return (
      <footer>
        <div className="wrap2">
          <div className="footer_inner_wrap">
            <h3>Contact</h3>
            <FooterSiteMap></FooterSiteMap>
          </div>
          <FooterInfo></FooterInfo>
        </div>
      </footer>
    );
  };

  return <FooterWrap></FooterWrap>;
}
