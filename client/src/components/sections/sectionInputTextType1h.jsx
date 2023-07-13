import React,{useState, useEffect, useCallback, useRef} from "react";
import { useNavigate , useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";

import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import PopupSaveModal from "../Modals/PopupSaveModal";

import { Editor } from '@tinymce/tinymce-react';
import {css} from '../../css/comb/pages/sections.css'

export default function SectionInputTextType1h() {
  const { token } = useSelector(state => state.user);
  const [openModal,setOpenModal] = useState(false);
  const [imageFile,setImageFile] = useState([]);
  const [imageUrl,setImageUrl] = useState([]);
  const [fileurl2,setFileUrl2] = useState("");
  const [text,setText] = useState("");
  const [title,setTitle] = useState('');
  const [content,setContent] = useState("");
  const [isChecked,setIsChecked] = useState(false);

  const [desc,setDesc] = useState();
  const [image,setImage] = useState([]);
/*   const [input,setInput] = useState({
    popup:''
  }) */
  const history = useNavigate();
  const location = useLocation();
  const no = location.state.notice_no;
  const url = location.pathname;
  const editorRef = useRef(null);
  const API_URL= process.env.REACT_APP_API_URL;
  const UPLOAD_ENDPOINT = "notice/"+(no+1)+"/images"
/*   const {popup} = input;
  const onChangeInput = (e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })

  } */
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
/*   const uploadImage = useCallback(async(loader)=>{
    const formData = new FormData();
    let index = 0;
      for (let i = 0; i <imageFile.length; i++) {
        formData.append("files", image[i]);
        index++;
      }
        const response = await fetch( PreUri +'/notice/'+ (no+1) +'/files',{
          method:Method.post,
                 headers:{authorization:token},
          body:formData,
        })
          if(!response.ok){
            return(alert(getRspMsg(response.status)))
          }
        },[image,no]); */
/*   const getPreViewImage = useCallback(async()=>{
    const res = await fetch(PreUri + '/fileview/'+ (no+1) +'/noticeview',  {
      method: Method.get,
      headers: {
        authorization: token,
    }, 
    })
    const fileName = await res.json();
    const filesrc = btoa(fileName.file);
    setFileUrl2(filesrc);
  },[token,no]) */
/*   useEffect(()=>{
    getPreViewImage();
  },[]) */
  const sendData = useCallback(async()=>{

    CommonHeader.authorization = token;
    const response = await fetch(PreUri+'/notice/notices',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify(
        {
           title:title,
           content:text,
           popup:isChecked===true?"Y":"N",
           attached_file:imageFile.length>0?"Y":"N"
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

    const respon = await fetch( PreUri +'/notice/'+ (no+1) +'/files',{
       method:Method.post,
/*        headers:{authorization:token}, */
       body:formData,
    })
    if(!respon.ok){
      return(alert(getRspMsg(respon.status)))
    }
  setOpenModal(true);
  },[token,title,text,imageFile,isChecked])
  const onClose = () =>{
    setOpenModal(false);
  }
  const handleCheckBox = (e) =>{
    if(e.target.checked){
      setIsChecked(true);
    }
    else{
      setIsChecked(false);
    }
  }
/*   ClassicEditor
  .create( document.querySelector( '#editor' ), {
      extraPlugins: [uploadPlugin],
      toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
      heading: {
          options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
          ]
      }
  } )
  .catch( error => {
      console.log( error );
  } ); */
  
  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
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
        <li className="textarea_wrap">
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
      
      <StyledBtn onClick={sendData}>저장</StyledBtn>
      {openModal && <PopupSaveModal visible={openModal} closable={true} onclose={onClose} url={url}/>}
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
position:absolute;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`
const Styledli = styled.li`
  display:none;
`
const Textli = styled.li`
height:800px;
`
const ImgTag = styled.img`
width:200px;
height:300px;
position:relative;
left:150px;
`