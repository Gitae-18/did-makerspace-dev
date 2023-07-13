import React,{useEffect,useState,useCallback}from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";
import styled from "styled-components";
import { useSelector , useDispatch} from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg, MaxFileCount  } from "../../CommonCode";
import ImageGettingNotice from "./ImageGeetingNotice";
import fileDownload from 'js-file-download'
export default function SectionInputTextType1e() {
  const [data,setData] = useState([]);
  const [attachFile,setAttachFile] = useState({})
  const [fileNo,setFileNo] = useState([]);
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
    const res = await fetch(PreUri + '/notice/' + no + '/files', {
      method: Method.get,
    })
    const fileList = await res.json();
    if(fileList!==null||undefined)
    {
    setAttachFile(fileList)
    }
  },[no])

 const getFileNo = useCallback(async()=>{
  const response = await fetch(PreUri + '/notice/'+ no + '/filesno',{
    method:Method.get,
    headers:CommonHeader
  })
  const json = await response.json();
  const formattedFiles = json.map(file => {
    return {
      ...file,
      file_name: file.original_name
    };
  });
  setFileNo(formattedFiles);
},[no])
console.log(fileNo)
  useEffect(()=>{
    getData();
    getFile();
    getFileNo();
  },[getData,getFile,getFileNo])
  const onFileDownload = useCallback(async (e, fileInfo) => {
    let attached_file_no ;
    for(let i = 0; i < attachFile.length&&i<MaxFileCount; i++){
      if(attachFile.legnth>1){
        attached_file_no = attachFile.attached_file_no[i]
      }
      else{
        attached_file_no = attachFile.attached_file_no
      }
    }
    console.log(fileInfo.attached_file_no)
    const response = await fetch(PreUri + '/notice/' + no + '/file/' + fileInfo.attached_file_no, {
        method: Method.get,
    });
    if (!response.ok) {
        console.log('response error');
        return;
    }
    const blob = await response.blob();
    if(fileInfo!==undefined){
      fileDownload(blob, fileInfo.file_name);
    }
    /* var fileDownload = require('js-file-download');
    fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name); */
}, [attachFile]);
const FileDownload = useCallback((props) => {
  return (<>
    <button className="download" style={{ border: "0px", cursor: 'pointer' }} onClick={props.onClick}>{props.filename}</button>
  </>);
}, []);
let DownloadMyFileItems = [];
	if (fileNo && fileNo.length > 0) {
		for (let i = 0; i < fileNo.length; i++) {
			DownloadMyFileItems.push(
				<FileDownload index={i}
					filename={fileNo[i].original_name.length<20?fileNo[i].original_name:fileNo[i].original_name.slice(0,20)+'...'}
					onClick={(e) => onFileDownload(e, fileNo[i])}
					key={i} />);
		};
	}
  else{
    DownloadMyFileItems.push(
    <button className="download" style={{ border: "0px", cursor: 'pointer' }} >파일이 없습니다.</button>
    )
  }
  return (
    <>
     {attachFile[0] === undefined?
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1g">
      <div className="title_wrap">
        <TitleType1></TitleType1>
      </div>
      <ul className="text_wrap">
      <li>
          <label htmlFor="text01">제목</label>
          <span>{data.title}</span>
        </li>
        <li className="textarea_wrap" style={fileNo.length>0?{'height':'800px'}:{'height':'300px'}}>
          <label htmlFor="text02">내용</label>
           {<div style={{marginLeft:"30px",border:"2px solid #313d4d",width:"800px",height:"500px",padding:"10px 10px"}} dangerouslySetInnerHTML={{__html:data.content}}/>}
        </li>
        <li className="file_wrap">
          <label htmlFor="file01">파일#1</label>
          {DownloadMyFileItems}
        </li>
      </ul>
      <StyledBtn onClick={()=>history(-1)}>목록</StyledBtn>
    </section>
    :
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1g">
    <div className="title_wrap">
      <TitleType1></TitleType1>
    </div>
    <ul className="text_wrap">
    <li>
        <label htmlFor="text01">제목</label>
        <span>{data.title}</span>
      </li>
      <li className="textarea_wrap"  style={fileNo.length>0?{'minHeight':'800px',maxHeight:'2200px',height:'1300px'}:{'height':'300px'}}>
        <StyledLabel htmlFor="text02">내용</StyledLabel>
         <div className="textarea" style={{maxHeight:'2000px'}}>
         <ImageGettingNotice attachFile={attachFile} no={no} token={token} CommonHeader={CommonHeader}/>
         {<div style={{marginLeft:"30px",border:"2px solid #313d4d",width:"800px",height:"500px",padding:"10px 10px"}} dangerouslySetInnerHTML={{__html:data.content}}/>}
        </div>
      </li>
      <li className="file_wrap">
        <label htmlFor="file01">파일#1</label>
        {/* <span>{arr[0]!==undefined?arr[0].name:"파일이 없습니다"}</span><button className="download"  onClick={(e)=>onFileDownload(e,arr[0])}>다운로드</button> */}
        {DownloadMyFileItems}
      </li>
    </ul>
    <StyledBtn onClick={()=>history(-1)}>목록</StyledBtn>
  </section>
    }
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
justify-content:center;
margin:0 auto;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledLabel = styled.label`
 justify-content:center;
 line-height:1400px !important;
 `