import React from "react";

export default function InputTypeTel() {
  return (
    <div className="input_wrap">
      <span>핸드폰번호</span>
      <input
        type="tel"
        name="tel"
        id="tel"
        placeholder="‘-’ 부호없이 숫자만 입력해주세요"
      />
    </div>
  );
}
