import React,{useState,useEffect,useCallback} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg} from "../../CommonCode";
import { AuthLevel } from "../../CommonCode";
import {useDispatch,useSelector}  from "react-redux";
import ImageGetArchive from "../sections/ImageGetArchive";
import styled from "styled-components";
import PopupSaveModal from "../Modals/PopupSaveModal";
export default function ListType2c_update() {
    const { token } = useSelector(state => state.user);
    const [openModal,setOpenModal] = useState(false);
    const [imageFile,setImageFile] = useState([]);
    const [imageUrl,setImageUrl] = useState([]);
    const [fileurl2,setFileUrl2] = useState("");
    const [file, setFile] = useState([]);
    const [filedata,setFileData] = useState([]);
    const [input,setInput] = useState({
        title:'',
        url:'',
        content:'',
        attached_file:'',
    })
    const [text,setText] = useState("");
    const [isClickEnabled,setIsClickEnabled] = useState(true);
    const [isChecked,setIsChecked] = useState(false);
    const [address,setAddress] = useState("");
    const [type,setType] = useState([]);
    const [image,setImage] = useState([]);
    const [filetype,setFileType] = useState('');
  /*   const [input,setInput] = useState({
      popup:''
    }) */
    const history = useNavigate();
    const location = useLocation();
    const no = location.state.archive_no;
    console.log(no);
    const API_URL= process.env.REACT_APP_API_URL;
    const {title,url,content,attached_file} = input;
    const onChangeInput = (e) =>{
        const {name,value} = e.target;
        setInput({
          ...input,
          [name]:value,
        })
    
      }
   const onAddressChange = (e) =>{
    console.log(e.target.value);
    setAddress(e.target.value)
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
    const uploadImage = useCallback(async(loader)=>{
      const formData = new FormData();
      let index = 0;
        for (let i = 0; i <imageFile.length; i++) {
          formData.append("files", image[i]);
          index++;
        }
          const response = await fetch( PreUri +'/archive/'+ (no+1) +'/files',{
            method:Method.put,
                   headers:{authorization:token},
            body:formData,
          })
            if(!response.ok){
              return(alert(getRspMsg(response.status)))
            }
          },[image,no]); 
    
    
    useEffect(()=>{
      uploadImage();
    },[uploadImage])
  
    //글쓰기 저장
     const sendData = useCallback(async()=>{
      CommonHeader.authorization = token;
      let context = content.replace(/(<([^>]+)>)/gi, "");
      context = context.replace(/&nbsp;/gi,"");
      if(isClickEnabled){
        setIsClickEnabled(false);
        CommonHeader.authorization = token;
        const response = await fetch(PreUri+'/archive/'+ no +'/update_archive',{
          method:Method.put,
          headers:CommonHeader,
          body:JSON.stringify(
            {
              
               title:title,
               content:content,
               url:address,
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
    if(filedata.length>0)
    {
      const res = await fetch( PreUri +'/archive/'+ no  +'/files',{
        method:Method.put,
        headers: { authorization: token},
        body:formData
      })
      if(!res.ok){
        return(alert(getRspMsg(res.status)))
        }
     const resq = await fetch(PreUri + '/archive/'+ no +'/nofiles',{
      method:Method.put, 
       headers:{authorization:token},
        body:formFile,
     })
     
        if(!resq.ok){
         return(alert(getRspMsg(resq.status)))
        }
    }
    else if(filedata.length<1){
        const res = await fetch( PreUri +'/archive/'+ no  +'/files',{
            method:Method.post,
            headers: { authorization: token},
            body:formData
          })
          if(!res.ok){
            return(alert(getRspMsg(res.status)))
            }
         const resq = await fetch(PreUri + '/archive/'+ no +'/nofiles',{
          method:Method.post, 
           headers:{authorization:token},
            body:formFile,
         })
         
            if(!resq.ok){
             return(alert(getRspMsg(resq.status)))
            }
    }
        setTimeout(()=>{
          setIsClickEnabled(true);
        },1000);
      }
    setOpenModal(true);
    },[token,title,text,imageFile,isChecked,content,isClickEnabled])
    const onClose = () =>{
      setOpenModal(false);
    }
    const onChangeFile = (e) =>{
        let pickedFile=[];
      
        if(e.target.files){
          for(let i = 0;i<e.target.files.length;i++)
          {
            pickedFile.push(e.target.files[i]);
          }
          setFile([...file,...pickedFile]);
        }
        else{
        }
      }
      const onDelete = (file) => {
        setFile((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
      };
    
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
    const getArchive = useCallback(async() =>{
        const response = await fetch(PreUri + '/archive/'+ no +'/editinfo',{
            method:Method.get,
            headers:CommonHeader,
        })
        if(!response.ok){
            return(alert(getRspMsg(response.status)))
        }
        const json = await response.json();
        setType(json.file_type);
        setAddress(json.url);
        setInput(input=>({
            ...input,
            title:json.title,
            content:json.content,
            url:json.url,
            attached_file:json.attached_file,
        }
        ))
    },[no])
    const getFileNo = useCallback(async()=>{
        if(no!==undefined){
        const response = await fetch(PreUri + '/archive/' + no + '/filesno',{
          method:Method.get,
          headers:CommonHeader
        })
        
        const json = await response.json(); 
        if(json.length>0)
        {
        setFileData(json.map((item,index)=> item.original_name));
        setFileType(json[0].type);
        }
        }
      },[])
    useEffect(()=>{
        getArchive();
        getFileNo();
    },[getArchive,getFileNo])
    console.log(filetype)
    const File = ({ item, index, onDelete })=> {
    
        return (
          <StyledDiv>
            <StyledP style={{width:"150px"}}>
              {index}. {item.name}
            </StyledP>
            <StyledBtn3 onClick={()=>{onDelete(index)}}>삭제</StyledBtn3>
          </StyledDiv>
        );
      }
    return (
      <section className="section_input_text_type1 section_input_text_type1d">
        <ul className="text_wrap">
        <li>
            <label htmlFor="text01">제목</label>
            <input
              type="text"
              name="title"
              id="text01"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={onChangeInput}
            />
          </li>
          <li className="textarea_wrap" style={{'height':'300px'}}>
          <label htmlFor="text02" style={{lineHeight:'300px'}}>내용</label>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="6"
              value={content}
              onChange={onChangeInput}
            ></textarea>
          </li>
          {type==="video"?<li className="filearea_wrap">
            <label htmlFor="text02">동영상 주소</label>
            <textarea
              name="address"
              id="address"
              cols="50"
              rows="2"
              value={address}
              onChange={onAddressChange}
            ></textarea>
          </li>
            :null}
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
           {filetype.includes('pdf||text||word')&&<span>{imageUrl.length===0?filedata:null}</span>}
        </li>
        <li>
          <label htmlFor="file01" style={imageFile.length>0?{"height":'150px'}:{"height":"60px"}}>이미지파일#1</label>
          <input type="file" name="imagefile" id="file01" className="w_auto" onChange={handleChangeFile} multiple accept="image/*" style={{display:'none'}}/>
          <StyledLabel2 className="input_button" for="file01">파일추가+</StyledLabel2>
          <img src={imageUrl} alt={imageUrl.name} style={{"width":"150px"}}/>  
          {filetype.includes('image')&&<span>{imageUrl.length===0?filedata:null}</span>}
        </li>
          
        </ul>
        <div style={{flexDirection:'row',left:'-50px',position:'relative'}}>
        <StyledBtn onClick={sendData}>수정</StyledBtn>
        {openModal && <PopupSaveModal visible={openModal} closable={true} onclose={onClose} url={url}/>}
        <StyledGrayBtn className='cancel' onClick={(e)=>history(-1)}>취소</StyledGrayBtn>
        </div>
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
  position:relative;
  left:-100px;
  border:1px solide #313f4f;
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
  const StyledGrayBtn= styled.button`
  color:#fff;
  background-color:#7f7f7f;
  width:120px;
  height:30px;
  font-size:0.7rem;
  cursor:pointer;
  border:1px solide #313f4f;
  margin-left:100px;
   &:hover{
      background-color:#transparent
      color:#313f4f
   }
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
   const StyledLabel = styled.label`
   background-color:#313d4d !important;
   color:#fff;
   text-align:center;
   font-size:12px; 
   width:60px !important;
   height:40px !important;
   padding: 0px 0px !important;
   position:absolute;
   left:10px;
   `
   const StyledLabel2= styled.label`
   color:#fff;
   background-color:#313f4f;
   width:70px;
   height:40px !important;
   font-size:12px;
   line-height:40px !important;
   padding:0px !important;
   cursor:pointer;
   margin-left:10px;
   border:1px solide #313f4f;
    `
    const StyledBtn3= styled.button`
    color:#fff;
    background-color:#313f4f;
    width:40px !important;
    height:25px !important;
    font-size:0.5rem;
    cursor:pointer;
    position:relative !important;
    left:3px !important;
    `