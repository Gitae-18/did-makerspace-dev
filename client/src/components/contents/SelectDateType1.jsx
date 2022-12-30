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
  const [timepart,setTimepart] = useState('10:00')
	const navigate = useNavigate();
	const dispatch = useDispatch();
  const [clickedTime,setClickedTime] = useState('10:00');
	const [NewDate,setNewDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [getdata,setGetdata] = useState([])
  const [targetTime ,setTargetTime] = useState("");
  const [btnActive,setBtnActive] = useState(false);
  const [currentStatus,setCurrentStatus] = useState(`can`);
  const [btnClick,setBtnClick] = useState(false);
  const [equiptype,setEquipType] = useState();


  const [daystatus,setDaystatus] = useState('');


  const history = useNavigate();
  const location = useLocation();
  const categorynum = location.state.category;

  const { search } = useLocation();
  const ref = useRef(false);
  const timeref= useRef();
  const timetable = ["10:00","14:00"];
  let statusclick = btnClick === true ? 'selected' : 'can';
  let statusclick2 =  btnActive === true  ? 'selected' : 'can';
 const status = `can't`;
 const status2 = `can't`;
    const dateClick = () =>{
         setNewDate(moment(start).format("YYYY-MM-DD",true).toString());
    }
    const openModal = () => {
         setModalOpen(true);
    };
    const closeModal = () => {
         setModalOpen(false);
    };

    const timeClick = (e,value) =>{
         setBtnActive(!btnActive);
         setClickedTime("10:00");
     }

    const timeClick2 =(e,value) =>{
        setBtnClick(!btnClick);
        setClickedTime("14:00");
   }

   console.log(clickedTime)
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
  if(json !== null && json.reservation_date !== undefined && json.reservation_date !== null){
      setTimepart(json.reservation_date.substring(10,15));
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
        reservation_date:NewDate + clickedTime,
        equipment_category_no:categorynum
      })
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    setModalOpen(false);
  },[getdata,token])
    // get api
    // data
     const restatus = getdata !== null ? getdata.reservation_status : btnClick === true ? 'selected' : 'can';
     const restatus2 = getdata !== null ? getdata.reservation_status : btnActive === true ? 'selected' : 'can';
    if(getdata!==undefined && getdata!==null && timepart !== null){
      if(restatus === `can't`){
          if(timepart==="10:00")
         {
            statusclick2= 'cant'
         }
      }
    }
    else if(getdata === null){
      if(btnClick === true){
        
        statusclick2 ='selected'
      } 
      else{
        statusclick2 ='can'
      }
    }
    if(getdata!==undefined && getdata!==null && timepart !== null){
      if(restatus2 === `can't`)
      {
         if(timepart==="14:00")
         {
            statusclick= 'cant'
         }
      } 
    }
    else if(getdata === null){
      if(btnActive === true){
        
        statusclick ='selected'
      }
      else{
        statusclick ='can'
      }
      
    }
     const ButtonTable = () =>{
      return(
         <ol className="table_time">
         <button type="button"  value={0}   className={statusclick} onClick={timeClick}>10:00</button>
         <button type="button"  value={1}   className={statusclick2} onClick={timeClick2}>14:00</button>
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
      {modalOpen && <ReservModal sendData={sendData} open={modalOpen} close={closeModal}>
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
  