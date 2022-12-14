import React,{useState,useCallback} from "react";
import ButtonType2 from "./ButtonType2";
import styled from "styled-components";
import Paging2 from "./Paging2";
import { Data } from './Data'
import { useEffect } from "react";
export default function TableType1c() {
  const [data,setData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [count,setCount] = useState(0);
  const [search,setSearch] = useState('');
  const [itemList,setItemList] = useState([]);
  const [currentPosts,setCurrentPosts] = useState([]);
  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = itemList.slice(indexOfFirstPost, indexOfLastPost)
  useEffect(()=>{
    setCount(Data.length);
    setData(Data);
  },[])
  
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
      setData(Data);
      setCurrentPosts(Data);
  }
  else{
    const filterData = Data.filter((item) => item.name.includes(search))
    setData(filterData)
    setCurrentPosts(filterData)
    setCurrentPage(1)
  }
 setSearch('');
},[search])

const activeEnter = (e) => {
  if(e.key === "Enter") {
    onSearch(e);
  }
}
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>{data.length}</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">이름</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" onChange={onChange} onKeyDown={(e) => activeEnter(e)}/>
          <StyledBtn onClick={onSearch}>조회</StyledBtn>
        </div>
      </div>
      <table>
        <caption className="blind">운영인력소개</caption>
        <thead>
          <tr>
            <th>소속</th>
            <th>이름</th>
            <th>사진</th>
            <th>정보</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index)=>(
          <tr key={index}>
            <td>{item.indp}</td>
            <td>{item.name}</td>
            <td className="images"><img className="etri-image" src="/images/ico_member.png" alt="no-image"/></td>
            <td>{item.info}</td>
          </tr>
         ))}
         
        </tbody>
      </table>
      <div className="page_control">
        <Paging2 page={currentPage} count = {count} setPage={sethandlePage}/>
      </div>
    </div>
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