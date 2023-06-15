import React,{useState,useEffect,useCallback} from "react";
import { useNavigate , useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";

import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import PopupSaveModal from "../Modals/PopupSaveModal";

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
/*     let context = content.replace(/(<([^>]+)>)/gi, "");
    context = context.replace(/&nbsp;/gi,"");
    console.log(content);
    console.log(typeof(context)); */
    CommonHeader.authorization = token;
    const response = await fetch(PreUri+'/notice/notices',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify(
        {
           title:title,
           content:text,
           popup:isChecked===true?"Y":"N",
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

    const respon = await fetch( PreUri +'/notice/'+ (no+1) +'/files',{
       method:Method.post,
/*        headers:{authorization:token}, */
       body:formData,
    })
    if(!respon.ok){
      return(alert(getRspMsg(respon.status)))
    }
  setOpenModal(true);
  },[token,title,text,imageFile,isChecked,content])
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
        <li className="textarea_wrap" style={{'height':'300px'}}>
          <label htmlFor="text02">내용</label>
          {/* <Editor setContent={setContent}
          data={content}  no={no}/> */}
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