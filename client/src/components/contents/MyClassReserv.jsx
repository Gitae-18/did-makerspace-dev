import React,{useState,useEffect, useCallback}from "react";
import TitleType1 from "./TitleType1";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import Paging2 from "./Paging2";
import styled from "styled-components";
export default function MyClassReserv() {
  const { token } = useSelector(state => state.user);
  const [reservList,setReservList] = useState([]);
  const location = useLocation();
  const [data,setData] = useState([]);
  const [title,setTitle] = useState("")
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

    let uri = PreUri + '/classedu/myclass_application'
     
    const response = await fetch(uri,{
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
        let requri = PreUri + '/classedu/myclass_application';
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setReservList(json);
     
  }
  else{
    const filterData = reservList.filter((item) => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setReservList(filterData)
  
    setCurrentPage(1)
  }
 setSearch('');
},[search])

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
        <select name="" id="">
            <option value="1">모델명</option>
          </select>
        <input type="text" name="" id="" placeholder="제목을 입력하세요" onKeyDown={(e) => activeEnter(e)} onChange={onChange}/>
          <StyledBtn onClick={(e)=>onSearch(e)} >검색</StyledBtn>
          </div>
      </div>
      <table>
        <caption className="blind">내 교육/행사 예약</caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>구분</th>
            <th>제목</th>
            <th>예약시간</th>
          </tr>
        </thead>
        <tbody>
          {currentPost && reservList.length>0 ? reservList.map((item,index)=>(
            <tr key={index}>
            <td>{reservList.length - index - (currentPage - 1) * 10}</td>
            <td>{item.classedu_type==="class"? "행사프로그램":"교육프로그램"}</td>
            <td>{item.title}</td>
            <td>
              <span className="date">{item.created_at.slice(0,10).replaceAll('-','/')}</span>
              &nbsp;
              <span className="time">{item.created_at.slice(10,)}</span>
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
