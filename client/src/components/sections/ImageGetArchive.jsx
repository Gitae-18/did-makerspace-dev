import React,{useCallback,useEffect,useState} from "react";
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import YouTube from 'react-youtube';

export default function ImageGetArchive({no,token,attachFile,onItem}){
    const [fileurl2,setFileUrl2] = useState("");

    const getFileName = useCallback(async()=>{
        const res = await fetch(PreUri + '/fileview/'+ no +'/archivefile',  {
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
        <div className="archive_image_part"></div>
    )
}