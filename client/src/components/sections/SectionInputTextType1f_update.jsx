import React ,{useState,useEffect,useCallback}from "react";
import { useNavigate,useLocation } from "react-router-dom";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import PopupSaveModal from "../PopupSaveModal";
export default function SectionInputTextType1f_update() {
  const { token } = useSelector(state => state.user);
  const [openModal,setOpenModal] = useState(false);
  const [update,setUpdate] = useState(false);
  const [imageFile,setImageFile] = useState([]);
  const [data,setData] = useState([]);
  const [text,setText] = useState("");
  const [title,setTitle] = useState('');
  const history = useNavigate();
  const location = useLocation();
  const no = location.state.no;
  const faqno = location.state.faq_no
  const url = location.pathname;
  console.log(url)
  const onMemoChange = (e) =>{ 
    setText(e.target.value);
 };
 const onTitleChange = (e) =>{
   setTitle(e.target.value);
 }
 const handleChangeFile = (e) =>{
  setImageFile(e.target.files);
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
  useEffect(()=>{
    getData();
  },[getData])
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

const BasicContent = () =>{
    return(
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
        </li>
        <li>
          <label htmlFor="file01">파일#1</label>
          <span>선택된파일 없음</span>
        </li>
      </ul>
    )
}

const UpdateContent = () =>{
    return(
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
            <textarea
              name="text02"
              id="text02"
              cols="30"
              rows="6"
              placeholder="내용을 입력하세요."
              onChange={onMemoChange}
            ></textarea>
          </li>
          <li>
            <label htmlFor="file01">파일#1</label>
            <input type="file" name="file01" id="file01" className="w_auto" onChange={handleChangeFile} multiple accept="image/*" />
            
          </li>
        </ul>
    )
}
  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
      <div className="title_wrap">
      </div>
      {update === false ? <BasicContent/>:<UpdateContent/>}
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