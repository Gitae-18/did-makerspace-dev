import React, {useEffect,useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import PropTypes from  'prop-types';
import {Portal} from 'react-portal';
import '../css/ModalStyle.css';
import { setCookie,getCookie } from './cookie';

function PopupSaveModal({classname,visible,onclose,closable,url}){
    const history = useNavigate();
    console.log(url);
   /*  const open = (e) =>{
       onClose(true)
    }

    const close = (e) => {
        onClose(true)
    } */
    const close = (e) => {
            onclose(e)
    }
    const backToList = (e) =>{
        if(url.includes("info")){
            history('/did/info/faq',{replace:true})
        }
        else if(url.includes("notice")){
            history('/notice',{replace:true})
        }
       
    }

    return (
        <Portal elementId="modal-root">
            <ModalOverlay visible={visible}/>
            <ModalWrapper
                className={classname}
                tabIndex="-1"
                visible={visible}
            >
                <ModalInner tabIndex="0" className="modal-inner">
                    <ModalInner2>
                        <ImgStyle>
                        <Imgtag src="/images/logo.png" alt="no=images" className="modal-image"/><Title>DID기술융합공작소 안내사항</Title> 
                        <div className="modal-contents">
                           <div>저장되었습니다.<br/>
                                목록으로 돌아가주시기 바랍니다.
                           </div>
                        </div>
                        </ImgStyle>
                        {closable && (
                            <CloseStyle>
                                <Close className="modal-close" onClick={backToList}>
                                    목록
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

PopupSaveModal.propTypes = {
    visible: PropTypes.bool,
}


const SubTitle = styled.h2`
width:200px;
height:20px;
position:relative;
`
const ModalInner2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
font-weight:500;
font-size :1.3em;
background-color: #ffffff;
position:absolute;
left:60px;
top:60px;
`
const ImgStyle = styled.div`
background-color:#ffffff;
width:800px;
height:300px;
box-sizing:border-box;
border: solid #000000 2px;
`
const Imgtag = styled.img`
 width:50px;
 height:50px;
 left:20px;
 top:10px;
 position:relative;
 display:block;
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

export default React.memo(PopupSaveModal)
