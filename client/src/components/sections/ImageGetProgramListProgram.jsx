import React,{useCallback,useEffect,useState} from "react";
import { CommonHeader, PreUri, Method } from "../../CommonCode";

export default function ImageGetProgramListProgram({no,token,attachFile,onItem}){
  console.log(no)
    const [fileurl2,setFileUrl2] = useState("");
    const getFileName = useCallback(async()=>{
        const res = await fetch(PreUri + '/fileview/'+ no +'/classedufile',  {
          method: Method.get,
        })
        const fileName = await res.json();
        const filesrc = btoa(fileName.file);
        setFileUrl2(filesrc);
      },[attachFile])
      useEffect(()=>{
        getFileName();
      },[getFileName])
    return(
      <>
        { attachFile==="N"?
          <img src="/images/Noimg.png" alt="no"/>:
          <div className="image_part"><img src={"data:image/*;base64,"+ fileurl2}  alt="no-image" style={{"width":"180px","height":"210px"}} onClick={onItem}/></div>
        }
        </>
    )
}