import React from "react";
import TitleType1 from "./TitleType1";
import ButtonType2,{GoBackBtn} from "./ButtonType2";
import ButtonType4 from "./ButtonType4";
import SectionTabType1a from "../sections/SectionTabType1a";
import styled from "styled-components";

export default function InfoType2a() {
  return (
    <div className="info_type2">
      <div className="title_part">
        <div className="image_part">Image</div>
        <div className="info_part">
          <TitleType1 title="메이커들을 위한 DID 라이브 쇼"></TitleType1>
          <div className="dl_wrap">
            <dl>
              <dt>일시</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>장소</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>점수 및 등록 기간</dt>
              <dd>-</dd>
            </dl>
            <dl>
              <dt>신청 가능 여부</dt>
              <dd>-</dd>
            </dl>
            <dl >
              <dt>정원</dt>
              <dd>100명</dd>
            </dl>
            <dl>
              <dt>비용</dt>
              <dd>무료</dd>
            </dl>
          </div>
          <div className="btns">
            <ButtonType2 btnName="신청하기"></ButtonType2>
            <ButtonType4></ButtonType4>
          </div>
        </div>
      </div>
      <div className="desc_part">
        <SectionTabType1a></SectionTabType1a>
      </div>
      <GoBackBtn btnName="목록"></GoBackBtn>
    </div>
  );
}
