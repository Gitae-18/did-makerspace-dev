import React,{useState,useCallback,useEffect,useRef,useMemo}from "react";
import {ButtonType5} from "./ButtonType2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg } from '../../CommonCode';
import { Paging } from "./Paging";
import Posts from "./Posts";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
export default function TableType1b() {
  const { token } = useSelector(state => state.user);
  const [itemList,setItemList] = useState([]);
  const location =useLocation();
  const [page,setPage] = useState(1);
  const [btnClick,setBtnClick] = useState(false);
  const [count,setCount] = useState(0);
  const [loading,setLoading] = useState(false);
  const [postPage, setPostPage] = useState(10);
  const [search,setSearch] = useState("");
  const limit = 10;
  const offset = (page-1)*limit;

  const inputRef = useRef(null);

  const onChange = (e) =>{
    setSearch(e.target.value);
  }
  const postsData = (posts) =>{
    if(posts){
      let result = posts.slice(offset,offset + limit);
      return result;
    }
  }
  const filterContext = itemList.filter((i)=>{
    return i.model_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })
  const ContextData = filterContext.slice(offset,offset+limit);

  const onSearch = useCallback(async()=>{
    setBtnClick(true);
  })
     
     
 
  
  
  const SetTable= ({data}) =>{
     return(
        <tbody>
            {data!== undefined ? data.map((item,i)=>(
              <tr key={i}>
                <td>{item.equipment_category_no}</td>
                <td>{item.location}</td>
                <td>{item.model_name}</td>
                <td>{item.model_sepecification}</td>
                <td>image</td>
                <td>월~금(09:00-18:00)</td>
              </tr>
            )):<div>게시물이 없습니다.</div>}
           
        </tbody>
     );
  }

  const getItemList = useCallback(async({currentPage,location,postPage})=>{
    setLoading(true);
    let requri = PreUri + `/equipment/categorylist?location=${location}&offset=${(currentPage - 1) * postPage}&count=${postPage}`;
    const response = await fetch(requri, {
      method:Method.get,
      headers:CommonHeader
    });
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setItemList(json);
    setLoading(false);
    setCount(json.length);
 },[token])

 useEffect(()=>{
  getItemList(location,postPage);
 },[location,postPage])
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>20</span>개의 글
        </p>
        <SearchBar onChange={onChange} onClick={onSearch} search={search}/>
      </div>
      <table>
        <caption className="blind">장비소개</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>구분</th>
            <th>모델명</th>
            <th>사진</th>
            <th>스펙</th>
            <th>이용안내</th>
          </tr>
        </thead>
        <SetTable data={ContextData}/>
      </table>
      <div className="page_control">
        <Pagination limit={limit} page ={page} totalPosts={itemList.length} setPage={setPage}/>
      </div>
    </div>
  );
}
