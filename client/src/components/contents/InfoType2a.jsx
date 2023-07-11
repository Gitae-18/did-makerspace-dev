import React,{useEffect,useState,useCallback,useMemo}from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import TitleType1 from "./TitleType1";
import ButtonType2,{GoBackBtn}from "./ButtonType2";
import ButtonType4 from "./ButtonType4";
import SectionTabType1a from "../sections/SectionTabType1a";
import styled from "styled-components";
import PopupModal2 from "../Modals/PopupModal2";
import SubSideMenu from "./SubSideMenu";
import ImageProgram from "../sections/ImageProgram";
import EduReservModal from "../Modals/EduReservModal";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import { COUNT_INCREASE } from "../../store/action";
import { IoLocation,IoCalendarSharp,IoPerson } from "react-icons/io5";
import { RiReservedFill ,RiCheckFill} from "react-icons/ri";
import { FaMoneyCheck } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
export default function InfoType2a({no}) {
  const history = useNavigate();
  const location = useLocation();
  //const no = location.state.no;
  const dispatch = useDispatch();
  const [openModal,setOpenModal] = useState(false);
  const [modalOpen,setModalOpen] = useState(false);
  const [data,setData] = useState([]);
  const [attachFile,setAttachFile] = useState({})
  const [fileNo,setFileNo] = useState({});
  const [getFlag,setGetFlag] = useState([]);
  const [title,setTitle] = useState("")
  const [cost,setCost] = useState();
  const { token, authority_level} = useSelector(state => state.user);
  let type = "class";
  const getEduList = useCallback(async()=>{
    CommonHeader.authorization = token;

    let requri = PreUri + '/classedu/'+ no +'/class_receive';

    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }

    const json = await response.json();
    setData(json);
    setCost(json.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setTitle(json.title);
  },[token])

/* 
  const ongetImage = useCallback(async(e,index)=>{
    let requri = PreUri + '/classedu/'+ no + '/getimage';
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setImageUrl(json.path);
    const reader = new FileReader();
    reader.onload = (event) =>{
      const downloadImage = String(event.target?.result);
    }
  },[title])
 */
  let  button_click = document.getElementById('button_id');
  let counter;

  const getApplicationList = useCallback(async()=>{
   
    let uri = PreUri + '/classedu/class_application?title=' + encodeURI(title)

    const response = await fetch(uri,{
      method:Method.get,
      headers:CommonHeader,
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
  
    const json = await response.json();
    setGetFlag(json)
  },[token,title])
 
  const onApplicate = useCallback(async() =>{
    if (getFlag.length < data.limit_number) {
    setOpenModal(true);

   CommonHeader.authorization = token;

    const response = await fetch(PreUri + '/classedu/class_application',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify(
        {
          program_no:no,
          type: type,
          title : title,
          flag : 'Y',
        }
      )
    })
    if (!response.ok) {
      return(alert(getRspMsg(response.status)));
    }
  } else {
    alert('정원이 가득찼습니다.');
  }
  },[getFlag])     

  const getFile = useCallback(async()=>{

    const res = await fetch(PreUri + '/classedu/' + no + '/files', {
      method: Method.get,
    })
    const fileList = await res.json();
    if(fileList!==null||undefined)
    {
    setAttachFile(fileList)
    }
  },[token,no])
  
  const getFileNo = useCallback(async()=>{
    const response = await fetch(PreUri + '/classedu/'+ no + '/filesno',{
      method:Method.get,
      headers:CommonHeader
    })
    const json = await response.json();

    setFileNo(json);
  },[no])
  useEffect(()=>{   
    getFile();
    getFileNo();
    getEduList();
    getApplicationList();
  },[getApplicationList,token,title,getFile,getFileNo,getEduList])
  const onClose = () =>{
    setOpenModal(false);
  }
  const openReserv = () =>{
    setModalOpen(true);
  }
  const reservClose = () =>{
    setModalOpen(false);
  }
  return (

    <div className="info_type2"> 
      <div className="title_part">
      {data.attached_file==="Y"?<ImageProgram attachFile={attachFile} no={no} token={token} CommonHeader={CommonHeader} />:<img src="/images/Noimg.png" alt="no"/>}
        <div className="info_part">
          <TitleType1 title={title}></TitleType1>
     
          <div className="dl_wrap">
            <dl>
              <dt><IoCalendarSharp/>일시</dt>
              <dd>{data.class_period_start}</dd>
            </dl>
            <dl>
              <dt><IoLocation/>장소</dt>
              <dd>{data.place}</dd>
            </dl>
            <dl>
              <dt><RiReservedFill/>점수 및 등록 기간</dt>
              <dd>{data.application_period_start} ~ {data.application_period_end}</dd>
            </dl>
            <dl>
              <dt><RiCheckFill/>신청 가능 여부</dt>
              <dd>{getFlag.length > data.limit_number -1 ? "불가능": "가능"}</dd>
            </dl>
            <dl>
              <dt><IoPerson/>정원</dt>
              <dd>{getFlag.length}/{data.limit_number}명</dd>
            </dl>
            
            <dl>
              <dt><FaMoneyCheck/>비용</dt>
              <dd>{cost}원</dd>
            </dl>
          </div>
          <div className="btns">
            <StyledBtn id="button_id" onClick={onApplicate}>신청하기</StyledBtn>
            {openModal && getFlag.length < data.limit_number && <PopupModal2 visible={openModal} closable={true} onclose={onClose} history={history} location={location}/>}
            {authority_level>10?<StyledBtn onClick={openReserv}>예약목록</StyledBtn>
            :null}
            {modalOpen && <EduReservModal visible={modalOpen} closeable={true} onclose ={reservClose} no={no}/>}
          </div>
        </div>
      </div>
      <div className="desc_part">
        <SectionTabType1a content={data.content} no={no} attachFile={attachFile}></SectionTabType1a>
      </div>
      <div className="btn_part">
      <StyledBtn2 onClick={(e)=>history('/classprogram')}><BsListUl style={{"position":"relative","top":"2px",'right':'1px'}}/>목록</StyledBtn2>
      </div>
    </div>

  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:40px;
font-size:0.8rem;
cursor:pointer;
position:relative;
bottom:5px;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledBtn2= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:40px;
font-size:0.8rem;
cursor:pointer;
position:absolute;
left:600px;
bottom:50px;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `