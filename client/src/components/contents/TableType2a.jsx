import React,{useState,useEffect,useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg } from '../../CommonCode';
import ButtonType2, { ButtonType2small,ButtonType3small, ButtonType2test } from "./ButtonType2";
import '../../css/ModalStyle.css';
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { NavLink,Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Paging } from "./Paging";
import '../../css/Paging.css'
export default function TableType2a() {
   const { token } = useSelector(state => state.user);
   const [reservationList, setReservationList] = useState([]);
   const [count,setCount] = useState(0);
   const [loading,setLoading] = useState(false);
   const [currentPage,setCurrentPage] = useState(1);
   const [postPage, setPostPage] = useState(10);
   const indexOfLastPost = currentPage * postPage
   const indexOfFirstPost = indexOfLastPost - postPage
   const currentPost = reservationList.slice(indexOfFirstPost, indexOfLastPost)
   const location = useLocation();
   const history = useNavigate();

    
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
      setLoading(false);
      setCount(json.length);
   },[])

   useEffect(()=>{
    getItemList();
   },[])

   const setPage = (e) =>{
     setCurrentPage(e);
   }
   const setBtnClick = (e) =>{
      console.log(e.target.name);
   }
   const onSend = () =>{
     history()
   }
   
   const categoryNum = reservationList.map((item,index)=> item.equipment_category_no);

  return (
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <ButtonType2 btnName="내 예약 정보 조회"></ButtonType2>
        <select name="" id="">
          <option value="1">분류</option>
          <option value="2">날짜</option>
        </select>
      </div>
      <table>
        <caption className="blind">장비 예약</caption>
        <thead>
          <tr>
            <th>사진</th>
            <th>모델명</th>
            <th>구분</th>
            <th>스펙</th>
            <th>설치장소</th>
            <th>교육</th>
            <th>예약</th>
          </tr>
        </thead>
        <tbody>
          {currentPost && reservationList.length > 0 ? (currentPost.map((item,i)=>(
            <tr key={i}>
                <td><img alt="no image" src={item.model_name.includes("A0플로터")?flotersrc:item.model_name.includes("X-cut")?xcutsrc:item.model_name.includes("UV 프린터 : 329UV")?uvsrc:item.model_name.includes("FDM : 3DWOX") ?fdmsrc:null}/></td>
                <td>{item.model_name}</td>
                <td></td>
                <td>{item.model_specification}</td>
                <td>{item.location}</td>
               
                <td className="btns_wrap">
                <ButtonType2small modelName={item.model_name.includes("A0플로터") ? floterlink: item.model_name.includes("X-cut") ? xcutlink: item.model_name.includes("UV 프린터 : 329UV") ? printerlink:item.model_name.includes("FDM : 3DWOX") ? fdmlink:elselink} className="video_btn" btnName="동영상보기"/>
                <ButtonType2test  active={item.model_name.includes("A0플로터") ? active: item.model_name.includes("X-cut") ? active: item.model_name.includes("UV 프린터 : 329UV") ? active:item.model_name.includes("FDM : 3DWOX") ? active:nonactive} name={item.model_name} test={false}></ButtonType2test>
                 </td>
                 <td className="res_btn">
                 <ButtonType3small categoryNo={categoryNum[i]}active={item.model_name.includes("A0플로터") ? active: item.model_name.includes("X-cut") ? active: item.model_name.includes("UV 프린터 : 329UV") ? active:item.model_name.includes("FDM : 3DWOX") ? active:nonactive} btnName="예약하기"></ButtonType3small>
                </td>
               
            </tr>
          ))
          ):<div>게시물이 없습니다.</div>}
        </tbody>
      </table>
      <div className="page_control">
            <Paging page={currentPage} count = {count} setPage={setPage}/>
      </div>
    </div>
  );
}
