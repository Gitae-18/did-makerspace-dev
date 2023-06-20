import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
import "../css/ModalStyle.css";
import { setCookie, getCookie } from "./cookie";
import { useCallback } from "react";

function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  isLoggedIn,
  setModalVisible,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  // 이전 방문 날짜
  const VISITED_BEFORE_DATE =localStorage.getItem("VisitCookie");
  // 현재 날짜
  const VISITED_NOW_DATE = Math.floor(new Date().getDate());

  // 팝업 오늘 하루닫기 체크
  if (VISITED_BEFORE_DATE !== null) {
    
    if (VISITED_BEFORE_DATE === VISITED_NOW_DATE) {
      localStorage.removeItem("VisitCookie");
      onClose(false);
    }
    if (VISITED_BEFORE_DATE !== VISITED_NOW_DATE) {
      onClose(true);
    }
  }

/*   useEffect(()=>{
      Dayclose();
  },[VISITED_BEFORE_DATE]) */

  const Dayclose = (e) => {
    if (onClose) {
      onClose(e);

      const expiry = new Date();
      // +1일 계산
      const expiryDate = expiry.setHours(23,59,59,0);
      // 로컬스토리지 저장
      localStorage.setItem("VisitCookie", expiryDate);
    }
  };

  const close = useCallback(
    async (e) => {
      if(onClose){
      onClose(e);
     /*  const expiry = new Date();
      // +1일 계산
      const expiryDate = expiry.getHours() + 1;
      localStorage.setItem("VisitCookie", expiryDate); */
      }
      /* if (onClose) {
        onClose(false);
      }
      if (isLoggedIn) {
        onClose(true);
      } */
    },
    [onClose]
  );
  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner">
          <ModalInner2>
            <ImgStyle>
              <Imgtag
                src="/images/logo.png"
                alt="no=images"
                className="modal-image"
              />
              <Title>DID기술융합공작소 안내사항</Title>
              <div className="modal-text" style={{'whiteSpace':'pre-line'}}>
                <div>
                  저희 DID기술융합공작소를 찾아주셔서 감사합니다. 
                  저희 DID기술융합공작소의 기존 웹사이트와 서비스제작지원 사이트가
                  기술적통합을 하게되어 안내사항을 전달하게 되었습니다.
                  사용자분들 중 운영중인 서비스제작 지원 사이트에 회원가입이
                  되어있지 않으신 사용자께서는 새로 통합 회원가입을 통하여
                  사이트 이용이 가능하십니다. 서비스제작 사이트에 회원가입이
                  되어있지 않은 사용자들께서는 번거로우시겠지만 새로
                  통합사이트의 회원가입을 진행하여 주시길 부탁드리겠습니다.
                </div>
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

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalInner2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 1.3em;
  background-color: #ffffff;
  position: absolute;
  left: 60px;
  top: 60px;
`;
const ImgStyle = styled.div`
  background-color: #ffffff;
  width: 800px;
  height: 300px;
  box-sizing: border-box;
  border: solid #000000 2px;
`;

const CloseStyle = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #282828;
  width: 210px;
  padding: 15px;
  border-radius: 0 0 15px 15px;
  color: #ffffff;
`;

const Close = styled.span`
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;
const Imgtag = styled.img`
  width: 50px;
  height: 50px;
  left: 20px;
  top: 10px;
  position: relative;
  display: block;
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
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default React.memo(Modal);
