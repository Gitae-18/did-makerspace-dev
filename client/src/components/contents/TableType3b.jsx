import React from "react";
import ButtonType1 from "./ButtonType1";

export default function TableType3b() {
  return (
    <div className="table_type3 table_type3b">
      <ol>
        <li>
          <div className="part_title">㈜ 디엠비</div>
          <dl className="part_desc">
            <dt>소재지</dt>
            <dd>인천 서구 건지로121번길 33-12 (석남동)</dd>
            <dt>사업자등록번호</dt>
            <dd>000-00-00000</dd>
            <dt>대표 담당자</dt>
            <dd>디엠비</dd>
            <dt>전화번호</dt>
            <dd>000-123-1234</dd>
            <dt>등록일</dt>
            <dd>2020-10-07</dd>
          </dl>
        </li>
        <li>
          <div className="part_title">이노플러스</div>
          <dl className="part_desc">
            <dt>소재지</dt>
            <dd>세종특별자치시 국세청로 4 (나성동, 갤러리 세종프라자)</dd>
            <dt>사업자등록번호</dt>
            <dd>000-00-00000</dd>
            <dt>대표 담당자</dt>
            <dd>김명석대표</dd>
            <dt>전화번호</dt>
            <dd>000-123-1234</dd>
            <dt>등록일</dt>
            <dd>2020-10-07</dd>
          </dl>
        </li>
        <li>
          <div className="part_title">아이피하트</div>
          <dl className="part_desc">
            <dt>소재지</dt>
            <dd>서울특별시 관악구 난곡로 327-1, 비1층(신림동)</dd>
            <dt>사업자등록번호</dt>
            <dd>000-00-00000</dd>
            <dt>대표 담당자</dt>
            <dd>손성창</dd>
            <dt>전화번호</dt>
            <dd>000-123-1234</dd>
            <dt>등록일</dt>
            <dd>2020-10-07</dd>
          </dl>
        </li>
      </ol>
      <ButtonType1 btnName="신규 등록"></ButtonType1>
    </div>
  );
}
