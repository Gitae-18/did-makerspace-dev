import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate,useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
import { useSelector } from "react-redux";
import { Paging } from "../contents/Paging";
import "../../css/ModalStyle.css";
import { CommonHeader, PreUri, Method ,getRspMsg} from "../../CommonCode";


function MentorAddModal({ classname, visible, onclose }) {
  const history = useNavigate();
  const {authority_level,token} = useSelector(state => state.user)
  const [reservList,setReservList] = useState([]);
  const [userList,setUserList] = useState([]);
  const [mentorAdd,setMentorAdd] = useState(false);
  const [count,setCount] = useState(0);
  const [search,setSearch] = useState('');
  const [searchItem,setSearchItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [memo, setMemo] = useState("");
  const postPerPage = 5;
  const location = useLocation();
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = searchItem.slice(indexOfFirstPost, indexOfLastPost)
/*   const [input,setInput] = useState({
   name:"",
   career:"",
   part:"",
   profile:"",
  }); */

/*   const {name,career,part,profile} = input;
  const onChangeInput = (e) =>{
    const {name,value} = e.target;
    setInput({
      ...input,
      [name]:value,
    })

  } */
/*  const  onChagneMemo = (e) =>{
    setMemo(e.target.value)
 } */
 const setPage = (e) =>{
    setCurrentPage(e);
  }
 const getUserList = useCallback(async()=>{
    const response = await fetch(PreUri + '/mentoring/user_list',{
        method:Method.get,
        headers:CommonHeader,
      })
      const json = await response.json();
      if(!response.ok) {
        console.log('잘못된 접근입니다.');
        return;
      }
      setCount(json.length);
      setUserList(json);
      setSearchItem(json);
 },[token])


       //검색
       const activeEnter = (e) => {
          if(e.key === "Enter") {
            onSearch(e);
          }
        }
        const onChange = (e) =>{
          e.preventDefault();
          setSearch(e.target.value);
        }
        const onSearch = useCallback(async(e) =>{
          e.preventDefault();
      
          if(search=== null || search === ''){
              let requri = PreUri + '/mentoring/mentorlist';
            const response = await fetch(requri, {
              method:Method.get,
              headers:CommonHeader
            });
            const json = await response.json(); 
            setUserList(json);
            setSearchItem(json);
        }
       /*  else if(selectCategory==="title"){
          const filterData = mentor.filter((item) => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          setSearchItem(filterData)
        
          setCurrentPage(1)
        } */
          const filterData = userList.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          setSearchItem(filterData)
          setCurrentPage(1)
        if(search.length===0)
        {
          setSearch('');
        }
      },[search])
useEffect(()=>{
    getUserList();
},[getUserList])
  const close = (e) => {
    onclose(e);
  };
  
  const AddMentor = useCallback((item,index) =>{
    window.open(location.pathname+'?user_no='+ item.user_no, 'addmentor', 'width=1200,height=900,location=no,status=no,scrollbars=yes');
  },[userList])

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper className={classname} tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner">
          <ModalInner2>
            <ImgStyle>
              <Imgtag
                src="/images/logo.png"
                alt="no=images"
                className="modal-image"
              />
              <Title>{/* {reservList.at(0).title}  */}전문멘토 추가</Title>
              <div style={{position:"relative",left:'50%',top:'100px'}}>
              <div className="table_extra">
              <div className="table_search">
                <select name="" id="">
                <option value="1">이름</option>
                </select>
              <input type="text" name="" id="" placeholder="제목을 입력하세요" onKeyDown={(e) => activeEnter(e)} onChange={onChange}/>
                  <StyledBtn onClick={(e)=>onSearch(e)}>검색</StyledBtn>
              </div></div></div>
              <StyledDiv className="table_wrap">
              <table style={{tableLayout:'fixed'}}>
                    <thead>
                    <tr>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>직무</th>
                    <th>가입일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {searchItem.length>0 && currentPost.map((item,index)=>(
                        <StyledTr key={index}>
                            <StyledTd onClick={(e)=>AddMentor(item,index)}>{item.name}</StyledTd>
                            <StyledTd>{item.phone_number}</StyledTd>
                            <StyledTd>{item.email}</StyledTd>
                            <StyledTd>{item.company_position}</StyledTd>
                            <StyledTd>{item.created_at.slice(0,10)}</StyledTd>
                        </StyledTr>
                    ))
                    }
                    </tbody>
                </table>
                <div className="page_control">
                <Paging count={count} page={currentPage} setPage={setPage}/>
                </div>
              </StyledDiv>
              </ImgStyle>
          </ModalInner2>
              <CloseStyle>
                <Close onClick={close}>
                  닫기
                </Close>
              </CloseStyle>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
}

MentorAddModal.propTypes = {
  visible: PropTypes.bool,
};

const StyledBtn= styled.button`
color:#fff;
background-color:#313f4f;
width:120px;
height:30px;
font-size:0.7rem;
cursor:pointer;
border:1px solide #313f4f;
position:relative;
 &:hover{
    background-color:#transparent
    color:#313f4f
 }
 `
const SubTitle = styled.h2`
  width: 200px;
  height: 20px;
  position: relative;
`;
const ModalInner2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledDiv = styled.div`
  margin: 0 auto;
  position:relative;
  top:100px;
`
const Title = styled.h1`
  font-weight: 500;
  font-size: 1.3em;
  background-color: #ffffff;
  position: absolute;
  left: 120px;
  top: 100px;
`;
const StyledTd = styled.td`
 text-align:center;
 line-height:20px;
 border:1px solid #d2d2d2;
`
const StyledTr = styled.tr`
position:relative;
`
const ImgStyle = styled.div`
  background-color: #ffffff;
  width: 1000px;
  height: 700px;
  box-sizing: border-box;
  border: solid #000000 2px;

`;
const Imgtag = styled.img`
  width: 60px;
  height: 50px;
  left: 70px;
  top: 40px;
  position: relative;
  display: block;
`;
const CloseStyle = styled.div`
  display:flex;
  position:relative;
  justify-content: space-between;
  background-color: #282828;
  width: 200px;
  padding: 15px;
  border-radius: 0 0 15px 15px;
  color: #ffffff;
  left:50px;
`;

const Close = styled.button`
  cursor: pointer;
  background:#282828;
  text-align:center;
  color:#ffffff;
  font-size:18px;
  width:180px
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  right: 0;
  left: 0;
  top:0;
  bottom:0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  // box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  // background-color: #fff;
  // border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top:20%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default React.memo(MentorAddModal);
