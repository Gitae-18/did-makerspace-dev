import React from "react";
import ButtonType2, { ButtonType2small, ButtonType2test } from "./ButtonType2";
import { Link } from "react-router-dom";

export default function TableType2a() {
  return (
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <ButtonType2 btnName="내 예약 정보 조회"></ButtonType2>
        <select name="" id="">
          <option value="1">분류</option>
          <option value="2">날짜</option>
        </select>
      </div>
      <table>
        <caption className="blind">장비 예약</caption>
        <thead>
          <tr>
            <th>사진</th>
            <th>모델명</th>
            <th>구분</th>
            <th>스펙</th>
            <th>설치장소</th>
            <th>교육</th>
            <th>예약</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>프린팅 방식</dt>
                <dd>FDM</dd>
              </dl>
            </td>
            <td>2층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={true}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>X-CUT9060</td>
            <td>CNC</td>
            <td>
              <dl>
                <dt>출력</dt>
                <dd>CO2 90W</dd>
              </dl>
            </td>
            <td>1층</td>
            <td className="btns_wrap">
              <ButtonType2small btnName="동영상보기"></ButtonType2small>
              <ButtonType2test test={false}></ButtonType2test>
            </td>
            <td>
              <ButtonType2small btnName="예약하기"></ButtonType2small>
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
