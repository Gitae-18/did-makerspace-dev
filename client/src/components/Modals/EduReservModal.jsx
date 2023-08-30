import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
import { useSelector } from "react-redux";
import Paging2 from "../contents/Paging2";
import "../../css/ModalStyle.css";
import { CommonHeader, PreUri, Method } from "../../CommonCode";


function EduReservModal({ classname, visible, onclose, closable, no }) {
  const history = useNavigate();
  const {authority_level,token} = useSelector(state => state.user)
  const [reservList,setReservList] = useState([]);
  const [count,setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = reservList.slice(indexOfFirstPost, indexOfLastPost)
  /*  const open = (e) =>{
       onClose(true)
    }

    const close = (e) => {
        onClose(true)
    } */

 const  getReservList = useCallback(async() =>{
    CommonHeader.authorization = token;
    const response = await fetch(PreUri + '/classedu/reservlist?program_no='+ no ,{
        method:Method.get,
        headers:CommonHeader
      })
      const json = await response.json();
      if(!response.ok) {
        console.log('잘못된 접근입니다.');
        return;
      }
      setReservList(json);
      setCount(json.length);
 },[])
 console.log(reservList)
 useEffect(()=>{
    getReservList();
 },[getReservList])
 const setPage = (e) =>{
    setCurrentPage(e);
  }
  const close = (e) => {
    onclose(e);
  };

  console.log(reservList);
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
              <Title>{/* {reservList.at(0).title}  */}예약자목록</Title>
              <StyledDiv className="table_wrap">
                <table style={{tableLayout:'fixed'}}>
                    <thead>
                    <tr>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>신청일</th>
                    <th>삭제여부</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservList && currentPost.map((item,index)=>(
                        <StyledTr key={index}>
                            <StyledTd>{item.name}</StyledTd>
                            <StyledTd>{item.phone}</StyledTd>
                            <StyledTd>{item.email}</StyledTd>
                            <StyledTd>{item.created_at.slice(0,10)}</StyledTd>
                            <StyledTd>{item.deleted_at?"취소함":""}</StyledTd>
                        </StyledTr>
                    ))
                    }
                    </tbody>
                </table>
                <div className="page_control">
                <Paging2 count={count} page={currentPage} setPage={setPage}/>
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

EduReservModal.propTypes = {
  visible: PropTypes.bool,
};

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
  display:inline-block;
  position:relative;
  left:50px;
  justify-content: space-between;
  background-color: #282828;
  width: 200px;
  padding: 15px;
  border-radius: 0 0 15px 15px;
  color: #ffffff;
`;

const Close = styled.button`
  cursor: pointer;
  background:#282828;
  color:#ffffff;
  font-size:18px;
  width:180px;
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

export default React.memo(EduReservModal);
