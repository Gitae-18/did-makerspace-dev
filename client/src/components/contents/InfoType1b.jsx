import React from "react";
import ButtonType1 from "./ButtonType1";
import TitleType1 from "./TitleType1";
export default function InfoType1b() {
  const DescImage = () => {
    return (
      <div className="images_wrap">
        <div className="image_part">Image</div>
        <div className="image_part">Image</div>
      </div>
    );
  };
  const Desc = () => {
    return (
      <dl className="dl_wrap">
        <dt>상세 설명</dt>
        <dd>
          <dl>
            <dt>출력</dt>
            <dd>CO2 90W</dd>
          </dl>
          <dl>
            <dt>가공영역</dt>
            <dd>Dual Nozzle (Independent)</dd>
          </dl>
          <dl>
            <dt>가공재료</dt>
            <dd>MDF , 아크릴 등</dd>
          </dl>
        </dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <DescImage></DescImage>
        <Desc></Desc>
      </div>
    );
  };
  return (
    <div className="info_type1">
      <div className="info_inner_wrap">
        <TitleType1 title="X-CUT 9060"></TitleType1>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록"></ButtonType1>
      </div>
    </div>
  );
}
