import React,{useState,useCallback} from "react";
import styled from "styled-components";
import Paging2 from "./Paging2";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CommonHeader, Method, PreUri } from "../../CommonCode";

const TableType1c = () => {
  const [data,setData] = useState([]);
  const [searchItem,setSearchItem] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [count,setCount] = useState(0);
  const { token } = useSelector(state => state.user);
  const [search,setSearch] = useState('');
  const [itemList,setItemList] = useState([]);
  const [currentPosts,setCurrentPosts] = useState([]);
  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = searchItem.slice(indexOfFirstPost, indexOfLastPost)
  
  const getWorkers = useCallback(async(e)=>{
    let requri = PreUri + '/worker/workers';
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    });
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
  }
    const json = await response.json(); 

    setData(json);
    setSearchItem(json);
    setCount(json.length)
  },[])


  useEffect(()=>{
    getWorkers();
  },[getWorkers])


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

      setSearchItem(data);
  }
  else{
    const filterData = data.filter((item) => item.name.includes(search));
    setSearchItem(filterData);
    setCurrentPage(1)
  }
  if(search=== null || search === '')
  {
    setSearch('');
  }
},[search])

const activeEnter = (e) => {
  if(e.key === "Enter") {
    onSearch(e);
  }
}
console.log(data);
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>{data.length}</span>개의 글
        </p>
        <div className="table_search">
          <input type="text" name="" id="" placeholder="이름을 입력하세요" onChange={onChange} onKeyDown={(e) => activeEnter(e)}/>
          <StyledBtn onClick={onSearch}>검색</StyledBtn>
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
          {searchItem.length>0&&currentPost.map((item,index)=>(
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
      <Paging2 count={count} page={currentPage} setPage={sethandlePage}/>
      </div>
    </div>
  )}
  export default TableType1c;





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