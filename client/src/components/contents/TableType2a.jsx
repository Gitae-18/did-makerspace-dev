import React,{useState,useEffect,useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg } from '../../CommonCode';
import PopupModal3 from "../Modals/PopupModal3";
import ButtonType2, { ButtonType2small,ButtonType3small, ButtonType2test } from "./ButtonType2";
import SubSideMenu from "./SubSideMenu";
import TextExtraType1a from "./TextExtraType1b";
import '../../css/ModalStyle.css';
import Pagination from "react-js-pagination";
import '../../css/Paging.css'
import styled from "styled-components";
import VideoModal from "./VideoModal";
export default function TableType2a() {
   const { token } = useSelector(state => state.user);
   const [reservationList, setReservationList] = useState([]);
   const [passflag ,setPassFlag] = useState([]);
   const [count,setCount] = useState(0);
   const [equiptype,setEquipType] = useState('');
   const [loading,setLoading] = useState(false);
   const [currentPage,setCurrentPage] = useState(1);
   const [postPage, setPostPage] = useState(2);
   const indexOfLastPost = currentPage * postPage
   const indexOfFirstPost = indexOfLastPost - postPage
   const [currentPosts,setCurrentPosts] = useState([]);
   //const [passtype,setPasstype] = useState([]);
   //const location = useLocation();
   //const history = useNavigate();
   const [modalVisible,setModalVisible] = useState(true);
   const [visible,setVisible] = useState(false);
  const [link,setLink] = useState("");
    //let rowNumber = Array.from(1,reservationList.length);
   const printerlink = "https://www.youtube.com/embed/QtZxg1LiilM";
   const floterlink = "https://www.youtube.com/embed/qBw5-KbJ9Vs";
   const fdmlink = "https://www.youtube.com/embed/c-pkmy2TEiw";
   const xcutlink = "https://www.youtube.com/embed/zpf5MHCSkI8";
   const elselink = "https://www.youtube.com/embed/1fqwqZlxJ-c";
   const active ="active";
   const nonactive = "nonactive";
   const flotersrc = '/images/A0floter.png';
   const xcutsrc = '/images/xcut.png';
   const fdmsrc = '/images/fdm3dwox1.png';
   const uvsrc = '/images/uvprinter.png';

   const getUserTest = useCallback(async()=>{

    CommonHeader.authorization = token;

      const requri = PreUri + '/userequipmentestpass/testresult'  
      const response = await fetch(requri,{
        method:Method.get,
        headers:CommonHeader
      })
      if (!response.ok) {
        console.log('잘못된 접근입니다.');
        return;
      }
      const json = await response.json();

      setPassFlag(json);
    
   },[token])

   //
   let typepass = passflag.map((item)=>item.type);
   //
   let pass =  passflag.map((item)=>item.pass_flag);
 
   //
    /* for (let i = 0 ; i < passflag.length ; i++){
      if(passflag[i].pass_flag==="Y" )
      {
        pass="Y";
      }
      else
      {
        pass="N";
      }
    } */
   const getItemList = useCallback(async(currentPage)=>{
      setLoading(true);
      let requri = PreUri + `${'/equipment/equipmentlist'}`;
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      if (!response.ok) {
        console.log('잘못된 접근입니다.');
        return;
      }
      const json = await response.json();
      setReservationList(json);
      getUserTest();
      setLoading(false);
      setCount(json.length);
      setCurrentPosts(json.slice(indexOfFirstPost,indexOfLastPost))
   },[])

   const setPage = (e) =>{
     setCurrentPage(e);
   }
   const openModal = () =>{
    setVisible(true)
   }
   const closePopupModal = () =>{
    setModalVisible(false);
  }
   const closeModal = () =>{
    setVisible(false);
  }
  const  goToVideo = useCallback((item,i) =>{
    if(reservationList[0]!==undefined){
    if(reservationList[i].model_name.includes("A0플로터"))
    {
      setLink(floterlink);
    }
    else if(reservationList[i].model_name.includes("UV 프린터 : 329UV")){
      setLink(printerlink);
    }
    else if(reservationList[i].model_name.includes("X-cut")){
      setLink(xcutlink);
    }
    else if(reservationList[i].model_name.includes("FDM : 3DWOX")){
      setLink(fdmlink);
    }
    else{
      setLink(elselink);
    }
  } 
  },[reservationList])
  useEffect(()=>{
    getUserTest();
    getItemList();
    goToVideo();
    //checkTestFlag();
   },[getUserTest,getItemList])
   const categoryNum = reservationList.map((item,index)=> item.equipment_category_no);
  return (
    <div id="sub_page_wrap">
      {modalVisible && <PopupModal3 visible={modalVisible} onClose={closePopupModal} closable={true} maskClosable={true}/>}
        <SubSideMenu title={"장비예약"} ></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
    <div id="pageSub02a1">
      <TextExtraType1a></TextExtraType1a>
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <ButtonType2 btnName="내 예약정보"></ButtonType2>
      </div>
      <table>
        <caption className="blind">장비 예약</caption>
        <thead>
          <tr>
            <th>사진</th>
            <th>모델명</th>
            <th>스펙</th>
            <th>설치장소</th>
            <th>교육</th>
            <th>예약</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts && reservationList.length > 0 ? (reservationList.map((item,i)=>(
            <tr className="res_tr" key={i}>
                <td><img alt="no image" src={item.model_name.includes("A0플로터")?flotersrc:item.model_name.includes("X-cut")?xcutsrc:item.model_name.includes("UV 프린터 : 329UV")?uvsrc:item.model_name.includes("FDM : 3DWOX") ?fdmsrc:null}/></td>
                <td>{item.model_name}</td>
                <td style={{"width":"410px","lineHeight":"40px","wordBreak":"break-all"}}>{item.model_specification}</td>
                <td>{item.location}</td>
                <td className="btns_wrap">
                <StyledBtn onClick={(e)=>{goToVideo(e,i);openModal(e)}}>동영상보기</StyledBtn>
                {pass[i] === "Y" ?<ButtonType2test btnName="시험불가"/>:
                <ButtonType2test  btnName="시험보기"active={item.model_name.includes("A0플로터") ? active: item.model_name.includes("X-cut") ? active: item.model_name.includes("UV 프린터 : 329UV") ? active:item.model_name.includes("FDM : 3DWOX") ? active:nonactive} name={item.model_name}/>
                }
                 </td>
                 {visible&&<VideoModal visible={visible} closable={true} maskClosable={true} onClose={closeModal} modelName={reservationList[i].model_name} src={link}/>}  
                 <td className="res_btn">
                  { pass[i] === "Y" && typepass.includes(item.model_name) ?
                 <ButtonType3small categoryNo={categoryNum[i]} active={item.model_name.includes("A0플로터") ? active: item.model_name.includes("X-cut") ? active: item.model_name.includes("UV 프린터 : 329UV") ? active:item.model_name.includes("FDM : 3DWOX") ? active : nonactive} btnName="예약하기"></ButtonType3small>:
                 <ButtonType3small btnName="예약 불가" style={{"background-color":"3f3f3f"}}></ButtonType3small>
                  }
                </td>
            </tr>
          ))
          ):<tr><td>게시물이 없습니다.</td></tr>}
        </tbody>
      </table>
      
      <div className="page_control">
{/*       <Pagination
       activePage={currentPage}
       itemsCountPerPage={5}
       totalItemsCount={reservationList.length}
       pageRangeDisplayed={10}
       prevPageText={"<"}
       nextPageText={">"}
       onChange={setPage}
    /> */}
      </div>
    </div>

    </div> 
    </div>
    </div>
    <div className="sub_page_outer">
  
      </div>
    </div>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:80px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
position:relative;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `