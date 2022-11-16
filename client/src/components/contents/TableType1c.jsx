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
            <th>소속</th>
            <th>이름</th>
            <th>사진</th>
            <th>정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>

            <td>ETRI</td>
            <td>이재기</td>
            <td className="images"><img className="etri-image" src="/images/ico_member.png" alt="no-image"/></td>
            <td>재직 35년</td>
          </tr>
          <tr>

            <td>ETRI</td>
            <td>소운섭</td>
            <td className="images"><img className="etri-image" src="/images/ico_member.png" alt="no-image"/></td>
            <td>재직 33년</td>
          </tr>
          <tr>

            <td>ETRI</td>
            <td>박영호</td>
            <td className="images"><img className="etri-image" src="/images/ico_member.png" alt="no-image"/></td>
            <td>재직 38년</td>
          </tr>
          <tr>

            <td>ETRI</td>
            <td>양용석</td>
            <td className="images"><img className="etri-image" src="/images/ico_member.png" alt="no-image"/></td>
            <td>재직 25년</td>
          </tr>
          <tr>

            <td>ETRI</td>
            <td>조원석</td>
            <td className="images"><img className="etri-image" src="/images/ico_member.png" alt="no-image"/></td>
            <td>재직 30년</td>
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
