import React from "react";
import ButtonType2, { ButtonType2small } from "./ButtonType2";

export default function TableType4a() {
  return (
    <div className="table_wrap table_type2 table_type4">
      <div className="table_extra">
        <select name="" id="">
          <option value="1">한국전자통신 연구원</option>
        </select>
        <div className="table_search">
          <select name="" id="">
            <option value="1">연도</option>
          </select>
          <select name="" id="">
            <option value="1">월</option>
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
            <th>제목</th>
            <th>신청자</th>
            <th>진행</th>
            <th>상태</th>
            <th>등록일시</th>
            <th>수정일시</th>
            <th>보고서</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>신청자</td>
            <td>진행</td>
            <td>상태</td>
            <td>2022. 10. 13</td>
            <td>승인대기(?)</td>
            <td>
              <ButtonType2small btnName="보고서출력"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>신청자</td>
            <td>진행</td>
            <td>상태</td>
            <td>2022. 10. 13</td>
            <td>진행대기(?)</td>
            <td>
              <ButtonType2small btnName="보고서출력"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>신청자</td>
            <td>진행</td>
            <td>상태</td>
            <td>2022. 10. 13</td>
            <td>진행중(?)</td>
            <td>
              <ButtonType2small btnName="보고서출력"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>신청자</td>
            <td>진행</td>
            <td>상태</td>
            <td>2022. 10. 13</td>
            <td>진행완료(?)</td>
            <td>
              <ButtonType2small btnName="보고서출력"></ButtonType2small>
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
