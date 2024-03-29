import React,{useState,useEffect,useCallback} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg} from "../../CommonCode";
import { AuthLevel } from "../../CommonCode";
import {useDispatch,useSelector}  from "react-redux";
import ImageGetArchive from "../sections/ImageGetArchive";
import styled from "styled-components";
import Paging2 from "./Paging2";
export default function ListType2c() {
  const { token } = useSelector(state => state.user);
  const { authority_level } = useSelector(state => state.user);
  const location = useLocation();
  const history = useNavigate();
  const [total,setTotal] = useState([]);
  const [data,setData] = useState([]);
  const [fileNo,setFileNo] = useState({});
  //const [page,setPage] = useState(1);
  const [attachFile,setAttachFile] = useState({});
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);

  const postPerPage = 8;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)
  const file_type = "video";
 
  const onItem = useCallback(async(e,index)=>{
    const hit_cnt = data[index].hit;
    //const url = data[index].url;
    const archive_no = data[index].archive_no;
    const response = await fetch(PreUri + '/archive/archive_cnt',{
      method:Method.put,
      headers:CommonHeader,
      body:JSON.stringify(
        {
          hit : hit_cnt,
          archive_no: archive_no,
        }
      )
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
     }
    history(location.pathname + '/detail',{state:{archive_no:archive_no}});
  },[data])
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
console.log(total)
  const onWrite = (e) =>{
    let archiveNo;
    if(total[0]!== null){
     archiveNo = total.at(-1).archive_no;
    }
    else{
     archiveNo = 0
    }
  
    history('/archive/video/addvideo',{state:{archive_no:archiveNo}});
  }
  const getItem = useCallback(async() =>{
    const list = await fetch(PreUri +'/archive/totalist',{
      method:Method.get,
      headers:CommonHeader,
    })
    const listjson = await list.json();

    if(!list.ok){
      return(alert(getRspMsg(list.status)))
    }
    setTotal(listjson);

 
    const res = await fetch(PreUri +'/archive/videolist',{
      method:Method.get,
      headers:CommonHeader,
    })
    const resjson = await res.json();


    if(resjson!==null)
    {
    let requri = PreUri + '/archive/list?file_type='+ file_type;
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    });
  
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();  
    setData(json);
    setCount(json.length);
    }
  },[])

  let no;
  for(let i = 0; i<total.length;i++){
    no = total[i].archive_no;
  }

  const getFile = useCallback(async()=>{
    if(no!==undefined){
    CommonHeader.authorization = token;
   
    const res = await fetch(PreUri + '/archive/' + no + '/files', {
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
/*   const getFileNo = useCallback(async()=>{
    for(let i = 0; i<total.length;i++){
      no = total[i].archive_no;
    }
    if(no!==undefined){
    const response = await fetch(PreUri + '/archive/'+ no + '/filesno',{
      method:Method.get,
      headers:CommonHeader
    })
    
    const json = await response.json(); 
    setFileNo(json);
    }
  },[no]) */

  useEffect(()=>{
    getFile();
    /* getFileNo(); */
    getItem();
  },[getItem,getFile])
  return (
    <div className="table_wrap list_type2 list_type2c" style={count<7?{"padding":"0px 40px"}:null}>
      <ol>
        {currentPost.map((item,index)=>(
          <li key={index}>
            
          <div className="image_part"><img src={"https://img.youtube.com/vi"+item.url.replace("https://www.youtube.com/embed","")+"/maxresdefault.jpg"} style={{"width":"240px","height":"150px","cursor":"pointer"}} onClick={(e)=>onItem(e,index)} />
            {/* <ImageGetArchive attachFile={attachFile} no={data[index].archive_no} token={token} CommonHeader={CommonHeader} onItem={(e)=>onItem(item,index)}/> */}</div>
          <div className="text_part">
            <h5 onClick={(e)=>onItem(e,index)} style={{cursor:"pointer"}} >{item.title} </h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>{item.created_at.slice(0,10)}</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>{item.hit}</dd>
              </dl>
            </div>
          </div>
        </li>
        ))}
      </ol>
      {authority_level>10?
      <StyledBtn2 onClick={(e)=>onWrite(e)}>글쓰기</StyledBtn2>:<></>
      }
      <div className="page_control">
      <Paging2 page={currentPage} count = {count} setPage={sethandlePage}/>
      </div>
    </div>
  );
}

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