import React from "react";
import ButtonType2, { ButtonType2small } from "./ButtonType2";

export default function TableType5c() {
  return (
    <div className="table_wrap table_type5">
      <div className="table_extra">
        <div></div>
        <div className="table_search">
          <select name="" id="">
            <option value="1">제목</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <ButtonType2 btnName="조회"></ButtonType2>
        </div>
      </div>
      <table>
        <caption className="blind"></caption>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>멘토</th>
            <th>상태</th>
            <th>회차</th>
            <th>신청일</th>
            <th>확인</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>홍길동 멘토</td>
            <td>신청</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>
              <ButtonType2small btnName="확인"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>홍길동 멘토</td>
            <td>신청</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>
              <ButtonType2small btnName="확인"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>홍길동 멘토</td>
            <td>신청</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>
              <ButtonType2small btnName="확인"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>홍길동 멘토</td>
            <td>신청</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>
              <ButtonType2small btnName="확인"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>홍길동 멘토</td>
            <td>신청</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>
              <ButtonType2small btnName="확인"></ButtonType2small>
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
