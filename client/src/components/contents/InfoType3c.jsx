import React ,{useState,useEffect,useCallback}from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg,MaxFileCount} from "../../CommonCode";
import ButtonType1 from "./ButtonType1";
import TitleType2 from "./TitleType2";
import fileDownload from 'js-file-download'
export default function InfoType3a() {
  const location = useLocation();
  const no = location.state.archive_no;
  const [data,setData] = useState([]);
  const [date,setDate] = useState("");
  const [attachFile,setAttachFile] = useState({});
  const [fileNo,setFileNo] = useState([]);
  const getOne = useCallback(async() => {
    let requri = PreUri + '/archive/onlist?archive_no=' + no;
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    });
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();  
    setData(json);
    setDate(json.created_at.slice(0,10))
  },[no])
  const onFileDownload = useCallback(async (e, fileInfo) => {
    console.log(fileInfo);
    let attached_file_no ;
    for(let i = 0; i < attachFile.length&&i<MaxFileCount; i++){
      if(attachFile.legnth>1){
        attached_file_no = attachFile.attached_file_no[i]
      }
      else{
        attached_file_no = attachFile.attached_file_no
      }
    }
 
    const response = await fetch(PreUri + '/archive/' + no + '/file/' + fileInfo.attached_file_no, {
        method: Method.get,
    });

    if (!response.ok) {
        console.log('response error');
        return;
    }
    const blob = await response.blob();
    if(fileInfo!==undefined){
      fileDownload(blob, fileInfo.original_name);
    }
    /* var fileDownload = require('js-file-download');
    fileDownload(await (await new Response(response.body)).blob(), fileInfo.original_name); */
}, [attachFile]);
const getFileNo = useCallback(async()=>{
  const response = await fetch(PreUri + '/archive/'+ no + '/filesno',{
    method:Method.get,
    headers:CommonHeader
  })
  const json = await response.json();

  setFileNo(json);
},[no])
const FileDownload = useCallback((props) => {
  return (<>
    <button className="download" style={{ border: "0px", cursor: 'pointer' }} onClick={props.onClick}>{props.filename}</button>
  </>);
}, []);
let DownloadMyFileItems = [];
  if (fileNo && fileNo.length > 0) {
    for (let i = 0; i < fileNo.length; i++) {
      DownloadMyFileItems.push(
        <FileDownload index={i}
          filename={fileNo[i].original_name}
          onClick={(e) => onFileDownload(e, fileNo[i])}
          key={i} />);
    };
  }
  else{
    DownloadMyFileItems.push(
    <button className="download" style={{ border: "0px", cursor: 'pointer' }} >파일이 없습니다.</button>
    )
  }
  const getFile = useCallback(async()=>{
    if(no!==undefined){
    const res = await fetch(PreUri + '/archive/' + no + '/files', {
      method: Method.get, 
    })
    const fileList = await res.json();
    if(fileList!==null||undefined)
    {
    setAttachFile(fileList)
    }
    }
  },[no])
  useEffect(()=>{
    getOne();
      getFile();
      getFileNo();
  },[getOne,getFile,getFileNo])
  const Desc = () => {
    return (
      <>
      <dl className="dl_wrap">
        <dt className="blind">설명</dt>
        <dd style={{"whiteSpace":"pre-wrap"}}>{data.content}<br/>
        </dd>
      </dl>
      <div>
      <label style={{backgroundColor:"gray",marginRight:"10px",color:"white",width:"55px !important",height:"50px !important"}}>파일 다운로드</label>
      {DownloadMyFileItems}
    </div>
      </>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <Desc></Desc>
      </div>
    );
  };
  return (
    <div className="info_type3 info_type3b">
      <div className="info_inner_wrap">
        <TitleType2
          title="제조 양산의 기초 실리콘 몰드 제작"
          date={date}
          hit={data.hit}
        ></TitleType2>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록"></ButtonType1>
      </div>
    </div>
  );
}
