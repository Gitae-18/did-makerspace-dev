import React,{useCallback,useEffect,useState} from "react";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import YouTube from 'react-youtube';

export default function ImageGetArchive({no,token,attachFile,onItem}){
    const [fileurl2,setFileUrl2] = useState("");

    const getFileName = useCallback(async()=>{
      if(attachFile==="Y")
      {
        const res = await fetch(PreUri + '/fileview/'+ no +'/archivefile',  {
          method: Method.get,
          headers: {
            authorization: token,
        }, 
        })
        const fileName = await res.json();
        const filesrc = btoa(fileName.file);
        setFileUrl2(filesrc);
      }
      },[token,no,attachFile])
      useEffect(()=>{
        getFileName();
      },[])
    return(
        <div className="archive_image_part"><img src={fileurl2?"data:image/*;base64,"+ fileurl2:'/images/Noimg.png'}  alt="no-image" style={{"width":"180px","height":"210px"}} onClick={onItem}/></div>
    )
}