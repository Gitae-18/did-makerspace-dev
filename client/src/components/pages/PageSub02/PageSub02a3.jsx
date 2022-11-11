import React from "react";
import { useNavigate } from "react-router";
import SelectDateType1,{SelectTimeType1} from "../../contents/SelectDateType1";
import ButtonType2,{ButtonType3,ButtonType4} from "../../contents/ButtonType2";
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
export const TableBtnsType1a = () => {
  const navigate = useNavigate();
  const btnClick = () =>{

  }
  return (
   
    <div className="table_btns table_btns_type1">
        <ButtonType3 btnName="예약" bgc="white" onClick={btnClick}></ButtonType3>
       <ButtonType4 btnName="목록" onClick={navigate(-1)}></ButtonType4>
      </div>
  );
}