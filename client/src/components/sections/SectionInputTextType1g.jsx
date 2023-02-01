import React ,{useState,useEffect,useCallback}from "react";
import { useNavigate,useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg ,MaxFileCount  } from "../../CommonCode";
import fileDownload from 'js-file-download'
import { SET_MATERIAL_PAGEINFO } from "../../store/management";

export default function SectionInputTextType1g() {
  const history = useNavigate();
  const [data,setData] = useState([]);
  const [attachFile,setAttachFile] = useState({})

  const [image,setImage] = useState("");
  const [fileUrl,setFileUrl] = useState("");

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
      headers: {
        authorization: token,
    }, 
    })
    const fileList = await res.json();
    setAttachFile(fileList)

    let buff = new Buffer(res.data.images[0],"base64");
    let text = buff.toString("ascii");
    setImage(`data:image/png;base74,${text}`);
  },[token,no ])
  const getFileUrl = useCallback(async()=>{
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/faq/' + no + '/fileurl/' + 6, {
      method: Method.get,
      headers:CommonHeader,
      })
      if (!response.ok) {
        console.log('response error');
        return;
    } 
    const json = await response.json();
    setFileUrl(json);
  },[token])



  const arr =  Object.values(attachFile)
  useEffect(()=>{
    getData();
    getFile();
  },[getData])
  console.log(attachFile)


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
    const response = await fetch(PreUri + '/faq/' + no + '/file/' + 6, {
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
    fileDownload(await(await new Response(response.body)).blob(),fileInfo.original_name)
    }
    /* var fileDownload = require('js-file-download');
    fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name); */
}, [attachFile]);
  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
      <div className="title_wrap">
       
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
            cols="50"
            rows="6"
            readOnly={true}
            value={data.content}
          ></textarea>
          <img src={image} alt="no-image" style={{"width":"200px"}}/>
        </li>
        <li className="file_wrap">
          <label htmlFor="file01">파일#1</label>
          <span>{arr[0]!==undefined?arr[0].name:"파일이 없습니다"}</span><button className="download"  onClick={(e)=>onFileDownload(e,arr[0])}>다운로드</button>
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
height:40px;
font-size:0.8rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`