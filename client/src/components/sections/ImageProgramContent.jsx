import React,{useCallback,useEffect,useState} from "react";
import { CommonHeader, PreUri, Method } from "../../CommonCode";

export default function ImageProgramContent({no,token,attachFile}){
    const [fileurl2,setFileUrl2] = useState([]);
    const elements = document.getElementsByClassName('sub_page_inner_wrap')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.height = `${fileurl2.length*1300}px`;
    }
    const getFileName = useCallback(async()=>{
       if(attachFile.length>0)
       {
        const res = await fetch(PreUri + '/fileview/'+ no +'/classeducontent',  {
          method: Method.get,
        })
        const fileName = await res.json();

        const filesrc = fileName.file.map((item,index)=>(
            btoa(item)
        ))
        setFileUrl2(filesrc);
       }
      },[no,attachFile])
      console.log(fileurl2)
      useEffect(()=>{
        getFileName();
      },[getFileName])
    return(
        <>
            {fileurl2 && fileurl2.map((item,index)=>(
                <div className="image_part" style={{display:'flex',marginTop:'50px'}}><img src={"data:image/*;base64," + item}  alt="no-image" style={{"width":"600px","height":"800px"}}/></div>
            ))}
            
        </>
    )
}