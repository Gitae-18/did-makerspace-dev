import React, {useEffect,useState,useCallback} from "react";
import { CommonHeader,PreUri, Method, getRspMsg, AuthLevel } from "../../../CommonCode";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import $ from 'jquery';

export default function MentoringReportAdd(){
    const { token ,authority_level } = useSelector(state => state.user);
    const [data,setData] = useState([]);
    const [date,setDate] = useState([]);
    const [result,setResult] = useState('');
    const [file,setFile] = useState([]);
    const history = useNavigate();
    const location = useLocation();
    const [input, setInput] = useState([]);
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
    },[])
    const SaveData = useCallback(async() =>{
         CommonHeader.authorization = token;
         
         const response = await fetch(PreUri + '/mentoring/savereport',{
            method:Method.post,
            headers:CommonHeader,
            body:JSON.stringify({
                report_content:result,
                mentoring_application_no:mentoring_no,
            })
         })
         const formData = new FormData();

            for (let i = 0; i<file.length; i++){
             formData.append('files',file[i]);
            }
         const res = await fetch(PreUri + '/mentoring/'+ (mentoring_no) +'/reportfiles',{
                method:Method.post, 
                headers:{authorization:token},
                body:formData,
            })
        if(!res.ok){
            return(alert(getRspMsg(res.status)))
        }
         history('/mentoring/report');
    },[token,file,result])
    const onChangeInput = (e) => {
        const {id,value} = e.target;
        setInput({
          ...input,
          [id]:value,
        })
    }
    const onChange = (e) =>{
        setResult(e.target.value);
    }
    const onDelete = (file) => {
        setFile((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
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
      const File = ({ item, index, onDelete })=> {
        return (
          <StyledDiv>
            <StyledP>
              {index}. {item.name.slice(0,15)+'...'}
            </StyledP>
            <StyledBtnDrop onClick={()=>{onDelete(index)}}>삭제</StyledBtnDrop>
          </StyledDiv>
        );
      }
    useEffect(()=>{
        getData();
    },[getData])
    return(
        <section className="section_input_text_type1" style={{marginTop:'20px'}}>
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
                {data !== null ?
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
                :
                <tbody>
                <tr style={{}}>
                <th><h1>신청자</h1></th>
                <td><input type="text" id='user' name='user' onChange={onChangeInput}/></td>
                <th><h1>이메일</h1></th>
                <td><input type="email" id='email' name='email' onChange={onChangeInput}/></td>
                </tr>
                <tr>
                <th><h1>회사명</h1></th>
                <td><input type="text" id='cname' name='cname' onChange={onChangeInput}/></td>  
                <th><h1>사업자등록번호</h1></th>
                <td><input type="text" id='securitynum' name='sercuritynum' onChange={onChangeInput}/></td>  
                </tr>
                <tr>
                <th><h1>직급</h1></th>
                <td><input type="text" id='part' name='part' onChange={onChangeInput}/></td>  
                <th><h1>사업분야</h1></th>
                <td><input type="text" id='sub' name='sub' onChange={onChangeInput}/></td>  
                </tr>
                <tr>
                <th><h1>회사주소</h1></th>
                <td><input type="text" id='address' name='address' onChange={onChangeInput}/></td>  
                <th><h1>담당멘토</h1></th>
                <td><input type="text" id='mentor' name='mentor' onChange={onChangeInput}/></td>  
                </tr>
                <tr>
                <th><h1>신청일</h1></th>
                <td>{date}</td>  
                </tr>
                <tr>
                <th><h1>제목</h1></th>
                <td><input type="text" id='title' name='title' onChange={onChangeInput}/></td>  
                </tr>
                <tr>
                <th><h1>세부 내용</h1></th>
                <td><input type="text" id='specific' name='specific' onChange={onChangeInput}/></td>  
                </tr>
                <tr>
                <th><h1>요청사항</h1></th>
                <td><input type="text" id='require' name='require' onChange={onChangeInput}/></td>  
                </tr>
                </tbody>
                }
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
                    placeholder="결과를 입력해주세요"
                    onChange={onChange}
                    /></td>
                    </tr>
                    <tr>
                     <th><h1>첨부파일</h1></th>
                     <td><input type="file" name="Files" id="file3" style={{display:"none"}} multiple accept=".pdf,video/*,text/plain,.word,image/*" onChange={onChangeFile}/>
                     <StyledLabel3 htmlFor="file3">파일추가</StyledLabel3>
                     {file&&file.map((item,index)=>(
                             <File
                             item={item}
                             index={index}
                             onDelete={()=>onDelete(item)}
                             key={item.name}
                                />
                            ))}
                     </td>  
                    </tr>
                </tbody>
                </table>
                <StyledDiv2>
                    <StyledBtn onClick={()=>{$('.pop3').css('display', 'block');}}>저장</StyledBtn>
                    {authority_level < AuthLevel.manager?<></>:
                    <Popup className="pop3">
                     <p>멘토링 보고서를 작성하시겠습니까?</p>
                         <ul>
                            <li className="no"><button onClick={() => { $('.pop3').css('display', 'none'); }}>취소</button></li>
                            <li className="yes"><button onClick={SaveData}>확인</button></li>
                         </ul>
            </Popup>}
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
background-color:#313f4f;
width:120px;
height:45px;
font-size:0.7rem;
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
left:50%;
margin-bottom:100px;
`
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