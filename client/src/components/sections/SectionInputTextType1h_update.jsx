import React,{ useState, useEffect, useCallback, useRef} from "react";
import { useNavigate , useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method, getRspMsg, MaxFileCount} from "../../CommonCode";

import { Editor } from '@tinymce/tinymce-react';
import {css} from '../../css/comb/pages/sections.css'
import PopupSaveModal from "../Modals/PopupSaveModal";
import fileDownload from 'js-file-download';
export default function SectionInputTextType1h_update() {
  const { token } = useSelector(state => state.user);
  //
  const [data,setData] = useState([]);
  //
  const [openModal,setOpenModal] = useState(false);
  const [imageFile,setImageFile] = useState([]);
  const [imageUrl,setImageUrl] = useState([]);
  const [attachFile,setAttachFile] = useState({})
  const [text,setText] = useState("");
  const [title,setTitle] = useState('');
  const [update,setUpdate] = useState(false);
  const [isChecked,setIsChecked] = useState(false);
  const [content,setContent] = useState("");
  const history = useNavigate();
  const location = useLocation();
  const n_no = location.state.no;
  const no = location.state.no;
  const editorRef = useRef(null);
  const notice_no = location.state.update_no;
  const url = location.pathname;

  const handleEditorChange = (content,editor) =>{
    setContent(content);
    editorRef.current = content;
  }
  const onMemoChange = (e) =>{ 
    setText(e.target.value);
 };
 const onTitleChange = (e) =>{
   setTitle(e.target.value);
 }
 const handleChangeFile = async(e) =>{
  setImageFile(e.target.files) // 전체 파일 리스트
 const file = e.target.files[0];
 const url = URL.createObjectURL(e.target.files[0]);
 const reader =  new FileReader();
 reader.onload=function(){
   setImageUrl(reader.result)
 }
 reader.readAsDataURL(file)
 }
 const compressImage = (file) =>{
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800; // 원하는 너비로 조정
        canvas.height = 600; // 원하는 높이로 조정
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/png', 0.7); // 압축 품질 조정
        resolve(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}
function dataURLToBlob(dataURL) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
}

  const sendData = useCallback(async()=>{
    CommonHeader.authorization = token;
    
    const response = await fetch(PreUri+'/notice/'+notice_no+'/notices',{
      method:Method.put,
      headers:CommonHeader,
      body:JSON.stringify(
        {
           title:title,
           content:content,
        }
      )
      
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const files = imageFile;
    const formData = new FormData();

    for (let i = 0; i<files.length; i++){
      const file = files[i];
      const compressedDataUrl = await compressImage(file);
      const compressedBlob = dataURLToBlob(compressedDataUrl);
      formData.append('imageFiles',compressedBlob, file.name);
    }

    const res = await fetch( PreUri +'/notice/'+ notice_no +'/files',{
      method:Method.put,
      headers: { authorization: token},
      body:formData
    })
    if(!res.ok){
      return(alert(getRspMsg(res.status)))
  }
  setUpdate(false);
  setOpenModal(true);
  },[token,title,text,imageFile])

  const onClose = () =>{
    setOpenModal(false);
  }

  const getData = useCallback(async()=>{
    let requri = PreUri + '/notice/'+ notice_no +'/detail';
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
  },[no,token])
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
  },[token,no ])


  useEffect(()=>{

    getData();
    
    getFile();

  },[getData])
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
    
    const blob = await response.blob();
    if(fileInfo!==undefined){
      fileDownload(blob, fileInfo.original_name);
    }
    /* var fileDownload = require('js-file-download');
    fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name); */
}, [attachFile]);
  useEffect(()=>{
    getData();
  },[getData])
  const handleCheckBox = (e) =>{
    if(e.target.checked){
      setIsChecked(true);
    }
    else{
      setIsChecked(false);
    }
  }
  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
      <div className="title_wrap">
      </div>
      <ul className="text_wrap">
      <li>
          <label htmlFor="text01">제목</label>
          <input
            type="text"
            name="text01"
            id="text01"
            placeholder="제목을 입력하세요."
            onChange={onTitleChange}
          />
        </li>
        <li className="textarea_wrap" style={{"height":"400px"}}>
          <label htmlFor="text02">내용</label>
           <div className="editor_wrap">
          <Editor 
            id= 'tinyEditor'
            className="tiny"
            apiKey = {process.env.REACT_APP_TINYMCE_KEY}
            init={{
              height: 300,
              width: 800,
              forced_root_block : false,
              force_br_newlines : true,
              force_p_newlines : false,
              selector:'textarea',
              content_css:css,
              menubar: false,
              plugins: [
                'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'searchreplace',
                  'fullscreen',
                  'media',
                  'table',
                  'code',
                  'help',
                  'emoticons',
                  'codesample',
                  'quickbars',
              ],
              toolbar:
              "undo redo spellcheckdialog  | blocks fontfamily fontsizeselect | bold italic underline forecolor backcolor | link | align lineheight checklist bullist numlist | indent outdent | removeformat typography",
              font_size_formats:
              "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
             }}
             onEditorChange={handleEditorChange}
             />
             </div>
        </li>
        <li>
          <label htmlFor="checkbox01">팝업등록</label>
          <input
            type="checkbox"
            name="popup"
            id="checkbox01"
            className="input_checkbox w_auto"
            value={isChecked}
            onChange={handleCheckBox}
          />
        </li>
        <li className="filearea_wrap">
          <label htmlFor="file01">파일#1</label>
          <input type="file" name="imageFiles" id="file1" className="w_auto" onChange={handleChangeFile} multiple accept="image/*"/>
        </li>
        
      </ul>
      <div className="btn_wrap">
      <StyledBtn2 className="modify"onClick={()=>setUpdate(true)}>수정</StyledBtn2>
      <StyledBtn onClick={sendData}>저장</StyledBtn>
      </div>
      {openModal && <PopupSaveModal visible={openModal} closable={true} onclose={onClose} url={url}/>}
    </section>
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
const StyledBtn2= styled.button`
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