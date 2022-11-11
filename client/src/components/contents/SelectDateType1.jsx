import React ,{useState,useRef,useEffect,createContext}from "react";
import TableInfoType1a from "./TableInfoType1a";
import TableInfoType1b from "./TableInfoType1b";
import TitleType1 from "./TitleType1";
import styled from "styled-components";
import Calendar from 'react-calendar';
import '../../css/Calendar.css';
import { useNavigate } from "react-router";
import ButtonType2 from "./ButtonType2";
import moment from 'moment';
import { format, formatDistanceToNow} from 'date-fns';
import { addDays } from 'date-fns/fp'
import { ko } from "date-fns/locale";
import {useDispatch,useSelector}  from "react-redux";
import create from 'zustand';
import { SET_DATE } from "../../store/time";
export const CurrentContext = createContext();
export default function SelectDateType1() {
  const [start, setStart] = useState(new Date());
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [NewDate,setNewDate] = useState("");
	const {date} = useSelector(state=>state.time)
  const onSubmit = () =>{
		dispatch({type:SET_DATE, target:NewDate})
	}
  const dateClick = () =>{
    setNewDate(moment(start).format("YYYY-MM-DD"))
  }
  console.log(NewDate);
  return (
    <div className="select_date_type1 select_type1">
      <TitleType1 title="날짜 선택"></TitleType1>
      <div className="date_calendar">
        <div className="calendar_month">
        </div>
        <div className="calendar_day">
         <Calendar 
		  	onChange={setStart} 
			  value={start}
			  locale="ko"
			  next2Label={null}
			  prev2Label={null}
			  formatDay={(locale, date) =>
				date.toLocaleString('en', { day: 'numeric' })
			  }
			showNeighboringMonth={false}
      onClickDay={(value,event)=>alert('Clicked : ',value)}
			/>
          <TableInfoType1a></TableInfoType1a>
        </div>
      </div>
    </div>
  );
}
export  function SelectTimeType1(value) {
  const [targetTime ,setTargetTime] = useState("");
  const [btnActive,setBtnActive] = useState("");
  const [reservStatus,setReservStatus] = useState(false);
  const ref = useRef();
  const timetable = ["10:00","14:00"];
  const timeClick =(e,value) =>{
   setTargetTime(e.target.value);
   setBtnActive((prev)=>{
     return e.target.value;
   })
 }
 
 console.log(targetTime);
 //time_can 선택가능 time_can't 선택불가 time_selected 선택중
   return (
     <div className="select_time_type1 select_type1">
       <TitleType1 title="시간 선택"></TitleType1>
       <ol className="table_time">
          {timetable.map((item,idx,key)=>{
           return(
             <li value={idx} key={idx} className={"time_"+(idx == btnActive ? "selected" : "can")} onClick={timeClick}>{item}</li>
           )
          })}
       </ol>
       <TableInfoType1b></TableInfoType1b>
     </div>
   );
 }
