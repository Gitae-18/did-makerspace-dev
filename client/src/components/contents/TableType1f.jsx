import React from "react";
import ButtonType2 from "./ButtonType2";
import ButtonType1 from "./ButtonType1";
import styled from "styled-components";
export default function TableType1f() {
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p></p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">이름</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <StyledBtn btnName="조회"></StyledBtn>
        </div>
      </div>
      <table>
        <caption className="blind">FAQ</caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>기업명</th>
            <th>등급</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>홍길동</td>
            <td>asd@gmail.com</td>
            <td>-</td>
            <td>일반사용자</td>
            <td>2022-10-15</td>
          </tr>
          <tr>
            <td>1</td>
            <td>홍길동</td>
            <td>asd@gmail.com</td>
            <td>-</td>
            <td>일반사용자</td>
            <td>2022-10-15</td>
          </tr>
          <tr>
            <td>1</td>
            <td>홍길동</td>
            <td>asd@gmail.com</td>
            <td>-</td>
            <td>일반사용자</td>
            <td>2022-10-15</td>
          </tr>
          <tr>
            <td>1</td>
            <td>홍길동</td>
            <td>asd@gmail.com</td>
            <td>-</td>
            <td>일반사용자</td>
            <td>2022-10-15</td>
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
      <ButtonType1 btnName="신규 등록"></ButtonType1>
    </div>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `