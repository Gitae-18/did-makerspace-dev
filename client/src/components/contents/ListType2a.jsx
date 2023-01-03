import React,{useEffect,useState,useCallback} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {useDispatch,useSelector}  from "react-redux";
import { PreUri , CommonHeader ,  Method, getRspMsg } from "../../CommonCode";
import Paging2 from "./Paging2";
export default function ListType2a() {
  const { token } = useSelector(state => state.user);
  const location = useLocation();
  const history = useNavigate();
  //페이징
  const [page,setPage] = useState(1);
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [itemList,setItemList] = useState([]);
  const postPerPage = 10;

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = itemList.slice(indexOfFirstPost, indexOfLastPost)
  const type = "class";

  const getItemList = useCallback(async()=>{
    CommonHeader.authorization = token;
    let requri = PreUri + '/classedu/edulist?type=' + type;
   
    const response = await fetch(requri,{
      Method:Method.get,
      headers:CommonHeader,
    })

    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();
    setItemList(json);
    setCount(json.length);
  },[token])


  const onItem = () =>{
    history(location.pathname + '/detail');
  }
  useEffect(()=>{
    getItemList();
  },[getItemList,token])
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
  return (
    <div className="table_wrap list_type2">
      <ol>
      {currentPost.map((item,index)=>(
        
        <li key={index}>
        <div className="image_part"><img src="/images/class1.png" alt="no"/></div>
        <div className="text_part">
          <h5 onClick={onItem}>{item.title}</h5>
          <div className="tag">
            <span>무료</span>
          </div>
          <dl>
            <dt>교육</dt>
            <dd>{item.class_period_start}</dd>
          </dl>
          <dl>
            <dt>조회수</dt>
            <dd>{item.hit}</dd>
          </dl>
          <dl>
            <dt>마감</dt>
            <dd>{item.application_period_end}</dd>
          </dl>
        </div>
      </li>
    ))}
      </ol>
      <div className="page_control">
       <Paging2 page={currentPage} count = {count} setPage={sethandlePage}/>
      </div>
    </div>
  );
}
