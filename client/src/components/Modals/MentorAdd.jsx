import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { CommonHeader, PreUri, Method, getRspMsg, } from '../../CommonCode'
export default ({query}) => {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const user_no = query.user_no;
    const [userInfo, setUserInfo] = useState([]);
    const [input,setInput] = useState({
        name:"",
        career:"",
        part:"",
        profile:"",
       });
       const [memo, setMemo] = useState("");
       const {name,career,part,profile} = input;
       const onChangeInput = (e) =>{
         const {name,value} = e.target;
         setInput({
           ...input,
           [name]:value,
         })
     
       }
       const  onChangeMemo = (e) =>{
        setMemo(e.target.value)
         }
         console.log(query.user_no);

   const getData = useCallback(async (no) => {
        CommonHeader.authorization = token;
        let response;

		response = await fetch(PreUri + '/mentoring/' + no +'/mentor',{
			method: Method.get,
			headers: CommonHeader
		});

		if (!response.ok) {
			alert(getRspMsg(response.status));
			return;
		}

		let json = await response.json();
        setUserInfo(json);
        if (!mountedRef.current) { return }
    }, [token]);
    const saveMentor = useCallback(async()=>{
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/mentoring/addmentor',{
            method:Method.post,
            headers:CommonHeader,
            body:JSON.stringify({
                no:query.user_no,
                name:userInfo.name,
                keyword:part,
                profile:profile,
                career:career,
                field:part,
                introduction:memo,
            })
          })
          if(!response.ok){
            return(alert("에러 발생"))
          }
          alert('전문멘토가 성공적으로 추가되었습니다.')
          window.close();
     },[token,userInfo,memo,input])
    useEffect(()=>{
    if (!query.user_no) {
        alert('Error : User Number');
        return;
     }
    if(location.pathname.includes("user_no"))
    {
         document.getElementById("header").style.display="none";
    }
    getData(query.user_no);
    return () => {
        mountedRef.current = false
    }
    },[getData])
/*     const AddMentor = useCallback(({item,car,par,pro,onChangeInput,onChangeMemo}) => {
        return(
            <>
             <Title>전문멘토 추가</Title>
            <StyledDiv>
            <StyledTable>
          <thead>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
          </thead>
          <tbody>
            <StyledTr>
              <StyledTh>이름</StyledTh>
              <StyledTd>
                <input type="text" name="name" id="name" value={item.name} readOnly/>
              </StyledTd>
              <StyledTh>경력</StyledTh>
              <StyledTd>
                <input type="text" name="car" id="career" value={car} onChange={onChangeInput} />
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTh>이메일</StyledTh>
              <StyledTd>
                <input type="email" name="email" id="email" value={item.email} readOnly/>
              </StyledTd>
              <StyledTh>전화번호</StyledTh>
              <StyledTd>
                <input type="text" name="phone" id="phone" value={item.phone_number} readOnly/>
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTh>분야</StyledTh>
              <StyledTd>
                <input type="text" name="par" id="part" value={par} onChange={onChangeInput} />
              </StyledTd>
              <StyledTh>소개</StyledTh>
              <StyledTd>
                <input type="text" name="pro" id="profile" value={pro} onChange={onChangeInput} />
              </StyledTd>
            </StyledTr>
            </tbody>
            <tbody>
            <StyledTr>
              <StyledTh>상세</StyledTh>
              <td style={{ width: '100%' }}>
                <textarea rows="10" cols="80" name="memo" id="memo" onChange={onChangeMemo} style={{ border: '1px solid #d2d2d2' }}></textarea>
              </td>
            </StyledTr>
          </tbody>
        </StyledTable>
            <StyledBtn2 onClick={saveMentor}>저장</StyledBtn2>
            </StyledDiv>
            </>
        )
    },[userInfo,memo,saveMentor,onChangeMemo,input]) */
    console.log(input)
    return (
        <>
            <>
             <Title>전문멘토 추가</Title>
            <StyledDiv>
            <StyledTable>
          <thead>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
          </thead>
          <tbody>
            <StyledTr>
              <StyledTh>이름</StyledTh>
              <StyledTd>
                <input type="text" name="name" id="name" value={userInfo.name} readOnly/>
              </StyledTd>
              <StyledTh>경력</StyledTh>
              <StyledTd>
                <input type="text" name="career" id="text02" value={career} onChange={onChangeInput} />
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTh>이메일</StyledTh>
              <StyledTd>
                <input type="email" name="email" id="email" value={userInfo.email} readOnly/>
              </StyledTd>
              <StyledTh>전화번호</StyledTh>
              <StyledTd>
                <input type="text" name="phone" id="phone" value={userInfo.phone_number} readOnly/>
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTh>분야</StyledTh>
              <StyledTd>
                <input type="text" name="part" id="text03" value={part} onChange={onChangeInput} />
              </StyledTd>
              <StyledTh>소개</StyledTh>
              <StyledTd>
                <input type="text" name="profile" id="text04" value={profile} onChange={onChangeInput} />
              </StyledTd>
            </StyledTr>
            </tbody>
            <tbody>
            <StyledTr>
              <StyledTh>상세</StyledTh>
              <td style={{ width: '100%' }}>
                <textarea rows="10" cols="80" name="memo" id="memo" onChange={onChangeMemo} style={{ border: '1px solid #d2d2d2',margin:'10px 10px'}}></textarea>
              </td>
            </StyledTr>
          </tbody>
        </StyledTable>
            <StyledBtn2 onClick={saveMentor}>저장</StyledBtn2>
            </StyledDiv>
            </>
        </>
    );
}

const StyledBtn2= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
position:relative;
top:30px;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
 const StyledTd = styled.td`
 text-align:center;
 line-height:20px;
`
const StyledTh = styled.th`
text-align:center;
line-height:20px;
background-color:#313f4f;
color:#fff;
`
const StyledTr = styled.tr`
position:relative;
border:1px solid #d2d2d2;
height:50px;
`
const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
width: 80%;
padding: 20px;
position:relative;
top:100px;
`
const StyledTable = styled.table`
  width: 100%;
  table-layout:fixed;
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 1.3em;
  background-color: #ffffff;
  position: relative;
  left: 120px;
  top: 100px;
`;