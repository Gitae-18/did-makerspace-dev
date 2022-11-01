import React from "react";
import ButtonType1 from "./ButtonType1";
import TitleType2 from "./TitleType2";
export default function InfoType3a() {
  const Desc = () => {
    return (
      <dl className="dl_wrap">
        <dt className="blind">설명</dt>
        <dd>제조 양산의 기초 실리콘 몰드 제작 설명</dd>
        <dt>첨부파일</dt>
        <dd>제조 양산의 기초 실리콘몰드제작.pdf</dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <Desc></Desc>
      </div>
    );
  };
  return (
    <div className="info_type3 info_type3b">
      <div className="info_inner_wrap">
        <TitleType2
          title="제조 양산의 기초 실리콘 몰드 제작"
          date="21-01-09"
          hit="335"
        ></TitleType2>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록"></ButtonType1>
      </div>
    </div>
  );
}
