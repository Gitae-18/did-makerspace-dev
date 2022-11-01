import React from "react";
import { Link } from "react-router-dom";

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
export function ButtonType2small(props) {
  let classNames = "btn_type2 tp_btn btn_type2_small";
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }
  return (
    <div className={classNames}>
     <span>{props.btnName}</span>
    </div>
  );
}
export function ButtonType2test(props) {
  let classNames = "btn_type2 tp_btn";
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  } else if (props.bgc === "white") {
    classNames += " btn_white";
  }
  return (
    <div className={classNames}>
      {props.test ? "시험 결과보기" : "시험보기"}
    </div>
  );
}
