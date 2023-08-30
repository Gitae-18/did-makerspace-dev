import React,{useState,useEffect,useCallback} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg} from "../../CommonCode";
import {useDispatch,useSelector}  from "react-redux";
import styled from "styled-components";
import PopupDeleteModal3 from "../Modals/PopupDeleteModal3";
import Paging2 from "./Paging2";
import ButtonType3 from "./ButtonType3";
export default function ListTypeControl() {
  const { token } = useSelector(state => state.user);
  const { authority_level } = useSelector(state => state.user);
  const location = useLocation();
  const history = useNavigate();
  const [total,setTotal] = useState([]);
  const [data,setData] = useState([]);
  const [fileNo,setFileNo] = useState({});
  const [dropno,setDropNo] = useState();
  const [modalvisible,setModalVisible] = useState(false);
  //const [page,setPage] = useState(1);
  const [attachFile,setAttachFile] = useState({});
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);



 
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
  const DropItem = useCallback(async (e, i) => {
        setModalVisible(true);  
        setDropNo(e.archive_no);
    },
    [token]
  );
  const closeModal = () =>{
    setModalVisible(false);
  }
  const onEdit = (e) => {
    const archive_no = e.archive_no;
    console.log(archive_no)
    history('/archive/update',{state:{archive_no:archive_no}});
  }
  const getItem = useCallback(async() =>{
    CommonHeader.authorization=token;
    const response = await fetch(PreUri +'/archive/archive_list_all',{
      method:Method.get,
      headers:CommonHeader,
    })

    const total = await response.json();

    if(!response.ok){
      return(alert(getRspMsg(response.status)))
        }

    setData(total);
    setCount(total.length);
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
    <div className="table_wrap">
      <table style={{width:'1315px',tableLayout:'fixed'}}>
        <thead>
        <tr>
            <th>No</th>
            <th>제목</th>
            <th>업로드일</th>
            <th>조회수</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        {currentPost.map((item,index)=>(
            <tr key={index}>
                <td style={{borderBottom:'1px solid #d2d2d2'}}>{data.length - index - (currentPage - 1) * postPerPage}</td>
                <td style={{borderBottom:'1px solid #d2d2d2'}}>{item.title}</td>
                <td style={{borderBottom:'1px solid #d2d2d2'}}>{item.created_at}</td>
                <td style={{borderBottom:'1px solid #d2d2d2'}}>{item.hit}</td>
                <td style={{borderBottom:'1px solid #d2d2d2'}}><StyledBtn2 onClick={(e)=>onEdit(item,index)}>수정</StyledBtn2></td>
                <td style={{borderBottom:'1px solid #d2d2d2'}}><StyledBtn3 onClick={(e)=>DropItem(item,index)}>삭제</StyledBtn3></td>
                {modalvisible&& <PopupDeleteModal3  no={dropno} visible={modalvisible} closable={true} maskClosable={true} onclose={closeModal} token={token} serviceItems={data} />} 
            </tr>
        ))}
      </table>
      <div className="page_control">
      <Paging2 page={currentPage} count = {count} setPage={sethandlePage}/>
      </div>
    </div>
  );
}

const StyledBtn2= styled.button`
position:relative;
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
position:relative;
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