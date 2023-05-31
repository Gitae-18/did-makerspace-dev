import React ,{useState,useEffect,useCallback}from "react";
import { useNavigate,useLocation } from "react-router-dom";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg ,MaxFileCount} from "../../CommonCode";
import fileDownload from 'js-file-download';
import PopupSaveModal from "../PopupSaveModal";
export default function SectionInputTextType1f_update() {
  const { token } = useSelector(state => state.user);
  const [openModal,setOpenModal] = useState(false);
  const [update,setUpdate] = useState(false);
  const [fileNo,setFileNo] = useState([]);
  const [imageFile,setImageFile] = useState([]);
  const [imageUrl,setImageUrl] = useState([]);
  const [attachFile,setAttachFile] = useState({})
  const [data,setData] = useState([]);
  const [text,setText] = useState("");
  const [title,setTitle] = useState('');
  const history = useNavigate();
  const location = useLocation();
  const no = location.state.no;
  const faqno = location.state.faq_no
  const url = location.pathname;

  const onMemoChange = (e) =>{ 
    setText(e.target.value);
 };
 const onTitleChange = (e) =>{
   setTitle(e.target.value);
 }
 const handleChangeFile = (e) =>{
  setImageFile(e.target.files);
  const file = e.target.files[0];
  const url = URL.createObjectURL(e.target.files[0]);
  const reader =  new FileReader();
  reader.onload=function(){
    setImageUrl(reader.result)
  }
  reader.readAsDataURL(file)
}
const getData = useCallback(async()=>{
  CommonHeader.authorization = token;
 
    let requri = PreUri + '/faq/'+ faqno +'/detail';
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
  console.log(data);
  const getFile = useCallback(async()=>{
    CommonHeader.authorization = token;
    const res = await fetch(PreUri + '/faq/' + no + '/files', {
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
  },[token,no])
  const arr =  Object.values(attachFile)
  const getFileNo = useCallback(async()=>{
    const response = await fetch(PreUri + '/faq/'+ no + '/filesno',{
      method:Method.get,
      headers:CommonHeader
    })
    const json = await response.json();

    setFileNo(json);
  },[no])
  useEffect(()=>{
    getData();
    getFileNo();
    getFile();
  },[getData,getFileNo])
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
    fileDownload(await(await new Response(response.body)).blob(),fileInfo.original_name)
    }
    /* var fileDownload = require('js-file-download');
    fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name); */
}, [attachFile]);
const formData = new FormData();
 const sendData = useCallback(async()=>{
  CommonHeader.authorization = token;
  const response = await fetch(PreUri+'/faq/'+ faqno +'/faqs',{
    method:Method.put,
    headers:CommonHeader,
    body:JSON.stringify(
      {
         title:title,
         content:text,
      }
    )
    
  })
  if(!response.ok){
    return(alert(getRspMsg(response.status)))
  }

  let index = 0;
  
  for (let i = 0; i <imageFile.length; i++) {
    formData.append("imageFiles", imageFile[i]);
    index++;
  }

  const res = await fetch( PreUri +'/faq/'+ faqno +'/files',{
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
					filename={fileNo[i].original_name}
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
        <li className="textarea_wrap"  style={{"height":"300px"}}>
          <label htmlFor="text02">내용</label>
          <textarea
            name="text02"
            id="text02"
            cols="30"
            rows="6"
            placeholder="내용을 입력하세요."
            onChange={onMemoChange}
          ></textarea>
        </li>
        <li className="filearea_wrap">
          <label htmlFor="file01">파일#1</label>
          <input type="file" name="file01" id="file01" className="w_auto" onChange={handleChangeFile} multiple accept="image/*"/>
        </li>
      </ul>
      <div className="button_wrap">
      <StyledBtn2 className="modify"onClick={()=>setUpdate(true)}>수정</StyledBtn2>
      <StyledBtn className="save"onClick={sendData}>저장</StyledBtn>
      </div>
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
border:1px solide #313f4f;
 &:hover{
    background-color:#313f4f;
    color:#fff;
 }
 position:relative;
 
 margin-top:30px;
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