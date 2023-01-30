import React ,{useState,useEffect,useCallback}from "react";
import { useNavigate,useLocation } from "react-router";
import TitleType1 from "../contents/TitleType1";
import styled from "styled-components";
import ButtonType2 from "../contents/ButtonType2";
import { useSelector , useDispatch} from "react-redux";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
export default function SectionInputTextType1g() {
  const history = useNavigate();
  const [data,setData] = useState([]);
  const location = useLocation();
  const no = location.state.no;

  const getData = useCallback(async()=>{
    let requri = PreUri + '/faq/'+ no +'/detail';
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setData(json);
  },[])
  useEffect(()=>{
    getData();
  },[getData])
  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e">
      <div className="title_wrap">
       
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">제목</label>
          <span>{data.title}</span>
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text02">내용</label>
          <textarea
            name="text02"
            id="text02"
            cols="50"
            rows="6"
            readOnly={true}
            value={data.content}
          ></textarea>
        </li>
        <li>
          <label htmlFor="file01">파일#1</label>
          <span>선택된파일 없음</span>
        </li>
      </ul>
      <StyledBtn onClick={()=>history(-1)}>목록</StyledBtn>
    </section>
  );
}
const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:40px;
font-size:0.8rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
`