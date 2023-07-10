import React ,{useState,useRef,useEffect,createContext,useCallback,useMemo}from "react";
import TableInfoType1a from "./TableInfoType1a";
import TableInfoType1b from "./TableInfoType1b";
import TitleType1 from "./TitleType1";
import TextExtraType1a from "./TextExtraType1a";
import styled from "styled-components";
import Calendar from 'react-calendar';
import ReservModal from "./ReservModal";
import TimeTable from "./SelectTimeType1";
import '../../css/Calendar.css';
import { useNavigate,useLocation } from "react-router-dom";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import ButtonType2,{ButtonType3,ButtonType4}from "./ButtonType2";
import moment from 'moment';
import { format, formatDistanceToNow} from 'date-fns';
import { addDays } from 'date-fns/fp'
import { ko } from "date-fns/locale";
import {useDispatch,useSelector}  from "react-redux";
import qs from 'qs';
import create from 'zustand';
import { SET_DATE } from "../../store/time";
import { buildEventRangeKey, elementClosest } from "@fullcalendar/react";
//export const CurrentContext = createContext();


export default function SelectDateType1({query}) {

  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useSelector(state => state.user);
  const [value,onChange] = useState(new Date());
  const [timepart,setTimepart] = useState([]);
  const {isLoggedIn} = useSelector(state => state.user);
	const navigate = useNavigate();
  const [clickedTime,setClickedTime] = useState('');
	const [NewDate,setNewDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [getdata,setGetdata] = useState([])
  const [btnActive,setBtnActive] = useState(false);
  const [btnClick,setBtnClick] = useState(false);
  const [btnClick2,setBtnClick2] = useState(false);
  const [btnClick3,setBtnClick3] = useState(false);
  const [selectStatus,setSelectStatus] = useState('');

  const history = useNavigate();
  const location = useLocation();
  const categorynum = location.state.category;

  const { search } = useLocation();
  const ref = useRef(false);
//  const timeref= useRef();


 const status = `can't`;
 const status2 = `can't`;




 const dateClick =useCallback((e)=>{
  setNewDate(moment(e).format("YYYY-MM-DD",true).toString());
},[NewDate])

const checkTimeInArray = (time) =>{
  return timepart.some(item => item.reservation_time === time);
}
    const ButtonTable = () =>{
      return(
        <>
        <ol className="table_time">
          <input
            type="button"
            name="10"
            value="10:00"
            className={
             checkTimeInArray('10:00')
                ? "cant"
                : btnClick === true
                ? "selected"
                : btnClick === false
                ? "can"
                : null
            }
            onClick={timeClick}
          ></input>
           <input
            type="button"
            name="12"
            value="12:00"
            className={
              checkTimeInArray('12:00')
                ? "cant"
                : btnClick2 === true
                ? "selected"
                : btnClick2 === false
                ? "can"
                : null
            }
            onClick={timeClick2}
          ></input>
           <input
            type="button"
            name="14"
            value="14:00"
            className={
              checkTimeInArray('14:00')
                ? "cant"
                : btnClick3 === true
                ? "selected"
                : btnClick3 === false
                ? "can"
                : null
            }
            onClick={timeClick3}
          ></input>
          <input
            type="button"
            name="16"
            value="16:00"
            className={
              checkTimeInArray('16:00')
                ? "cant"
                : btnActive === true
                ? "selected"
                : btnActive === false
                ? "can"
                : null
            }
            onClick={timeClick4}
          ></input>
        </ol>
        </>
      )
    }

    const openModal = () => {
      const today = new Date();

      if(clickedTime===null||clickedTime==='')
      {
        alert("시간을 선택해주세요");
        return ;
      }
      else if(NewDate<moment(today).format("YYYY-MM-DD",true).toString())
      {
        alert("이전 날짜는 예약이 불가능합니다.");
        return;
      }
      else{
         setModalOpen(true);
      }
    };
    const closeModal = () => {
         setModalOpen(false);
    };

    const timeClick = useCallback(async(e) =>{
        let second = 0;
        setBtnClick(!btnClick);
        second++;
        if(btnClick===true||second===1)
        {
          setBtnActive(false);
          setBtnClick2(false);
          setBtnClick3(false);
          second=0;
        }
        if(clickedTime==="10:00")
        {
          setClickedTime('');
        }
        else if(clickedTime===""||clickedTime==="14:00"){
        setClickedTime(e.target.value)
        }
     },[btnActive,btnClick,btnClick2,btnClick3])

    const timeClick2 =useCallback(async(e) =>{
      let second = 0;
      setBtnClick2(!btnClick2);
      second++;
      if(btnClick2===true||second===1)
      {
        setBtnClick(false);
        setBtnClick3(false);
        setBtnActive(false);
        second=0;
      }
      if(clickedTime==="12:00")
      {
        setClickedTime('');
      }
      else if(clickedTime===''||clickedTime==="10:00"||clickedTime==="14:00"||clickedTime==="16:00"){
        setClickedTime(e.target.value);
      }

    },[btnActive,btnClick,btnClick2,btnClick3]);
    console.log(NewDate);
    const timeClick3 =useCallback(async(e) =>{
      let second = 0;
      setBtnClick3(!btnClick3);
      second++;
      if(btnClick3===true||second===1)
      {
        setBtnActive(false);
        setBtnClick(false);
        setBtnClick2(false);
        second=0;
      }
      if(clickedTime==="14:00")
      {
        setClickedTime('');
      }
      else if(clickedTime===''||clickedTime==="10:00"||clickedTime==="12:00"||clickedTime==="16:00"){
        setClickedTime(e.target.value);
      }

    },[btnActive,btnClick,btnClick2,btnClick3]);
    const timeClick4 =useCallback(async(e) =>{
      let second = 0;
      setBtnActive(!btnActive);
      second++;
      if(btnActive===true||second===1)
      {
        setBtnClick3(false);
        setBtnClick(false);
        setBtnClick2(false);
        second=0;
      }
      if(clickedTime==="16:00")
      {
        setClickedTime('');
      }
      else if(clickedTime===''||clickedTime==="10:00"||clickedTime==="12:00"||clickedTime==="14:00"){
        setClickedTime(e.target.value);
      }

    },[btnActive,btnClick,btnClick2,btnClick3]);
   
  const getReservation = useCallback(async() => {
    CommonHeader.authorization = token;
    
    let requri = PreUri + '/reservation/equipment?date=' + NewDate;
    if(categorynum > 0 && categorynum < 100){
      requri += "&category=" + categorynum;
    }

    const response = await fetch(requri, {
      method:Method.get,
      headers:CommonHeader
    })

    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setGetdata(json);
    let reuri = PreUri + '/reservation/time?date='+ NewDate;
    if(categorynum > 0 && categorynum < 100){
      reuri += "&category=" + categorynum;
    }
    const res = await fetch(reuri,{
      method:Method.get,
      headers:CommonHeader
    })
    if(!res.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const list = await res.json();
    if(json === null)
    {
      setSelectStatus("can")
    }
    else {
      setSelectStatus(`can't`)
    }
 
    setTimepart(list);

  },[token,NewDate])
  useEffect(()=>{
    getReservation();
    ButtonTable();
    //setNewDate(moment(value).format("YYYY-MM-DD",true).toString());
    return () => {
      ref.current = true;
  }
  },[getReservation,setNewDate,setSelectStatus])

  const sendData = useCallback(async() =>{
   /*  let reservation;
    for (let i = 0; i < getdata.length;i++){
        reservation+=i
    } */
    CommonHeader.authorization = token;
   
    const response = await fetch(PreUri + '/reservation/equipment_reserv',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify({
        reservation_status:btnActive ? status : status2 ,
        reservation_date:NewDate ,
        reservation_time:clickedTime,
        equipment_category_no:categorynum
      })
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    setModalOpen(false);
    history(0);
  },[getdata,token,clickedTime])
    // get api
    // data
    
  /*   const handleDateClick = (date) => {
      if (!date) {
        // 선택된 날짜가 null 또는 undefined인 경우
        console.error('유효하지 않은 날짜입니다.');
        return;
      }
      if(previousDate && date.getTime() > previousDate.getTime()){
        console.log('다음 날짜를 선택했습니다');
      }
      else {
        console.log('이전 날짜를 선택했습니다.')
      }
      setCurrentDate(date);
      setPreviousDate(date);
    } */
  return (
    <>
     <div id="pageSub02a3">
      <TextExtraType1a></TextExtraType1a>
      <div className="select_wrap">
    <div className="select_date_type1 select_type1">
      <TitleType1 title="날짜 선택"></TitleType1>
      <div className="date_calendar">
        <div className="calendar_month">
        </div>
        <div className="calendar_day">
        <Calendar 
		  	onChange={onChange} 
			  value={value}
			  locale="ko"
			  next2Label={null}
			  prev2Label={null}
//        minDate={new Date()}
			  formatDay={(locale, date) =>
				date.toLocaleString('en', { day: 'numeric' })
			  }
			showNeighboringMonth={false}
      onClickDay={(e)=>dateClick(e)}
      
			/>
          <TableInfoType1a></TableInfoType1a>
      <div className="table_btns table_btns_type1">
      <StyledBtn onClick={openModal} >예약</StyledBtn>
      {modalOpen && <ReservModal sendData={sendData} clicked={clickedTime} visible={modalOpen} onClose={closeModal} isLoggedIn={isLoggedIn} closable={true}>
       해당 날짜에 정말 예약 하시겠습니까?
      </ReservModal>
      }
      <ButtonType4 btnName="목록" ></ButtonType4>
      </div>
        </div>
      </div>
    </div>
      <div className="select_time_type1 select_type1">
      <TitleType1 title="시간 선택"></TitleType1>
      <ButtonTable/>
      <TableInfoType1b></TableInfoType1b>
      </div>
      </div>
      </div>
      </>
  );
}

 const StyledBtn= styled.button`
  color:#fff;
  background-color:#313f4f;
  width:120px;
  height:40px;
  font-size:0.8rem;
  cursor:pointer;
  border:1px solide #313f4f;
   &:hover{
      background-color:#transparent
      color:#313f4f
   }
 `
  