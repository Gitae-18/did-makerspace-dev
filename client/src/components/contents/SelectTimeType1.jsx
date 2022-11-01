import React from "react";
import TableInfoType1b from "./TableInfoType1b";
import TitleType1 from "./TitleType1";

export default function SelectTimeType1() {
  return (
    <div className="select_time_type1 select_type1">
      <TitleType1 title="시간 선택"></TitleType1>
      <ol className="table_time">
        <li className="time_can">10 : 00</li>
        <li className="time_cant">13 : 00</li>
        <li className="time_selected">15 : 00</li>
        <li>17 : 00</li>
        <li>19 : 00</li>
      </ol>
      <TableInfoType1b></TableInfoType1b>
    </div>
  );
}
