import React from "react";

export default function ButtonType1(props) {
  let classNames = "btn_type1 tp_btn";

  // 회색 버튼일 경우 props로 bgc="gray" 받아와서 해당 버튼에 class btn_gray 추가
  if (props.bgc === "gray") {
    classNames += " btn_gray";
  }
  return (
    <div className={classNames}>
      <a href="#none">{props.btnName}</a>
    </div>
  );
}
