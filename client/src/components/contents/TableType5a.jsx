import React from "react";
import ButtonType2 from "./ButtonType2";
import styled from "styled-components";
export default function TableType5a() {
  return (
    <div className="table_wrap table_type5">
      <div className="table_extra">
        <div></div>
        <div className="table_search">
          <select name="" id="">
            <option value="1">제목</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <StyledBtn>조회</StyledBtn>
        </div>
      </div>
      <table>
        <caption className="blind"></caption>
        <thead>
          <tr>
            <th>No.</th>
            <th>멘토링 제목</th>
            <th>신청자</th>
            <th>처리상태</th>
            <th>회차</th>
            <th>신청일</th>
            <th>진행단계</th>
            <th>처리</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>신청자 1</td>
            <td>신청</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>승인대기</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목2</td>
            <td>신청자 2</td>
            <td>추가신청</td>
            <td>2</td>
            <td>2022. 10. 13</td>
            <td>반려</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>신청자 1</td>
            <td>승인</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>진행대기</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>신청자 1</td>
            <td>취소</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>진행중</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>신청자 1</td>
            <td>진행</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>진행완료</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목1</td>
            <td>신청자 1</td>
            <td>완료</td>
            <td>1</td>
            <td>2022. 10. 13</td>
            <td>진행완료</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목2</td>
            <td>신청자 2</td>
            <td>추가신청</td>
            <td>2</td>
            <td>2022. 10. 13</td>
            <td>반려</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목2</td>
            <td>신청자 2</td>
            <td>추가신청</td>
            <td>2</td>
            <td>2022. 10. 13</td>
            <td>반려</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목2</td>
            <td>신청자 2</td>
            <td>추가신청</td>
            <td>2</td>
            <td>2022. 10. 13</td>
            <td>반려</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목2</td>
            <td>신청자 2</td>
            <td>추가신청</td>
            <td>2</td>
            <td>2022. 10. 13</td>
            <td>반려</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목2</td>
            <td>신청자 2</td>
            <td>추가신청</td>
            <td>2</td>
            <td>2022. 10. 13</td>
            <td>반려</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>멘토링 제목2</td>
            <td>신청자 2</td>
            <td>추가신청</td>
            <td>2</td>
            <td>2022. 10. 13</td>
            <td>반려</td>
            <td>
              <select name="" id="">
                <option value="0" selected disabled>
                  처리
                </option>
                <option value="1">승인</option>
                <option value="2">반려</option>
                <option value="3">진행</option>
                <option value="4">취소</option>
                <option value="5">완료</option>
                <option value="6">보고서</option>
              </select>
            </td>
            <td>
              <TabBtn btnName="보기">보기</TabBtn>
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
 const TabBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:60px;
height:30px;
font-size:0.6rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `