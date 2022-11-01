import React from "react";
import ButtonType2 from "./ButtonType2";

export default function TableType1c() {
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
          <ButtonType2 btnName="조회"></ButtonType2>
        </div>
      </div>
      <table>
        <caption className="blind">운영인력소개</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>소속</th>
            <th>이름</th>
            <th>사진</th>
            <th>정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
          </tr>
          <tr>
            <td>10</td>
            <td>ETRI</td>
            <td>홍길동</td>
            <td>Image</td>
            <td>재직 00년</td>
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
