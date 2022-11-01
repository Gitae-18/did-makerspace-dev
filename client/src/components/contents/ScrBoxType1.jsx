import React from "react";

export default function ScrBoxType1(props) {
  return (
    <div className="scr_box_type1 border_box_type1">
      <h3>{props.innerTitle}</h3>
      <div>
        {props.innerText1}
        <br />
        <br />
        {props.innerText2}
      </div>
    </div>
  );
}
