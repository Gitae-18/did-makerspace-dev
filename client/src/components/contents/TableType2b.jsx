import React from "react";
import TitleType1 from "./TitleType1";
export default function TableType2b() {
  return (
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <TitleType1 title="내 예약 정보"></TitleType1>
        <select name="" id="">
          <option value="1">분류</option>
        </select>
      </div>
      <table>
        <caption className="blind">장비 예약</caption>
        <thead>
          <tr>
            <th>사진</th>
            <th>모델명</th>
            <th>구분</th>
            <th>스펙</th>
            <th>설치장소</th>
            <th>예약시간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td>
              <span className="date">2022/08/22</span>
              &nbsp;&nbsp;&nbsp;
              <span className="time">17:00</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="page_control">
        <div className="btn_first btn-s">
          <img src="/images/backward-solid.svg" alt="처음으로" />
        </div>
        <div className="btn_prev">
          <img src="/images/caret-left-solid.svg" alt="이전으로" />
        </div>
        <ol className="btn_page_num">
          <li className="on">1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ol>
        <div className="btn_next">
          <img src="/images/caret-right-solid.svg" alt="다음으로" />
        </div>
        <div className="btn_last btn-s">
          <img src="/images/forward-solid.svg" alt="끝으로" />
        </div>
      </div>
    </div>
  );
}
