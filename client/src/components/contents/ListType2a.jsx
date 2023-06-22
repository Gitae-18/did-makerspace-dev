import React,{useEffect,useState,useCallback} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {useDispatch,useSelector}  from "react-redux";
import { PreUri , CommonHeader ,  Method, getRspMsg } from "../../CommonCode";
import ImageGetProgramList from "../sections/ImageGetProgramList";
import Paging2 from "./Paging2";
import styled from "styled-components";

export default function ListType2a() {
  const { token } = useSelector(state => state.user);
  const location = useLocation();
  const history = useNavigate();
  const [search,setSearch] = useState('');
  const [fileNo,setFileNo] = useState({});
  //페이징
  const [page,setPage] = useState(1);
  const [attachFile,setAttachFile] = useState({});
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [itemList,setItemList] = useState([]);
  const postPerPage = 10;

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = itemList.slice(indexOfFirstPost, indexOfLastPost)
  const type = "class";

  const getItemList = useCallback(async()=>{
    CommonHeader.authorization = token;
    let requri = PreUri + '/classedu/edulist?type=' + type;
   
    const response = await fetch(requri,{
      Method:Method.get,
      headers:CommonHeader,
    })

    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();
    setItemList(json);
    setCount(json.length);
  },[token])


  const onItem = useCallback(async(e,index)=>{
    const hit_cnt = e.hit;
   /*  let program_no;
    if(itemList[0]!==undefined){
      program_no = itemList[index].notice_no;
    }
    else{
      program_no = 1
    } */
    const program_no = e.program_no;
    
    const response = await fetch(PreUri + '/classedu/classedu_cnt',{
      method:Method.put,
      headers:CommonHeader,
      body:JSON.stringify(
        {
          hit : hit_cnt,
          program_no:program_no,
        }
      )
  })
    if(!response.ok) {
    console.log('잘못된 접근입니다.');
    return;
   }
    history(location.pathname + '/detail',{state:{no:program_no}});
  },[currentPost,itemList])
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();
    
    if(search=== null || search === ''){
      let requri = PreUri + '/classedu/edulist?type=' + type;
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setItemList(json);
    }
    else{
      const filterData = itemList.filter((item) => item.title.includes(search))
      setItemList(filterData)
      setCurrentPage(1)
    }
   setSearch('');

  },[search])
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onSearch(e);
    }
  }
  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const onMove = () =>{
    history('/classprogram/myreserv');
  }
  let no;
  for(let i = 0; i<itemList.length;i++){
    no = itemList[i].program_no;
  }
 
  const getFile = useCallback(async()=>{
    if(no!==undefined){
    CommonHeader.authorization = token;
    const res = await fetch(PreUri + '/classedu/' + no + '/files', {
      method: Method.get,
      headers: {
        authorization: token,
    }, 
    })
    const fileList = await res.json();
    if(fileList!==null||undefined)
    {
    setAttachFile(fileList)
    }
    }
  },[no,token])
  const getFileNo = useCallback(async()=>{
    if(no!==undefined){
    const response = await fetch(PreUri + '/classedu/'+ no + '/filesno',{
      method:Method.get,
      headers:CommonHeader
    })
    
    const json = await response.json(); 
    setFileNo(json);
    }
  },[no])

  useEffect(()=>{
    getFile();
    getFileNo();
    getItemList();
  },[getFile,getItemList,getFileNo,token])
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }

  return (
    <div className="table_box">
    <div className="table_wrap list_type2">
      <div className="table_extra">
      <StyledBtn2 onClick={onMove}>내 예약정보</StyledBtn2>
       <div className="table_search">
         <input type="text" name="" id="" placeholder="제목을 입력하세요" onKeyDown={(e) => activeEnter(e)} onChange={onChange}/>
           <StyledBtn onClick={(e)=>onSearch(e)} >검색</StyledBtn>
       </div>
      </div>
      <ol>
      {currentPost!==undefined?currentPost.map((item,index)=>(
        
        <li key={index}>

        {item.attached_file==="Y"?
        <ImageGetProgramList attachFile={attachFile} no={itemList[index].program_no} token={token} CommonHeader={CommonHeader} onItem={(e)=>onItem(item,index)}/>
         :<img src="/images/Noimg.png" alt="no"/>}
        <div className="text_part" onClick={(e)=>onItem(item,index)}>
          <h5 >{item.title}</h5>
          <div className="tag">
            <span>무료</span>
          </div>
          <dl>
            <dt>교육</dt>
            <dd>{item.class_period_start}</dd>
          </dl>
          <dl>
            <dt>조회수</dt>
            <dd>{item.hit}</dd>
          </dl>
          <dl>
            <dt>마감</dt>
            <dd>{item.application_period_end}</dd>
          </dl>
        </div>
      </li>
    )):null}
      </ol>
      <div className="page_control">
       <Paging2 page={currentPage} count = {count} setPage={sethandlePage}/>
      </div>
    </div>
    </div>
  );
}


const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:100px;
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
 color:#fff;
 background-color:#313f4f;
 width:140px;
 height:30px;
 font-size:0.8rem;
 cursor:pointer;
 position:relative;
 left:0;
 right:500px;
  &:hover{
     background-color:#transparent
     color:#313f4f
  }
  `