import React,{useEffect,useState,useCallback,useMemo}from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import TitleType1 from "./TitleType1";
import ButtonType2,{GoBackBtn}from "./ButtonType2";
import ButtonType4 from "./ButtonType4";
import SectionTabType1a from "../sections/SectionTabType1a";
import styled from "styled-components";
import PopupModal2 from "../PopupModal2";
import SubSideMenu from "./SubSideMenu";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import { COUNT_INCREASE } from "../../store/action";
export default function InfoType2b() {
  const history = useNavigate();
  const location = useLocation();
  const no = location.state.no;
  const dispatch = useDispatch();
  const [openModal,setOpenModal] = useState(false);
  const [closemodal,setCloseModal] = useState(false);
  const [data,setData] = useState([]);
  const [imageUrl,setImageUrl] = useState("");
  const [getFlag,setGetFlag] = useState([]);
  const [limit,setLimit] = useState("");
  const [title,setTitle] = useState("")
  const [count,setCount] = useState();
  const { token } = useSelector(state => state.user);
  let type = "edu";

  const getEduList = useCallback(async()=>{
    CommonHeader.authorization = token;
    const tit = 0;
    let requri = PreUri + '/classedu/class_receive?no=' + no;

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
    setTitle(json.title);
  },[token])

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
  console.log(imageUrl)
  let  button_click = document.getElementById('button_id');
  let counter;
 console.log(title);
  const getApplicationList = useCallback(async()=>{
    CommonHeader.authorization = token;
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
 
  console.log(getFlag);
  const onApplicate = useCallback(async() =>{
    setOpenModal(true);
   // dispatch({ type: COUNT_INCREASE, target: count });
    CommonHeader.authorization = token;
   
    const response = await fetch(PreUri + '/classedu/class_application',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify(
        {
          type: type,
          title : title,
          flag : 'Y',
        }
      )
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
  },[getFlag])     
 /*  const memo = useMemo(()=>{
    return onApplicate();
  }) */
 
  useEffect(()=>{
    getEduList();
    ongetImage();
    getApplicationList(data);
  },[getEduList,getApplicationList,ongetImage,token,title])
  const onClose = () =>{
    setOpenModal(false);
  }
  return (

    <div className="info_type2">
      <div className="title_part">
        <div className="image_part"><img className="woodtray" src={'../../server/upload/newprogram/class.png'} alt="no-image"/></div>
        <div className="info_part">
          <TitleType1 title={title}></TitleType1>
          <div className="dl_wrap">
            <dl>
              <dt>일시</dt>
              <dd>{data.class_period_start}</dd>
            </dl>
            <dl>
              <dt>장소</dt>
              <dd>{data.place}</dd>
            </dl>
            <dl>
              <dt>점수 및 등록 기간</dt>
              <dd>{data.application_period_start} ~ {data.application_period_end}</dd>
            </dl>
            <dl>
              <dt>신청 가능 여부</dt>
              <dd>{getFlag.length > data.limit_number -1 ? "불가능": "가능"}</dd>
              {getFlag.length > data.limit_number -1 ? alert("정원이 가득참"):null}
            </dl>
            <dl>
              <dt>정원</dt>
              <dd>{data.limit_number}명</dd>
            </dl>
            <dl>
              <dt>비용</dt>
              <dd>25,000원</dd>
            </dl>
          </div>
          <div className="btns">
            <StyledBtn id="button_id" onClick={onApplicate} disabled={getFlag.length>data.limit_number-1?true:false} type="submit">신청하기</StyledBtn>
            {openModal && getFlag.length < data.limit_number && <PopupModal2 visible={openModal} closable={true} onclose={onClose} history={history} location={location}/>}
          
          </div>
        </div>
      </div>
      <div className="desc_part">
        <SectionTabType1a content={data.content}></SectionTabType1a>
      </div>
      <StyledBtn2>목록</StyledBtn2>
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