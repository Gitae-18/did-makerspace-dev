import React from 'react';
import Sidebar from '../Sidebar';
import "../../../../css/common-s.css";
import "../../../../css/style-s.css";
import Userobject from './Charts/Users/Userobject';
import Userservice from './Charts/Users/Userservice';
import UserStastics from "./Charts/Users/Userstastics";
const Users = () => {
  return (
    <div id="wrap" class="wrap statistics statistics11">

    <div class="content_wrap">
     
      <div class="content">
      <h2>사용자별 통계</h2>
        <div class="graph"><UserStastics/></div>
        <div class="sheet">
          <div>
            <span>통계 및 분석</span> / <span>사용자</span> / <span>사용자 통계</span>
            <div class="download">
              <a href="#" class="btn_print">프린트</a>
              <a href="#" class="btn_excel">Excel</a>
            </div>
          </div>
          <div class="table_wrap">
          <table>
            <colgroup>
              <col width="25%"/>
              <col width="25%"/>
              <col width="25%"/>
              <col width="25%"/>
            </colgroup>
            <thead>
              <tr>
                <th>항목</th>
                <th><div class="filter2"><span></span></div></th>
                <th><div class="filter2"><span></span></div></th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>

  </div>
  );
};

export default Users;

export const Users1 = () =>{
  return (
    <div id="wrap" class="wrap statistics statistics11">

    <div class="content_wrap">
      
      <div class="content">
      <div class="table">
				<div class="table_btn">
					<button class="on">당일</button>
					<button>1주일</button>
					<button>1개월</button>
					<button>3개월</button>
					<div class="filter">
						<span>기간</span>
						<p><input type="date"/></p>
						<span>~</span>
						<p><input type="date"/></p>
					</div>
					<button href="#" class="search">조회</button>
				</div>
			</div>
      <h2>월별 사용자 서비스 이용</h2>
        <div class="graph"><Userservice/></div>
        <div class="sheet">
          <div>
            <span>통계 및 분석</span> / <span>사용자</span> / <span>사용자 서비스 통계</span>
            <div class="download">
              <a href="#" class="btn_print">프린트</a>
              <a href="#" class="btn_excel">Excel</a>
            </div>
          </div>
          <div class="table_wrap">
          <table>
            <colgroup>
              <col width="25%"/>
              <col width="25%"/>
              <col width="25%"/>
              <col width="25%"/>
            </colgroup>
            <thead>
              <tr>
                <th>항목</th>
                <th><div class="filter2"><span></span></div></th>
                <th><div class="filter2"><span></span></div></th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>

  </div>
  );
}

export const Users2 = () => {
  return (
    <div id="wrap" class="wrap statistics statistics11">

    <div class="content_wrap">
     
      <div class="content">
      <div class="table">
				<div class="table_btn">
				</div>
			</div>
        <div class="graph"><Userobject/></div>
        <div class="sheet">
          <div>
            <span>통계 및 분석</span> / <span>사용자</span> / <span>사용자 목적 통계</span>
            <div class="download">
              <a href="#" class="btn_print">프린트</a>
              <a href="#" class="btn_excel">Excel</a>
            </div>
          </div>
          <div class="table_wrap">
          <table>
            <colgroup>
              <col width="25%"/>
              <col width="25%"/>
              <col width="25%"/>
              <col width="25%"/>
            </colgroup>
            <thead>
              <tr>
                <th>항목</th>
                <th><div class="filter2"><span></span></div></th>
                <th><div class="filter2"><span></span></div></th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>

  </div>
  );
}