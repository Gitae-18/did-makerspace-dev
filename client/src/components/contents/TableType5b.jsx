import React,{useEffect,useCallback,useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate,useLocation,NavLink } from "react-router-dom";
import { CommonHeader, PreUri, Method, getRspMsg } from "../../CommonCode";
import MentorAddModal from "../Modals/MentorAddModal";
import SideNavi from "../Admin/Management/SideNavi";
import moment from "moment";
import styled from "styled-components";
import Paging2 from "./Paging2";
import { MdToken } from "react-icons/md";

export default function TableType5b() {
  const {authority_level,token} = useSelector(state => state.user)
  const [count,setCount] = useState(0);
  const [search,setSearch] = useState('');
  const [authority,setAuthority] = useState('');
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [mentor, setMentor] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [searchItem,setSearchItem] = useState([]);
  const [selectCategory,setSelectCategory] = useState('title');
  const [modalVisible,setModalVisible] = useState(false);
  const location = useLocation();
  const postPerPage = 10;

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPost = searchItem.slice(indexOfFirstPost, indexOfLastPost);
  const history = useNavigate();

  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
  const modalClose = (e) =>{
    setModalVisible(false);
  }
  const onSelect = (e) =>{
    const value = e.target.value;
    if(value==="부여")
    {
      setAuthority("Y")
    }
    else if(value==="회수")
    {
      setAuthority("N")
    }
  }

  //검색
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onSearch(e);
    }
  }
  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
        let requri = PreUri + '/mentoring/mentorlist';
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setMentor(json);
      setSearchItem(json);
  }
 /*  else if(selectCategory==="title"){
    const filterData = mentor.filter((item) => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setSearchItem(filterData)
  
    setCurrentPage(1)
  } */
    const filterData = mentor.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setSearchItem(filterData)
    setCurrentPage(1)
  if(search.length===0)
  {
    setSearch('');
  }
},[search])
//권한 변경
const updatePermission = useCallback(async(item,index)=>{
  CommonHeader.authorization = token;
  console.log(authority)
  const no = item.user_no;
  const response = await fetch(PreUri + '/mentoring/' + no +'/update_authority',{
    method:Method.put,
    headers:CommonHeader,
    body:JSON.stringify({
      permission_flag:authority,
  })
  
  })
  if(!response.ok){
    return(alert("에러 발생"))
  }
  const json = await response.json();
  if(!response.ok) {
    console.log('잘못된 접근입니다.');
    return;
  }
  alert("권한이 변경되었습니다.");
},[authority])

//멘토리스트
  const getMentorList = useCallback(async()=>{
    CommonHeader.authorization = token;

    const response = await fetch(PreUri + '/mentoring/mentorlist',{
      method:Method.get,
      headers:CommonHeader,
    })
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setMentor(json);
    setSearchItem(json);
  },[token])

  useEffect(()=>{
    getMentorList();
  },[getMentorList])

  return (
    <>
    <div id="sub_page_wrap">
    <SideNavi/>
    <div className="sub_page_inner_wrap">
    <div className="sub_inner">
    <div className="table_wrap table_type5 table_type5b">
      <div className="table_extra">
        <div></div>
        <div className="table_search">
          <select name="" id="">
            <option value="1">멘토명</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" onKeyDown={(e) => activeEnter(e)} onChange={onChange}/>
          <StyledBtn onClick={(e)=>onSearch(e)}>검색</StyledBtn>
        </div>
      </div>
      <table style={{tableLayout:'fixed',width:'1300px'}}>
        <caption className="blind">장비 예약</caption>
        <thead>
          <tr>
            <th>번호</th>
            <th>멘토명</th>
            <th>소개</th>
            <th>분야</th>
            <th>권한</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          { searchItem.length > 0 && currentPost.map((item,index)=>(
            <tr>
              <td>{mentor.length - index - (currentPage - 1) * postPerPage}</td>
              <td>{item.name}</td>
              <td>{item.mentor_profile}</td>
              <td>{item.field}</td>
              <td className="select_big_wrap">
              <select onChange = {onSelect}>
                <option value="0" selected disabled>
                  선택
                </option>
                <option value="부여">부여</option>
                <option value="회수">회수</option>
              </select>
            </td>
            <td onClick={()=>updatePermission(item,index)}><StyledBtn>변경</StyledBtn></td>
            </tr>
          ))

          }
          {/* <tr>
            <td>1</td>
            <td>홍길동</td>
            <td className="select_wrap">
              <select name="" id="">
                <option value="0" selected disabled>
                  선택
                </option>
                <option value="1">전문 멘토</option>
                <option value="2">일반 사용자</option>
              </select>
            </td>
            <td>2022. 10. 15</td>
            <td className="select_big_wrap">
              <select name="" id="">
                <option value="0" selected disabled>
                  선택
                </option>
                <option value="1">권한 1</option>
                <option value="2">권한 2</option>
              </select>
            </td>
          </tr> */}
        </tbody>
      </table>
      <div className="button_wrap">
        <StyledBtn2 onClick={()=>{setModalVisible(true)}}>추가</StyledBtn2>
      {modalVisible&&<MentorAddModal visible={modalVisible} closeable={true} onclose ={modalClose}/>}
      </div>
      <div className="page_control">
      <Paging2 count={count} page={currentPage} setPage={sethandlePage}/>
      </div>
    </div>
    </div>
    </div>
    </div>
    <div className="sub_page_outer"/>
    </>
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
position:relative;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledBtn2= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
position:relative;
top:30px;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `