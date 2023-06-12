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
  const [start, setStart] = useState(new Date());
  const [timepart,setTimepart] = useState('')
  const {isLoggedIn} = useSelector(state => state.user);
	const navigate = useNavigate();
  const [isClickEnabled,setIsClickEnabled] = useState(true);
  const [clickedTime,setClickedTime] = useState('');
	const [NewDate,setNewDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [getdata,setGetdata] = useState([])
  const [btnActive,setBtnActive] = useState(false);
  const [btnClick,setBtnClick] = useState(false);
  const [selectStatus,setSelectStatus] = useState('');
  const history = useNavigate();
  const location = useLocation();
  const categorynum = location.state.category;

  const { search } = useLocation();
  const ref = useRef(false);
  const timeref= useRef();
  const timetable = ["10:00","14:00"];

 const status = `can't`;
 const status2 = `can't`;
    const dateClick = () =>{
         setNewDate(moment(start).format("YYYY-MM-DD",true).toString());
    }
    const openModal = () => {
      if(clickedTime===null||clickedTime==='')
      {
        alert("시간을 선택해주세요");
        return ;
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
          second=0;
        }
        if(clickedTime==="10:00")
        {
          setClickedTime('');
        }
        else if(clickedTime===""||clickedTime==="14:00"){
        setClickedTime(e.target.value)
        }
     },[btnClick,btnActive])


    const timeClick2 =useCallback(async(e) =>{
      let second = 0;
      setBtnActive(!btnActive);
      second++;
      if(btnActive===true||second===1)
      {
        setBtnClick(false);
        second=0;
      }
      if(clickedTime==="14:00")
      {
        setClickedTime('');
      }
      else if(clickedTime===''||clickedTime==="10:00"){
        setClickedTime(e.target.value);
      }

    },[btnActive,btnClick]);
   
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
    if(json!==null)
    {
    setSelectStatus(json.reservation_status);
    }
  if(json !== null && json.reservation_date !== undefined && json.reservation_date !== null){
      setTimepart(json.reservation_time);
    } 
    if(isClickEnabled){
      setIsClickEnabled(false);

      setTimeout(()=>{
        setIsClickEnabled(true);
      },1000);
    }
/*      setGetdata(getdata =>({
      ...getdata,
      reservationNo:json.result.equipment_reservation_no,
      status:json.result.reservation_status,
      date:json.result.reservation_date
    }));  */
  },[token,NewDate,clickedTime])

  useEffect(()=>{
    dateClick();
    ButtonTable();
    getReservation();
    return () => {
      ref.current = true;
  }
  },[getReservation,token,NewDate,start])



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
  },[getdata,token,clickedTime])
    // get api
    // data
      
     const ButtonTable = () =>{
      return(
         <ol className="table_time">
         <input type="button" name="10" value="10:00"   className={selectStatus===`can't`&&timepart==="10:00"?'cant':btnClick===true?"selected": btnClick===false?"can":null} onClick={timeClick}></input>
         <input type="button" name="14" value="14:00"   className={selectStatus===`can't`&&timepart==="14:00"?'cant':btnActive===true?"selected": btnActive===false?"can":null} onClick={timeClick2}></input>
         </ol>
      )
    }
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
		  	onChange={setStart} 
			  value={start}
			  locale="ko"
			  next2Label={null}
			  prev2Label={null}
        minDate={new Date()}
			  formatDay={(locale, date) =>
				date.toLocaleString('en', { day: 'numeric' })
			  }
			showNeighboringMonth={false}
      onClickDay={dateClick}
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
/* export const TableBtnsType1a = () => {
  

  const navigate = useNavigate();
  const OpenModal = () =>{
    setModal(true);
    return(
      <>
      {modal === true?
      <reservBtn>
        <span>예약하시겠습니까</span>
        <button type="button" onClick={OpenModal}>확인</button>
        <button>취소</button>
      </reservBtn>
      :null
      }
      </>
    )
  }

  return (
   
    <div className="table_btns table_btns_type1">
    
       <ButtonType4 btnName="목록" ></ButtonType4>
      </div>
  );
} */


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
 const reservBtn = styled.div`
 background-color:#ffffff;
 border : 1px solid #000;
 width: 200px;
 height:150px;
 `
 const clickBtn  =  styled.div`
  width:200px;
  height:10vh;
  background-color:#ffffff;
  border : 1px solid #000;
  `  
  