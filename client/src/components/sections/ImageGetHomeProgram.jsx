import React,{useCallback,useEffect,useState} from "react";
import { CommonHeader, PreUri, Method } from "../../CommonCode";

export default function ImageGetHomeProgram({no,token,attachFile}){
    const [fileurl2,setFileUrl2] = useState("");
    const getFileName = useCallback(async()=>{
        CommonHeader.authorization = token;
        const res = await fetch(PreUri + '/fileview/'+ no +'/classedufile',  {
          method: Method.get,
          headers: {
            authorization: token,
        }, 
        })
        const fileName = await res.json();    
        const filesrc = btoa(fileName.file);
        console.log(filesrc)
        setFileUrl2(filesrc);
      },[token,no,attachFile])
      useEffect(()=>{
        getFileName();
      },[])
      console.log(fileurl2);
    return(
        <div className="image_part"><img src={fileurl2?"data:image/*;base64,"+ fileurl2:'/images/Noimg.png'}  alt="no-image" style={{"width":"300px","height":"400px"}}/></div>
    )
}