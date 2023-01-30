import React from "react";
import ButtonType2 from "./ButtonType2";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
export default function TableType5e() {
    const { token } = useSelector(state => state.user);
    const history = useNavigate();
    const location = useLocation();
    const onItem = () =>{
        history(location.pathname + '/detail');
      }
  return (
    <div className="table_wrap table_type5 table_type5b">
      <div className="table_extra">
        <div></div>
        <div className="table_search">
          <select name="" id="">
            <option value="1">멘토명</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <ButtonType2 btnName="검색"></ButtonType2>
        </div>
      </div>
      <table>
        <caption className="blind">장비 예약</caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>멘토명</th>
            <th>소속기업명</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>신청일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td onClick={onItem}>홍길동</td>
            <td onClick={onItem}>DID기술융합공작소</td>
            <td onClick={onItem}>이메일@naver.com</td>
            <td onClick={onItem}>010-1234-5678</td>
            <td onClick={onItem}>2022. 10. 15</td>
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
