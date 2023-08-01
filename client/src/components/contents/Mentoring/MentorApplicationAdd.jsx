import React,{useState, useCallback, useEffect, useRef} from "react";
import DaumPostcode from "react-daum-postcode";
import { useLocation,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../../CommonCode";
import {useSelector}  from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PopupSaveMentoring from "../../Modals/PopupSaveMentoring";
export default function MentorApplicationAdd() {
  const { token } = useSelector(state => state.user);
  const [userData,setUserData] = useState('');
  const location = useLocation();
  const history = useNavigate();
  const url = location.pathname;
  const no = location.state.no[0].mentor_application_no;
  const edit = location.state.edit;
  const [openModal,setOpenModal] = useState(false);
  const [address,setAddress] = useState('');
  const [addressDetail,setAddressDetail] = useState('');
  const [editAddress,setEditAddress] = useState('');
  const [editAddressDetail,setEditAddressDetail] = useState('');
  const [isOpenPost,setIsOpenPost] = useState(false);
  const [userInput,setUserInput] = useState({
    name:'',
    num:'',
    email:'',
    spart:'',
    major:'',
    sub:'',
    fedu:'',
  })

  const inputUserRef = useRef();
  const [editInput,setEditInput] = useState({
    name2:'',
    num2:'',
    email2:'',
    spart2:'',
    major2:'',
    fedu2:'',
  })

  const {name,num,spart,email,major,sub,fedu} = userInput;
  const {name2,num2,spart2,email2,major2,fedu2} = editInput;
  const [file,setFile] = useState([]);
  const [text, setText] = useState();
  const onUserChangeInput = (e) =>{
    const {id,value} = e.target;
    setUserInput({
      ...userInput,
      [id]:value
    })
   }
   const onEditChangeInput = (e) =>{
    const {id,value} = e.target;
    setEditInput({
      ...editInput,
      [id]:value
    })
   }
   const [radioButtonList,setRadioButtonList] = useState([
    {id:1,text:'IoT',checked:false},
    {id:2,text:'빅데이터',checked:false},
    {id:3,text:'클라우드',checked:false},
    {id:4,text:'인공지능',checked:false},
    {id:5,text:'소프트웨어',checked:false},
    {id:6,text:'모바일',checked:false},
    {id:7,text:'임베디드',checked:false},
    {id:8,text:'3D모델링',checked:false},
    {id:9,text:'3D프린팅',checked:false},
    {id:10,text:'회로설계',checked:false},
    {id:11,text:'PCB제작',checked:false},
    {id:12,text:'금형',checked:false},
    {id:13,text:'전기',checked:false},
    {id:14,text:'전자',checked:false},
    {id:15,text:'바이오',checked:false},
    {id:16,text:'에너지',checked:false},
    {id:17,text:'로봇',checked:false},
    {id:18,text:'기술경영',checked:false},
    {id:19,text:'투자유치',checked:false},
  ]);
  const [inputs,setInputs] = useState([]);
  const [attachFile,setAttachFile] = useState({});
  const [fileNo,setFileNo] = useState([]);
  /* const checkedItemHandler = (name, checked) => {
    if(checked===true){
      setInputs([...inputs,name])
    }else{
      setInputs(inputs.filter((el) => el !== name));
    }
    const updatedList = radioButtonList.map(item =>
      item.text === name ? { ...item, checked: checked } : item
    );
    setRadioButtonList(updatedList);
  }; */
  const checkedItemHandler = (name, checked) => {
    const updatedList = radioButtonList.map(item =>
      item.text === name ? { ...item, checked: checked } : item
    );
    setRadioButtonList(updatedList);
  
    // 선택된 항목을 추가 또는 제거합니다.
    if (checked) {
      setInputs([...inputs, name]); // 선택된 항목을 추가합니다.
    } else {
      setInputs(inputs.filter((el) => el !== name)); // 선택 해제된 항목을 제거합니다.
    }
  };
  let purpose = Object.values(inputs).join();

  const onChangeOpenPost  = () =>{
    setIsOpenPost(true);
    const labelstyle = document.getElementById("address_label");
    labelstyle.style.height="540px";
    const inputstyle = document.getElementById('detailaddr');
    inputstyle.style.marginTop="20px";
  }
  const onChangeClosePost  = () =>{
    setIsOpenPost(false);
    const labelstyle = document.getElementById("address_label");
    labelstyle.style.height="150px";
    const inputstyle = document.getElementById('detailaddr');
    inputstyle.style.marginTop="10px";
  }
  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    overflow:'hidden',
    right:'0px',
    top: '0%',
    width: '450px',
    height: '400px',
    padding: '10px',
  };
  //주소
  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };
  const onCompletePost2 = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setEditAddress(data.zonecode);
    setEditAddressDetail(fullAddr);
    setIsOpenPost(false);
  };
  const onChangeAddress = (e) =>{
    setAddressDetail(e.target.value);
  }
  const onEditAddress = (e) => {
    setEditAddress(e.target.value);
  }
  const onChangeText = (e) => {
      setText(e.target.value);
   }
   const onDelete = (file) => {
    setFile((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
  };
  const onClose = () =>{
    setOpenModal(false);
  }
  const compressImage = (file) =>{
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 800; // 원하는 너비로 조정
          canvas.height = 600; // 원하는 높이로 조정
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = 'destination-over';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL('image/png', 0.7); // 압축 품질 조정
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
  function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: mimeString });
  }
  console.log(editInput);
  const updateData = useCallback(async()=>{
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/mentoring/'+no+'/mentorapplication',{
      method:Method.put,
      headers:CommonHeader,
      body:JSON.stringify({
       address_detail:address,
       major:major2,
       email:email2,
       part:spart2,
       sub:sub,
       name:name2,
       num:num2,
       text:text,
       final_education:fedu2,
       specialization:purpose,
      })
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const files = file;
    const formData = new FormData();
    for (let i = 0; i<files.length; i++){
    
      const file = files[i];
      console.log(file)
      if(file.type==="image/png"||file.type==='image/jpg')
      {
        
        const compressedDataUrl = await compressImage(file);
        const compressedBlob = dataURLToBlob(compressedDataUrl);
        formData.append('files',compressedBlob, file.name);
        
      }
      else 
      { 
        formData.append('files',files[i]);
       
      }
    }
    const res = await fetch(PreUri + '/mentoring/'+no+'/mentorfiles',{
      method:Method.put, 
       headers:{authorization:token},
        body:formData,
    });
    if(!res.ok){
      return(alert(getRspMsg(res.status)))
     };
    setOpenModal(true);
  })
  console.log(inputs);
  const sendData  = useCallback(async()=>{
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/mentoring/mentorapplication',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify({
       address_detail:address+addressDetail,
       major:major,
       email:email,
       part:spart,
       sub:sub,
       name:name,
       num:num,
       text:text,
       final_education:fedu,
       specialization:purpose,
      })
    })
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const files = file;
    const formData = new FormData();
    for (let i = 0; i<files.length; i++){
    
      const file = files[i];
  
      if(file.type==="image/png"||file.type==='image/jpg')
      {
        
        const compressedDataUrl = await compressImage(file);
        const compressedBlob = dataURLToBlob(compressedDataUrl);
        formData.append('files',compressedBlob, file.name);
        
      }
      else 
      { 
        formData.append('files',files[i]);
       
      }
    }
    const res = await fetch(PreUri + '/mentoring/'+no+'/mentorfiles',{
      method:Method.post, 
       headers:{authorization:token},
        body:formData,
    });
    if(!res.ok){
      return(alert(getRspMsg(res.status)))
     };
    setOpenModal(true);
  },[text,file])
  const onChangeFile = (e) =>{
    let pickedFile=[];
  
    if(e.target.files){
      for(let i = 0;i<e.target.files.length;i++)
      {
        pickedFile.push(e.target.files[i]);
      }
      setFile([...file,...pickedFile]);

    }
  }
  const getEditData = useCallback(async()=>{
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/mentoring/'+no+'/mentorinfo',{
      method:Method.get,
      headers:CommonHeader,
    });
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();
    setEditInput(editInput => ({
      ...editInput,
      name2:json.name,
      num2:json.phone_number,
      email2:json.email,
      spart2:json.department,
      major2:json.major,
      fedu2:json.final_education,
    }))
    setEditAddress(json.address);
    const updateRadioButtonaList = radioButtonList.map(item => {
      if(json.specialization.includes(item.text)){
          return {...item, checked:true};
      }
      return item;
    });
    const specializationArray = json.specialization.split(',');
    setRadioButtonList(updateRadioButtonaList);
    setText(json.text);
    setInputs(specializationArray);
  },[])
  const getUserInfo = useCallback( async()=> {
    CommonHeader.authorization = token;

    const response = await fetch(PreUri + '/user/mentorinfo',{
      method:Method.get,
      headers:CommonHeader,
    });
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();
    setUserInput(userInput => ({
      ...userInput,
      name:json.name,
      num:json.phone_number,
      email:json.email,
    }))
  },[])
  const getFileNo = useCallback(async()=>{
    const response = await fetch(PreUri + '/mentoring/'+ no + '/mentorfilesno',{
      method:Method.get,
      headers:CommonHeader
    })
    const json = await response.json();
    const formattedFiles = json.map(file => {
      return {
        ...file,
        file_name: file.original_name
      };
    });
    setFileNo(formattedFiles);
  },[no])
  
  const getFile = useCallback(async()=>{
    if(no!==undefined){
    const res = await fetch(PreUri + '/mentoring/' + no + '/files', {
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
    getUserInfo();
    getEditData();
    getFileNo();
    getFile();
  },[getUserInfo,getEditData,getFileNo,getFile])
  let DownloadMyFileItems = [];
  if (fileNo && fileNo.length > 0) {
    for (let i = 0; i < fileNo.length; i++) {
      DownloadMyFileItems.push(fileNo[i].original_name.length<20?fileNo[i].original_name:fileNo[i].original_name.slice(0,20)+'...')
    }
  }
  const File = ({ item, index, onDelete })=> {
    
    return (
      <StyledDiv>
        <StyledP style={{width:"150px",marginLeft:'25px'}}>
          {index}. {item.name.slice(0,15)+'...'}
        </StyledP>
        <StyledBtnDrop onClick={()=>{onDelete(index)}}>삭제</StyledBtnDrop>
      </StyledDiv>
    );
  }
    return (
      
      <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e" style={{marginLeft:'20px',width:'1250px',marginTop:'20px',border:"1px solid #d3d3d3",padding:'40px 40px'}}>
      <div className="title_wrap">
        <h1 style={{position:"relative",top:"-30px",fontSize:"18px"}}>신청자 정보</h1>
      </div>
        <div className="title_wrap">
      </div>
      {edit==="Y"?
      <>
        <ul className="text_wrap">
        <li >
          <StyledLabel htmlFor="text08">*이름</StyledLabel>
          <input
            type="text"
            name="name2"
            id="name2"
            placeholder="입력하세요."
            value={name2}
            onChange={onEditChangeInput}
          />
          <StyledLabel htmlFor="text09" style={{fontSize:"12px"}}>*소속</StyledLabel>
          <input
            type="text"
            name="spart2"
            id="spart2"
            placeholder="입력하세요."
            value={spart2}
            onChange={onEditChangeInput}
          />
        </li>
        <li>
          <StyledLabel htmlFor="text10">*전화번호</StyledLabel>
          <input
            type="text"
            name="num"
            id="num2"
            placeholder="입력하세요."
            value={num2}
            onChange={onEditChangeInput}
          />
          <StyledLabel htmlFor="text11" >*이메일</StyledLabel>
        <div ref={inputUserRef}>
       <input
        type="email"
        placeholder="이메일 입력"
        id="email2"
        value={email2}
         style={{width:"386px","position":"relative"}}
         onChange={onEditChangeInput}
       />
      </div>
        </li>
        <li>
          <StyledLabel htmlFor="text05">* 최종학력</StyledLabel>
          <input
            type="text"
            name="fedu"
            id="fedu2"
            value={fedu2}
            placeholder="입력하세요."
            onChange={onEditChangeInput}
          />
          <StyledLabel htmlFor="text06">* 전공분야</StyledLabel>
          <input
            type="text"
            name="major"
            id="major2"
            value={major2}
            placeholder="입력하세요."
            onChange={onEditChangeInput}
          />
        </li>
        <li>
          <StyledLabel htmlFor="text07" className="address" id="address_label" style={editAddressDetail.length<1&&isOpenPost===false?{height:'110px',lineHeight:'80px'}:{height:'540px',lineHeight:'540px'}}>*주소</StyledLabel>
          <div>
          <input readOnly type="text" value={editAddress} name="addr" style={{width:"50%",bottom:'10px',position:'relative'}}/>
          <StyledBtn3 onClick={onChangeOpenPost}>주소찾기</StyledBtn3>
          {isOpenPost? <div>
            <AiOutlineCloseCircle  style={{position:"relative",top:'0px',width:'50px','left':'430px'}}className="close_btn" onClick={onChangeClosePost}> </AiOutlineCloseCircle><DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost2}
          />
         </div>:null}
          <input  type="text" value={editAddressDetail} name="addressdetail " id="detailaddr"style={{width:"100%",marginBottom:'10px'}} onChange={onEditAddress}/>
         </div>
        </li>

        <li>
        <StyledLabel2 htmlFor="text12" style={{"height":"250px",alignItems:'center',justifyContent:'center',display:'flex'}}>* 전문분야{'\n'}(복수선택가능)</StyledLabel2>
        <div style={{display:"inline-flex",flexWrap:"wrap",position:"relative",width:"100%",height:"100%",overflowWrap:"break-word",wordWrap:"break-word"}}>
            {radioButtonList && radioButtonList.map((item,idx)=>
            (
              <>
              <div style={{flexBasis:"10%",boxSizing:"border-box",padding:"5px"}} key={idx}>
                  <input type="checkbox"  id="checkbox" name={item.text} value={item.text} style={{width:"20px",height:"25px"}}  checked={item.checked} onChange={(e)=>checkedItemHandler(item.text,e.target.checked)}/> 
                  <div style={item.length===2?{position:"relative",left:"25px"}:item.length===3?{position:"relative",left:"20px"}:{position:"relative",left:"15px"}}>
                  <h3 style={item.text.includes("IoT")?{width:"100px",position:"relative",left:"10px"}:item.text.length<3?{width:"100px",position:"relative",left:"9px"}:{width:"100px",position:"relative"}}>{item.text}</h3>
                  </div>
                </div>
              </>
            ))
              
            }
        </div>
        </li>
        <li className="textarea_wrap" style={{"padding":"0px 0px"}}>
          <StyledLabel2 htmlFor="text14" style={{"height":"300px","padding":"0px","margin":"auto 0","lineHeight":"300px"}}>*이전 대형프로젝트 <br/>혹은 작품설명</StyledLabel2>
          <textarea className="text_area"
            name="text"
            id="text"
            cols="30"
            rows="10"
            placeholder="입력하세요."
            value={text}
            onChange={onChangeText}
          ></textarea>
        </li>
        <li>
        <StyledLabel htmlFor="text16">첨부파일</StyledLabel>
        <StyledLabel3 htmlFor="file3">파일추가</StyledLabel3>
        <input type="file" name="Files" id="file3" style={{display:"none"}} multiple accept=".pdf,text/plain,.word,image/*" onChange={onChangeFile}/>
        {file&&file.map((item,index)=>(
          <File
          item={item}
          index={index}
          onDelete={()=>onDelete(item)}
          key={item.name}
          />
           ))}
           {file.length<1?<div style={{marginLeft:'50px'}}>{DownloadMyFileItems}</div>:<div></div>}
      </li>
      </ul>
      <div className="btn_wrap">
      <StyledBtn2 onClick={updateData}>수정</StyledBtn2>
      {openModal && <PopupSaveMentoring visible={openModal} closable={true} onclose={onClose} url={url}/>}
      <StyledBtn onClick={(e)=>history(-1)}>이전</StyledBtn>
      </div>
      </>:
      <>
      <ul className="text_wrap">
        <li >
          <StyledLabel htmlFor="text08">*이름</StyledLabel>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="입력하세요."
            value={name}
            onChange={onUserChangeInput}
          />
          <StyledLabel htmlFor="text09" style={{fontSize:"12px"}}>*소속</StyledLabel>
          <input
            type="text"
            name="sub"
            id="sub"
            placeholder="입력하세요."
            value={sub}
            onChange={onUserChangeInput}
          />
        </li>
        <li>
          <StyledLabel htmlFor="text10">*전화번호</StyledLabel>
          <input
            type="text"
            name="num"
            id="num"
            placeholder="입력하세요."
            value={num}
            onChange={onUserChangeInput}
          />
          <StyledLabel htmlFor="text11" >*이메일</StyledLabel>
        <div ref={inputUserRef}>
       <input
        type="email"
        placeholder="이메일 입력"
        value={email}
         style={{width:"386px","position":"relative"}}
       />
      </div>
        </li>
        <li>
          <StyledLabel htmlFor="text05">* 최종학력</StyledLabel>
          <input
            type="text"
            name="fedu"
            id="fedu"
            value={fedu}
            placeholder="입력하세요."
            onChange={onUserChangeInput}
          />
          <StyledLabel htmlFor="text06">* 전공분야</StyledLabel>
          <input
            type="text"
            name="major"
            id="major"
            value={major}
            placeholder="입력하세요."
            onChange={onUserChangeInput}
          />
        </li>
        <li>
          <StyledLabel htmlFor="text07" className="address" id="address_label" style={addressDetail.length<1&&isOpenPost===false?{height:'110px',lineHeight:'80px'}:{height:'540px',lineHeight:'540px'}}>*주소</StyledLabel>
          <div>
          <input readOnly type="text" value={address} name="addr" style={{width:"50%",bottom:'10px',position:'relative'}}/>
          <StyledBtn3 onClick={onChangeOpenPost}>주소찾기</StyledBtn3>
          {isOpenPost? <div>
            <AiOutlineCloseCircle  style={{position:"relative",top:'0px',width:'50px','left':'430px'}}className="close_btn" onClick={onChangeClosePost}> </AiOutlineCloseCircle><DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}
          />
         </div>:null}
          <input  type="text" value={addressDetail} name="addressdetail " id="detailaddr"style={{width:"100%",marginBottom:'10px'}} onChange={onChangeAddress}/>
         </div>
        </li>

        <li>
        <StyledLabel2 htmlFor="text12" style={{"height":"250px",alignItems:'center',justifyContent:'center',display:'flex'}}>* 전문분야{'\n'}(복수선택가능)</StyledLabel2>
        <div style={{display:"inline-flex",flexWrap:"wrap",position:"relative",width:"100%",height:"100%",overflowWrap:"break-word",wordWrap:"break-word"}}>
            {radioButtonList && radioButtonList.map((item,idx)=>
            (
              <>
              <div style={{flexBasis:"10%",boxSizing:"border-box",padding:"5px"}} key={idx}>
                  <input type="checkbox"  id="checkbox" name={item.text} value={item.text} style={{width:"20px",height:"25px"}}  onChange={(e)=>checkedItemHandler(item.text,e.currentTarget.checked)}/> 
                  <div style={item.length===2?{position:"relative",left:"25px"}:item.length===3?{position:"relative",left:"20px"}:{position:"relative",left:"15px"}}>
                  <h3 style={item.text.includes("IoT")?{width:"100px",position:"relative",left:"10px"}:item.text.length<3?{width:"100px",position:"relative",left:"9px"}:{width:"100px",position:"relative"}}>{item.text}</h3>
                  </div>
                </div>
              </>
            ))
              
            }
        </div>
        </li>
        <li className="textarea_wrap" style={{"padding":"0px 0px"}}>
          <StyledLabel2 htmlFor="text14" style={{"height":"300px","padding":"0px","margin":"auto 0","lineHeight":"300px"}}>*이전 대형프로젝트 <br/>혹은 작품설명</StyledLabel2>
          <textarea className="text_area"
            name="text"
            id="text"
            cols="30"
            rows="10"
            placeholder="입력하세요."
            value={text}
            onChange={onChangeText}
          ></textarea>
        </li>
        <li>
        <StyledLabel htmlFor="text16">첨부파일</StyledLabel>
        <StyledLabel3 htmlFor="file3">파일추가</StyledLabel3>
        <input type="file" name="Files" id="file3" style={{display:"none"}} multiple accept=".pdf,text/plain,.word,image/*" onChange={onChangeFile}/>
        {file&&file.map((item,index)=>(
          <File
          item={item}
          index={index}
          onDelete={()=>onDelete(item)}
          key={item.name}
          />
           ))}
      </li>
      </ul>
      <div className="btn_wrap">
      <StyledBtn2 onClick={sendData}>등록</StyledBtn2>
      {openModal && <PopupSaveMentoring visible={openModal} closable={true} onclose={onClose} url={url}/>}
      <StyledBtn onClick={(e)=>history(-1)}>이전</StyledBtn>
      </div>
      </>}
    </section>
    );
}
const StyledBtn = styled.button`
position:relative;
top:20px;
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
margin-left:10px;
`
const StyledBtn2 = styled.button`
position:relative;
top:20px;
color:#fff;
background-color:#c3c3c3 !important; 
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;

`
const StyledBtn3 = styled.button`
position:relative;
color:#fff;
background-color:#c3c3c3 !important; 
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
left:0px !important;
bottom:10px !important;
`
const StyledBtnDrop = styled.button`
color:#fff;
background-color:#313f4f;
width:40px !important;
height:25px !important;
font-size:0.5rem;
cursor:pointer;
position:relative !important;
left:-80px !important;
`
const StyledLabel = styled.label`
background-color:#313f3f;
color:#fff;
text-align:center;
font-size:14px;
`
const StyledLabel2 = styled.label`
background-color: #313f3f;
color: #fff;
text-align: center;
font-size: 14px;
white-space: pre; /* Preserve whitespace */
`
const StyledP= styled.p`
width: 250px;

@media (min-width: 640px) { 
  width: 400px;
 }
@media (min-width: 768px) { 
  width: 500px;
 }
@media (min-width: 1024px) { 
  width: 600px;
 }
`
const StyledDiv = styled.div`
display: flex; 
padding-left: 0.5rem;
padding-right: 0.5rem; 
margin-bottom: 0.25rem; 
justify-content: space-between; 
border-radius: 0.25rem; 
width:160px;
`
const StyledLabel3 = styled.label`
background-color:#313d4d !important;
color:#fff;
text-align:center;
font-size:12px; 
width:60px !important;
height:40px !important;
padding: 2px 0px !important;
position:absolute;
left:20px;
`