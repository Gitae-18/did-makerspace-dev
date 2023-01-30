import React,{useState,useEffect, useCallback}from "react";
import TitleType1 from "./TitleType1";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import { M_CLASS_SET } from "../../store/classedu_manage";
import Paging2 from "./Paging2";
import styled from "styled-components";
export default function Classedulist({no}) {
  const { token } = useSelector(state => state.user);
  const [reservList,setReservList] = useState([]);
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
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

    let uri = PreUri + '/classedu/classedulist'
     
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
  //수정
  const onUpdate = (e,index) =>{
    const item = currentPost[index].program_no;  
    history('/classedu/update',{state:{programno:item}})
  }
  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
        let requri = PreUri + '/classedu/classedulist';
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

  const onSelectItem = useCallback((e,index) => {
    const item = currentPost[index].program_no;  
    const list = currentPost[index]; 
    const type = reservList[index].type;
    console.log(type);

    dispatch({ type: M_CLASS_SET, target: list });
 
    if(type === "class"){
      history("/eduprogram/detail",{state:{programno:item}});
    }
    if(type === "edu"){
      history("/classprogram/detail",{state:{programno:item}});
    }
  },[history, currentPost,reservList, dispatch])
  const setPage = (e) =>{
    setCurrentPage(e);
  }

 const onBtnClick = (e) =>{
  const item = currentPost[0].program_no;
    history('/'+ e.target.className.slice(17,),{state:{no:item}});
 }
  useEffect(()=>{
    getReservList();
  },[getReservList,token])
  return (
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <div className="table_search">
        <select name="" id="">
            <option value="1">제목</option>
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
            <th>제목</th>
            <th>구분</th>
            <th>교육기간</th>
            <th>신청기간</th>
            <th>조회수</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {currentPost && reservList.length>0 ? currentPost.map((item,index)=>(
            <tr key={index}>
            <td>{item.program_no}</td>
            <td onClick={(e)=>onSelectItem(e,index)}>{item.title}</td>
            <td onClick={(e)=>onSelectItem(e,index)}>{item.type==="class"? "행사프로그램":"교육프로그램"}</td>
            <td style={{"whiteSpace":"pre-wrap"}}>{item.class_period_start} ~ {item.class_period_end}</td>
            <td style={{"whiteSpace":"pre-wrap"}}> {item.application_period_start} ~ {item.application_period_end}
{/*               <span className="date">{item.class_period_start.slice(0,10).replaceAll('-','/')}</span>
              &nbsp;
              <span className="time">{item.class_period_start.slice(10,)}</span> */}
            </td>
            <td>{item.hit}</td>
            <td><StyledBtn3 onClick={(e)=> onUpdate(e,index)}>수정</StyledBtn3></td> 
          </tr>)):<>내용이 비었습니다</>}
        </tbody>
      </table>
      <div className="btn_grp">
      <StyledBtn2 className="educontrol" onClick={(e)=>onBtnClick(e)}>교육프로그램 등록</StyledBtn2>
      <StyledBtn2 className="classcontrol" onClick={(e)=>onBtnClick(e)}>행사프로그램 등록</StyledBtn2>
      </div>
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