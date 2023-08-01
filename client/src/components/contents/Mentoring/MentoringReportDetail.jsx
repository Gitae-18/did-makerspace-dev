import React, {useEffect,useState,useCallback,useRef} from "react";
import { CommonHeader,PreUri, Method, getRspMsg,MaxFileCount,AuthLevel, } from "../../../CommonCode";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import '../../../css/style-s.css';
import fileDownload from 'js-file-download'
import '../../../fonts/slick.ttf'
import {jsPDF} from 'jspdf';
import moment from "moment";
import $ from 'jquery';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export default function MentoringReportDetail(){
    const { token ,authority_level } = useSelector(state => state.user);
    const [data,setData] = useState([]);
    const [date,setDate] = useState([]);
    const [result,setResult] = useState('');
    const [file,setFile] = useState([]);
    const history = useNavigate();
    const location = useLocation();
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
      //
      const MARGIN_SIZE = 10;		//상하좌우 여백
      const LINE_HEIGHT = 3;		//행 너비 비율

      const IMG_SIZE_X = 5;
      const IMG_SIZE_Y = 5;

      //변동 값
      let FONT_SIZE = 10;		//폰트 크기
      let Y_LOC = MARGIN_SIZE;	//다음 행 시작 Y좌표(자동 계산 위함)

      const CELL_HEIGHT = 11.641666666666664;	//기본 셀 높이
      const imageRef = useRef();
      console.log(imageRef)

   
      const onDownloadBtn = async () => {
        const div = imageRef.current;
        try {
          const canvas = await html2canvas(div,{scale:2})
          canvas.toBlob((blob) => {
            if (blob !== null) {
              saveAs(blob, `report${mentoring_no}.png`);
            }
          });
        } catch (error) {
          console.error(error);
        }
      };

      const saveAsPDF = () =>{
        const doc = new jsPDF({format: 'a4',unit :'mm', orientation: 'landscape'})
        doc.addFont("slick.ttf", "slick", "normal");
        doc.setFont("slick");
        const element = document.getElementById('report');
        doc.fromHTML(element,15,15,{
         width:170
        });
        doc.save('filesave.pdf');
      }
      
     
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
        setDate(json.created_at.slice(0,10))
        const updateRadioButtonaList = radioButtonList.map(item => {
            if(json.purpose.includes(item.text)){
                return {...item, checked:true};
            }
            return item;
        });
        setRadioButtonList(updateRadioButtonaList);

        const res = await fetch(PreUri +'/mentoring/'+ mentoring_no +'/mentoring_result',{
            method:Method.get,
            headers:CommonHeader,
        })
        if (!res.ok) {
          console.log('response error');
          return; 
        }
        const list = await res.json();
        setResult(list);
    },[])
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
      console.log(fileInfo.attached_file_no)
      const response = await fetch(PreUri + '/mentoring/' + mentoring_no + '/file/' + fileInfo.attached_file_no, {
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
  const FileDownload = useCallback((props) => {
    return (<>
    <div style={{display:'inline-block',margin:'0px 5px'}}>
    <label>{props.index}.</label>
      <button className="download" style={{ border: "0px", cursor: 'pointer' }} onClick={props.onClick}>{props.filename}</button>
      </div>
    </>);
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

    const ToList = () =>{
        
    }
    useEffect(()=>{
        getData();
        getFile();
        getFileNo();
    },[getData,getFile,getFileNo])
    return(
        <section id="report" className="section_input_text_type1" style={{marginTop:'20px'}} ref  ={imageRef}>
            <div className="form">
                <h1 style={{marginLeft:'70px'}}>멘토링 신청서</h1>
            <table>
            <tbody>
            <div style={{display:"inline-flex",flexWrap:"wrap",position:"relative",width:"100%",height:"100%",overflowWrap:"break-word",wordWrap:"break-word"}}>
            {radioButtonList && radioButtonList.map((item,idx)=>
            (
                <div style={{flexBasis:"8%",boxSizing:"border-box",padding:"5px",marginLeft:'70px'}} key={idx}>
                  <input type="checkbox"  id="radio_button" name={item.text} value={item.text} style={{width:"20px",height:"25px"}} checked={item.checked} readOnly/> 
                  <div>
                  <h3>{item.text}</h3>
                  </div>
                </div>
            ))              
            }
            </div>
            </tbody>
            </table>
            <table>
            <colgroup>
             <col width="15%" />
             <col width="35%" />
             <col width="15%" />
             <col width="35%" />
            </colgroup>
                <tbody>
                <tr style={{}}>
                <th><h1>신청자</h1></th>
                <td>{data.name}</td>
                <th><h1>이메일</h1></th>
                <td>{data.usermail}</td>
                </tr>
                <tr>
                <th><h1>회사명</h1></th>
                <td>{data.company_name}</td>  
                <th><h1>사업자등록번호</h1></th>
                <td>{data.securitynum}</td>  
                </tr>
                </tbody>
                <tbody style={{marginTop:'10px'}}>
                <tr>
                <th><h1>직급</h1></th>
                <td>{data.sub}</td>  
                <th><h1>사업분야</h1></th>
                <td>{data.part}</td>  
                </tr>
                <tr>
                <th><h1>회사주소</h1></th>
                <td>{data.address_detail}</td>  
                <th><h1>담당멘토</h1></th>
                <td>{data.mentor}</td>  
                </tr>
                <tr>
                <th><h1>신청일</h1></th>
                <td>{date}</td>  
                </tr>
                <tr>
                <th><h1>제목</h1></th>
                <td>{data.application_title}</td>  
                </tr>
                <tr>
                <th><h1>세부 내용</h1></th>
                <td>{data.specific_content}</td>  
                </tr>
                <tr>
                <th><h1>요청사항</h1></th>
                <td>{data.requirement}</td>  
                </tr>
                </tbody>
                </table>
                <table>
                <colgroup>
                <col width="15%" />
                <col width="85%" />
                </colgroup>
                <tbody>
                    <tr>
                    <th style={{width:'187px'}}><h1>멘토링 결과</h1></th>
                    <td className="textarea_wrap">
                    <StyleText 
                    name="text09"
                    id="text09"
                    cols="150"
                    rows="10"
                    value={result.report_content}
                    readOnly
                    /></td>
                    </tr>
                    <tr>
                     <th><h1>첨부파일</h1></th>
                     <td><label style={{backgroundColor:"gray",marginRight:"10px",color:"white",width:"60px !important",height:"60px !important",fontSize:'9px',padding:'4px 4px'}}>파일 다운로드</label>
                     {DownloadMyFileItems}
                     </td>  
                    </tr>
                </tbody>
                </table>
                <StyledDiv2>
                    {/* <StyledBtn onClick={saveAsPDF}>pdf로저장</StyledBtn> */}
                    <StyledBtn3 onClick={ToList}>확인</StyledBtn3>
                    <StyledBtn onClick={onDownloadBtn}>다운로드</StyledBtn>
                </StyledDiv2>
            </div>
        </section>
    )
}

const StyleText = styled.textarea`
position:relative;
border:1px solid #d3d3d3;
padding:10px;
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
position:relative;
display:inline-block;
left:50px;
width:200px;
height:auto;
`
const StyledBtnDrop = styled.button`
display:inline-block;
color:#fff;
background-color:#313f4f;
width:40px !important;
height:25px !important;
font-size:0.5rem;
cursor:pointer;
position:relative !important;
float:left;
`
const StyledLabel3 = styled.label`
background-color:#313d4d !important;
color:#fff;
text-align:center;
font-size:14px; 
padding: 10px 10px !important;
position:relative;
cursor:pointer !important;
`
const StyledBtn= styled.button`
color:#fff;
background-color:#313d4d;
width:160px;
height:60px;
font-size:0.7rem;
border-radius:15px 15px;
cursor:pointer;
border:1px solide #313f4f;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 margin: 0 auto;
 `
const StyledDiv2 = styled.div`
position:relative;
width:100%;
height:auto;
top:50px;
left:40%;
margin-bottom:100px;
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