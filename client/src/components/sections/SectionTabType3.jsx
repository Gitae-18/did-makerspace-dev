import React, { useCallback, useEffect,useState} from "react";
import {useNavigate,useLocation} from "react-router-dom"
import { CommonHeader, PreUri, Method,getRspMsg } from "../../CommonCode";
import TitleType1 from "../contents/TitleType1";
import {useDispatch,useSelector}  from "react-redux";
//import styled from "styled-components";
import ImageGetArchive from "./ImageGetArchive";
import VideoModal from "../contents/VideoModal";
export default function SectionTabType3(props) {

 const history = useNavigate();
 const { token } = useSelector(state => state.user);
 const [data,setData] = useState([]);
 const [visible,setVisible] = useState(false);
 const [fileNo,setFileNo] = useState({});
 const [count,setCount] = useState(0);
 const [attachFile,setAttachFile] = useState({});
 const location = useLocation();
 const file_type = "video";


 const openModal = () =>{
  setVisible(true)
 }
 const closeModal = () =>{
  setVisible(false);
}
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
  const getItem = useCallback(async() =>{
    let requri = PreUri + '/archive/videolist';
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
  let no;
  for(let i = 0; i<data.length;i++){
    no = data[i].archive_no;
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
  const getFileNo = useCallback(async()=>{
    if(no!==undefined){
    const response = await fetch(PreUri + '/archive/'+ no + '/filesno',{
      method:Method.get,
      headers:CommonHeader
    })
    
    const json = await response.json(); 
    setFileNo(json);
    }
  },[no])
  useEffect(() => {
    /* document.getElementById("tab_btn0").classList.add("on"); */
    getFile();
    getFileNo();
    getItem();
  },[getItem]);
  // 내부 탭 내용 주입

    return (
    <section className="section_tab_type3">
    <div className="section_inner_wrap">
      <div className="tabs_wrap">
        <div className="tab_inner on">
          <h3 style={{"color":"white"}}>New 비디오</h3>
          <div className="inner_tab"> 
          {data !== undefined && data.length > 0 && data.map((item,index) =>(
            <ol>
            <li key={index}>
            <div className="title">{item.title}</div>
            <div className="text_part">
            <span className="sub_title" onClick={openModal}><ImageGetArchive no={data[index].archive_no} token={token} CommonHeader={CommonHeader}></ImageGetArchive></span>
            {visible&&<VideoModal visible={visible} closable={true} maskClosable={true} onClose={closeModal} src={item.url}/>}  
            <div className="date_part">
            <span className="date">{item.created_at.slice(0,10)}</span>
            </div>
            </div>
            </li>
            </ol>
          )
        )} 
        </div>         
        </div>
      </div>
    </div>
    </section>
    );
  // 탭 버튼 세팅
}
