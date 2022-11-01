import React from "react";

export default function CheckboxType1(props) {
  return (
    <div className="checkbox_type1">
      <input
        type="checkbox"
        name={"checkbox" + props.num}
        id={"checkbox" + props.num}
      />
      <label htmlFor={"checkbox" + props.num}>
        [필수] 위 약관에 동의합니다.
      </label>
    </div>
  );
}
