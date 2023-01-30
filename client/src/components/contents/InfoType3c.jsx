import React ,{useState,useEffect,useCallback}from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg} from "../../CommonCode";
import ButtonType1 from "./ButtonType1";
import TitleType2 from "./TitleType2";
export default function InfoType3a() {
  const location = useLocation();
  const no = location.state.file_no;
  const [data,setData] = useState([]);
  const [date,setDate] = useState("");
  const getOne = useCallback(async() => {
    let requri = PreUri + '/archive/onlist?file_no=' + no;
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
  const Desc = () => {
    return (
      <dl className="dl_wrap">
        <dt className="blind">설명</dt>
        <dd style={{"whiteSpace":"pre-wrap"}}>{data.content}<br/>
        </dd>
        <dt>첨부파일</dt>
        <dd>제조 양산의 기초 실리콘몰드제작.pdf</dd>
      </dl>
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
          date="21-01-09"
          hit="335"
        ></TitleType2>
        <InfoDescWrap></InfoDescWrap>
        <ButtonType1 btnName="목록"></ButtonType1>
      </div>
    </div>
  );
}
