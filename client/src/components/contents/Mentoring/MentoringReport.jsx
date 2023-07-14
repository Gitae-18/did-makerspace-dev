import React, {useEffect,useState,useCallback} from "react";
import { CommonHeader,PreUri, Method, getRspMsg,MaxFileCount,AuthLevel, } from "../../../CommonCode";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import Paging2 from "../Paging2";
import '../../../css/style-s.css';
import fileDownload from 'js-file-download'
import moment from "moment";
import $ from 'jquery';

export default function MentoringReport(){

  const { token ,authority_level } = useSelector(state => state.user);
  const history = useNavigate();
  const location = useLocation();
  const [report ,setReport] = useState();
  const [data,setData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postPage, setPostPage] = useState(10);
  const [count,setCount] = useState(0);
  const [search,setSearch] = useState('');
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [searchItem,setSearchItem] = useState([]);
  const [selectCategory,setSelectCategory] = useState('title');
  const indexOfLastPost = currentPage * postPage
  const indexOfFirstPost = indexOfLastPost - postPage
  const currentPost = searchItem.slice(indexOfFirstPost, indexOfLastPost);

 
  const onSelectChange = (e) =>{
    e.preventDefault();
    setSelectCategory(e.target.value);
  }
  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onSearch(e);
    }
  }
  /* const onSearchByDate = useCallback(async(e)=>{
    e.preventDefault();
    if(year===0 || month===0){
      let requri = PreUri + '/mentoring/report';
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setData(json);
      setSearchItem(json);
    }
    else if(year>0){
      const filterData = data.filter((item)=>item.created_at.moment(item.created_at).format('YYYY').toString()===year)
      setSearchItem(filterData);
    }
    else if(month>0){
      const filterData = data.filter((item)=>item.created_at.moment(item.created_at).format('MM').toString()===year)
      setSearchItem(filterData);
    }
  },[year,month]) */
  const onYearSearch = useCallback(async(e) =>{
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setSearchItem(data.filter((item, index) => {
      const itemYear = moment(item.created_at).format('YYYY');
      console.log(String(selectedYear))
      return itemYear === String(selectedYear);
    }));
  },[data])
  const onMonthSearch = useCallback(async(e) =>{
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    setSearchItem(data.filter((item,index)=>{
      const itemMonth = moment(item.created_at).format("M");
      return itemMonth === String(selectedMonth);
    }));
  },[data]);
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
        let requri = PreUri + '/mentoring/report';
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setData(json);
      setSearchItem(json);
  }
  else if(selectCategory==="title"){
    const filterData = data.filter((item) => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setSearchItem(filterData)
  
    setCurrentPage(1)
  }
  else if(selectCategory==="mentor"){
    const filterData = data.filter((item) => item.mentor.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setSearchItem(filterData)
  
    setCurrentPage(1)
  }
  if(search.length===0)
  {
    setSearch('');
  }
},[search])
  const getItemList = useCallback(async() => {
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/mentoring/reportnumber',{
         method: Method.get,
         headers: CommonHeader,
    })
    if (!response.ok) {
        alert("에러 발생");
        return;
    }
    const json = await response.json();
  if (json && json.length > 0) {
    setReport(json);
  } else {
    setReport(1);
  }
  },[])
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
  const getNumber = useCallback(async()=>{
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/mentoring/report',{
      method: Method.get,
      headers: CommonHeader,
  })
  if (!response.ok) {
    alert("에러 발생");
    return;
  }
  const json = await response.json();

  setData(json)
  setSearchItem(json);
  setCount(json.length)
  },[])
  useEffect(()=>{
    getItemList();
    getNumber();
  },[getItemList,getNumber])

  const onItem = (e,index) =>{
    const mentoring_no = e.mentoring_application_no;
    console.log(mentoring_no)
    history('/mentoring/report/detail',{state:{no:mentoring_no}});
    }
  const goWrite = () => {
     history(location.pathname + '/write',{state:{no:report}});
  }
  let dt = new Date();
    let com_year = dt.getFullYear();
    let YearOption = [(<option value={0} key={0}>연도</option>)];
    for (let i = com_year; i >= (com_year - 10); i--) { YearOption.push(<option value={i} key={i}>{i + " 년"}</option>) }

    let MonthOption = [(<option value={0} key={0}>월</option>)];
    for (let i = 1; i <= 12; i++) { MonthOption.push(<option value={i} key={i}>{i + " 월"}</option>) }
  return (
    <div className="table_wrap table_type5">
      <div className="table_extra">
        <p></p>
        <div className="table_search">
          <select name="year" id="" value={year} onChange={(e)=>{ onYearSearch(e)}}>
            {YearOption}
          </select>
          <select name="month" id="" value={month} onChange={(e) => { onMonthSearch(e)}}>
            {MonthOption}
          </select>
          <select name="" id=""  onChange={onSelectChange}>
            <option value="title">제목</option>
            <option value="mentor">멘토</option>
          </select>
          <input type="text" name="" id="" placeholder={selectCategory==="title"?"제목을 입력하세요":"멘토명을 입력하세요"} onKeyDown={(e) => activeEnter(e)} onChange={onChange}/>
          <StyledBtn onClick={(e)=>onSearch(e)}>검색</StyledBtn>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>멘토</th>
            <th>신청일</th>
          </tr>
        </thead>
        <tbody>
          {searchItem.length > 0 && searchItem !== null ? currentPost.map((item,index)=>(
            <tr key={index}>
              <td>{searchItem.length - index - (currentPage - 1) * postPage}</td>
              <td onClick={(e)=>onItem(item,index)}>{item.title}</td>
              <td onClick={(e)=>onItem(item,index)}>{item.mentor}</td>
              <td>{item.created_at.slice(0,10)}</td>
            </tr>
          )):<div>게시물이 없습니다.</div>}
        </tbody>
      </table>
      <StyledBtn style={{marginTop:'50px'}} onClick={goWrite}>글쓰기</StyledBtn>
      <div className="page_control">
      <Paging2 count={count} page={currentPage} setPage={sethandlePage}/>
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