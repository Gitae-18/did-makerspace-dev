import React,{useEffect,useCallback,useState}from "react";
import { useSelector } from "react-redux";
import { useNavigate,useLocation,NavLink } from "react-router-dom";
import { CommonHeader, PreUri, Method, getRspMsg } from "../../CommonCode";
import Paging2 from "./Paging2";
import styled from "styled-components";
import moment from "moment";
export default function TableType5c({query}) {
  const { token, isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
  const history = useNavigate();
  const [btnClick,setBtnClick] = useState(false);
  const [total,setTotal] = useState([]);
  const [data,setData] = useState([]);
  const [attachFile,setAttachFile] = useState({});
  const [count,setCount] = useState(0);
  const [search,setSearch] = useState('');
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [searchItem,setSearchItem] = useState([]);
  const [selectCategory,setSelectCategory] = useState('title');
  const [currentPage,setCurrentPage] = useState(1);

  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPost = searchItem.slice(indexOfFirstPost, indexOfLastPost);


  const location = useLocation();
  const currentUrl = location.pathname;

  const setPage = (e) =>{
    setCurrentPage(e);
  }

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
        let requri = PreUri + '/mentoring/mylist';
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
  const pageMove = useCallback(async(e)=>{
    const mentoring_no = e.mentoring_application_no;
    setBtnClick(!btnClick);
    history(location.pathname + "/detail",{state:{no:mentoring_no}})
  },[btnClick])

  const getFullList = useCallback(async()=>{
    const response = await fetch(PreUri + "/mentoring/getlist",{
      method:Method.get,
      headers:CommonHeader,
    })
    if(!response.ok){
      console.log('잘못된 접근입니다.');
      return;
    }
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();
    setTotal(json);
  },[])

  const getMyItemList = useCallback(async()=>{
    CommonHeader.authorization = token;
    const res = await fetch(PreUri +'/mentoring/mylist',{
      method:Method.get,
      headers:CommonHeader,
    })
    const json = await res.json(); 
    setCount(json.length);
    setSearchItem(json);
    if(json!==undefined||null)
    {
    setData(json);
    }
  },[token])

  const onWrite = (e) =>{
    let mentoring_application_no;
    if(total[0]!==null){
      mentoring_application_no = total.at(0).mentoring_application_no;
    }
    else{
      mentoring_application_no = 0
    }
    console.log(mentoring_application_no);
    history('/umentoringapplication',{state:{mentoring_application_no:mentoring_application_no}});
  }
  useEffect(()=>{
    getFullList();
    getMyItemList();
  },[getFullList,getMyItemList])
  let dt = new Date();
    let com_year = dt.getFullYear();
    let YearOption = [(<option value={0} key={0}>연도</option>)];
    for (let i = com_year; i >= (com_year - 10); i--) { YearOption.push(<option value={i} key={i}>{i + " 년"}</option>) }

    let MonthOption = [(<option value={0} key={0}>월</option>)];
    for (let i = 1; i <= 12; i++) { MonthOption.push(<option value={i} key={i}>{i + " 월"}</option>) }
  return (
    <div className="table_wrap table_type5">
      <div className="table_extra">
        <div></div>
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
      <table style={{width:'1300px',tableLayout:'fixed'}}>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>멘토</th>
            <th>진행단계</th>
            <th>신청일</th>
          </tr>
        </thead>
        <tbody>
          {data!==undefined ? currentPost.map((item,index)=>(
            <tr key={index}>
            <td>{data.length - index - (currentPage - 1) * postPerPage}</td>
            <td  onClick={(e)=>{pageMove(item)}}>{item.application_title}</td>
            <td>{item.mentor}</td>
            <td>{item.status==="OSA"?"신청":item.status==="REJ"?"반려":item.status==="RUN"?'진행':"종료"}</td>
            <td>{item.created_at.slice(0,10)}</td>
          </tr>
          ))
          :null}
        </tbody>
      </table>
      <StyledBtn2 onClick={(e)=>onWrite(e)}>글쓰기</StyledBtn2>
      <div className="page_control">
      <Paging2 count={count} page={currentPage} setPage={setPage}/>
      </div>
    </div>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.8rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledBtn2= styled.button`
position:relative;
left:45%;
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