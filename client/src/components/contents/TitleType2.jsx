import React from "react";

export default function TitleType2(props) {
  return (
    <div className="title_type2_wrap">
      <h3 className="title_type2">{props.title}</h3>
      <dl className="title_info">
        <dt>๋ ์ง</dt>
        <dd>{props.date}</dd>
        <dt>์กฐํ</dt>
        <dd>{props.hit}</dd>
      </dl>
    </div>
  );
}
