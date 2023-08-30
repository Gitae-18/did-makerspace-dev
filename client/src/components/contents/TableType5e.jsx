import React,{useState,useCallback,useEffect} from "react";
import ButtonType2 from "./ButtonType2";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
import styled from "styled-components";
import { PreUri, Method, CommonHeader} from "../../CommonCode";
import Paging2 from "./Paging2";
export default function TableType5e() {
    const { token } = useSelector(state => state.user);
    const [currentPage,setCurrentPage] = useState(1);
    const postPerPage = 10;
    const history = useNavigate();
    const location = useLocation();
    const [count,setCount] = useState(0);
    const [data,setData] = useState([]);

    const sethandlePage = (e) =>{
      setCurrentPage(e);
    }
    const onItem = (e,index) =>{
      const mentoring_no = e.mentor_application_no;
        history('/mentorcontrol/mentorapplication/detail',{state:{no:mentoring_no}});
      }
    const getApplicationList = useCallback(async() =>{
      const response = await fetch(PreUri+'/mentoring/mentorapplist',{
        method:Method.get,
        headers:CommonHeader,
      });
      if (!response.ok) {
        console.log('잘못된 접근입니다.');
        return;
      };
      const json = await response.json();
      setData(json);
    },[])
    console.log(data);
    useEffect(()=>{
      getApplicationList();
    },[getApplicationList])
  return (
    <div className="table_wrap table_type5 table_type5b">
      <div className="table_extra">
        <div></div>
        <div className="table_search">
          <select name="" id="">
            <option value="1">이름</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <ButtonType2 btnName="검색"></ButtonType2>
        </div>
      </div>
      <table style={{width:'1270px',tableLayout:'fixed'}}>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>소속기업명</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>상태</th>
            <th>신청일</th>
          </tr>
        </thead>
        <tbody>
          {data.length>0&& data.map((item,index) => (
            <tr key={index}>
            <td>{data.length - index - (currentPage - 1) * postPerPage}</td>
            <td onClick={()=>onItem(item,index)}>{item.name}</td>
            <td onClick={()=>onItem(item,index)}>{item.department}</td>
            <td onClick={()=>onItem(item,index)}>{item.email}</td>
            <td onClick={()=>onItem(item,index)}>{item.phone_number}</td>
            <td>{item.status==='N'?"반려":item.status==="Y"?"승인":"신청"}</td>
            <td onClick={()=>onItem(item,index)}>{item.created_at.slice(0,10)}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
      <div className="page_control">
            <Paging2 page={currentPage} setPage={sethandlePage} count={count}/>
      </div>
    </div>
  );
}

const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:80px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
position:relative;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `