import React,{useState,useEffect,useCallback} from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";
import styled from "styled-components";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommonHeader,PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import SideNavi from "../Admin/Management/SideNavi";
import { useRef } from "react";
import PopupSaveModal from "../Modals/PopupSaveModal";
import imageCompression from 'browser-image-compression';
import { Editor } from '@tinymce/tinymce-react';
import {css} from '../../css/comb/pages/sections.css'
export default function SectionInputTextType1d(){
  
  const { token } = useSelector(state => state.user);
  const [openModal,setOpenModal] = useState(false);
  const [pay,setPay] = useState("");
  const [value,setValue] = useState("<p>This is the initial content of the editor.</p>");
  const [imageFile,setImageFile] = useState([]);
  const [imageUrl,setImageUrl] = useState([]);
  const [isChecked,setIsChecked] = useState('');
  const [pop,setPop] = useState('');
  const [isFile,setIsFile] = useState('');
  const location = useLocation();
  const history = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  let type = location.pathname === "/educontrol" ? "edu" : "class";
  const no = location.state.no;
  const url = location.pathname;
  const editorRef = useRef(null);
  const [input,setInput] = useState({
    className: '',
    place: '',
    fnum: '',
    cost: '',
    map: '',
    popup: '',
    class_period_start:'',
    class_period_end:'',
    application_period_start:'',
    application_period_end:'',
    style:'',
  });
  const [text,setText] = useState('');
  const [content,setContent] = useState('');
  const {className,place,fnum,cost,map,popup,class_period_start,class_period_end,application_period_start,application_period_end,style} = input;
  const onChangeInput = (e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })

  }

  const onClose = () =>{
    setOpenModal(false);
  }
  const handleEditorChange = (content,editor) =>{
    setContent(content);
    editorRef.current = content;
  }
  const onChangePay = (e)=>{
    setPay(e.target.value);
  }
  const handleCheckBox = (e) =>{
    if(e.target.checked===true){
      setIsChecked("Y");
    }
    else{
      setIsChecked("N");
    }
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
  /*   const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  
  // 파일 리스트를 순회하며 압축 및 처리
  let compressedFiles = [];
  for (let i = 0; i < fileList.length; i++) {
    const imageFile = fileList[i];
    console.log(imageFile)
    const comp = await imageCompression(imageFile, options);
    compressedFiles.push(new Blob([comp],{ type:'image/jpeg' }));
    compressedFiles.name = imageFile.name;

  } */
  }
/*   const processImage = useCallback(async(files) =>{
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();

    reader.onload = function(event){
      const img = new Image();
      img.onload = function(){
        canvas.width = 800;
        canvas.height = 600;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onClick(canvas.toDataURL('image/jpeg'),file.name)
      };
      img.src=event.target.result;
    }
    reader.readAsDataURL(file);
  },[imageFile]) */

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
  
  //formdata.append("image","image.png");
