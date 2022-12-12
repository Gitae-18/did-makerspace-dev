import React from "react";
import { useNavigate,useLocation } from "react-router";
import ButtonType1 from "./ButtonType1";
import TitleType1 from "./TitleType1";
export default function InfoType1a() {
  const history = useNavigate();
  const location = useLocation();
  const eqname = location.state.name;
  const Desc1 = () => {
    return <p>최상의 디테일과 3D 입체기술의 완벽함을 구현한 대형 3D프린터</p>;
  };
  const DescImage = () => {
    return (
      <div className="images_wrap">
        <div className="image_part">Image</div>
        <div className="image_part">Image</div>
      </div>
    );
  };
  const Desc2 = () => {
    return (
      <dl className="dl_wrap">
        <dt>상세 설명</dt>
        <dd>
          <dl>
            <dt>Print Technology</dt>
            <dd>FFF (Fused Filament Fabrication)</dd>
          </dl>
          <dl>
            <dt>Print head</dt>
            <dd>Dual Nozzle (Independent)</dd>
          </dl>
          <dl>
            <dt>Nozzle Diameter</dt>
            <dd>0.4mm</dd>
          </dl>
          <dl>
            <dt>Max Build size (WxDxH)</dt>
            <dd>370 x 390 x 450 mm</dd>
          </dl>
          <dl>
            <dt>Material</dt>
            <dd>
              PLA (9 Color), ABS (7 Color), Flexible (6 Color), PVA, Open
              Materials (PETG, TPE, ASA, Metal, Luminous, Smooth and etc)
            </dd>
          </dl>
          <dl>
            <dt>Connectivity</dt>
            <dd>3.0 Device / 2.0 Host, Ethernet (1G), Wi-Fi</dd>
          </dl>
          <dl>
            <dt>Layer Thickness</dt>
            <dd>0.05 ~ 0.4 mm</dd>
          </dl>
          <dl>
            <dt>Filament Diameter</dt>
            <dd>1.75 mm</dd>
          </dl>
        </dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <Desc1></Desc1>
        <DescImage></DescImage>
        <Desc2></Desc2>
      </div>
    );
  };
  return (
    <div className="info_type1">
      <div className="info_inner_wrap">
        <TitleType1 title={eqname}></TitleType1>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록" onClick={history(-1)}></ButtonType1>
      </div>
    </div>
  );
}
