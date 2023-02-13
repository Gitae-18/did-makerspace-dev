import React,{useState,useCallback,useEffect,useRef,useMemo}from "react";
import {ButtonType5} from "./ButtonType2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation,Link} from 'react-router-dom';
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg , pageNext, pagePrev } from '../../CommonCode';
import {SET_MATERIAL, SET_MATERIAL_PAGEINFO, SET_LIST_PAGEINFO} from '../../store/material';
import { Paging } from "./Paging";
import Posts from "./Posts";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import { EQUIP_CATEGORY_ITEM } from "../../store/management";
import Paging2 from "./Paging2";
export default function TableType1b({query}) {
 
  const [itemList,setItemList] = useState([]);
  const history = useNavigate();
  const mountedRef = useRef(true);
  const dispatch = useDispatch();
  const location = useLocation();
  //const [page,setPage] = useState(1);
 // const [btnClick,setBtnClick] = useState(false);
  const [count,setCount] = useState(0);
  const [loading,setLoading] = useState(false);
  const [postPage, setPostPage] = useState(10);
  //const [totalPage,setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search,setSearch] = useState("");
  const [items, setItems] = useState({
    totalCount: 0,
    totalPage: 0,
    currentPage: 0,
    offset: 0,
    limit: 0,
    pageOffset: 0,
    items: [],
});
const postsPerPage = 10;
//const totalPages = ((itemList.length - 1) / postsPerPage) + 1
const postPerPage = 10;
//const offset = (page-1)*postPerPage;
const indexOfLastPost = currentPage * postPerPage
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPost = itemList.slice(indexOfFirstPost, indexOfLastPost)
const headpath = '/images/equipment'
  //const [ContextData,setContextData] = useState([]);
 /*    const limit = 10;
  const offset = (page-1)*limit;
 */
  //const inputRef = useRef(null);
/* 
  const onChange = (e) =>{
    setSearch(e.target.value);
  } */
 /*  const postsData = (posts) =>{
    if(posts){
      let result = posts.slice(offset,offset + limit);
      return result;
    }
  } */
  //const filterContext = itemList.slice(offset,offset+limit)
  
  //const numlength = itemList.length
  //const number = Array(numlength).fill().map((_,i)=>i)
/*   const onSearch = useCallback(async()=>{
    setBtnClick(!btnClick);
    setContextData(itemList.filter((i)=>{
    return i.model_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  }).slice(offset,offset+limit))
  },[filterContext]) */

  const getItemList = useCallback(async(pageNumber, searchWord)=>{
  
    setLoading(true);
    const limitCount = 10;
    let requri = PreUri + '/equipment/categorylist?page='+ pageNumber + '&limit=' + limitCount;
    if (searchWord && searchWord.length > 0) { requri += ("&search=" + searchWord); }
		

    const response = await fetch(requri, {
      method:Method.get,
      headers:CommonHeader
    });
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    console.log(json);
    setItemList(json);

    const totalPage = Number(json.total_page);
    const currentPage = Number(json.current_page);
    const pageOffset = Math.ceil(currentPage / PageMax);
    setItems(items => ({  
			  ...items,
      totalCount: Number(json.total_count),
      totalPage,
      currentPage,
      limit: Number(json.limit),
      pageOffset: (pageOffset < 1 ? 0 : (pageOffset - 1) * PageMax),
      items: json.items,
		}));

    setLoading(false);
    setCount(json.length);
    //setContextData(itemList.slice(offset,offset+limit));
 },[])

 useEffect(()=>{
  getItemList(query.page?query.page:1,query.search);
  setSearch(query.search ? query.search : '');
 },[getItemList,query])
 const onChange = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }, [setSearch]);

 /*  const onSearch = useCallback((e) => {
    const addQuery = (search.length > 0) ? ("?search=" + search) : "";
    history(location.pathname + addQuery);
}, [search, history]); */
const onSearch = useCallback(async(e) =>{
  e.preventDefault();

  if(search=== null || search === ''){
      let requri = PreUri + '/equipment/categorylist';
    const response = await fetch(requri, {
      method:Method.get,
      headers:CommonHeader
    });
    const json = await response.json(); 
    setItemList(json);
    
}
else{
  const filterData = itemList.filter((item) => item.model_name.toLowerCase().includes(search.toLowerCase()))
  setItemList(filterData)
 
  setCurrentPage(1)
}
setSearch('');
},[search])

const onSelectItem = useCallback((e, i) => {
        if(itemList[0]!==undefined){
        const no = e.equipment_category_no;
        history("/didinfo/info/InfoType1a",{state:{no:no}});
        }
    }, [items, dispatch, history]);

