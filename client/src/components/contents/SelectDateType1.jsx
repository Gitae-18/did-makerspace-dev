import React ,{useState,useRef,useEffect,createContext,useCallback,useMemo}from "react";
import TableInfoType1a from "./TableInfoType1a";
import TableInfoType1b from "./TableInfoType1b";
import TitleType1 from "./TitleType1";
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
import { elementClosest } from "@fullcalendar/react";
export const CurrentContext = createContext();
export default function SelectDateType1() {
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useSelector(state => state.user);
  const [start, setStart] = useState(new Date());
	const navigate = useNavigate();
	const dispatch = useDispatch();
  const [clickedTime,setClickedTime] = useState('10:00');
  const [status,setStatus] = useState('can');
  const [status2,setStatus2] = useState('can');
	const [NewDate,setNewDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [getdata,setGetdata] = useState({
    reservationNo:0,
    date: '',
    status: '',
  })
  const [targetTime ,setTargetTime] = useState("");
  const [btnActive,setBtnActive] = useState(false);
  const [currentStatus,setCurrentStatus] = useState(`can`);
  const [btnClick,setBtnClick] = useState(false);
  const [name,setName] = useState('can');
  const [names,setNames] = useState('can');
  const ref = useRef();
  const timetable = ["10:00","14:00"];
  const [daystatus,setDaystatus] = useState('');
  const history = useNavigate();
  const location = useLocation();
  const categorynum = location.state.category;
  const { search } = useLocation();
  const query = qs.parse(search, {
     ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
 });
  /* const onSubmit = () =>{
		dispatch({type:SET_DATE, target:NewDate})
	} */
  const dateClick = () =>{
    setNewDate(moment(start).format("YYYY-MM-DD",true).toString());
  }
  const openModal = () => {
    setModalOpen(true);
    if(btnActive === true)
    {
    setStatus(`can't`);
    }
    if(btnClick === true){
    setStatus2(`can't`);
    }
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
 
  const getReservation = useCallback(async() => {
    CommonHeader.authorization = token;
    console.log(token)
    let requri = PreUri + '/reservation/equipment?date=' + NewDate;
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
/*      setGetdata(getdata =>({
      ...getdata,
      reservationNo:json.result.equipment_reservation_no,
      status:json.result.reservation_status,
      date:json.result.reservation_date
    }));  */
  },[token,NewDate,clickedTime])
  useEffect(()=>{
    dateClick();
    getReservation();
    TimeTable(NewDate);
  },[ token,start,NewDate,status,status2,clickedTime ])


  const sendData = useCallback(async() =>{
    let reservation;
    for (let i = 0; i < getdata.length;i++){
        reservation+=i
    }
    CommonHeader.authorization = token;

    const response = await fetch(PreUri + '/reservation/equipment_reserv',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify({
        reservation_no:reservation,
        reservation_status:clickedTime==='10:00'?status:status2,
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


  return (
    <>
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
      <TimeTable data={getdata} btnClick={btnClick} btnActive={btnActive} timeClick={timeClick} timeClick2={timeClick2}/>
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
  