import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
import PopupImageGet from "./sections/PopupImageGet";
import { CommonHeader, PreUri, Method } from "../CommonCode";
import "../css/ModalStyle.css";

function PopupModal3({
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
  const VISITED_BEFORE_DATE = localStorage.getItem("TodayCookie");
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
      localStorage.removeItem("TodayCookie");
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
      const expiryDate = expiry.getDate() + 1;
      // 로컬스토리지 저장
      localStorage.setItem("TodayCookie", expiryDate);
    }
  };
  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  const getFile = useCallback(async () => {
    CommonHeader.authorization = token;
    if (no !== undefined) {
      const res = await fetch(PreUri + "/notice/" + no + "/files", {
        method: Method.get,
        headers: {
          authorization: token,
        },
      });
      const fileList = await res.json();
      if (fileList !== null || undefined) {
        setAttachFile(fileList);
      }
    }
  }, [token]);
  useEffect(() => {
    getFile();
  }, [getFile, no]);
  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        /* onClick={maskClosable ? onMaskClick : null} */
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
                <PopupImageGet token={token} no={no} attachFile={attachFile} />
              </div>
            </ImgStyle>
            {closable && (
              <CloseStyle>
                <Close className="modal-close" onClick={Dayclose}>
                  오늘 하루 닫기
                </Close>
              </CloseStyle>
            )}
          </ModalInner2>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
}

PopupModal3.propTypes = {
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
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 15px;
  background-color: #ffffff;
  position: absolute;
  left: 100px;
  top: 60px;
`;
const ImgStyle = styled.div`
  background-color: #ffffff;
  width: 350px;
  height: 500px;
  box-sizing: border-box;
  border: solid #000000 2px;
`;
const Imgtag = styled.img`
  width: 50px;
  height: 40px;
  left: 20px;
  top: 10px;
  position: relative;
  display: block;
`;
const CloseStyle = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #282828;
  width: 120px;
  padding: 10px;
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
  z-index: 200;
  overflow: auto;
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
  width: 360px;
  max-width: 480px;
  height: 400px;
  top: 200px;
  right: 500px;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default React.memo(PopupModal3);
