import React from "react";
import TableInfoType1a from "./TableInfoType1a";
import TitleType1 from "./TitleType1";

export default function SelectDateType1() {
  return (
    <div className="select_date_type1 select_type1">
      <TitleType1 title="날짜 선택"></TitleType1>
      <div className="date_calendar">
        <div className="calendar_month">
          <div className="btn_prev">
            <img src="./images/caret-left-solid.svg" alt="이전달" />
          </div>
          <h4>2022. 07</h4>
          <div className="btn_next">
            <img src="./images/caret-right-solid.svg" alt="다음달" />
          </div>
        </div>
        <div className="calendar_day">
          <table>
            <caption className="blind">날짜 선택 테이블</caption>
            <thead>
              <tr>
                <th className="text_red">일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text_gray3">28</td>
                <td className="text_gray3">29</td>
                <td className="text_gray3">30</td>
                <td>1</td>
                <td className="selected">2</td>
                <td>3</td>
                <td>4</td>
              </tr>
              <tr>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
              </tr>
              <tr>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
              </tr>
              <tr>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                <td className="selected">22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
              </tr>
              <tr>
                <td className="selected">26</td>
                <td>27</td>
                <td>28</td>
                <td>29</td>
                <td>30</td>
                <td>31</td>
                <td className="text_gray3">1</td>
              </tr>
            </tbody>
          </table>
          <TableInfoType1a></TableInfoType1a>
        </div>
      </div>
    </div>
  );
}
