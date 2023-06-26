import React,{useState,useEffect,useCallback} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg} from "../../CommonCode";
import Paging2 from "./Paging2";
import {useDispatch,useSelector}  from "react-redux";
import styled from "styled-components";
export default function ListType2e() {
  const { token } = useSelector(state => state.user);
  const { authority_level } = useSelector(state => state.user);
  const location = useLocation();
  const history = useNavigate();
  const [data,setData] = useState([]);
  const [total,setTotal] = useState([]);
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)
  const file_type = "study";
  const onItem = useCallback(async(e,index)=>{
    const hit_cnt = data[index].hit;
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
  console.log(data)
  const onWrite = (e) =>{
    let archiveNo;
    if(total[0]!== null){
     archiveNo = total.at(-1).archive_no;
    }
    else{
     archiveNo = 0
    }
  
    history('/archive/basic/addbasic  ',{state:{archive_no:archiveNo}});
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
  },[])
 
  useEffect(()=>{
    getItem();
  },[getItem])
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
  return (
    <div className="table_wrap list_type2 list_type2c">
      <ol>
      {currentPost.map((item,index)=>(
          <li key={index}>
          <div className="image_part"><img onClick={(e)=>onItem(e,index)} src={item.src} alt="no" style={{"cursor":"pointer"}}/></div>
          <div className="text_part">
            <h5 onClick={(e)=>onItem(e,index)} style={{"cursor":"pointer"}} >{item.title} </h5>
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