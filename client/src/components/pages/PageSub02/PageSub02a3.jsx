import React from "react";
import { useNavigate } from "react-router";
import SelectDateType1,{SelectTimeType1} from "../../contents/SelectDateType1";
import TextExtraType1a from "../../contents/TextExtraType1a";

export default function PageSub02a3() {
  const SelectWrap = () => {
    return (
      <div className="select_wrap">
        <SelectDateType1></SelectDateType1>
      </div>
    );
  };
  return (
    <div id="pageSub02a3">
      <TextExtraType1a></TextExtraType1a>
      <SelectWrap></SelectWrap>
    </div>
  );
}
