import React,{useCallback,useEffect,useState} from "react";
import { CommonHeader, PreUri, Method } from "../../CommonCode";

export default function ImageGetting({no,token,attachFile}){
    const [fileurl2,setFileUrl2] = useState("");
    const getFileName = useCallback(async()=>{
        CommonHeader.authorization = token;
        const res = await fetch(PreUri + '/fileview/'+ no +'/faqfile',  {
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
        <div className="image_part"><img src={"data:image/*;base64,"+ fileurl2}  alt="no-image" style={{"width":"300px","height":"400px"}}/></div>
    )
}