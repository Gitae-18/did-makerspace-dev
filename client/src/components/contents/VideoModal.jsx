import React,{useState,useEffect} from "react";
import { ButtonType2small } from "./ButtonType2";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import {Portal} from 'react-portal';
import PropTypes from  'prop-types';
import styled from "styled-components";
import '../../css/ModalStyle.css'

function VideoModal({onClose,className,maskClosable,visible,closable,modelName,src}){
  const [videoLoading,setVideoLoading] = useState(true);
  const printerlink = "https://www.youtube.com/embed/QtZxg1LiilM";
  const floterlink = "https://www.youtube.com/embed/qBw5-KbJ9Vs";
  const fdmlink = "https://www.youtube.com/embed/c-pkmy2TEiw";
  const xcutlink = "https://www.youtube.com/embed/zpf5MHCSkI8";
  const elselink = "https://www.youtube.com/embed/1fqwqZlxJ-c";
  const onMaskClick=(e)=>{
    if(e.target === e.currentTarget){
      onClose(e)
    }
  }
  const close = (e) =>{
    if(onClose){
      onClose(e)
    }
  }
  const spinner = () =>{
    setVideoLoading(!videoLoading);
  };
/*   useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
  return () => {
    const scrollY = document.body.style.top
    document.body.style.cssText = `position: ""; top: "";`
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}, []) */

  return(
    <Portal elementId="modal-root">
    <ModalOverlay visible={visible}/>
    <ModalWrapper className={className} tabIndex="-1" visible={visible} /* onClick={maskClosable ? onMaskClick : null} */>
      <ModalInner tabIndex="0" className="modal-inner">
        {closable&&
          <IoCloseOutline className="modal__close" arial-label="Close modal" onClick={close}/>}
                <div className="modal__video-align">
                  {videoLoading ? (
                    <div className="modal__spinner">
                      <BiLoaderAlt
                        className="modal__spinner-style"
                        fadeIn="none"
                      />
                    </div>
                  ) : null}
                   <iframe
                    className="modal__video-style"
                    onLoad={spinner}
                    loading="lazy"
                    width="1000"
                    height="700"
                    src={src}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  </div>
          </ModalInner>
          </ModalWrapper>
        </Portal>
  )
}
VideoModal.propTypes = {
  visible: PropTypes.bool,
}
VideoModal.defaultProps={
  closable:true,
  maskClosable:true,
  visible:false,
}


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
    justify-content: center;
    align-items: center;
`
const ModalOverlay = styled.section`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
`


const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    //background-color: #fff;
    //border-radius: 10px;
    width: 800px;
    max-width: 800px;
    height:0px;
    top: 20%;
    transform: translateY(-50%);
    margin: 0 auto;
`
export default React.memo(VideoModal);