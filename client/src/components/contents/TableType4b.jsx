import React from "react";
import ButtonType2 from "./ButtonType2";
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import styled from "styled-components";
export default function TableType4b() {
  const { token } = useSelector(state => state.user);
  const history = useNavigate();
  const location = useLocation();
  const onItem = () =>{
      history(location.pathname + '/detail');
    }
  return (
    <div className="table_wrap table_type2 table_type4">
      <div className="table_extra">
        <p></p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">연도</option>
          </select>
          <select name="" id="">
            <option value="1">월</option>
          </select>
          <select name="" id="">
            <option value="1">제목</option>
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
            <th>멘토</th>
            <th>멘티</th>
            <th>기간</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5</td>
            <td>제목입니다.</td>
            <td>멘토1</td>
            <td>멘티1</td>
            <td>2022. 10. 13</td>
            <td>
              <StyledBtn onClick={onItem}>열람</StyledBtn>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>멘토1</td>
            <td>멘티1</td>
            <td>2022. 10. 13</td>
            <td>
              <StyledBtn onClick={onItem}>열람</StyledBtn>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>멘토1</td>
            <td>멘티1</td>
            <td>2022. 10. 13</td>
            <td>
              <StyledBtn onClick={onItem}>열람</StyledBtn>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>멘토1</td>
            <td>멘티1</td>
            <td>2022. 10. 13</td>
            <td>
              <StyledBtn onClick={onItem}>열람</StyledBtn>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>제목 제목 제목 제목 제목 제목</td>
            <td>멘토1</td>
            <td>멘티1</td>
            <td>2022. 10. 13</td>
            <td>
              <StyledBtn onClick={onItem}>열람</StyledBtn>
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
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:80px;
height:40px;
font-size:0.6rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`
