import React,{useState,useEffect,createContext} from "react";
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


function Calender(){
	const [start, setStart] = useState(new Date());
	const [startDate, setStartDate] = useState("");
	const [btnClick, setBtnClick] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [NewDate,setNewDate] = useState("");
	const [btnValue,setBtnValue] = useState('1h');
	const [currentData,setCurrentData] = useState([]);
	const [lastData,setLastData] = useState([]);
	const year ="1y";
    const hour ="1h";
    const day = "1d";
    const month= "1mo"; 
	const {date} = useSelector(state=>state.time)
	/*const useStore = create(set=>({
		newdate:NewDate,
		bear:0,
	}))*/
	const submit = () =>{
		dispatch({type:SET_DATE, target:NewDate})
	}
	console.log(date);
	  const handleClicked = (e) => {
		const { value } = e.target;
	
		setBtnClick(value);
	
		const currentDate = new Date();
		setNewDate(moment(start).format("YYYY-MM-DD"))
		if (value === "") {
		  setStartDate(new Date());
		  setBtnValue(hour);
		  
		}
		if (value === "시간별") {		
		  setStartDate(new Date());
		  setBtnValue(hour);
		}
		if (value === "일별") {
		  let sevenDays = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
		  setStartDate(sevenDays);
		  setBtnValue(day);
		}
		if (value === "월별") {
		  let oneMonth = new Date(
			new Date().getFullYear(),
			new Date().getMonth() - 1,
			new Date().getDate()
		  );
		  setStartDate(oneMonth);
		  setBtnValue(month);
		}
		if (value === "연도별") {
		  let threeMonthAgo = new Date(
			new Date().getFullYear(),
			new Date().getMonth() - 12,
			new Date().getDate()
		  );
		  setStartDate(threeMonthAgo);
		  setBtnValue(year);
		}
	  };
	  const Clickdate = () =>{
	
	  }
    return(
        <>
			<div>
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
			/>
			</div>
        </>
    );
}
export default Calender;


