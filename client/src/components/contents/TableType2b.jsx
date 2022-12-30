import React,{useState,useEffect, useCallback}from "react";
import TitleType1 from "./TitleType1";
import { useSelector } from "react-redux";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import Paging2 from "./Paging2";
export default function TableType2b() {
  const { token } = useSelector(state => state.user);
  const [reservList,setReservList] = useState([]);


  const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [postPage, setPostPage] = useState(10);
  const [count,setCount] = useState(0);
  const indexOfLastPost = currentPage * postPage
  const indexOfFirstPost = indexOfLastPost - postPage
  const currentPost = reservList.slice(indexOfFirstPost, indexOfLastPost)




  const getReservList = useCallback(async()=>{
    CommonHeader.authorization = token;

    let requri  = PreUri + '/reservation/myreserv';
     
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();

    setReservList(json);
    setCount(json.length);

  },[token])

  const setPage = (e) =>{
    setCurrentPage(e);
  }

  useEffect(()=>{
    getReservList();
  },[getReservList,token])
  return (
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <TitleType1 title="내 예약 정보"></TitleType1>
        <select name="" id="">
          <option value="1">분류</option>
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
            <th>예약시간</th>
          </tr>
        </thead>
        <tbody>
          {reservList.length>0 ? reservList.map((item,index)=>(
            <tr key={index}>
            <td>Image</td>
            <td>{item.model_name}</td>
            <td>CNC</td>
            <td>{item.specification}</td>
            <td>{item.location}</td>
            <td>
              <span className="date">{item.reservation_date.slice(0,9).replaceAll('-','/')}</span>
              &nbsp;
              <span className="time">{item.reservation_date.slice(10,)}</span>
            </td>
          </tr>)):<>내용이 비었습니다</>}
        </tbody>
      </table>
      <div className="page_control">
      <Paging2 page={currentPage} count = {count} setPage={setPage}/>
      </div>
    </div>
  );
}
