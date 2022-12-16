import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from  'prop-types';
import {Portal} from 'react-portal';


function Modal({ className, onClose, maskClosable,closable,visible}){

    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }
    // 이전 방문 날짜
    const VISITED_BEFORE_DATE = localStorage.getItem('VisitCookie')
    // 현재 날짜
    const VISITED_NOW_DATE = Math.floor(new Date().getDate())

    useEffect(()=>{
        // 팝업 오늘 하루닫기 체크
        if(VISITED_BEFORE_DATE !== null){
            //날짜가 같을 경우
            if(VISITED_BEFORE_DATE === VISITED_NOW_DATE){
                localStorage.removeItem('VisitCookie')
                onClose(false);
            }
            if(VISITED_BEFORE_DATE !== VISITED_NOW_DATE){
                onClose(false)
            }
        }
       
    },[VISITED_BEFORE_DATE])

     const Dayclose = (e) => {
        if (onClose) {
            onClose(e)

            const expiry = new Date()
            // +1일 계산
            const expiryDate = expiry.getDate() + 1
            // 로컬스토리지 저장
            localStorage.setItem('VisitCookie', expiryDate)
        }
    }

    const close = (e) => {
        if (onClose) {
            onClose(e)
        }
    }

    return (
        <Portal elementId="modal-root">
            <ModalOverlay visible={visible} />
            <ModalWrapper
                className={className}
                onClick={maskClosable ? onMaskClick : null}
                tabIndex="-1"
                visible={visible}
            >
                <ModalInner tabIndex="0" className="modal-inner">
                    <ModalInner2>
                        <ImgStyle>
                           <Title>안내사항</Title> <div>저희  DID기술융합공작소를 찾아주셔서 감사합니다. 저희 DID기술융합공작소의 기존 웹사이트와 서비스제작지원 사이트가 기술적통합을 하게되어
                            안내사항을 전달하게 되었습니다. 사용자분들 중 운영중인 서비스제작 지원 사이트에 회원가입이 되어있지 않으신 사용자께서는 새로이 통합 회원가입을 통하여 사이트 이용이 가능하십니다.
                            서비스제작 사이트에 회원가입이 되어있지 않은 사용자들께서는 번거로우시겠지만 새로 통합사이트의 회원가입을 진행하여 주시길 부탁드리겠습니다.</div>
                           
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
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
}

const ModalInner2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
background-color: #ffffff;
`
const ImgStyle = styled.div`
background-color:#ffffff;
width:800px;
box-sizing:border-box;
border: solid #000000 2px;
`

const CloseStyle = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #282828;
    width: 210px;
    padding: 15px;
    border-radius: 0 0 15px 15px;
    color: #ffffff;
`

const Close = styled.span`
    cursor: pointer;
`

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`

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
`

export default React.memo(Modal)
