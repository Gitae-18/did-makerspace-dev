import React,{useState,useEffect,useCallback} from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";
import styled from "styled-components";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommonHeader,PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import SideNavi from "../Admin/Management/SideNavi";
import { useRef } from "react";
import PopupSecondSaveModal from "../Modals/PopupSecondSaveModal";
import { Editor } from '@tinymce/tinymce-react';
import {css} from '../../css/comb/pages/sections.css'
import imageCompression from 'browser-image-compression';
export default function SectionInputTextType1d_update(){
  
  const { token } = useSelector(state => state.user);
  const [update,setUpdate] = useState(false);
  const [data,setData] = useState([]);
  const [openModal,setOpenModal] = useState(false);
  const [pay,setPay] = useState("");
  const [imageFile,setImageFile] = useState([]);
  const [imageUrl,setImageUrl] = useState([]);
  const [file, setFile] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isChecked,setIsChecked] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  let type = location.pathname === "/educontrol" ? "edu" : "class";
  const no = location.state.no;
  const programno = location.state.programno;

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
  });
  const [text,setText] = useState('')
  const [content,setContent] = useState('');
  const {className,place,fnum,cost,map,popup,class_period_start,class_period_end,application_period_start,application_period_end} = input;
  const onChangeInput = (e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })

  }

  const getData = useCallback(async()=>{
    CommonHeader.authorization = token;
    let requri = PreUri + '/classedu/'+ programno +'/class_receive';
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
  },[token])
  useEffect(()=>{
    getData();
  },[getData,isChecked,token])
  const onClose = () =>{
    setOpenModal(false);
  }
  const onMemoChange = (e) =>{ 
    setText(e.target.value);
 };

  const onChangePay = (e)=>{
    setPay(e.target.value);
  }

  const onChangeFile = (e) =>{
    let pickedFile=[];
  
    if(e.target.files){
      for(let i = 0;i<e.target.files.length;i++)
      {
        pickedFile.push(e.target.files[i]);
      }
      setFile([...file,...pickedFile]);
      setIsValid(true);
    }
    else{
      setIsValid(false);
    }
  }
  const onDelete = (file) => {
    setFile((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
  };

  const handleChangeFile = async(e) =>{
    setImageFile(e.target.files)
    const file = e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);
    const reader =  new FileReader();
    reader.onload=function(){
      setImageUrl(reader.result)
    }
    reader.readAsDataURL(file)

   // const fileList = e.target.files; // 전체 파일 리스트
  /* const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    fileType: 'image/*',
  };
  
  // 파일 리스트를 순회하며 압축 및 처리
  const compressedFiles = [];
  for (let i = 0; i < fileList.length; i++) {
    const imageFile = fileList[i];
    const comp = await imageCompression(imageFile, options);
    compressedFiles.push(comp);
  }
  const file = e.target.files[0];
  const url = URL.createObjectURL(e.target.files[0]);
  const reader =  new FileReader();
  reader.onload=function(){
    setImageUrl(reader.result)
  }
  reader.readAsDataURL(file)
  setImageFile(compressedFiles); */
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

  const handleCheckBox = (e) =>{
    if(e.target.checked){
      setIsChecked(true);
    }
    else{
      setIsChecked(false);
    }
  }
  const handleEditorChange = (content,editor) =>{
    setContent(content);
    editorRef.current = content;
  }
  //formdata.append("image","image.png");

  const formData = new FormData();
  const sendData = useCallback(async(e)=>{
    CommonHeader.authorization = token;
    let requri =  PreUri + '/classedu/'+ programno +'/update_program'
    const response = await fetch(requri,{
      method:Method.put,
      headers:CommonHeader,
      body:JSON.stringify({
        title:className,
        content:content,
        type:type,
        class_period_start:class_period_start,
        class_period_end: class_period_end,
        application_period_start:application_period_start,
        application_period_end: application_period_end,
        pay_flag:pay,        
        place:place,
        limit_number:fnum,
        cost:cost,
        map:map,
        popup_flag:isChecked===true?"Y":"N",
        attahced_file:imageFile.length>0?imageFile:"N",
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

    const formFile = new FormData();
    let index2 = 0;
    for (let i = 0; i<file.length; i++){
      formFile.append('Files',file[i]);
      index2++;
    }
 /*    for(let value of formData.values()){
      console.log(value)
    }
    for(let key of formData.keys()){
      console.log(key)
    } */

      const res = await fetch( PreUri +'/classedu/'+ programno +'/files',{
        method:Method.put,
        headers: { authorization: token},
        body:formData
      })
      if(!res.ok){
        return(alert(getRspMsg(res.status)))
    }
    const resq = await fetch(PreUri + '/classedu/'+ programno +'/nofiles',{
      method:Method.put, 
       headers:{authorization:token},
        body:formFile,
    })
    if(!resq.ok){
      return(alert(getRspMsg(res.status)))
     }
    //}
    setUpdate(false);
    setOpenModal(true);
  },[token,input,imageFile])
  
  return (
    <>
    
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
      </ul>
        <StyledBtn className="apply" onClick={sendData}>수정</StyledBtn>
        {openModal && <PopupSecondSaveModal visible={openModal} closable={true} onclose={onClose} update={true}/>}
        <StyledGrayBtn className='cancel' onClick={(e)=>history(-1)}>취소</StyledGrayBtn>
     
    </section>
  
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
 const StyledBtn2= styled.button`
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