const ItemRow = useCallback((props) => {
  
return (<>
        <tr>
            <td onClick={props.onClick} className="num"><span className="more">{props.index}</span></td>
            <td onClick={props.onClick}>{props.location}</td>
            <td onClick={props.onClick}><span className="more">{props.modelName? props.modelName : '-'}</span></td>
            <td className="num"><img src={headpath+props.src} alt="no-image"/></td>
            <td>월~금(09:00-18:00)</td>
        </tr>
    </>);
}, []);
let ItemRows = [];
    if (items.totalCount > 0) {

        for (let i = 0; i <= items.items.length && i < items.limit; i++) {
            const item = items.items[i];
            const rowNumber = items.totalCount - i - (items.currentPage - 1) * items.limit;
            if (rowNumber < 1) { break; }
            
            ItemRows.push(
                <ItemRow 
                    index={rowNumber}
                    location={item.location}
                    modelName={item.model_name ? item.model_name : undefined}
                    modelSpec={item.model_sepecification}
                    src={item.src}
                    currentPage={currentPage}
                    onClick={(e) => onSelectItem(item.equipment_category_no,i)}
                    key={i} />);
        };
    }



  const SetTable= ({data}) =>{
     return(
        <tbody>
            {data!== undefined ? data.map((item,i)=>(
              <tr key={i}>
                <td>{i+currentPage*postPage-9}</td>
                <td>{item.location}</td>
                <td><StyledLink to="/InfoType1a"><StyledSpan>{item.model_name}</StyledSpan></StyledLink></td>
                <td>{item.model_sepecification}</td>
                <td>{currentPage}</td>
                <td>월~금(09:00-18:00)</td>
              </tr>
            )):<div>게시물이 없습니다.</div>}
           
        </tbody>
     );
  }
  //const currText = itemList.slice(offset,offset+limit)



const onPagePrev = (e) => {
  //e.preventDefault();
 
  if(currentPage<0){
    setCurrentPage(1);
  }
  if(currentPage>0){
    setCurrentPage(currentPage-1);
        //const curPageGrp = Math.ceil(items.pageOffset / PageMax);
   
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history(location.pathname + '?page=' + currentPage + querySearch);
      
      console.log(currentPage);
  }
    };
    const setPage = (e) =>{
      setCurrentPage(e);
    }

const onPageNext = (e,newPageNumber) => {
  //e.preventDefault();
  setCurrentPage(currentPage)
  const totPageGrp = Math.ceil(items.totalPage / PageMax )
  if(currentPage>0){
    const querySearch = (search.length > 0) ? ("&search=" + search) : "";
      history(location.pathname + '?page=' + currentPage + querySearch);
      setCurrentPage(currentPage+1);
       /*  const newPageOffset = items.pageOffset + 1;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(items.totalPage / PageMax );
 */
   console.log(currentPage);
  }
    }
 
    
    

const onPage = useCallback((e, newPageNumber) => {
  e.preventDefault();
  const querySearch = (search.length > 0) ? ("&search=" + search) : "";
  history(location.pathname + '?page=' + newPageNumber+ querySearch);
}, [history, search]);

let PageList = [];
for (let i = 0; i < PageMax; i++) {
    let pageNum = i + 1 + items.pageOffset;
    if (pageNum > items.totalPage) { break; }
    PageList.push(<Button  onClick={(e) => onPage(e, pageNum)}
        className={pageNum === items.currentPage ? "active" : ""}
        key={i}>{pageNum}</Button>);
}
  return (
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>{itemList.length}</span>개의 글
        </p>
        <div className="table_search">
       {/*    <select name="" id="">
            <option value="1">모델명</option>
          </select> */}
          <input type="text"  value={search} name="search" onChange={onChange}   onKeyPress={(e) => { if (e.key === 'Enter') { onSearch(e) } }} placeholder="모델명을 입력하세요" />
          <button className="search_btn" type="button" onClick={onSearch}>검색</button>
        </div>
      </div>
      <table>
        <caption className="blind">장비소개</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>모델명</th>
            <th>사진</th>
            <th>위치</th>
            <th>이용안내</th>
          </tr>
        </thead>
        <tbody>
        {currentPost.length > 0 ? currentPost.map((item,index)=>(
          <tr key={index}>
            <td onClick={(e)=>onSelectItem(item,index)} className="num"><span className="more">{itemList.length - index - (currentPage - 1) * postPerPage}</span></td>
            <td onClick={(e)=>onSelectItem(item,index)}><span className="more">{item.model_name? item.model_name : '-'}</span></td>
            <td className="num"><img src={headpath+item.src} alt="no-image" style={{'width':'50px','height':'50px'}}/></td>
            <td onClick={(e)=>onSelectItem(item,index)} style={{'width':'160px'}}>{item.location}</td>
            <td>월~금(09:00-18:00)</td>
          </tr>)):<div>게시물이 없습니다.</div>
          }
        {/* {ItemRows} */}
        </tbody>
      </table>
      <div className="page_control">
        <Paging2 count={count} page={currentPage} setPage={setPage}/>
    {/*   <nav>
            <div className="pagination">
              <ButtonWrap>
                <Button className="prev" onClick={(e) => onPagePrev(e)}>&lt;</Button>
                    {PageList}
                <Button className="next" onClick={(e) => onPageNext(e)}>&gt;</Button>
              </ButtonWrap>
            </div>
        </nav> */}
      </div>
    </div>
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
    &:hover{
      none;
      text-decoration:none;
      display:always;
    }
`
const Button = styled.button`
`
const ButtonWrap = styled.div`
`