import React,{useEffect,useState,useCallback}from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";
import styled from "styled-components";
import { useSelector , useDispatch} from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg, MaxFileCount  } from "../../CommonCode";
import fileDownload from 'js-file-download'
export default function SectionInputTextType1e() {
  const [data,setData] = useState([]);
  const [attachFile,setAttachFile] = useState({})
  const history = useNavigate();
  const location = useLocation();
  const no = location.state.no;
  const { token } = useSelector(state => state.user);
  const getData = useCallback(async()=>{
    let requri = PreUri + '/notice/'+ no +'/detail';
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
  },[no])
  const getFile = useCallback(async()=>{
    CommonHeader.authorization = token;
    const res = await fetch(PreUri + '/notice/' + no + '/files', {
      method: Method.get,
      headers: {
        authorization: token,
    }, 
    })
    const fileList = await res.json();
    setAttachFile(fileList)
  },[token,no ])
 console.log(typeof(attachFile))
 const arr =  Object.values(attachFile)


  useEffect(()=>{
    getData();
    getFile();
  },[getData,getFile])
  const onFileDownload = useCallback(async (e, fileInfo) => {
  
    let attached_file_no 
    for(let i = 0; i < attachFile.length&&i<MaxFileCount; i++){
      if(attachFile.legnth>1){
        attached_file_no = attachFile.attached_file_no[i]
      }
      else{
        attached_file_no = attachFile.attached_file_no
      }
    }
    const response = await fetch(PreUri + '/notice/' + no + '/file/' + 6, {
        responseType: 'blob',
        method: Method.get,
        headers: {
          authorization: token}
    });

    if (!response.ok) {
        console.log('response error');
        return;
    }
    
    if(fileInfo!==undefined){
    fileDownload(await(await new Response(response.body)).blob(),fileInfo)
    }
    /* var fileDownload = require('js-file-download');
    fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name); */
}, [attachFile]);

  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
      <div className="title_wrap">
        <TitleType1 title="공지사항"></TitleType1>
      </div>
      <ul className="text_wrap">
      <li>
          <label htmlFor="text01">제목</label>
          <span>{data.title}</span>
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text02">내용</label>
          <textarea
            name="text02"
            id="text02"
            cols="30"
            rows="6"
            readOnly={true}
            value={data.content}
          ></textarea>
        </li>
        <li className="file_wrap">
          <label htmlFor="file01">파일#1</label>
          <span>{arr[0]!==undefined?arr[0].name:null}</span><button className="download"  onClick={(e)=>onFileDownload(e,arr[0].name)}>다운로드</button>
        </li>
      </ul>
      <StyledBtn onClick={()=>history(-1)}>목록</StyledBtn>
    </section>
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