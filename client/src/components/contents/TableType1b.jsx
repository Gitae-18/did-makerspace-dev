import React,{useState,useCallback,useEffect}from "react";
import ButtonType2 from "./ButtonType2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg } from '../../CommonCode';
import { Paging } from "./Paging";
import Posts from "./Posts";
import Pagination from "./Pagination";
export default function TableType1b() {
  const { token } = useSelector(state => state.user);
  const [itemList,setItemList] = useState([]);
  const location =useLocation();
  const [page,setPage] = useState(1);
  const [count,setCount] = useState(0);
  const [loading,setLoading] = useState(false);
  const [postPage, setPostPage] = useState(10);
  const limit = 10;
  const offset = (page-1)*limit;


  const postsData = (posts) =>{
    if(posts){
      let result = posts.slice(offset,offset + limit);
      return result;
    }
  }
  const getItemList = useCallback(async(currentPage)=>{
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
 console.log(itemList);
 useEffect(()=>{
  getItemList();
 },[])
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>20</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">모델명</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <ButtonType2 btnName="조회"></ButtonType2>
        </div>
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
        <Posts info={postsData(itemList)}/>
      </table>
      <div className="page_control">
        <Pagination limit={limit} page ={page} totalPosts={itemList.length} setPage={setPage}/>
      </div>
    </div>
  );
}
