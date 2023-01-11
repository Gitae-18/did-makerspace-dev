import React,{useState,useCallback,useRef,useEffect}from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation,Link,Outlet} from 'react-router-dom';
import { CommonHeader,PreUri,Method } from "../../CommonCode";
import Pagination from "react-js-pagination";
import '../../css/Paginate.css'
import InfoType1a from "./InfoType1a";
import SubSideMenu from "./SubSideMenu";
import { Paging } from "./Paging";
import Paging2 from "./Paging2";
import styled from "styled-components";
import Posts from "./Posts";
import qs from 'qs';

export default function TableType1a() {
  const { token } = useSelector(state => state.user);
  const location = useLocation();

  const history = useNavigate();
  const [spaceList,setSpaceList] = useState([]);
  const [spacename,setSpacename] = useState([]);
  //pagenation
  const [page,setPage] = useState(1);
  const [search,setSearch] = useState('');
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [currentPosts,setCurrentPosts] = useState([]);
  const postPerPage = 10;
  const offset = (page-1)*postPerPage;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = spaceList.slice(indexOfFirstPost, indexOfLastPost)
 // const totalPage = Math.ceil(totalCount/limit)
  //const limit = 5
  //const pageCount = 5
  //const pageGroup = Math.ceil(currentPage/pageCount)
  //let lastNumber = pageGroup * pageCount
/*   if(lastNumber>totalPage){
    lastNumber = totalPage
  }
  let firstNumber = lastNumber - (pageCount -1)
  const next = lastNumber + 1
  const prev = firstNumber - 1  */
  const getSpaceList = useCallback(async() =>{
    let requri = PreUri + '/space/list';
    const response = await fetch(requri, {
      method:Method.get,
      headers:CommonHeader
    });
    
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setSpaceList(json)
    setSpacename(json.map((e,i,arr)=>(e.space_name)));
    setCurrentPosts(json.slice(indexOfFirstPost,indexOfLastPost))
    setCount(json.length)
  },[token])


  useEffect(()=>{
    getSpaceList();
  },[]);

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onSearch(e);
    }
  }
  const handlePageChange = (e) =>{
    setCurrentPage(e)
  }
  const onMove = (e) =>{
    history(location.pathname + '/spacedetail',{state:{name:e.space_name}});
  }
  const onChange = (e) =>{
    e.preventDefault();
    setSearch(e.target.value);
  }
/*   const postData = (posts) =>{
     if(posts){
      let result = posts.slice(offset,offset+postPerPage);
      return result;
     }
  } */
  const onSearch = useCallback(async(e) =>{
    e.preventDefault();

    if(search=== null || search === ''){
        let requri = PreUri + '/space/list';
      const response = await fetch(requri, {
        method:Method.get,
        headers:CommonHeader
      });
      const json = await response.json(); 
      setSpaceList(json);
      setCurrentPosts(json);
  }
  else{
    const filterData = spaceList.filter((item) => item.space_name.includes(search))
    setSpaceList(filterData)
    setCurrentPosts(filterData)
    setCurrentPage(1)
  }
 setSearch('');
},[search])

  return (
    <>
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>{spaceList.length}</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">공간명</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" onKeyDown={(e) => activeEnter(e)} onChange={onChange}/>
          <StyledBtn onClick={(e)=>onSearch(e)} >조회</StyledBtn>
        </div>
      </div>
      <table className="table_space">
        <caption className="blind">공간소개</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>공간명</th>
            <th>공간정보</th>
            <th>사진</th>
            <th>위치</th>
            <th>이용안내</th>
          </tr>
        </thead>
        <tbody>
          {/* <Posts posts={currentPosts} onMove={onMove} /> */}
            {currentPost && spaceList.length >  0 ? currentPost.map((item,i)=>(
              <tr key={i}>
              <td>{item.space_no}</td>
              <td><StyledSpan onClick={(e)=>onMove(item)}>{item.space_name}</StyledSpan></td>
              <td><StyledSpan onClick={(e)=>onMove(item)}>{item.space_info}</StyledSpan></td>
              <td><StyledImg alt="no imgae" src="/images/mokgong.png"/></td>
              <td>{item.location}</td>
              <td>월~금(09:00 - 18:00)</td>
              </tr>
            )):<div>게시물이 없습니다.</div>}
        </tbody>
      </table>
      <div className="page_control">
      {/* <Paging2 page={page} count = {count} setPage={handlePageChange}/> */}
        <Paging totalCount={count} page={page} postPerPage={postPerPage} pageRangeDisplayed={5} handlePageChange={handlePageChange}/>
              {/* <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={spaceList?spaceList.length:0}
              pageRangeDisplayed={10}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange}
              /> */}
      </div>
    </div>
    </>
  );
}

const StyledLink = styled(Link)`
    text-decoration: none;
    textDecoration:none;
    cursor:pointer;
    color:#000;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
const StyledSpan = styled.span`
    color:#000;
    cursor:pointer;
    &:hover{
      none;
      text-decoration:none;
      display:always;
      cursor:pointer;
    }
`
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
 const StyledImg = styled.img`
 width:50px;
 height:50px;
 `