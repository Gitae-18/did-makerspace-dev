import React,{useCallback,useEffect,useState} from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { Link,useNavigate,useLocation} from "react-router-dom";
import {Portal} from 'react-portal';
import PropTypes from  'prop-types';
import styled from "styled-components";
import VideoModal from "./VideoModal";
import '../../css/ModalStyle.css'
export default function ButtonType2(props) {
  let classNames = "btn_type2 tp_btn";
  // 회색 버튼일 경우 props로 bgc="gray" 받아와서 해당 버튼에 class btn_gray 추가
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }

  return (
    <div className={classNames}>
      <span className="resinfo"><Link to="/eqreservation/myvation">{props.btnName}</Link></span>
    </div>
  );
}
  export  const ButtonType3=(props)=>{
    let classNames = "btn_type2 tp_btn";
    // 회색 버튼일 경우 props로 bgc="gray" 받아와서 해당 버튼에 class btn_gray 추가
    if (props.bgc === "gray") {
      classNames += " btn_gray";
    } else if (props.bgc === "white") {
      classNames += " btn_white";
    }
    return (
      <div className={classNames}>
        <span className="resinfo">{props.btnName}</span>
      </div>
    );
  }
    export const ButtonType4 = (props) => {
      const history = useNavigate();
      const location = useLocation();
      let classNames = "btn_type2 tp_btn";
      // 회색 버튼일 경우 props로 bgc="gray" 받아와서 해당 버튼에 class btn_gray 추가
      if (props.bgc === "gray") {
        classNames += " btn_gray";
      } else if (props.bgc === "white") {
        classNames += " btn_white";
      }
      return (
        <div className={classNames}>
          <span className="resinfo"><Link to="/didreservation">{props.btnName}</Link></span>
        </div>
      );
}
export  const ButtonType5=(props)=>{
  let classNames = "btn_type2 tp_btn";
  // 회색 버튼일 경우 props로 bgc="gray" 받아와서 해당 버튼에 class btn_gray 추가
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }
  return (
    <div className={classNames}>
      <span className="resinfo">{props.btnName}</span>
    </div>
  );
}
export  const GoBackBtn =(props)=>{
  const history = useNavigate();
  let classNames = "btn_type2 tp_btn";
  // 회색 버튼일 경우 props로 bgc="gray" 받아와서 해당 버튼에 class btn_gray 추가
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }
  return (
    <div className={classNames} >
      <span className="resinfo">{props.btnName}</span>
    </div>
  );
}


export function ButtonType2small(props) {
  const [modal,setModal] = useState(false);
  const [videoLoading,setVideoLoading] = useState(true);
  const [bg,setBg] = useState(true);
  const [modelList,setModelList] = useState([]);
  const [videoLink, setVideoLink] = useState("https://www.youtube.com/embed/1fqwqZlxJ-c");
  const onMaskClick=(e)=>{
    if(e.target === e.currentTarget){
      props.onClose(e)
    }
  }
  const closeModal = ()=>{
     setModal(false);
  }
  const spinner = () =>{
      setVideoLoading(!videoLoading);
  };
  const close = (e) =>{
    if(props.onClose){
      props.onClose(e)
    }
  }
  const openModal = () =>{
    setModal(true);
};
console.log(modal)
  let classNames = " btn_white";
  return (
    <button type="button" className="btn_type2 tp_btn btn_type2_small"  onClick={openModal}>
      {modal ? (
        <div className="modal__bg" onClick={closeModal}>
          <div className="modal__align">
            <div className="modal__content" modal={modal} >
              <IoCloseOutline
                className="modal__close"
                arial-label="Close modal"
              />
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
                  width="800"
                  height="500"
                  src={props.modelName}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      ) : null}
     {props.btnName}
    </button>
  );
}
export function ButtonType3small(props) {
  const [active,setActive] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  let classNames = "btn_type3 tp_btn btn_type2_small";
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }
  const ClickTest= useCallback(() =>{
    const categoryNo = props.categoryNo
    if(props.active ==="active"){
      history('/eqreservation/equip/selectreserv?categoryNo=' + categoryNo,{state:{category:props.categoryNo}})
    }
  },[])
  return (
    <div className={classNames} onClick={ClickTest}>
     {props.btnName}
    </div>
  );
}

export function ButtonType4small(props) {
  const [active,setActive] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  let classNames = "btn_type2 tp_btn btn_type2_small";
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }
  const ClickTest= useCallback(() =>{
    if(props.active ==="active"){
      history('/eqreservation/equip/selectreserv')
    }
  },[history,location.pathname])
  return (
    <div className={classNames} onClick={ClickTest}>
     {props.btnName}
    </div>
  );
}
export function ButtonType2test(props) {
  const location = useLocation();
  const now = location.pathname;
  const history = useNavigate();
  const [active,setActive] = useState(false);
  const names = props.name;
  let classNames = "btn_type2 tp_btn";
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }
 /*  if(props.name === 'FDM : 3DWOX 1X' || props.name === 'A0플로터 : HP 디자인젯 Z6' || props.name === 'UV 프린터 : 329UV' || props.name === 'X-cut'){
    setActive(true);
  }
  else{
    setActive(false);
  } */
  const namescommit = useCallback(()=>{
    if(names  === 'FDM : 3DWOX 1X' || 'A0플로터 : HP 디자인젯 Z6' || 'UV 프린터 : 329UV' || 'X-cut'){
      setActive(true);
    }
    else{
      setActive(false);
    }
  },[names])
  const ClickTest= useCallback(() =>{
    if(props.active ==="active"){
      history(now+"/test",{state:{name:props.name}})
    }
  },[history,location.pathname])

  return (
    <button className={classNames} onClick={ClickTest} >
      {props.btnName}
    </button>
  );
}
ButtonType2small.propTypes = {
  visible: PropTypes.bool,
}
ButtonType2small.defaultProps={
  closable:true,
  maskClosable:true,
  visible:false,
}
const ModalWrapper = styled.div`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    display: flex;
    justify-content: center;
    align-items: center;

`
const ModalOverlay = styled.section`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    animation-timing-function: ease-out;
    animation-duration: 0.3s;
    animation-name: modal-video;
    -webkit-transition: opacity 0.3s ease-out;
    -moz-transition: opacity 0.3s ease-out;
    -ms-transition: opacity 0.3s ease-out;
    -o-transition: opacity 0.3s ease-out;
    transition: opacity 0.3s ease-out;
    z-index: 100;
`
const ModalInner = styled.div`
width: 800px;
height: 800px;
box-shadow: 0px 100px 80px rgba(184, 184, 184, 0.07),
  0px 25.8162px 19px 4px rgba(178, 178, 178, 0.0456112),
  0px 7.779px 7.30492px rgba(0, 0, 0, 0.035),
  0px 1.48838px 2.0843px rgba(0, 0, 0, 0.0243888);
border-radius: 10px;
background: transparent;
color: #000;
margin: 0rem 4rem;
z-index:1000;
`