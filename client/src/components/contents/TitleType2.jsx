import React from "react";

export default function TitleType2(props) {
  return (
    <div className="title_type2_wrap">
      <h3 className="title_type2" style={{"color":"#fff"}}>{props.title}</h3>
      <dl className="title_info">
        <dt>날짜</dt>
        <dd>{props.date}</dd>
        <dt>검색</dt>
        <dd>{props.hit}</dd>
      </dl>
    </div>
  );
}
