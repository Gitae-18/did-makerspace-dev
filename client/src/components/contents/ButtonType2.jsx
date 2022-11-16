import React,{useCallback,useEffect,useState} from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { Link,useNavigate,useLocation} from "react-router-dom";

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
      <span className="resinfo"><Link to="/reservation/myvation">{props.btnName}</Link></span>
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
        <span className="resinfo"><Link to="/didreservation">{props.btnName}</Link></span>
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
export function ButtonType2small(props) {
  const [modal,setModal] = useState(false);
  const [videoLoading,setVideoLoading] = useState(true);
  const [modelList,setModelList] = useState([]);
  const [videoLink, setVideoLink] = useState("https://www.youtube.com/embed/1fqwqZlxJ-c");
  const openModal = () =>{
      setModal(!modal);
  };

  const spinner = () =>{
      setVideoLoading(!videoLoading);
  };
  let classNames = "btn_type2 tp_btn btn_type2_small";
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }

/*   if(props.modelName.includes("A0플로터 : HP 디자인젯 Z6"||"A0플로터 : 디자인젯 Z5600ps-44in")){
    setVideoLink("https://www.youtube.com/embed/qBw5-KbJ9Vs")
   }
   else if(props.modelName.includes("X-cut")){
    setVideoLink("https://www.youtube.com/embed/zpf5MHCSkI8")
   }
   else if(props.modelName.includes("UV 프린터 : 329UV")){
    setVideoLink("https://www.youtube.com/embed/QtZxg1LiilM")
   }
   else if(props.modelName.includes("FDM : 3DWOX")){
    setVideoLink("https://www.youtube.com/embed/c-pkmy2TEiw")
   }
   else{
    setVideoLink("https://www.youtube.com/embed/1fqwqZlxJ-c")
   } */

  return (
    <button type="button" className={classNames} onClick={openModal}>
       {modal ? (
        <section className="modal__bg">
          <div className="modal__align">
            <div className="modal__content" modal={modal}>
              <IoCloseOutline
                className="modal__close"
                arial-label="Close modal"
                onClick={setModal}
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
        </section>
      ) : null}
     {props.btnName}
    </button>
  );
}
export function ButtonType3small(props) {
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
      history('/reservation/selectreserv')
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
      history(now+"/test")
    }
  },[history,location.pathname])


  return (
    <div className={classNames} onClick={ClickTest}>
      {props.test ? "시험 결과보기" : "시험보기"}
    </div>
  );
}
