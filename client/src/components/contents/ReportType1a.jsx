import React from "react";
import ButtonType1 from "./ButtonType1";
import TitleType1 from "./TitleType1";
export default function ReportType1a() {
  return (
    <div className="report_type1">
      <h2>멘토링 보고서</h2>
      <TitleType1 title="멘토링 정보"></TitleType1>
      <dl>
        <dt>멘티</dt>
        <dd>멘티1</dd>
        <dt>멘토</dt>
        <dd>멘토1</dd>
        <dt>제목</dt>
        <dd>제목1</dd>
        <dt>기간</dt>
        <dd>기간</dd>
        <dt>진행 내용</dt>
        <dd>진행내용 </dd>
        <dt>첨부파일</dt>
        <dd>첨부파일</dd>
      </dl>
      <ButtonType1 btnName="목록"></ButtonType1>
    </div>
  );
}
