import React from "react";
import ButtonType2 from "./ButtonType2";

export default function TableType5b() {
  return (
    <div className="table_wrap table_type5 table_type5b">
      <div className="table_extra">
        <div></div>
        <div className="table_search">
          <select name="" id="">
            <option value="1">멘토명</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <ButtonType2 btnName="조회"></ButtonType2>
        </div>
      </div>
      <table>
        <caption className="blind">장비 예약</caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>멘토명</th>
            <th>등급</th>
            <th>가입날짜</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>홍길동</td>
            <td className="select_wrap">
              <select name="" id="">
                <option value="0" selected disabled>
                  선택
                </option>
                <option value="1">전문 멘토</option>
                <option value="2">일반 사용자</option>
              </select>
            </td>
            <td>2022. 10. 15</td>
            <td className="select_big_wrap">
              <select name="" id="">
                <option value="0" selected disabled>
                  선택
                </option>
                <option value="1">권한 1</option>
                <option value="2">권한 2</option>
              </select>
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
