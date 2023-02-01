import React,{useState,useEffect,useCallback} from "react";
import { useNavigate , useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import PopupSaveModal from "../PopupSaveModal";
export default function SectionInputTextType1h() {
  const { token } = useSelector(state => state.user);
  const [openModal,setOpenModal] = useState(false);
  const [imageFile,setImageFile] = useState([]);
  const [imageUrl,setImageUrl] = useState([]);
  const [text,setText] = useState("");
  const [title,setTitle] = useState('');
  const history = useNavigate();
  const location = useLocation();
  const no = location.state.notice_no;
  const url = location.pathname;
  console.log(no);
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



  const sendData = useCallback(async()=>{
    CommonHeader.authorization = token;
    
    const response = await fetch(PreUri+'/notice/notices',{
      method:Method.post,
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
    let myform = document.getElementById('file1');
    const formData = new FormData();
    let index = 0;
   
    for (let i = 0; i <imageFile.length; i++) {
      formData.append("imageFiles", imageFile[i]);
      index++;
    }
    for(let value of formData.values()){
      console.log(value)
    }
    for(let key of formData.keys()){
      console.log(key)
    }
    const respon = await fetch( PreUri +'/notice/'+ (no+1) +'/files',{
       method:Method.post,
       headers:{authorization:token},
       body:formData,
    })
    if(!respon.ok){
      return(alert(getRspMsg(respon.status)))
    }
  setOpenModal(true);
  },[token,title,text,imageFile])
  console.log(imageFile)
  const onClose = () =>{
    setOpenModal(false);
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
          <input type="file" name="imageFiles" id="file1" className="w_auto" onChange={handleChangeFile} multiple accept="image/*"/>
          <img src={imageUrl} alt={imageUrl.name} style={{"width":"150px"}}/>
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