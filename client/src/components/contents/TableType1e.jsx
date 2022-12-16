import React from "react";
import ButtonType2 from "./ButtonType2";
import { useLocation,useNavigate,NavLink } from "react-router-dom";
import styled from "styled-components";
export default function TableType1e() {
  const location = useLocation();
  const history = useNavigate();
  const onItem = () =>{
    history(location.pathname + '/detail');
  }
  const onWrite = () =>{
    history('/notcomplete');
  }
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>20</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">제목</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <StyledBtn>조회</StyledBtn>
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
            <td>10</td>
            <td onClick={onItem}>공지사항 1.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 2.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 3.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 4.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 5.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 6.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 7.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 8.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 9.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
          <tr>
            <td>10</td>
            <td onClick={onItem}>공지사항 10.</td>
            <td>최고관리자</td>
            <td>03-25</td>
            <td>222</td>
          </tr>
        </tbody>
      </table>
      <StyledBtn2 onClick={onWrite}>글쓰기</StyledBtn2>
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
 const StyledBtn2= styled.button`
 position:relative;
 left:88%;
 top:20px;
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