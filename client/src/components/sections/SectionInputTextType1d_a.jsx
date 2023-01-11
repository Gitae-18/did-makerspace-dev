import React,{useState,useEffect,useCallback} from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";
import styled from "styled-components";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommonHeader,PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import SideNavi from "../Admin/Management/SideNavi";
const  SectionInputTextType1d_a = () => {
  const { token } = useSelector(state => state.user);
  const [pay,setPay] = useState("");
  const location = useLocation();

  let type = location.pathname === "/educontrol" ? "edu" : "class";
  const [input,setInput] = useState({
    className: '',
    place: '',
    fnum: '',
    cost: '',
    map: '',
    popup: '',
    class_period_start:'',
    class_period_end:'',
    application_period_start:'',
    application_period_end:'',
  });
  const [text,setText] = useState('')

  const {className,place,fnum,cost,map,popup,class_period_start,class_period_end,application_period_start,application_period_end} = input;
  const onChangeInput = (e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })

  }
  const onMemoChange = (e) =>{ 
    setText(e.target.value);
 };
let hit = 100;
let popupf = "N";

  
  const onChangePay = (e)=>{
    setPay(e.target.value);
  }

  const sendData = useCallback(async()=>{
    CommonHeader.authorization = token;
    let requri =  PreUri + '/classedu/addprogram'
    const response = await fetch(requri,{
      method:Method.post,
      heeaders:CommonHeader,
      body:JSON.stringify({
        title:className,
        content:text,
        type:type,
        class_period_start:class_period_start,
        class_period_end: class_period_end,
        application_period_start:application_period_start,
        application_period_end: application_period_end,
        pay_flag:pay,        
        cost:cost,
        place:place,
        limit_number:fnum,
        map:map,
        popup_flag:popupf,
      })
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }

  },[token,input])

/*   useEffect(()=>{
//    onMemoChange();
    getData();
  },[input,token]) */
  return (
    <>

    <section className="section_input_text_type1 section_input_text_type1d">
      <div className="title_wrap">
        <TitleType1 title="행사 프로그램 등록"></TitleType1>
      </div>
      <ul className="text_wrap">
        <li>
          <label htmlFor="text01">교육명</label>
          <input
            type="text"
            name="className"
            id="text01"
            placeholder="입력하세요."
            value={className}
            onChange={onChangeInput}/>
        </li>
        <li className="textarea_wrap">
          <label htmlFor="text02">내용</label>
          <textarea
            name="text02"
            id="text02"
            cols="30"
            rows="6"
            placeholder="입력하세요."
            onChange={onMemoChange}
          ></textarea>
        </li>
        <li>
          <label htmlFor="select01">유/무료</label>
          <select name="select01" id="select01" onChange={onChangePay}>
            <option value="Y">유료</option>
            <option value="N">무료</option>
          </select>
        </li>
        <li className="input_date_wrap">
          <label htmlFor="date01_1">교육기간</label>
          <input type="date" name="class_period_start" id="date01_1"  value={class_period_start} onChange={onChangeInput} />
          <span>~</span>
          <input type="date" name="class_period_end" id="date01_2" value={class_period_end} onChange={onChangeInput} />
        </li>
        <li>
          <label htmlFor="text03">장소</label>
          <input
            type="text"
            name="place"
            id="text03"
            placeholder="입력하세요."
            value={place} onChange={onChangeInput}/>
        </li>
        <li className="input_date_wrap">
          <label htmlFor="date02_1">접수기간</label>
          <input type="date" name="application_period_start" id="date02_1" value={application_period_start} onChange={onChangeInput} />
          <span>~</span>
          <input type="date" name="application_period_end" id="date02_2" value={application_period_end} onChange={onChangeInput}/>
        </li>
        <li className="input_number_wrap">
          <label htmlFor="number01">정원</label>
          <input
            type="number"
            name="fnum"
            id="number01"
            placeholder="0"
            className="w_auto"
            value={fnum} 
            onChange={onChangeInput}
          />
          <span>명</span>
        </li>
        <li className="input_number_wrap">
          <label htmlFor="number02">비용</label>
          <input
            type="number"
            name="cost"
            id="number02"
            placeholder="0"
            className="w_auto"
            value={cost}
            onChange={onChangeInput}
          />
          <span>원</span>
        </li>
        <li>
          <label htmlFor="text04">지도 URL</label>
          <input type="text" name="map" id="text04" value={map} onChange={onChangeInput}/>
        </li>
        <li>
          <label htmlFor="file01">파일#1</label>
          <input type="file" name="file01" id="file01" className="w_auto" />
        </li>
        <li>
          <label htmlFor="checkbox01">팝업등록</label>
          <input
            type="checkbox"
            name="popup"
            id="checkbox01"
            className="input_checkbox w_auto"
            value={popup} 
            onChange={onChangeInput}
          />
        </li>
      </ul>
    
        <StyledBtn className="apply" onClick={sendData}>등록</StyledBtn>
        <StyledGrayBtn className='cancel'>취소</StyledGrayBtn>
     
    </section>
 
     <div className="sub_page_outer">
     </div>
     </>
  );
}
export default SectionInputTextType1d_a;

const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledGrayBtn= styled.button`
color:#fff;
background-color:#7f7f7f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `