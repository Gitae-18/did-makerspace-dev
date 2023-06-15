import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
import { CommonHeader, PreUri, Method } from "../../CommonCode";



function PopupDeleteModal2({
  classname,
  visible,
  onclose,
  closable,
  serviceItems,
  no,
  token,
}) {
  const history = useNavigate();
  /*  const open = (e) =>{
       onClose(true)
    }

    const close = (e) => {
        onClose(true)
    } */
  const close = (e) => {
    onclose(e);
  };
  const DropItem = useCallback(
    async (e, i) => {
      /* for(let i = 0 ; i<ServiceItemRow.length;i++){
        serviceNum = ServiceItemRow[i][2].service_no; 
        }
        console.log(serviceNum); */
      CommonHeader.authorization = token;
      const response = await fetch(PreUri + "/classedu/" + no + "/dropitem", {
        method: Method.delete,
        headers: CommonHeader,
      });
      if (!response.ok) {
        return;
      }
      alert("삭제되었습니다");
      history(0);
      /*   let item;
                for(let i = 1 ; i<serviceItems.items.length && i < serviceItems.limit;i++)
                { item = serviceItems.items[i].service_no;}
                if(item[i]===undefined )
                {
                    console.log("서비스넘버가 없습니다")
                }
                return item[i] */
    },
    [token, serviceItems]
  );
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
              <Title>DID기술융합공작소 안내사항</Title>
              <div className="modal-contents">
                <div className="delete_service">삭제하시겠습니까?</div>
              </div>
            </ImgStyle>
            {closable && (
              <CloseStyle>
                <Close className="modal-close" onClick={DropItem}>
                  삭제
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

PopupDeleteModal2.propTypes = {
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
const Imgtag = styled.img`
  width: 50px;
  height: 50px;
  left: 20px;
  top: 10px;
  position: relative;
  display: block;
`;
const CloseStyle = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #282828;
  width: 200px;
  padding: 10px 25px;
  border-radius: 0 0 10px 10px;
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

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //background-color: rgba(0, 0, 0, 0.6);
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

export default React.memo(PopupDeleteModal2);
