import React,{useState,useEffect,useCallback} from "react";
//import { Navigate, Route, Routes ,Outlet} from 'react-router';
import {useDispatch} from "react-redux";
import {useNavigate,useLocation} from "react-router-dom";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import styled from "styled-components";
import Paging2 from "./Paging2";

export default function TableType1d() {

  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [data,setData] = useState([]);

   //pagenation
   //const [page,setPage] = useState(1);
   const [search,setSearch] = useState('');
   const [count,setCount] = useState(0);
   const [currentPage,setCurrentPage] = useState(1);
   const [currentPosts,setCurrentPosts] = useState([]);
   const postPerPage = 10;
   //const offset = (page-1)*postPerPage;
   const indexOfLastPost = currentPage * postPerPage
   const indexOfFirstPost = indexOfLastPost - postPerPage;
   const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)
   //리스트 json받아오기
   const getData = useCallback(async()=>{

    let requri = PreUri + '/faq/faqlist';
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


  //검색
  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
        let requri = PreUri + '/faq/faqlist';
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



  //클릭시 상세페이지 이동
  const onItem = useCallback(async(e,index)=>{
    if(data!==undefined){
    const hit_cnt = e.hit;
    const faq_no = e.faq_no;
    //조회수 증가
    const response = await fetch(PreUri + '/faq/faq_cnt',{
        method:Method.put,
        headers:CommonHeader,
        body:JSON.stringify(
          {
            hit : hit_cnt,
            faq_no:faq_no,
          }
        )
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    history('/did/info/faq/faq1',{state:{no:faq_no}});
  }
  },[data])

  //리랜더링
  useEffect(()=>{
    getData();
  },[getData])
  //페이지 변경
  const handlePageChange = (e) =>{
    setCurrentPage(e)
  }
  const setPage = (e) =>{
    setCurrentPage(e);
  }
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
  // 키보드 엔터시 검색
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onSearch(e);
    }
  }
  //수정
  const onUpdate = useCallback(async(e,index) =>{
    if(data!==undefined){
    const faq_no = e.faq_no;  
    history('/did/info/faq/update',{state:{faq_no:faq_no}})
    }
  },[data])
  //새글쓰기
  const goToWrite = useCallback(async(e) =>{
    if(data[0]!==undefined){
    console.log(data.at(0).faq_no);
    const faq_no = data.at(0).faq_no;
    history('/did/info/write',{state:{faq_no:faq_no}});
    }
    else{
      const faq_no = 0;
      history('/did/info/write',{state:{faq_no:faq_no}});
    }
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
          <input type="text" name="" id="" placeholder="제목을 입력하세요" onChange={onChange} onKeyDown={(e) => activeEnter(e)} />
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
            <th>수정</th>
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
          </tr>)):<div>게시물이 없습니다.</div>
          }
        </tbody>
      </table>
      <div className="button_class">
        <StyledBtn onClick={goToWrite}>글쓰기</StyledBtn>
      </div>
      <div className="page_control">
      <Paging2 page={currentPage} count = {count} setPage={setPage} />
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