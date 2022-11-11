import React,{useState,useRef,useCallback}from "react";
import { useEffect } from "react";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import TableInfoType1b from "./TableInfoType1b";
import TitleType1 from "./TitleType1";

export default function SelectTimeType1(value,show) {
 const [targetTime ,setTargetTime] = useState("");
 const [btnActive,setBtnActive] = useState("");
 const [reservStatus,setReservStatus] = useState(false);
 const ref = useRef();
 const timetable = ["10:00 ~ 13:00","14:00 ~ 17:00"];
 const timeClick =(e,value) =>{
  setTargetTime(e.target.value);
  setBtnActive((prev)=>{
    return e.target.value;
  })
}

console.log(targetTime);
//time_can 선택가능 time_can't 선택불가 time_selected 선택중
  return (
    <div className="select_time_type1 select_type1" show={!show}>
      <TitleType1 title="시간 선택"></TitleType1>
      <ol className="table_time">
         {timetable.map((item,idx)=>{
          return(
            <li value={idx} className={"time_"+(idx == btnActive ? "selected" : "can")} onClick={timeClick}>{item}</li>
          )
         })}
      </ol>
      <TableInfoType1b></TableInfoType1b>
    </div>
  );
}
