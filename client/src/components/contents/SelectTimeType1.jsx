import React from "react";
import TitleType1 from "./TitleType1";
import TableInfoType1b from "./TableInfoType1b";
import { useEffect } from "react";

const TimeTable = ({data,btnClick,btnActive,timeClick,timeClick2}) =>{
    const index = 0;
    const index2 = 1;
  
    return(
      <div className="select_time_type1 select_type1">
      <TitleType1 title="시간 선택"></TitleType1>
      <ol className="table_time">
      <button type="button"  value={0}  disabled={data ===`can't`&& btnClick === true?true:false} className={data === `can't` ? 'cant' : btnActive === true && index === 0 ? 'selected':btnActive === false && data === `can't`? 'cant' : 'can'} onClick={timeClick}>10:00</button>
         <button type="button"  value={1}  disabled={data ===`can't`&& btnActive === true?true:false} className={data === `can't` ? 'cant' :btnClick === true && index2 === 1 ? 'selected':btnClick === false && data === `can't`? 'cant' : 'can'} onClick={timeClick2}>14:00</button>
      </ol>
      <TableInfoType1b></TableInfoType1b>
 </div>
    )
  }
  export default TimeTable;