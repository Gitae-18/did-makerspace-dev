import React from "react";
import { Navigate, Route, Routes ,Outlet} from 'react-router';
import { NavLink , Link ,useNavigate,useLocation} from "react-router-dom";
import styled from "styled-components";
import ButtonType2 from "./ButtonType2";

export default function TableType1d() {
  const history = useNavigate();
  const goToWrite = () =>{
    history('/info/write');
  }
  const content_a = document.getElementById("faqtitle");

  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>20</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">이름</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <StyledBtn btnName="조회">조회</StyledBtn>
        </div>
      </div>
      <table>
        <caption className="blind">FAQ</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7</td>
            <td><NavLink  id="faqtitle" to="/info/faq/faq1" style={{"color":"#000000"}}>[운영시간은 어떻게 되나요?]</NavLink></td> 
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>6</td>
            <td><NavLink to="/info/faq/faq1" style={{"color":"#000000"}}>[시제품 제작 비용은 얼마인가요?]</NavLink></td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>5</td>
            <td><NavLink to="/info/faq/faq1" style={{"color":"#000000"}}>[운영시간은 어떻게 되나요?]</NavLink></td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>4</td>
            <td><NavLink to="/info/faq/faq1" style={{"color":"#000000"}}>[사용할 수 있는 장비는 어떤 것이 있나요?]</NavLink></td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>3</td>
            <td><NavLink to="/info/faq/faq1"style={{"color":"#000000"}}>[DID기술융합공작소의 정확한 위치가 어디에 있나요?]</NavLink></td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>2</td>
            <td><NavLink to="/info/faq/faq1"style={{"color":"#000000"}}>[주차는 가능한가요?]</NavLink></td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>1</td>
            <td><NavLink to="/info/faq/faq1"style={{"color":"#000000"}} >[메이커스페이스 장비를 이용하고 싶은데 어떻게 해야 하나요?]</NavLink></td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr> 
        </tbody>
      </table>
      <div className="button_class">
        <StyledBtn onClick={goToWrite}>글쓰기</StyledBtn>
      </div>
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