/*   const formData = new FormData();
  let index = 0;
  const formDataHandler = async(dataURI) =>{
    
    for (let i = 0; i <imageFile.length; i++) {
      formData.append("imageFiles", imageFile[i]);
      index++;
    }
  } */
  console.log(no);
  const convertToHTML = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const html = doc.documentElement.innerHTML;
    return html;
  }
  const sendData = useCallback(async(e)=>{
    CommonHeader.authorization = token;

    const htmlContent = convertToHTML();
    const form = new FormData();
    form.append('content', htmlContent);
    let val;
    for(let value of form.values()){
      val = value;
    }
    
   /*  const send = await fetch(PreUri + '/classedu/submit',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify({
        content:htmlContent
      }),
    })
    if(!send.ok){
      return(alert('에러 발생'))
    } */
    let requri =  PreUri + '/classedu/addprogram'
    const response = await fetch(requri,{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify({
        title:className,
        type:type,
        content:content,
        class_period_start:class_period_start,
        class_period_end: class_period_end,
        application_period_start:application_period_start,
        application_period_end: application_period_end,
        pay_flag:pay,        
        place:place,
        limit_number:fnum,
        cost:cost!==null?cost:alert("비용을 입력해주세요"),
        map:map,
        popup_flag:isChecked,
        attached_file:imageFile.length>0? "Y":"N",
      })
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
 /*    for(let value of formData.values()){
      console.log(value)
    }
    for(let key of formData.keys()){
      console.log(key)
    } */
    const res = await fetch( PreUri +'/classedu/'+ (no+1) +'/files',{
      method:Method.post,
      headers: { authorization: token},
      body:formData
    })
    if(!res.ok){
      return(alert(getRspMsg(res.status)))
  }
      
   setOpenModal(true);
  },[token,input,isChecked,imageFile])

 useEffect(()=>{
 },[isChecked,imageFile,isFile])



  return (
    <>
    <div id="sub_page_wrap">
       <SideNavi/>
       <div className="sub_page_inner_wrap">
       <div className="sub_inner">
    <section className="section_input_text_type1 section_input_text_type1p">
      <div className="title_wrap">
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">교육명</label>
          <input
            type="text"
            name="className"
            id="text01"
            placeholder="입력하세요."
            value={className}
            onChange={onChangeInput}/>
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text02">내용</label>
          {/* <textarea
            name="text02"
            id="text02"
            cols="30"
            rows="6"
            placeholder="입력하세요."
            onChange={handleEditorChange}
          ></textarea> */}
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
                  'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'lists table link charmap searchreplace | ' +
                  'codesample emoticons fullscreen preview | ' +
                  'removeformat | help ',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}',
              
             }}
             onEditorChange={handleEditorChange}
             />
             </div>
        </li>
        <li>
          <label htmlFor="select01">유/무료</label>
          <select name="select01" id="select01" onChange={onChangePay}>
            <option value="Y">유료</option>
            <option value="N">무료</option>
          </select>
        </li>
        <li className="input_date_wrap">
          <label htmlFor="date01_1">교육기간</label>
          <input type="date" name="class_period_start" id="date01_1"  value={class_period_start} onChange={onChangeInput} />
          <span>~</span>
          <input type="date" name="class_period_end" id="date01_2" value={class_period_end} onChange={onChangeInput} />
        </li>
        <li>
          <label htmlFor="text03">장소</label>
          <input
            type="text"
            name="place"
            id="text03"
            placeholder="입력하세요."
            value={place} onChange={onChangeInput}/>
        </li>
        <li className="input_date_wrap">
          <label htmlFor="date02_1">접수기간</label>
          <input type="date" name="application_period_start" id="date02_1" value={application_period_start} onChange={onChangeInput} />
          <span>~</span>
          <input type="date" name="application_period_end" id="date02_2" value={application_period_end} onChange={onChangeInput}/>
        </li>
        <li className="input_number_wrap">
          <label htmlFor="number01">정원</label>
          <input
            type="number"
            name="fnum"
            id="number01"
            placeholder="0"
            className="w_auto"
            value={fnum} 
            onChange={onChangeInput}
          />
          <span>명</span>
        </li>
        <li className="input_number_wrap">
          <label htmlFor="number02">비용</label>
          <input
            type="number"
            name="cost"
            id="number02"
            placeholder="0"
            className="w_auto"
            value={cost}
            onChange={onChangeInput}
          />
          <span>원</span>
        </li>
        <li>
          <label htmlFor="file01" style={imageFile.length>0?{"height":'150px'}:{"height":"60px"}}>파일#1</label>
          <input type="file" name="imagefile" id="file01" className="w_auto" onChange={handleChangeFile} multiple accept="image/*" />
          <img src={imageUrl} alt={imageUrl.name} style={{"width":"150px"}}/>
        </li>
        <li>
          <label htmlFor="checkbox01">팝업등록</label>
          <input
            type="checkbox"
            name="popup"
            id="checkbox01"
            className="input_checkbox w_auto"
            value={popup} 
            onChange={handleCheckBox}
          />
        </li>
    {/*     <li>
          <label htmlFor="checkbox01">이미지 크기</label>
          <input
            type="text"
            name="popup"
            id="checkbox01"
            className="input_checkbox w_auto"
            onChange={onChangeInput}
          />
        </li> */}
      </ul>
    
        <StyledBtn className="apply" onClick={sendData}>등록</StyledBtn>
        {openModal && <PopupSaveModal visible={openModal} closable={true} onclose={onClose} url={url}/>}
        <StyledGrayBtn className='cancel' onClick={(e)=>history(-1)}>취소</StyledGrayBtn>
     
    </section>
    </div>
    </div>
    </div>
     <div className="sub_page_outer">
     </div>
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
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledGrayBtn= styled.button`
color:#fff;
background-color:#7f7f7f;
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