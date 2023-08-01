import React ,{useState,useEffect,useCallback}from "react";
import { useNavigate,useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";
import ImageGetting from "./ImageGetting";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg ,MaxFileCount  } from "../../CommonCode";
import fileDownload from 'js-file-download'
import { SET_MATERIAL_PAGEINFO } from "../../store/management";
export default function SectionInputTextType1g() {
  const history = useNavigate();
  const [data,setData] = useState([]);
  const [attachFile,setAttachFile] = useState({})
  const [fileNo,setFileNo] = useState({});
  const { token } = useSelector(state => state.user);
  const location = useLocation();
  const no = location.state.no;

  const getData = useCallback(async()=>{
    let requri = PreUri + '/faq/'+ no +'/detail';
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
  },[])
  const getFile = useCallback(async()=>{
    CommonHeader.authorization = token;
    const res = await fetch(PreUri + '/faq/' + no + '/files', {
      method: Method.get,
    })
    const fileList = await res.json();
    if(fileList!==null||undefined)
    {
    setAttachFile(fileList)
    }
  },[token,no])

  const getFileNo = useCallback(async()=>{
    const response = await fetch(PreUri + '/faq/'+ no + '/filesno',{
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
  const arr =  Object.values(attachFile)

  useEffect(()=>{
    getData();
    getFile();
    getFileNo();
  },[no])

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
    const response = await fetch(PreUri + '/faq/' + no + '/file/' + fileInfo.attached_file_no, {
        responseType: 'blob',
        method: Method.get,
    });

    if (!response.ok) {
        console.log('response error');
        return;
    }
    const blob = await response.blob();
    if(fileInfo!==undefined){
      fileDownload(blob, fileInfo.original_name);
    }
    /* var fileDownload = require('js-file-download');
    fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name); */
}, [attachFile,fileNo]);


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
					filename={fileNo[i].file_name}
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
      <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1g "> 
      <ul className="text_wrap">
      <li>
      <StyledLabel htmlFor="text01">제목</StyledLabel>
        <span>{data.title}</span>
      </li>
      <li className="textarea_wrap" style={fileNo.length>0?{'height':'800px'}:{'height':'800px'}}>
      <label htmlFor="text02" style={{lineHeight:"800px"}}>내용</label>
        <div className="textarea">
        {<div style={{marginLeft:"30px",border:"2px solid #313d4d",width:"800px",height:"500px",padding:"10px 10px"}} dangerouslySetInnerHTML={{__html:data.content}}/>}
        </div>
      </li>
      <li className="file_wrap">
        <label htmlFor="file01">파일#1</label>
        {/* <span>{arr[0]!==undefined?arr[0].name:"파일이 없습니다"}</span> */}{/* <button className="download"  onClick={(e)=>onFileDownload(e,fileNo[0])}>다운로드</button> */}
        {DownloadMyFileItems}
      </li>
    </ul>
    <StyledBtn onClick={()=>history(-1)}>목록</StyledBtn>
    </section>:
     <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1g">
     <ul className="text_wrap">
       <li>
         <StyledLabel htmlFor="text01">제목</StyledLabel>
         <span>{data.title}</span>
       </li>
       <li className="textarea_wrap" style={fileNo.length>0?{'minHeight':'800px',maxHeight:'2200px',height:'1315px'}:{'height':'800px'}}>
         <StyledLabel2 htmlFor="text02">내용</StyledLabel2>
         <div className="textarea">
         {<div style={{marginLeft:"30px",border:"2px solid #313d4d",width:"800px",height:"500px",padding:"10px 10px"}} dangerouslySetInnerHTML={{__html:data.content}}/>}
          <ImageGetting attachFile={attachFile} no={no} token={token} CommonHeader={CommonHeader}/>
         </div>
       </li>
       <li className="file_wrap">
         <label htmlFor="file01">파일#1</label>
         {/* <span>{arr[0]!==undefined?arr[0].name:"파일이 없습니다"}</span> */}
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
font-size:0.8rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`
const StyledLabel = styled.label`
position:relative;
`
const StyledLabel2 = styled.label`
justify-content:center;
line-height:1400px !important;
`