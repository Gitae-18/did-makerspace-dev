import React,{useCallback,useEffect,useState} from "react";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import styled from "styled-components";
export default function ImageHomeNotice({no,token}){
    const [fileurl2,setFileUrl2] = useState("");
    const [attachFile,setAttachFile] = useState([]);

    const getFile = useCallback(async()=>{
        CommonHeader.authorization = token;
         const notice_no = no.filter((item,index)=> item.attachFile==="Y");
        const res = await fetch(PreUri + '/notice/' + notice_no + '/files', {
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
    
      },[token])


    const getFileName = useCallback(async()=>{
        CommonHeader.authorization = token;
        const res = await fetch(PreUri + '/fileview/'+ no +'/noticefile',  {
          method: Method.get,
          headers: {
            authorization: token,
        }, 
        })
        const fileName = await res.json();
        const filesrc = btoa(fileName.file);
        setFileUrl2(filesrc);
      /*   const blob = new Blob([fileName],{type: 'image/png'})
        const src = URL.createObjectURL(blob);
        console.log(src) */
        //const fileurl = URL.createObjectURL(fileName)
    
     /*    const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function(){
          setFilename(reader.result);
        }
        URL.revokeObjectURL(src) */
      },[token,no,attachFile])
      useEffect(()=>{
        getFileName();
      },[])
    return(
        <StyledDiv className="image_part"><StyledImg src={fileurl2?"data:image/*;base64,"+ fileurl2:'/images/Noimg.png'}  alt="no-image"/></StyledDiv>
    )
}

const StyledImg = styled.img`
width: 300px !important;
height: 250px !important;
opacity: 0.2; /* 반투명도 설정 */
position: absolute; /* 위치를 설정하기 위해 절대 위치로 지정 */
object-fit: cover;
top: 0;
left: 0;
z-index: 0; /* 내부 콘텐츠 위에 표시하기 위해 음수 값 설정 */
`
const StyledDiv = styled.div`
  position: relative;

`;
