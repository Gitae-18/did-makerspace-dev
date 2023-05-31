import React,{useState,useEffect,useCallback} from "react";
import ButtonType2 from "./ButtonType2";
import { useLocation,useNavigate,NavLink } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import { M_NOTICE_SET } from "../../store/notice";
import { Paging } from "./Paging";
import Paging2 from "./Paging2";
import styled from "styled-components";
export default function TableType1e() {

  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [data,setData] = useState([]);
  //pagenation
  const [page,setPage] = useState(1);
  const [search,setSearch] = useState('');
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [currentPosts,setCurrentPosts] = useState([]);
  const postPerPage = 10;
  const offset = (page-1)*postPerPage;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)
  
  const getData = useCallback(async()=>{

    let requri = PreUri + '/notice/noticelist';
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
    setCount(json.length)
  },[])


  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const handlePageChange = (e) =>{
    setCurrentPage(e)
  }
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
        let requri = PreUri + '/notice/noticelist';
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setData(json);
      setCurrentPosts(json);
  }
  else{
    const filterData = data.filter((item) => item.title.includes(search))
    setData(filterData)
    setCurrentPosts(filterData)
    setCurrentPage(1)
  }
 setSearch('');
},[search])
  const onUpdate = useCallback(async(e,index)=>{
    const notice_no = e.notice_no;
    history("/notice/notice/update",{state:{update_no:notice_no}})
  },[data])
  const onItem = useCallback(async(e,index)=>{
    const hit_cnt = e.hit;
    const notice_no = e.notice_no;
    dispatch({ type: M_NOTICE_SET, target: notice_no });
    //조회수 증가
    const response = await fetch(PreUri + '/notice/notice_cnt',{
        method:Method.put,
        headers:CommonHeader,
        body:JSON.stringify(
          {
            hit : hit_cnt,
            notice_no:notice_no,
          }
        )
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    history('/notice/notice/detail',{state:{no:notice_no}});
  },[data,dispatch])
  useEffect(()=>{
    getData();
  },[getData])
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onSearch(e);
    }
  }
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }

  const onWrite = useCallback(async(e) => {
    let notice_no;
    if(data[0]!==undefined){
     notice_no = data[0].notice_no;
    }
    else{
     notice_no = 0
    }
    history('/notice/addnotice',{state:{notice_no:notice_no}});
  },[data])
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>{data.length}</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">제목</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" onChange={onChange} onKeyDown={(e) => activeEnter(e)}/>
          <StyledBtn onClick={onSearch}>검색</StyledBtn>
        </div>
      </div>
      <table>
        <caption className="blind">FAQ</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentPost.length > 0 ? currentPost.map((item,index)=>(
            <tr key={index}>
            <td onClick={(e)=>onItem(item,index)}>{data.length - index - (currentPage - 1) * postPerPage}</td>
            <td onClick={(e)=>onItem(item,index)}>{item.title}</td>
            <td>최고관리자</td>
            <td>{item.created_at.slice(0,10)}</td>
            <td>{item.hit}</td>
            <td><StyledBtn3 onClick={(e)=>onUpdate(item,index)}>수정</StyledBtn3></td>
          </tr>
          )):<div>게시물이 없습니다.</div>}
        </tbody>
      </table>
      <StyledBtn2 onClick={(e)=>onWrite(e)}>글쓰기</StyledBtn2>
      <div className="page_control">
      <Paging2 page={currentPage} count = {count} setPage={sethandlePage}/>
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
 const StyledBtn2= styled.button`
 position:relative;
 left:88%;
 top:20px;
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