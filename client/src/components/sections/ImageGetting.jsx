import React,{useCallback,useEffect,useState} from "react";
import { PreUri, Method } from "../../CommonCode";

export default function ImageGetting({no,token,attachFile}){
    const [fileurl2,setFileUrl2] = useState("");
    const getFileName = useCallback(async()=>{
        const res = await fetch(PreUri + '/fileview/'+ no +'/faqfile',  {
          method: Method.get,
        })
        const fileName = await res.json();
        const filesrc = btoa(fileName.file);
        setFileUrl2(filesrc);
      },[token,no,attachFile])
      useEffect(()=>{
        getFileName();
      },[])
    return(
        <div className="image_part"><img src={fileurl2?"data:image/*;base64,"+ fileurl2:'/images/Noimg.png'}  alt="no-image" style={{"width":"300px","height":"400px"}}/></div>
    )
}