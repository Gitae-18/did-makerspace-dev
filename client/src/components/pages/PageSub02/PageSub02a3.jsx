import React from "react";
import SelectDateType1 from "../../contents/SelectDateType1";
import SelectTimeType1 from "../../contents/SelectTimeType1";
import TableBtnsType1a from "../../contents/TableBtnsType1a";
import TextExtraType1a from "../../contents/TextExtraType1a";

export default function PageSub02a3() {
  const SelectWrap = () => {
    return (
      <div className="select_wrap">
        <SelectDateType1></SelectDateType1>
        <SelectTimeType1></SelectTimeType1>
      </div>
    );
  };
  return (
    <div id="pageSub02a3">
      <TextExtraType1a></TextExtraType1a>
      <SelectWrap></SelectWrap>
      <TableBtnsType1a></TableBtnsType1a>
    </div>
  );
}
