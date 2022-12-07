import React from "react";
import { useNavigate } from "react-router-dom";
export default function ButtonType1(props) {
  let classNames = "btn_type1 tp_btn";
  const history = useNavigate();
  const btnClick = () =>{
    history(-1)
  }
  // 회색 버튼일 경우 props로 bgc="gray" 받아와서 해당 버튼에 class btn_gray 추가
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  }
  return (
    <div className={classNames} onClick={btnClick}>
     <span>{props.btnName}</span>
    </div>
  );
}
