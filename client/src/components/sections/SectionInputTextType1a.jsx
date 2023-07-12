import React,{useEffect,useCallback,useState,useRef}from "react";
import styled from "styled-components";
import { useLocation,useNavigate } from "react-router-dom";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg  } from "../../CommonCode";
import {useSelector}  from "react-redux";
import DaumPostcode from "react-daum-postcode";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PopupSaveMentoring from "../Modals/PopupSaveMentoring";
export default function SectionInputTextType1a() {
  const { token } = useSelector(state => state.user);
  const location = useLocation();
  const history = useNavigate();
  const url = location.pathname;
  const no = location.state.mentoring_application_no;
  const [input,setInput] = useState({
    cname:'',
    pnum:'',
    securitynum: '',
    title: '',
    part:'',
    present:'',
  });
  const [userInput,setUserInput] = useState({
    name:'',
    sub:'',
    num:'',
  })

  const [text,setText] = useState({
    title:'',
    detail:'',
    require:'',
  })
  const [mentor,setMentor] = useState('양용희 멘토');
  const {cname,pnum,securitynum,present,part} = input;
  const {name,sub,num} = userInput;
  const {title,detail,require} = text;
  const onChangeInput = (e) =>{
    const {id,value} = e.target;
    setInput({
      ...input,
      [id]:value,
    })
  }
 const onUserChangeInput = (e) =>{
  const {id,value} = e.target;
  setUserInput({
    ...userInput,
    [id]:value
  })
 }
 const onChangeText = (e) => {
  const {id,value} = e.target;
  setText({
    ...text,
    [id]:value
  })
 }

 const [inputs,setInputs] = useState([]);
  const checkedItemHandler = (name, checked) => {
    if(checked){
      setInputs([...inputs,name])
    }else{
      setInputs(inputs.filter((el) => el !== name));
    }
  };
//value값만 저장
   /*  const updatedCheckboxes = radioButtonList.map((checkbox) => {
      if (checkbox.e.id === e.id) {
        checkbox.checked = !checkbox.checked;
      }
      return checkbox;
    });
    const filteredCheckboxes = updatedCheckboxes.filter((checkbox) => checkbox.checked);
    setRadioButtonList(filteredCheckboxes); */
  const FrequencyEmails = [
    '@naver.com',
    '@gmail.com',
    '@daum.net',
    '@hanmail.net',
    '@yahoo.com',
    '@outlook.com',
    '@nate.com',
    '@kakao.com',
  ];
  const FrequencyEmails2 = [
    '@naver.com',
    '@gmail.com',
    '@daum.net',
    '@hanmail.net',
    '@yahoo.com',
    '@outlook.com',
    '@nate.com',
    '@kakao.com',
  ];
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
  ]);
  const [email, setEmail] = useState(); //이메일 input 값
  const [email2, setEmail2] = useState(); //이메일 input 값
  const [emailList, setEmailList] = useState(FrequencyEmails);
  const [emailList2, setEmailList2] = useState(FrequencyEmails2); //추천 이메일 리스트를 확인, 이메일 리스트 상태 관리
  const [selected, setSelected] = useState(-1); //키보드 선택
  const [selected2, setSelected2] = useState(-1); //키보드 선택
  const [isDrobBox, setIsDropbox] = useState(false); // 드롭박스 유무
  const [isDrobBox2, setIsDropbox2] = useState(false); // 드롭박스 유무

  //파일 업로드

  const [file,setFile] = useState([]);
  const [isFile,setIsFile] = useState('');
  const [imageUrl,setImageUrl] = useState([]);
  const [openModal,setOpenModal] = useState(false);

  const inputRef = useRef(); //외부클릭 감지 확인
  const inputUserRef = useRef();
  //주소검색
  const [address,setAddress] = useState('');
  const [addressDetail,setAddressDetail] = useState('');
  const [isOpenPost,setIsOpenPost] = useState(false);
  //const [modalOpen, setModalOpen] = useState(false);
  let purpose = Object.values(inputs).join();
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);

    if (e.target.value.includes('@')) {
      setIsDropbox(true);
      setEmailList(
        FrequencyEmails.filter((el) =>
          el.includes(e.target.value.split('@')[1]),
        ),
      );
    } else {
      setIsDropbox(false);
      setSelected(-1);
    }
  };
  const onChangeEmailUser = (e) => {
    setEmail2(e.target.value);

    if (e.target.value.includes('@')) {
      setIsDropbox2(true);
      setEmailList2(
        FrequencyEmails2.filter((el) =>
          el.includes(e.target.value.split('@')[1]),
        ),
      );
    } else {
      setIsDropbox2(false);
      setSelected2(-1);
    }
  };

  const handleDropDownClick = (first, second) => {
    setEmail(`${first.split('@')[0]}${second}`);
    setIsDropbox(false);
    setSelected(-1);
  };
  const handleDropDownClickUser = (first, second) => {
    setEmail2(`${first.split('@')[0]}${second}`);
    setIsDropbox2(false);
    setSelected2(-1);
  };
  const handleKeyUp = (e) => {
    if (isDrobBox) {
      if (e.key === 'ArrowDown' && emailList.length - 1 > selected) {
        setSelected(selected + 1);
      }
      //emailList.length에 -1을 해주는 이유는 selected의 최대값을 맞춰주기 위해서이다.
      //예를들어 밑에 emailList 2개가 나왔다고 가정했을 때, selected값이 최대 1까지 변할 수 있게 해줘야한다. 
      //'ArrowDown'키를 누르면 selected는 0이 되고, 한번 더 누르면 1이 되고, 그 다음은 더이상 옵션이 없기 때문에 키가 안먹히게 해주는 것이다.

      if (e.key === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      if (e.key === 'Enter' && selected >= 0) {
        handleDropDownClick(email, emailList[selected]);
      }
    }
  };
  const handleKeyUpUser = (e) => {
    if (isDrobBox) {
      if (e.key === 'ArrowDown' && emailList2.length - 1 > selected) {
        setSelected2(selected2 + 1);
      }
      //emailList.length에 -1을 해주는 이유는 selected의 최대값을 맞춰주기 위해서이다.
      //예를들어 밑에 emailList 2개가 나왔다고 가정했을 때, selected값이 최대 1까지 변할 수 있게 해줘야한다. 
      //'ArrowDown'키를 누르면 selected는 0이 되고, 한번 더 누르면 1이 되고, 그 다음은 더이상 옵션이 없기 때문에 키가 안먹히게 해주는 것이다.

      if (e.key === 'ArrowUp' && selected2 >= 0) {
        setSelected2(selected2 - 1);
      }
      if (e.key === 'Enter' && selected >= 0) {
        handleDropDownClickUser(email2, emailList2[selected2]);
      }
    }
  };
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

  const onChangeSelect = (e) =>{
    setMentor(e.target.value);
  }
const onDelete = (file) => {
  setFile((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
};
const onClose = () =>{
  setOpenModal(false);
}
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsDropbox(false);
      }
    };
    const handleClickOutsideUser = (e) => {
      if (
        inputUserRef.current &&
        !inputUserRef.current.contains(e.target)
      ) {
        setIsDropbox2(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideUser);
/*     if(ischecked===false)
    {
      setSelectedRadio(Object.values(checkInputs));
    } */
    
  }, [inputRef,inputUserRef,/* inputs,text */]);

  //주소찾기
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
  const onChangeAddress = (e) =>{
    setAddressDetail(e.target.value);
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
  //데이터 전송
  const sendData  = useCallback(async()=>{
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/mentoring/addmentoring',{
      method:Method.post,
      headers:CommonHeader,
      body:JSON.stringify({
       address:address,
       address_detail:addressDetail,
       cname:cname,
       pnum:pnum,
       email:email,
       usermail:email2,
       purpose:purpose,
       part:part,
       represent:present,
       sub:sub,
       name:name,
       num:num,
       application_title:title,
       specific_content:detail,
       requirement:require,
       mentor:mentor,
       securitynum:securitynum,
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

    const res = await fetch(PreUri + '/mentoring/'+(no+1)+'/nofiles',{
      method:Method.post, 
       headers:{authorization:token},
        body:formData,
    })
    if(!res.ok){
      return(alert(getRspMsg(res.status)))
     }
    setOpenModal(true);
  },[inputs,text,input,file])
  /*     const formData = new FormData();
    let index = 0;
   
    for (let i = 0; i <imageFile.length; i++) {
      formData.append("imageFiles", imageFile[i]);
      index++;
    } */
    /*     const respon = await fetch( PreUri +'/mentoring/'+ (no+1) +'/files',{
      method:Method.post, 
       headers:{authorization:token},
        body:formData,
    })
    if(!respon.ok){
     return(alert(getRspMsg(respon.status)))
    } */
  const File = ({ item, index, onDelete })=> {
    
    return (
      <StyledDiv>
        <StyledP style={{width:"150px",marginLeft:'5px'}}>
          {index}. {item.name.slice(0,15)+'...'}
        </StyledP>
        <StyledBtnDrop onClick={()=>{onDelete(index)}}>삭제</StyledBtnDrop>
      </StyledDiv>
    );
  }

  return (
    <section className="section_input_text_type1 section_input_text_type1d section_input_text_type1e" style={{marginTop:'20px',border:"1px solid #d3d3d3",padding:'40px 40px'}}>
      <div className="title_wrap">
        <h1 style={{position:"relative",top:"-30px",fontSize:"18px"}}>신청기업 정보</h1>
      </div>
      <ul className="text_wrap">
        <li >
          <StyledLabel htmlFor="text01">*회사명/예비창업 조직 명칭</StyledLabel>
          <input
            type="text"
            name="cname"
            id="cname"
            value={cname}
            placeholder="입력하세요."
            onChange={onChangeInput}
          />
          <StyledLabel htmlFor="text02" style={{fontSize:"12px"}}>*사업자등록번호/예비창업주의 경우 주민번호 앞자리</StyledLabel>
          <input
            type="text"
            name="securitynum"
            id="securitynum"
            value={securitynum}
            placeholder="입력하세요."
            onChange={onChangeInput}
          />
        </li>
        <li>
          <StyledLabel htmlFor="text03">*대표자</StyledLabel>
          <input
            type="tel"
            name="present"
            id="present"
            value={present}
            placeholder="입력하세요."
            onChange={onChangeInput}
          />
          <StyledLabel htmlFor="text04" >이메일</StyledLabel>
        <div ref={inputRef}>
       <input
        type="email"
        placeholder="이메일(아이디) 입력"
        value={email}
        onChange={(e) => {
        onChangeEmail(e);
        }}
         style={{"width":"416px","position":"relative"}}
        onKeyUp={handleKeyUp}
       />
        {isDrobBox && (
        <MailTipUl>
          {emailList.map((item, idx) => (
            <MailTipLi
            key={idx}
            onMouseOver={() => setSelected(idx)}
            onClick={() => handleDropDownClick(email, item)}
            selected={selected === idx}
            >
              {email.split('@')[0]}
              {item}
            </MailTipLi>
          ))}
        </MailTipUl>
       )}
      </div>
        </li>
        <li>
          <StyledLabel htmlFor="text05">*연락처</StyledLabel>
          <input
            type="text"
            name="pnum"
            id="pnum"
            value={pnum}
            placeholder="입력하세요."
            onChange={onChangeInput}
          />
          <StyledLabel htmlFor="text06">*주요 사업분야</StyledLabel>
          <input
            type="text"
            name="part"
            id="part"
            value={part}
            placeholder="입력하세요."
            onChange={onChangeInput}
          />
        </li>
        <li>
          <StyledLabel htmlFor="text07" className="address" id="address_label" style={{height:'110px',lineHeight:'80px'}}>*주소</StyledLabel>
          <div>
          <input readOnly type="text" value={address} name="addr" style={{width:"50%",bottom:'10px',position:'relative'}}/>
          <StyledBtn3 onClick={onChangeOpenPost}>주소찾기</StyledBtn3>
          {isOpenPost? <div>
            <AiOutlineCloseCircle  style={{position:"relative",top:'30px',left:'50px',width:'50px'}}className="close_btn" onClick={onChangeClosePost}> </AiOutlineCloseCircle><DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}
          />
         </div>:null}
          <input  type="text" value={addressDetail} name="addressdetail " id="detailaddr"style={{width:"100%",marginBottom:'10px'}} onChange={onChangeAddress}/>
         </div>
        </li>
        </ul>
        <div className="title_wrap">
        <h1 style={{position:"relative",marginTop:'10px',fontSize:"18px"}}>신청자 정보</h1>
      </div>
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
          <StyledLabel htmlFor="text09" style={{fontSize:"12px"}}>*직책</StyledLabel>
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
        placeholder="이메일(아이디) 입력"
        value={email2}
        onChange={(e) => {
        onChangeEmailUser(e);
        }}
         style={{"width":"416px","position":"relative"}}
        onKeyUp={handleKeyUpUser}
       />
        {isDrobBox2 && (
        <MailTipUl>
          {emailList2.map((item, idx) => (
            <MailTipLi
            key={idx}
            onMouseOver={() => setSelected2(idx)}
            onClick={() => handleDropDownClickUser(email2, item)}
            selected={selected2 === idx}
            >
              {email2.split('@')[0]}
              {item}
            </MailTipLi>
          ))}
        </MailTipUl>
       )}
      </div>
        </li>
        <li>
        <StyledLabel2 htmlFor="text12" style={{"height":"150px","lineHeight":"120px"}}>*활용목적</StyledLabel2>
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
        <li style={{"padding":"0px 0px"}}>
          <StyledLabel htmlFor="text13" >*신청명</StyledLabel>
          <input 
            name="title"
            id="title"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={onChangeText}
          ></input>
        </li>
        <li className="textarea_wrap" style={{"padding":"0px 0px"}}>
          <StyledLabel2 htmlFor="text14" style={{"height":"300px","padding":"0px","margin":"auto 0","lineHeight":"300px"}}>*세부내용</StyledLabel2>
          <textarea className="text_area"
            name="detail"
            id="detail"
            cols="30"
            rows="10"
            placeholder="입력하세요."
            value={detail}
            onChange={onChangeText}
          ></textarea>
        </li>
        <li className="textarea_wrap" style={{"padding":"0px 0px"}}>
          <StyledLabel2 htmlFor="text15" style={{"height":"300px","padding":"0px","margin":"auto 0","lineHeight":"300px"}}>기타요청사항</StyledLabel2>
          <textarea className="text_area"
            name="require"
            id="require"
            cols="30"
            rows="10"
            placeholder="입력하세요."
            value={require}
            onChange={onChangeText}
          ></textarea>
        </li>
       {/*  <li className="filearea_wrap">
          <label htmlFor="file01">이미지 파일</label>
          <input type="file" name="imageFiles" id="file1" className="w_auto" onChange={handleChangeFile} multiple accept="image/*"/>
        </li> */}
        <li>
        <StyledLabel htmlFor="text16">첨부파일</StyledLabel>
        <StyledLabel3 htmlFor="file3">파일추가</StyledLabel3>
        <input type="file" name="Files" id="file3" style={{display:"none"}} multiple accept=".pdf,video/*,text/plain,.word,image/*" onChange={onChangeFile}/>
        {file&&file.map((item,index)=>(
          <File
          item={item}
          index={index}
          onDelete={()=>onDelete(item)}
          key={item.name}
          />
           ))}
      </li>
        <li>
          <StyledLabel htmlFor="text17">매칭희망 전문멘토</StyledLabel>
          <select defaultValue="양용희 멘토" onChange={onChangeSelect}>
            <option>양용희 멘토</option>
            <option>김범수 멘토</option>
          </select>
        </li>
      </ul>
      <div className="btn_wrap">
      <StyledBtn2 onClick={sendData}>등록</StyledBtn2>
      {openModal && <PopupSaveMentoring visible={openModal} closable={true} onclose={onClose} url={url}/>}
      <StyledBtn onClick={(e)=>history(-1)}>목록</StyledBtn>
      </div>
    </section>
  );
}

const MailTipUl = styled.ul`
  position:absolute;
  background-color:white;
  width:475px;
  right:0;
  border:2px solid #000000;
  height:200px;
  padding: 10px 0px;
  margin: 0px
  list-style-type: none;
  overflow:hidden;
  z-index:999;
`
const MailTipLi = styled.li`
  background-color: ${({ selected }) => (selected ? '#f5f5f5' : '')};
  color: ${({ selected }) => (selected ? 'var(--zu--m4-color)' : '')};
  width:200px;
  ::before{
    background-color:#0f4d32;
  }
  padding: 0px 0px;
`;
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
background-color:#313f3f;
color:#fff;
text-align:center;
font-size:14px; 
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
left:10px;
`