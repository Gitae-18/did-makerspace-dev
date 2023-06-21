import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Portal } from "react-portal";



function PopupModalAbout({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  token,
  no,
}) {
  const [data, setData] = useState([]);
  const [attachFile, setAttachFile] = useState({});
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  const VISITED_BEFORE_DATE = localStorage.getItem("AboutCookie");
  // 현재 날짜
  const VISITED_NOW_DATE = Math.floor(new Date().getDate());
  /*  const open = (e) =>{
       onClose(true)
    }

    const close = (e) => {
        onClose(true)
    } */
  // 팝업 오늘 하루닫기 체크
  if (VISITED_BEFORE_DATE !== null) {
    //날짜가 같을 경우
    if (VISITED_BEFORE_DATE === VISITED_NOW_DATE) {
      localStorage.removeItem("AboutCookie");
      onClose(false);
    }
    if (VISITED_BEFORE_DATE !== VISITED_NOW_DATE) {
      onClose(true);
    }
  }
  /*  const close = (e) => {
        console.log("on")
            onclose(e)
    } */
  const Dayclose = (e) => {
    if (onClose) {
      onClose(e);

      const expiry = new Date();
      // +1일 계산
      const expiryDate = expiry.setHours(23,59,59,0);
      // 로컬스토리지 저장
      localStorage.setItem("AboutCookie", expiryDate);
    }
  };
  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };


  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
//        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <ModalInner2>
            <ImgStyle>
              <Imgtag
                src="/images/logo.png"
                alt="no=images"
                className="modal-image"
              />
              <Title>DID기술융합공작소 공지사항</Title>
              <div className="modal-contents">
               <InnerImg src="/images/active_time.jpg"/>
              </div>
            </ImgStyle>
            {closable && (
              <CloseStyle>
                <Close className="modal-close" onClick={Dayclose}>
                  오늘 하루 닫기
                </Close>
                <Close className="modal-close" onClick={close}>
                   닫기
                </Close>
              </CloseStyle>
            )}
          </ModalInner2>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
}

PopupModalAbout.propTypes = {
  visible: PropTypes.bool,
};


const ModalInner2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 15px;
  background-color:none;
  position: relative;
  left:200px; 
  width:auto;
`;
const ImgStyle = styled.div`
  margin:0 auto;
  background-color: #ffffff;
  width: 550px;
  height: 450px;
  box-sizing: border-box;
  border: solid #000000 2px;
`;
const Imgtag = styled.img`
  width: 50px;
  height: 40px;
  left: 20px;
  top: 25px;
  position: relative;
  display: block;
`;
const InnerImg = styled.img`
  width: auto;
  height: 200px;
  top: 10px;
  position: relative;
  right:200px;
  width:400px;
  margin:0 auto;
`;
const CloseStyle = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #282828;
  width: 210px;
  padding: 15px;
  border-radius: 0 0 15px 15px;
  color: #ffffff;
  z-index:200;
`;

const Close = styled.span`
  cursor:pointer;
  margin:0 auto;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  width:30%;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 40%;
  z-index: 200;
  //overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  z-index: 1;
  right: 200px;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  width: auto;
  max-width:700px;
  top: 200px;
  transform: translateY(-60%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default React.memo(PopupModalAbout);