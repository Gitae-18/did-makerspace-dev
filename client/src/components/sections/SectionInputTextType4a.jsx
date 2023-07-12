import React,{useState,useEffect,useCallback} from "react";
import { useNavigate , useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import { useSelector , useDispatch} from "react-redux";

import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import PopupSaveModal from "../Modals/PopupSaveModal";

export default function SectionInputTextType4a(props) {
  const { token } = useSelector(state => state.user);
  const [openModal,setOpenModal] = useState(false);
  const [imageFile,setImageFile] = useState([]);
  const [isFile,setIsFile] = useState('');
  const [file, setFile] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [imageUrl,setImageUrl] = useState([]);
  const [fileurl2,setFileUrl2] = useState("");
  const [text,setText] = useState("");
  const [title,setTitle] = useState('');
  const [content,setContent] = useState("");
  const [isClickEnabled,setIsClickEnabled] = useState(true);
  const [isChecked,setIsChecked] = useState(false);
  const [address,setAddress] = useState("");
  const [desc,setDesc] = useState();
  const [image,setImage] = useState([]);


/*   const [formState, inputHandler] = useForm(
    {
      file:{
        value:null,
      }
    },
    null
  ); */
/*   const [input,setInput] = useState({
    popup:''
  }) */
  const history = useNavigate();
  const location = useLocation();
  const no = location.state.archive_no;
  const url = location.pathname;
  const API_URL= process.env.REACT_APP_API_URL;
  console.log(no);
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


  const uploadImage = useCallback(async(loader)=>{
    const formData = new FormData();
    let index = 0;
      for (let i = 0; i <imageFile.length; i++) {
        formData.append("files", image[i]);
        index++;
      }
        const response = await fetch( PreUri +'/archive/'+ (no+1) +'/files',{
          method:Method.post,
                 headers:{authorization:token},
          body:formData,
        })
          if(!response.ok){
            return(alert(getRspMsg(response.status)))
          }
         
        },[image,no]); 
  useEffect(()=>{
    uploadImage();
    if(imageFile.length>0||file.length>0)
  {
    setIsFile("Y");
  }
  else{
    setIsFile("N");
  }
  },[file,isFile,imageFile])

  //글쓰기 저장
   const sendData = useCallback(async()=>{

    let context = content.replace(/(<([^>]+)>)/gi, "");
    context = context.replace(/&nbsp;/gi,"");
    if(isClickEnabled){
      setIsClickEnabled(false);
      CommonHeader.authorization = token;
      const response = await fetch(PreUri+'/archive/archives',{
        method:Method.post,
        headers:CommonHeader,
        body:JSON.stringify(
          {
             title:title,
             content:text,
             attached_file:isFile,
             file_type:"text",
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
      const formFile = new FormData();
      let index2 = 0;
      for (let i = 0; i<file.length; i++){
        formFile.append('Files',file[i]);
        index2++;
      }
      const respon = await fetch( PreUri +'/archive/'+ (no+1) +'/files',{
        method:Method.post, 
         headers:{authorization:token},
          body:formData,
      })
      if(!respon.ok){
       return(alert(getRspMsg(respon.status)))
      }
      const res = await fetch(PreUri + '/archive/'+(no+1)+'/nofiles',{
        method:Method.post, 
         headers:{authorization:token},
          body:formFile,
      })
      if(!res.ok){
        return(alert(getRspMsg(res.status)))
       }
      setTimeout(()=>{
        setIsClickEnabled(true);
      },1000);
    }
  setOpenModal(true);
  },[token,title,text,imageFile,isChecked,content,isClickEnabled,file,isFile])
  const onClose = () =>{
    setOpenModal(false);
  }
  const File = ({ item, index, onDelete })=> {
    
    return (
      <StyledDiv>
        <StyledP style={{width:"150px"}}>
          {index}. {item.name}
        </StyledP>
        <StyledBtn2 onClick={()=>{onDelete(index)}}>삭제</StyledBtn2>
      </StyledDiv>
    );
  }

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
        <li className="filearea_wrap">
        <label htmlFor="text02">파일 업로드</label>
          <StyledLabel  htmlFor="file2">파일 추가 +</StyledLabel>
          <input type="file" name="Files" id="file2" className="w_auto" style={{display:"none"}} onChange={onChangeFile} multiple accept=".pdf,video/*,text/plain,.word"/>
          {file&&file.map((item,index)=>(
          <File
          item={item}
          index={index}
          onDelete={()=>onDelete(item)}
          key={item.name}
          />
           ))}
  </li>
        <li className="filearea_wrap">
          <label htmlFor="file01">이미지 파일 업로드</label>
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

const StyledLabel = styled.label`
background-color:#313d4d !important;
color:#fff;
text-align:center;
font-size:12px; 
width:60px !important;
height:40px !important;
padding: 2px 0px !important;
position:absolute;
left:10px;
`
const StyledBtn2= styled.button`
color:#fff;
background-color:#313f4f;
width:40px !important;
height:25px !important;
font-size:0.5rem;
cursor:pointer;
position:relative !important;
left:3px !important;
`
const StyledP= styled.p`
width: 250px;

@media (min-width: 640px) { 
  width: 400px;
 }
@media (min-width: 768px) { 
  width: 500px;
 }
@media (min-width: 1024px) { 
  width: 600px;
 }
`
const StyledDiv = styled.div`
display: flex; 
padding-left: 0.5rem;
padding-right: 0.5rem; 
margin-bottom: 0.25rem; 
justify-content: space-between; 
border-radius: 0.25rem; 
`