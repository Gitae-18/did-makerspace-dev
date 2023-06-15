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
export default function TableType2a_a() {
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
      let requri = PreUri + `${'/reservation/reserv_list'}`;
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
      setLoading(false);
      setCurrentPosts(json.slice(indexOfFirstPost,indexOfLastPost))
   },[])

   console.log(reservationList)
  useEffect(()=>{
    getUserTest();
    getItemList();
    //checkTestFlag();
   },[getUserTest,getItemList])
  return (
    <div id="sub_page_wrap">
        <SubSideMenu title={"장비예약"} ></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
    <div id="pageSub02a1">
      <TextExtraType1a></TextExtraType1a>
    <div className="table_wrap table_type4">
      <div className="table_extra">
        <ButtonType2 btnName="내 예약정보"></ButtonType2>
      </div>
      <table>
        <caption className="blind">장비 예약</caption>
        <thead>
            <th>이름</th>
            <th>모델명</th>
            <th>날짜</th>
        </thead>
        <tbody>
          {currentPosts && reservationList.length > 0 ? (reservationList.map((item,i)=>(
            <tr key={i}>
             <td>{item.username}</td>
             <td>{item.modelname}</td>
             <td>{item.created_at.slice(0,10)}</td>
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