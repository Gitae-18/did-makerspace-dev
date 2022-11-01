import React from "react";
import ButtonType2 from "./ButtonType2";
import ButtonType1 from "./ButtonType1";

export default function TableType1f() {
  return (
    <div className="table_wrap table_type1 table_type1f">
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
            <th>사진</th>
            <th>모델명</th>
            <th>구분</th>
            <th>스펙</th>
            <th>설치장소</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td>SINDOH - 3DWOX 1X(ABS전용)(12)</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>SINDOH - 3DWOX 1X(ABS전용)(12)</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>SINDOH - 3DWOX 1X(ABS전용)(12)</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>SINDOH - 3DWOX 1X(ABS전용)(12)</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>SINDOH - 3DWOX 1X(ABS전용)(12)</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
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
