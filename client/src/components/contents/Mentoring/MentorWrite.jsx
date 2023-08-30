import React, {useEffect, useCallback, useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri, CommonHeader, Method } from "../../../CommonCode";
import { useSelector }  from "react-redux";
import styled from "styled-components";

const MentorWrite = () => {
const location = useLocation();
const history = useNavigate();
const [mentoringNo,setMentoringNo] = useState();
const { userName } = useSelector(state => state.user);
const [mydata,setMyData] = useState([]);
const [list,setList] = useState([]);
const onEdit = async() =>{
  let mentoring_no;
  let edit = "Y";
    const response = await fetch(PreUri+'/mentoring/mentor_no',{
        method:Method.get,
        headers:CommonHeader,
      })
      const json = await response.json();
      console.log(json);
      if(json.length>0){
        mentoring_no = json;
      }
      else{
        mentoring_no = 0;
      }
      
      history('/mentorcontrol/mentorapplication/add?edit',{state:{no:mentoring_no,edit:'Y',}});
}
const onMove = useCallback(async() => {
    let mentoring_no;
    const response = await fetch(PreUri+'/mentoring/mentor_no',{
        method:Method.get,
        headers:CommonHeader,
      })
      const json = await response.json();
      console.log(json)
      if(json.length>0){
        mentoring_no = json;
      }
      else{
        mentoring_no = 0;
      }
    history('/mentorcontrol/mentorapplication/add',{state:{no:mentoring_no}})
},[])

const getApplication = useCallback(async()=>{
    const response = await fetch(PreUri+'/mentoring/mentorapplist',{
      method:Method.get,
      headers:CommonHeader,
    })
    const json = await response.json();
    if(!response.ok){
        return(alert((response.status)))
      }
    setMentoringNo(json);
    const res = await fetch(PreUri + '/mentoring/myapplication?name='+encodeURI(userName))
    if(!res.ok){
        return(alert((res.status)))
      }
    const data = await res.json();
    setMyData(data);
},[userName])
useEffect(()=>{
    getApplication();
},[getApplication])
return(
    <>
    {mydata ? (
  mydata.status === "N" ? (
    <>
    <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translate(50%, 50%)' }}>
      <img src="/images/logo_ci.png" alt="no-img" />
      <div style={{ position: 'relative', top: '50px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>반려되었습니다.</span><br />
        <span>반려사유: {mydata.reject}</span> {/* 반려사유 데이터 표시 */}
      </div>
    </div>
      <div>
      <StyledBtn2 onClick={onEdit}>수정하기</StyledBtn2>
      </div>
    </>
  ) : mydata.status === "Y" ? (
    <div style={{ position: 'absolute', left: '33%', top: '50%', transform: 'translate(50%, 50%)' }}>
      <img src="/images/logo_ci.png" alt="no-img" />
      <div>
      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>통과되었습니다.</span><br/>
      <span>지금부터 멘토링을 진행하실 수 있습니다.</span>
      </div>
    </div>
  ) :  mydata.status === "A" ?
  (
    <div style={{ position: 'absolute', left: '33%', top: '50%', transform: 'translate(50%, 50%)' }}>
      <img src="/images/logo_ci.png" alt="no-img" />
      <div>
      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>신청이 완료되었습니다.</span><br/>
      <span>신청서를 검토중입니다 .</span>
      </div>
    </div>
  ) :mydata.status === "R" ?
  (
    <div style={{ position: 'absolute', left: '33%', top: '100%', transform: 'translate(50%, 50%)' }}>
      <img src="/images/logo_ci.png" alt="no-img" />
      <div style={{position: 'relative', top:'20px'}}>
      <span style={{ fontSize: '20px', fontWeight: 'bold' ,textAlign:'center'}}>재신청이 완료되었습니다.</span><br/>
      <span style={{ fontSize: '16px', fontWeight: 400 ,textAlign:'center'}}>신청서를 재검토중입니다 .</span>
      </div>
    </div>
  ):null// mydata 값이 있으나 status가 "Y" 또는 "N"이 아닐 경우 null을 반환하여 아무것도 표시하지 않음
) : (
  <StyledBtn onClick={onMove}>신청하기</StyledBtn> // mydata 값이 없을 경우 신청하기 버튼 표시
)} 
    </>
)
}
const StyledBtn = styled.button`
position:relative;
top:150px;
left:40%;
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
margin-left:10px;
`
const StyledBtn2 = styled.button`
position:relative;
top:350px;
left:40%;
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
margin-left:10px;
`
export default MentorWrite;