import React,{useState,useEffect, useCallback}from "react";
import TitleType1 from "./TitleType1";
import { useSelector } from "react-redux";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import Paging2 from "./Paging2";
import styled from "styled-components";
import PopupDeleteModal4 from "../Modals/PopupDeleteModal4";
export default function TableType2b() {
  const { token } = useSelector(state => state.user);
  const [reservList,setReservList] = useState([]);
  const [modalvisible,setModalVisible] = useState(false);
  const [dropno,setDropNo] = useState();
  const [search,setSearch] = useState('');
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
  console.log(dropno)
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onSearch(e);
    }
  }
  const handlePageChange = (e) =>{
    setCurrentPage(e)
  }

  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
        let requri = PreUri + '/reservation/myreserv';
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setReservList(json);
     
  }
  else{
    const filterData = reservList.filter((item) => item.model_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setReservList(filterData)
  
    setCurrentPage(1)
  }
 setSearch('');
},[search])
const closeModal = () =>{
  setModalVisible(false);
}
const DropItem = useCallback(async(e,i)=>{
  setModalVisible(true);
  setDropNo(e.equipment_reservation_no);
  },[reservList])
  const setPage = (e) =>{
    setCurrentPage(e);
  }

  useEffect(()=>{
    getReservList();
  },[getReservList,token])
  return (
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <div className="table_search">

          </div>
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
            <th>예약취소</th>
          </tr>
        </thead>
        <tbody>
          {currentPost && reservList.length>0 ? currentPost.map((item,index)=>(
            <tr key={index}>
            <td>Image</td>
            <td>{item.model_name}</td>
            <td>CNC</td>
            <td>{item.specification}</td>
            <td>{item.location}</td>
            <td>
              <span className="date">{item.reservation_date.slice(0,).replaceAll('-','/')+'/'+item.reservation_time}</span>
            </td>
            <td><StyledBtn3 onClick={(e)=> DropItem(item,index)}>취소</StyledBtn3></td>
            {modalvisible&& <PopupDeleteModal4  no={dropno} visible={modalvisible} closable={true} maskClosable={true} onclose={closeModal} token={token} serviceItems={reservList} />} 
          </tr>)):<>내용이 비었습니다</>}
        </tbody>
      </table>
      <div className="page_control">
      <Paging2 page={currentPage} count = {count} setPage={setPage}/>
      </div>
    </div>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledBtn3= styled.button`
  color:#fff;
  background-color:#313f4f;
  width:50px;
  height:30px;
  font-size:0.7rem;
  cursor:pointer;
   &:hover{
      background-color:#transparent
      color:#313f4f
   }
   `