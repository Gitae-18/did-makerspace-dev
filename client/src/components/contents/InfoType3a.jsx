import React from "react";
import ButtonType1 from "./ButtonType1";
import TitleType2 from "./TitleType2";
export default function InfoType3a() {
  const DescVedio = () => {
    return (
      <div className="vedio_wrap">
        <div className="image_part">동영상</div>
      </div>
    );
  };
  const Desc = () => {
    return (
      <dl className="dl_wrap">
        <dt>설명</dt>
        <dd>설명입니다.123</dd>
        <dt>첨부파일</dt>
        <dd>첨부파일입니다.123</dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <DescVedio></DescVedio>
        <Desc></Desc>
      </div>
    );
  };
  return (
    <div className="info_type3">
      <div className="info_inner_wrap">
        <TitleType2 title="X-CUT 9060" date="21-01-09" hit="335"></TitleType2>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록"></ButtonType1>
      </div>
    </div>
  );
}
