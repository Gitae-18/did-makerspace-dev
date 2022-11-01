import React from "react";
import ButtonType2 from "./ButtonType2";
import ButtonType1 from "./ButtonType1";

export default function TableType1h() {
  return (
    <div className="table_wrap table_type1 table_type1h">
      <div className="table_extra">
        <p></p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">이름</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <ButtonType2 btnName="조회"></ButtonType2>
        </div>
      </div>
      <table>
        <caption className="blind">장비소개</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>가격</th>
            <th>날짜</th>
            <th>마감일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>제목입니다.</td>
            <td>380,000</td>
            <td>2022. 10. 10</td>
            <td>2022. 10. 15</td>
            <td>355</td>
          </tr>
          <tr>
            <td>1</td>
            <td>제목입니다.</td>
            <td>380,000</td>
            <td>2022. 10. 10</td>
            <td>2022. 10. 15</td>
            <td>355</td>
          </tr>
          <tr>
            <td>1</td>
            <td>제목입니다.</td>
            <td>380,000</td>
            <td>2022. 10. 10</td>
            <td>2022. 10. 15</td>
            <td>355</td>
          </tr>
          <tr>
            <td>1</td>
            <td>제목입니다.</td>
            <td>380,000</td>
            <td>2022. 10. 10</td>
            <td>2022. 10. 15</td>
            <td>355</td>
          </tr>
          <tr>
            <td>1</td>
            <td>제목입니다.</td>
            <td>380,000</td>
            <td>2022. 10. 10</td>
            <td>2022. 10. 15</td>
            <td>355</td>
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
      <div className="btns">
        <ButtonType1 btnName="행사 프로그램 등록"></ButtonType1>
        <ButtonType1 btnName="교육 프로그램 등록" bgc="gray"></ButtonType1>
      </div>
    </div>
  );
}
