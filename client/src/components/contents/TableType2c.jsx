import React,{useState,useEffect,useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation,useParams } from "react-router";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg } from '../../CommonCode';
import Paging2 from "./Paging2";
import dotenv from "dotenv";

dotenv.config();
export default function TableType2c() {
    const [posts,setPosts] = useState([]);
    const { token } = useSelector(state => state.user);
    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postPage, setPostPage] = useState(10);
    const [count,setCount] = useState(0);
    const indexOfLastPost = currentPage * postPage
    const indexOfFirstPost = indexOfLastPost - postPage
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)
    const getSpaceList = useCallback(async()=>{
      const api = {
        apikey: process.env.REACT_APP_API_URL,
        baseURL :'/space/reservation',
      }

     
      let requri = PreUri + '/space/reservation';
      console.log(requri)
      const res = await fetch(requri,{
        method:Method.get,
        headers:CommonHeader
      });
      if(!res.ok){
        console.log('잘못된 접근입니다.');
        return;
      }
      const json = await res.json();
      setPosts(json);
      setLoading(false);
      setCount(json.length);
      },[token])
    
    useEffect(()=>{
      getSpaceList();
    },[])
    const setPage = (e) =>{
      setCurrentPage(e);
    }
  return (
    <div className="table_wrap table_type2">
      <div className="table_extra">
        <div></div>
        <div className="table_search">
          <select name="" id="">
            <option value="1">분류</option>
          </select>
        </div>
      </div>
      <table>
        <caption className="blind">공간소개</caption>
        <thead>
          <tr>
            <th>사진</th>
            <th>공간명</th>
            <th>이용안내</th>
            <th>위치</th>
            <th>이용안내</th>
          </tr>
        </thead>
        <tbody>
          {currentPost && posts.length >  0 ? currentPost.map((item,index)=>(
            <tr key={index}>
            <td>image</td>
            <td>{item.space_name}</td>
            <td>{item.space_info}</td>
            <td>{item.location}</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          )):<div>게시물이 없습니다.</div>}
        </tbody>
      </table>
      <div className="page_control">
       <Paging2 page={currentPage} count = {count} setPage={setPage}/>
      </div>
    </div>
  );
}
