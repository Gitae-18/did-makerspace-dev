import React, {useEffect,useState,useCallback,useRef} from "react";
import { CommonHeader,PreUri, Method, getRspMsg,MaxFileCount,AuthLevel, } from "../../../CommonCode";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import '../../../css/style-s.css';
import fileDownload from 'js-file-download'
import moment from "moment";
import $ from 'jquery';
export default function MentorApplicationDetail(){
    const location = useLocation();
    const history = useNavigate();
    const { token ,authority_level } = useSelector(state => state.user);
    const [data,setData] = useState([]);
    const [status, setStatus] = useState('A');
    const [rejectContent,setRejectContent] = useState('');
    const [memo,setMemo] = useState('');
    const [modalOpen,setModalOpen] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [modal,setModal] = useState(false);
    const [mentorNo,setMentorNo] = useState(null);
    //OSA(신청),RUN(진행),REJ(거절),PRC(진행완료)
    //멘토링 넘버
    const mentoring_no = location.state.no;
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
      //첨부파일
      const [attachFile,setAttachFile] = useState({});
      const [fileNo,setFileNo] = useState([]);

      
  
      const onFileDownload = useCallback(async (e, fileInfo) => {
        let attached_file_no ;
        for(let i = 0; i < attachFile.length&&i<MaxFileCount; i++){
          if(attachFile.legnth>1){
            attached_file_no = attachFile.attached_file_no[i]
          }
          else{
            attached_file_no = attachFile.attached_file_no
          }
        }
        const response = await fetch(PreUri + '/mentoring/' + mentoring_no + '/mentorfile/' + fileInfo.attached_file_no, {
            method: Method.get,
        });
        
        if (!response.ok) {
            console.log('response error');
            return;
        }
        const blob = await response.blob();
        if(fileInfo!==undefined){
          fileDownload(blob, fileInfo.file_name);
        }
    }, [attachFile]);
    const openFinish = () =>{
      setModalOpen(true);
    }
    const openReject = () =>{
      setOpenModal(true);
    }
    const openConfirm = () =>{
      setModal(true);
    }
    const ToBack = () => {
        history(-1);
    }
    const onChangeMemo = (e) =>{
      setMemo(e.target.value);
    }


    const FileDownload = useCallback((props) => {
        return (  <div style={{display:'inline-block',margin:'0px 5px'}}>
        <label>{props.index}.</label>
        <button className="download" style={{ border: "0px", cursor: 'pointer',display:'inline-block' }} onClick={props.onClick}>{props.filename}</button>
        </div>);
      }, []);
      let DownloadMyFileItems = [];
        if (fileNo && fileNo.length > 0) {
          for (let i = 0; i < fileNo.length; i++) {
            DownloadMyFileItems.push(
              <FileDownload index={i}
                filename={fileNo[i].original_name.length<20?fileNo[i].original_name:fileNo[i].original_name.slice(0,20)+'...'}
                onClick={(e) => onFileDownload(e, fileNo[i])}
                key={i} />);
          };
        }
        else{
          DownloadMyFileItems.push(
          <button className="download" style={{ border: "0px", cursor: 'pointer' }} >파일이 없습니다.</button>
          )
        }
        const getFileNo = useCallback(async()=>{
          const response = await fetch(PreUri + '/mentoring/'+ mentoring_no + '/mentorfilesno',{
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
        },[mentoring_no])
        
        const getFile = useCallback(async()=>{
          if(mentoring_no!==undefined){
          const res = await fetch(PreUri + '/mentoring/' + mentoring_no + '/files', {
            method: Method.get, 
          })
          const fileList = await res.json();
          if(fileList!==null||undefined)
          {
          setAttachFile(fileList)
          }
          }
        },[mentoring_no])
        const handleChangeStatus = useCallback(async(confirmFlag)=>{
          CommonHeader.authorization = token;
          if(confirmFlag === 'N')
          {
          setStatus('N');
          const  reject_content = rejectContent;
    
          const response = await fetch(PreUri + '/mentoring/mentor_reject', {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
              mentor_application_no:mentoring_no,
              reject_content:reject_content,
            })
        });
        if (!response.ok) {
          alert(getRspMsg(response.status));
          if (response.status === 400) {
            history('/mentoring',{replace:true});
          }
                return;
        }
        }
        else if(confirmFlag === 'Y'){
          setStatus('Y');
        }
        history(-1);
        },[token, rejectContent,mentoring_no,status])
      console.log(mentorNo);
      console.log(status);
      const onHandleSaveMentor = useCallback(async(e) => {
        const filteredTexts = radioButtonList
        .filter(item => item.checked === true)
        .map(item => item.text);
        console.log(data.name)
            const response = await fetch(PreUri + '/mentoring/mentorstore?mentor_no=' + mentorNo,{
              method:Method.post,
              headers: CommonHeader,
              body: JSON.stringify({
                  permission_flag:'Y',
                  field:data.major,
                  introduction:data.text,
                  keyword:filteredTexts,
                  mentor_profile:data.department,
                  user_no:mentorNo,
                  name:data.name,
              })
            })
            if (!response.ok) {
              alert(getRspMsg(response.status));
            }
          
      },[token,mentorNo,data])
      const onResponseConfirm = useCallback(async(e) => {
          e.preventDefault();
          handleChangeStatus('Y')
          const response = await fetch(PreUri + '/mentoring/status_change?mentoring_no='+ mentoring_no,{
            method:Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
              mentor_application_no:mentoring_no,
              status:"Y",
            })
            });
            if(!response.ok){
              alert("response error");
            }
            const json = await response.json();
            onHandleSaveMentor();
    }, [status, handleChangeStatus])

    const onReject = useCallback(async(e) => {
      e.preventDefault();
      if (rejectContent.length < 1) {
        alert("반려사유가 비어있습니다.")
      }
      handleChangeStatus('N');
    
      const response = await fetch(PreUri + '/mentoring/status_change?mentoring_no='+ mentoring_no ,{
      method:Method.put,
      headers: CommonHeader,
      body: JSON.stringify({
        mentor_application_no:mentoring_no,
        status:'N',
      })
      });
      if(!response.ok){
        alert("response error");
      }
      const json = await response.json();
    }, [status, rejectContent,handleChangeStatus,openModal])
    const onRejectChange = useCallback((e) => {
      e.preventDefault();
          setRejectContent(e.target.value);
      }, []);
    const getData = useCallback(async()=>{
        CommonHeader.authorization = token;
        let requri = PreUri + '/mentoring/mentor_specific?mentoring_no=' + mentoring_no;
        const response = await fetch(requri,{
            method:Method.get,
            headers:CommonHeader,
        })
        if (!response.ok) {
            console.log('response error');
            return;
        }
        const json = await response.json();
        setData(json);
        setMentorNo(json.user_no);
        setStatus(json.status);
        const updateRadioButtonaList = radioButtonList.map(item => {
            if(json.specialization.includes(item.text)){
                return {...item, checked:true};
            }
            return item;
        });
        setRadioButtonList(updateRadioButtonaList);
    },[])
    useEffect(()=>{
        getData();
        getFile();
        getFileNo();
    },[getData,getFile,getFileNo])

    return(
        <section className="section_input_text_type1" style={{marginTop:'20px',border:"1px solid #d3d3d3",padding:'40px 40px'}}>
            <div className="title_wrap">
            <StyledH1>전문분야</StyledH1>
            <div style={{display:"inline-flex",flexWrap:"wrap",position:"relative",width:"100%",height:"100%",overflowWrap:"break-word",wordWrap:"break-word"}}>
            {radioButtonList && radioButtonList.map((item,idx)=>
            (
                <div style={{flexBasis:"8%",boxSizing:"border-box",padding:"5px"}} key={idx}>
                  <input type="checkbox"  id="radio_button" name={item.text} value={item.text} style={{width:"20px",height:"25px"}} checked={item.checked} readOnly/> 
                  <div>
                  <h3>{item.text}</h3>
                  </div>
                </div>
            ))
              
            }
        </div>
            </div>
            <div className="title_wrap" style={{marginTop:'20px'}}>
             <StyledH1>신청자 정보</StyledH1>
             </div>
        <ul className="text_wrap" style={{marginTop:'20px'}}>
            <li>
            <StyledLabel htmlFor="text01">이름</StyledLabel>
                <input
                    type="text"
                    name="text01"
                    id="name"
                    value={data.name}
                    readOnly
                />
            <StyledLabel2 htmlFor="text02">전화번호</StyledLabel2>
                < input
                  type="email"
                  name="text02"
                  id="phone_number"
                  value={data.phone_number}
                  readOnly
                  />
          </li>
          <li>
            <StyledLabel htmlFor="text01">소속</StyledLabel>
                <input
                    type="text"
                    name="text01"
                    id="department"
                    value={data.department}
                />
            <StyledLabel htmlFor="text02">이메일</StyledLabel>
                < input
                  type="email"
                  name="text02"
                  id="email"
                  value={data.email}
                  readOnly
                  />
          </li>
          <li>
            <StyledLabel htmlFor="text01">최종경력</StyledLabel>
                <input
                    type="text"
                    name="text01"
                    id="final_education"
                    value={data.final_education}
                    readOnly
                />
            <StyledLabel htmlFor="text02">전공분야</StyledLabel>
                < input
                  type="email"
                  name="text02"
                  id="major"
                  value={data.major}
                  readOnly
                  />
          </li>
          <li>
          <StyledLabel htmlFor="text07">주소</StyledLabel>
          <input
            type="text"
            name="text07"
            id="text07"
            value={data.address}
            readOnly
          />
        </li>   
        <li className="textarea_wrap">
          <StyledLabel htmlFor="text09">이전 대형프로젝트</StyledLabel>
          <textarea
            name="text09"
            id="text"
            cols="30"
            rows="10"
            value={data.text}
            readOnly
          ></textarea>
        </li>
        <li>
          <StyledLabel htmlFor="text11">첨부파일</StyledLabel>
          {DownloadMyFileItems}
        </li>
        <li>
          {
            status === 'N'&&
            <>
            <StyledLabel htmlFor="text12">반려</StyledLabel>
            <div name="content">{data.reject}</div>
            </>
          }
        </li>
        </ul>
        <ButtonList>
            {
            status==='N'?
            <StyledBtn3 onClick={ToBack}>뒤로가기</StyledBtn3>
            :
            status==='Y'?
            <StyledBtn3 onClick={ToBack}>뒤로가기</StyledBtn3>
            :
            status==="R"?
            <>
            <StyledBtn onClick={() => { $('.pop5').css('display', 'block'); openConfirm();}}>승인</StyledBtn>
            {authority_level < AuthLevel.manager ? null : status === 'R' && (
              <Popup className="pop5">
                <p>전문멘토를 승인하시겠습니까?</p>
                <ul>
                  <li className="no"><button onClick={() => { $('.pop5').css('display', 'none'); }}>취소</button></li>
                  <li className="yes"><button onClick={onResponseConfirm}>확인</button></li>
                </ul>
              </Popup>
            )}
            <StyledBtn2 onClick={() => { $('.pop').css('display', 'block'); openReject(); }} className="reject">반려</StyledBtn2>
            <StyledBtn3 onClick={ToBack}>뒤로가기</StyledBtn3>
            {authority_level < AuthLevel.manager ? null : status === 'R' && (
              <Popup className="pop">
                <p>
                  <textarea value={rejectContent} name="rejectContent" onChange={onRejectChange} placeholder="사유를 작성해 주세요."></textarea>
                </p>
                <ul>
                  <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
                  <li className="yes"><button onClick={onReject}>반려</button></li>
                </ul>
              </Popup>
            )}
          </>
            :
            status==='A'? 
            <>
            <StyledBtn onClick={() => { $('.pop4').css('display', 'block'); openConfirm();}}>승인</StyledBtn>
            {authority_level < AuthLevel.manager ? null : status === 'A' && (
              <Popup className="pop4">
                <p>전문멘토를 승인하시겠습니까?</p>
                <ul>
                  <li className="no"><button onClick={() => { $('.pop4').css('display', 'none'); }}>취소</button></li>
                  <li className="yes"><button onClick={onResponseConfirm}>확인</button></li>
                </ul>
              </Popup>
            )}
            <StyledBtn2 onClick={() => { $('.pop').css('display', 'block'); openReject(); }} className="reject">반려</StyledBtn2>
            <StyledBtn3 onClick={ToBack}>뒤로가기</StyledBtn3>
            {authority_level < AuthLevel.manager ? null : status === 'A' && (
              <Popup className="pop">
                <p>
                  <textarea value={rejectContent} name="rejectContent" onChange={onRejectChange} placeholder="사유를 작성해 주세요."></textarea>
                </p>
                <ul>
                  <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
                  <li className="yes"><button onClick={onReject}>반려</button></li>
                </ul>
              </Popup>
            )}
          </>
                : 
                null
            }

            
        </ButtonList>
    </section>
    )
}
const Popup = styled.div`
background:#fff;
box-shadow:1px 1px 10px rgba(0,0,0,0.2);
position:fixed;top:50%;left:50%;transform:translate(-34%, -50%);
-webkit-transform:translate(-34%, -50%);
display:none;
width:460px;
padding:58px 28px 40px;
box-sizing:border-box;
z-index:1;
`
const ButtonList = styled.div`
justify-align:center;
display:flex;
padding:10px;
justify-content:center;
margin-left:50px;
`
const StyledBtn = styled.button`
background-color:#313f4f;
color:white;
width:160px;
height:60px;
border-radius:15px 15px;
box-sizing:border-box;
cursor:pointer;
`
const StyledBtn2 = styled.button`
background-color:#3c3c3c;
color:white;
width:160px;
height:60px;
border-radius:15px 15px;
box-sizing:border-box;
margin-left:5px;
cursor:pointer;
`
const StyledBtn3 = styled.button`
background-color:#c0c0c0;
color:white;
width:160px;
height:60px;
border-radius:15px 15px;
box-sizing:border-box;
margin-left:5px;
cursor:pointer;
`
const StyledH1  = styled.h1`
font-size:16px;
font-weight:500;
`
const StyledLabel = styled.label`
font-weight:bold;
font-size:14px;
`

const StyledLabel2 = styled.label`
font-weight:bold;
font-size:12px;
`