import React,{useState,useEffect,useCallback} from "react";
import TitleType1 from "../contents/TitleType1";
import ButtonType2 from "../contents/ButtonType2";
import styled from "styled-components";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommonHeader,PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import SideNavi from "../Admin/Management/SideNavi";
import { useRef } from "react";
import PopupSaveModal from "../Modals/PopupSaveModal";
export default function SectionInputTextType1d(){
  
  const { token } = useSelector(state => state.user);
  const {programNo} = useSelector(state=> state.classeduManage)
  const [openModal,setOpenModal] = useState(false);
  const [pay,setPay] = useState("");
  const [imageFile,setImageFile] = useState([]);
  const [imageUrl,setImageUrl] = useState([]);
  const [isChecked,setIsChecked] = useState('');
  const [pop,setPop] = useState('');
  const [isFile,setIsFile] = useState('');
  const location = useLocation();
  const history = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  let type = location.pathname === "/educontrol" ? "edu" : "class";
  const no = location.state.no;
  const url = location.pathname;
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
  const onClose = () =>{
    setOpenModal(false);
  }
  const onMemoChange = (e) =>{ 
    setText(e.target.value);
 };

  const onChangePay = (e)=>{
    setPay(e.target.value);
  }

  const handleChangeFile = (e) =>{
    setImageFile(e.target.files);

    const file = e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);
    const reader =  new FileReader();
    reader.onload=function(){
      setImageUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }
  const handleCheckBox = (e) =>{
    if(e.target.checked===true){
      setIsChecked("Y");
    }
    else{
      setIsChecked("N");
    }
  }
  //formdata.append("image","image.png");
  const formData = new FormData();
  const sendData = useCallback(async(e)=>{
    console.log(isFile)
    CommonHeader.authorization = token;
    let requri =  PreUri + '/classedu/addprogram'
    const response = await fetch(requri,{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify({
        title:className,
        content:text,
        type:type,
        class_period_start:class_period_start,
        class_period_end: class_period_end,
        application_period_start:application_period_start,
        application_period_end: application_period_end,
        pay_flag:pay,        
        place:place,
        limit_number:fnum,
        cost:cost,
        map:map,
        popup_flag:isChecked,
        attached_file:isFile,
      })
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    let index = 0;
  
   /*  for (let i  = 0 ; i < imageFile.length; i++){
      
    } */
   
/*     if(imageFile !== undefined){
      formData.append("imagefile", imageFile);
    }
 */

   
    
    for (let i = 0; i <imageFile.length; i++) {
      formData.append("imageFiles", imageFile[i]);
      index++;
    }

      const res = await fetch( PreUri +'/classedu/'+ (no+1) +'/files',{
        method:Method.post,
        headers: { authorization: token},
        body:formData
      })
      if(!res.ok){
        return(alert(getRspMsg(res.status)))
    }
    setOpenModal(true);
  },[token,input,imageFile,isFile,isChecked])
  console.log("ischecked:"+isChecked)
  console.log("isFIle:"+isFile)
  console.log(imageFile)
 useEffect(()=>{
  if(imageFile.length>0)
  {
    setIsFile("Y");
  }
  else{
    setIsFile("N");
  }
 },[isChecked,imageFile,isFile])
/*   useEffect(()=>{
//    onMemoChange();
    getData();
  },[input,token]) */
  return (
    <>
    <div id="sub_page_wrap">
       <SideNavi/>
       <div className="sub_page_inner_wrap">
       <div className="sub_inner">
    <section className="section_input_text_type1 section_input_text_type1p">
      <div className="title_wrap">
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
          <label htmlFor="file01" style={imageFile.length>0?{"height":'150px'}:{"height":"60px"}}>파일#1</label>
          <input type="file" name="imagefile" id="file01" className="w_auto" onChange={handleChangeFile} multiple accept="image/*" />
          <img src={imageUrl} alt={imageUrl.name} style={{"width":"150px"}}/>
        </li>
        <li>
          <label htmlFor="checkbox01">팝업등록</label>
          <input
            type="checkbox"
            name="popup"
            id="checkbox01"
            className="input_checkbox w_auto"
            value={popup} 
            onChange={handleCheckBox}
          />
        </li>
      </ul>
    
        <StyledBtn className="apply" onClick={sendData}>등록</StyledBtn>
        {openModal && <PopupSaveModal visible={openModal} closable={true} onclose={onClose} url={url}/>}
        <StyledGrayBtn className='cancel' onClick={(e)=>history(-1)}>취소</StyledGrayBtn>
     
    </section>
    </div>
    </div>
    </div>
     <div className="sub_page_outer">
     </div>
     </>
  );
}
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