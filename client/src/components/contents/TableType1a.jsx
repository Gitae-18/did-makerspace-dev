import React,{useState,useCallback,useRef,useEffect}from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation,Link,Outlet} from 'react-router-dom';
import { CommonHeader,PreUri,Method } from "../../CommonCode";
import Pagination from "react-js-pagination";
import '../../css/Paginate.css'
import InfoType1a from "./InfoType1a";
import SubSideMenu from "./SubSideMenu";
import styled from "styled-components";
import qs from 'qs';

export default function TableType1a() {
  const { token } = useSelector(state => state.user);
  const location = useLocation();
  const {search} = useLocation();
  const history = useNavigate();
  const [spaceList,setSpaceList] = useState([]);
  const [spacename,setSpacename] = useState([]);
  const [page,setPage] = useState(1);
  const query = qs.parse(search, {
    ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });
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
  },[token])
  useEffect(()=>{
    getSpaceList();
   
  },[getSpaceList]);

  const handlePageChange = (page) =>{
    setPage(page);
  }
  console.log(spacename);
  const onMove = (e) =>{
    history(location.pathname + '/spacedetail',{state:{name:e.space_name}});
  }
  console.log(query)
  console.log(location.pathname)
  return (
    <>
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>20</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">공간명</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <StyledBtn>조회</StyledBtn>
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
            {spaceList.map((item,i)=>(
              <tr key={i}>
              <td>{item.space_no}</td>
              <td><StyledSpan onClick={(e)=>onMove(item)}>{item.space_name}</StyledSpan></td>
              <td><StyledSpan onClick={(e)=>onMove(item)}>{item.space_info}</StyledSpan></td>
              <td><StyledImg alt="no imgae" src="/images/mokgong.png"/></td>
              <td>{item.location}</td>
              <td>월~금(09:00 - 18:00)</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="page_control">
              <Pagination
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={spaceList.length}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange}
              />
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