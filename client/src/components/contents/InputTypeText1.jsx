import React from "react";
import ButtonType1 from "./ButtonType1";

export default function InputTypeText1(props) {
  return (
    <div className="input_wrap">
      <span>{props.title}</span>
      <input
        type="text"
        name={props.name}
        id={props.name}
        placeholder={props.placeholder ? props.placeholder : props.name}
      />
    </div>
  );
}

export function InputTypeText1Check(props) {
  return (
    <div className="input_wrap input_type_text1_check">
      <span>{props.title}</span>
      <input
        type="text"
        name={props.name}
        id={props.name}
        placeholder={props.placeholder ? props.placeholder : props.name}
      />
      <ButtonType1 btnName={props.checkBtnName}></ButtonType1>
    </div>
  );
}
