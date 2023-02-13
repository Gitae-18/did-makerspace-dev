import React,{useState,useEffect,useCallback} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { PreUri,CommonHeader, Method, getRspMsg} from "../../CommonCode";
import Paging2 from "./Paging2";
export default function ListType2d() {
  const location = useLocation();
  const history = useNavigate();
  const [data,setData] = useState([]);
  //const [page,setPage] = useState(1);
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)
  const file_type = "text";
  const onItem = useCallback(async(e,index)=>{
    const hit_cnt = data[index].hit;
    const file_no = data[index].file_no;
    const response = await fetch(PreUri + '/archive/archive_cnt',{
      method:Method.put,
      headers:CommonHeader,
      body:JSON.stringify(
        {
          hit : hit_cnt,
          file_no: file_no,
        }
      )
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
     }
    history(location.pathname + '/detail',{state:{file_no:file_no}});
  },[data])
  const sethandlePage = (e) =>{
    setCurrentPage(e);
  }
  const getItem = useCallback(async() =>{
    let requri = PreUri + '/archive/list?file_type='+ file_type;
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader,
    });
    if(!response.ok){
      return(alert(getRspMsg(response.status)))
    }
    const json = await response.json();  
    setData(json);
    setCount(json.length);
  },[])
  console.log(data);
  useEffect(()=>{
    getItem();
  },[getItem])
  return (
    <div className="table_wrap list_type2 list_type2c" style={count<7?{"padding":"0px 40px"}:null}>
      <ol>
        {currentPost.map((item,index)=>(
          <li key={index}>
          <div className="image_part"><img onClick={(e)=>onItem(e,index)} src={item.src} alt="no"/></div>
          <div className="text_part">
            <h5 onClick={(e)=>onItem(e,index)} >{item.title} </h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>{item.created_at.slice(0,10)}</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>{item.hit}</dd>
              </dl>
            </div>
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
