import React ,{useState,useEffect,useCallback}from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg} from "../../CommonCode";
import ButtonType1 from "./ButtonType1";
import TitleType2 from "./TitleType2";
import ReactPlayer from 'react-player'
export default function InfoType3a() {
  const location = useLocation();
  const no = location.state.archive_no;
  const [data,setData] = useState([]);
  const [date,setDate] = useState("");
  const history = useNavigate();
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
  useEffect(()=>{
    getOne();
  },[getOne])
 console.log(data);
  const DescVedio = () => {
    return (
      <div className="vedio_wrap">
        <div className="image_part">
        <ReactPlayer url={data.url}
        height="500px"
        width="1300px"/></div>
      </div>
    );
  };
  const Desc = () => {
    return (
      <dl className="dl_wrap">
        <dt>설명</dt>
        <dd style={{"whiteSpace":"pre-wrap"}}>{data.content}</dd>
      </dl>
    );
  };
  const InfoDescWrap = () => {
    return (
      <div className="info_desc_wrap">
        <DescVedio></DescVedio>
        <Desc></Desc>
      </div>
    );
  };
  return (
    <div className="info_type3">
      <div className="info_inner_wrap">
        <TitleType2 title={data.title} date={date} hit={data.hit}></TitleType2>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록"></ButtonType1>
      </div>
    </div>
  );
}
