import React, {useEffect,useState,useCallback} from "react";
import { CommonHeader,PreUri, Method, getRspMsg,MaxFileCount,AuthLevel, } from "../../../CommonCode";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import '../../../css/style-s.css';
import fileDownload from 'js-file-download'
import moment from "moment";
import $ from 'jquery';
export default function MentoringDetail(){
    const location = useLocation();
    const history = useNavigate();
    const { token ,authority_level } = useSelector(state => state.user);
    const [data,setData] = useState([]);
    const [status, setStatus] = useState('OSA');
    const [rejectContent,setRejectContent] = useState('');
    const [memo,setMemo] = useState('');
    const [modalOpen,setModalOpen] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [modal,setModal] = useState(false);
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
     
        const response = await fetch(PreUri + '/mentoring/' + mentoring_no + '/file/' + fileInfo.attached_file_no, {
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
        history('/mentoring');
    }
    const onChangeMemo = (e) =>{
      setMemo(e.target.value);
    }
    const onReport = useCallback(() =>{
      history('/mentoring/report/add',{state:{no:mentoring_no}});
    },[mentoring_no,history])
    const ToComplete = useCallback(async(e)=>{
      e.preventDefault();
      CommonHeader.authorization = token;
      let response = await fetch(PreUri + '/mentoring/finish', {
          method: Method.put,
          headers: CommonHeader,
          body: JSON.stringify({
            mentoring_application_no:mentoring_no,
            status:"PRC",
            memo:memo,
          })
      });
      if (!response.ok) {
          alert(getRspMsg(response.status));
          return;
      }
      alert("진행이 완료 되었습니다");
      history(-1);
    },[token,mentoring_no,modalOpen])

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
          const response = await fetch(PreUri + '/mentoring/'+ mentoring_no + '/filesno',{
            method:Method.get,
            headers:CommonHeader
          })
          const json = await response.json();
      
          setFileNo(json);
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
         
          if(confirmFlag === 'REJ')
          {
          setStatus('REJ');
          const  reject_content = rejectContent;
    
          const response = await fetch(PreUri + '/mentoring/reject', {
            method: Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
              mentoring_application_no:mentoring_no,
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
        else if(confirmFlag === 'RUN'){
          setStatus('RUN');
        }
        else if(confirmFlag === 'PRC'){
          setStatus('PRC');
        }
        history('/mentoring',{replace:true});
        },[token, rejectContent,mentoring_no,status])

      const onResponseConfirm = useCallback(async(e) => {
          e.preventDefault();
          handleChangeStatus('RUN')
          const response = await fetch(PreUri + '/mentoring/change_status',{
            method:Method.put,
            headers: CommonHeader,
            body: JSON.stringify({
              mentoring_application_no:mentoring_no,
              status:"RUN",
            })
            });
            if(!response.ok){
              alert("response error");
            }
            const json = await response.json();
    }, [status, handleChangeStatus])
             
    
    const onReject = useCallback(async(e) => {
      e.preventDefault();
      if (rejectContent.length < 1) {
        alert("반려사유가 비어있습니다.")
      }
      handleChangeStatus('REJ');
    
      const response = await fetch(PreUri + '/mentoring/change_status',{
      method:Method.put,
      headers: CommonHeader,
      body: JSON.stringify({
        mentoring_application_no:mentoring_no,
        status:status,
      })
      });
      if(!response.ok){
        alert("response error");
      }
      const json = await response.json();
    }, [status, rejectContent,handleChangeStatus,openModal])
    console.log(status);
    const onRejectChange = useCallback((e) => {
      e.preventDefault();
          setRejectContent(e.target.value);
      }, []);
    const getData = useCallback(async()=>{
        CommonHeader.authorization = token;
        let requri = PreUri + '/mentoring/mentoring_specific?mentoring_no=' + mentoring_no;
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
        setStatus(json.status);
        const updateRadioButtonaList = radioButtonList.map(item => {
            if(json.purpose.includes(item.text)){
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
        <section className="section_input_text_type1" style={{marginTop:'20px'}}>
            <div className="title_wrap">
            <StyledH1>신청분야</StyledH1>
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
             <StyledH1>신청 기업정보</StyledH1>
             </div>
        <ul className="text_wrap" style={{marginTop:'20px'}}>
            <li>
            <StyledLabel htmlFor="text01">회사명</StyledLabel>
                <input
                    type="text"
                    name="text01"
                    id="text01"
                    value={data.company_name}
                    readOnly
                />
            <StyledLabel2 htmlFor="text02">사업자등록번호/예비창업주의 경우 주민번호 앞자리</StyledLabel2>
                < input
                  type="email"
                  name="text02"
                  id="text02"
                  value={data.securitynum}
                  readOnly
                  />
          </li>
          <li>
            <StyledLabel htmlFor="text01">대표자</StyledLabel>
                <input
                    type="text"
                    name="text01"
                    id="text01"
                    value={data.company_name}
                />
            <StyledLabel htmlFor="text02">이메일</StyledLabel>
                < input
                  type="email"
                  name="text02"
                  id="text02"
                  value={data.securitynum}
                  readOnly
                  />
          </li>
          <li>
            <StyledLabel htmlFor="text01">연락처</StyledLabel>
                <input
                    type="text"
                    name="text01"
                    id="text01"
                    value={data.company_name}
                    readOnly
                />
            <StyledLabel htmlFor="text02">주요사업분야</StyledLabel>
                < input
                  type="email"
                  name="text02"
                  id="text02"
                  value={data.securitynum}
                  readOnly
                  />
          </li>
          <li>
          <StyledLabel htmlFor="text07">주소</StyledLabel>
          <input
            type="text"
            name="text07"
            id="text07"
            value={data.address+data.address_detail}
            readOnly
          />
        </li>   
        </ul>
            <div className="title_wrap" style={{marginTop:'20px'}}>
             <StyledH1>신청자 정보</StyledH1>
             </div>
      <ul className="text_wrap" style={{marginTop:'20px'}}>
        <li>
          <StyledLabel htmlFor="text01">고객명</StyledLabel>
          <input
            type="text"
            name="text01"
            id="text01"
            value={data.name}
            readOnly
          />
          <StyledLabel htmlFor="text02">이메일</StyledLabel>
          <input
            type="email"
            name="text02"
            id="text02"
            value={data.usermail}
            readOnly
          />
        </li>
        <li>
          <StyledLabel htmlFor="text03">전화번호</StyledLabel>
          <input
            type="tel"
            name="text03"
            id="text03"
            value={data.p_num}
            readOnly
          />
          <StyledLabel htmlFor="text04">회사명</StyledLabel>
          <input
            type="text"
            name="text04"
            id="text04"
            value={data.company_name}
            readOnly
          />
        </li>
        <li>
          <StyledLabel htmlFor="text05">부서</StyledLabel>
          <input
            type="text"
            name="text05"
            id="text05"
            value={data.sub}
            readOnly
          />
          <StyledLabel htmlFor="text06">신청일</StyledLabel>
          <input type="text" name="text06" id="text06" value={moment(data.created_at).format("YYYY-MM-DD")} readOnly/>
        </li>
        <li>
          <StyledLabel htmlFor="text07">제목</StyledLabel>
          <input
            type="text"
            name="text07"
            id="text07"
            value={data.application_title}
            readOnly
          />
        </li>
        <li className="textarea_wrap">
          <StyledLabel htmlFor="text08">세부 내용</StyledLabel>
          <textarea
            name="text08"
            id="text08"
            cols="30"
            rows="10"
            value={data.specific_content}
            readOnly
          ></textarea>
        </li>
        <li className="textarea_wrap">
          <StyledLabel htmlFor="text09">기타 요청사항</StyledLabel>
          <textarea
            name="text09"
            id="text09"
            cols="30"
            rows="10"
            value={data.requirement}
            readOnly
          ></textarea>
        </li>
        { status === "RUN" && authority_level > 70 ?
         <li className="textarea_wrap">
          <StyledLabel htmlFor="memo">관리자 메모</StyledLabel>
          <textarea
            name="text09"
            id="text09"
            cols="30"
            rows="5"
            onChange={onChangeMemo}
          ></textarea>
          </li>
          :
          status === "PRC" &&
          <li className="textarea_wrap">
          <StyledLabel htmlFor="memo">관리자 메모</StyledLabel>
          <textarea
            name="text09"
            id="text09"
            cols="30"
            rows="5"
            value={data.memo}
            readOnly
          ></textarea>
          </li>
        }
        <li>
          <StyledLabel htmlFor="text10">멘토</StyledLabel>
          <input
            type="text"
            name="text10"
            id="text10"
            value={data.mentor}
            readOnly
          />
        </li>
        <li>
          <StyledLabel htmlFor="text11">첨부파일</StyledLabel>
          {DownloadMyFileItems}
        </li>
        <li>
          {
            status === 'REJ'?
            <>
            <StyledLabel htmlFor="text12">반려</StyledLabel>
            <textarea readOnly={true} value={data.reject_content} name="content"/>
            </>
            :
            status === 'RUN'?
            <>
            <StyledLabel htmlFor="text13">진행 상황</StyledLabel>
            <textarea readOnly={true} value="멘토링이 진행중입니다." />
            </>
            :
            status === 'PRC'?
            <>
            <StyledLabel htmlFor="text14">진행 상황</StyledLabel>
            <textarea rows="3" cols="20" readOnly={true} value="멘토링이 종료되었습니다. 보고서작성을 해주시기 바랍니다."/>
            </>        
            :
            <></>
          }
        </li>
        <ButtonList>
        {status === 'REJ' ?
          <StyledBtn3 onClick={ToBack}>뒤로가기</StyledBtn3>
          :
          status === 'RUN' ?
          <>
          <StyledBtn2 className="btn_modify" onClick={() => { $('.pop').css('display', 'block');openFinish()}}>종료하기</StyledBtn2>
          {authority_level < AuthLevel.manager?<></>:
           status==="RUN"&&
            <Popup className="pop">
             <p>멘토링 진행을 종료하시겠습니까?</p>
              <ul>
                <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
                <li className="yes"><button onClick={ToComplete}>확인</button></li>
              </ul>
            </Popup>
          }
          <StyledBtn3 onClick={ToBack}>뒤로가기</StyledBtn3>
          </>
          :
          status === "PRC" ? 
          <>
          <StyledBtn2 onClick={onReport}>보고서 작성</StyledBtn2>
          <StyledBtn3 onClick={ToBack}>확인</StyledBtn3>
          </>
          :
        <>
        <StyledBtn onClick={()=>{$('.pop2').css('display', 'block'); openConfirm()}}>승인</StyledBtn>
        {authority_level < AuthLevel.manager?<></>:
           status==="OSA"&&
            <Popup className="pop2">
             <p>멘토링 승인하시겠습니까?</p>
              <ul>
                <li className="no"><button onClick={() => { $('.pop2').css('display', 'none'); }}>취소</button></li>
                <li className="yes"><button onClick={onResponseConfirm}>확인</button></li>
              </ul>
            </Popup>
          }
        <StyledBtn2  onClick={() => { $('.pop').css('display', 'block'); openReject()}} className="reject">반려</StyledBtn2>
        <StyledBtn3 onClick={ToBack}>뒤로가기</StyledBtn3>
        </>
        }
        {authority_level < AuthLevel.manager?<></>:
        status==="OSA"&&
        <Popup className="pop">
           <p><textarea value={rejectContent} name="rejectContent" onChange={onRejectChange} placeholder="사유를 작성해 주세요."></textarea></p>
          <ul>
            <li className="no"><button onClick={() => { $('.pop').css('display', 'none'); }}>취소</button></li>
            <li className="yes"><button onClick={onReject}>반려</button></li>
          </ul>
        </Popup>
        }
        </ButtonList>
        
  {/*       <li>
          <StyledLabel htmlFor="text12">관리자메모</StyledLabel>
          <input
            type="text"
            name="text12"
            id="text12"
            placeholder="입력하세요."
          />
        </li> */}
       {/*  <li>
          <StyledLabel htmlFor="text13">산정평가 요청</StyledLabel>
          <input
            type="text"
            name="text13"
            id="text13"
            placeholder="입력하세요."
          />
        </li> */}
      </ul>
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