import React, { useEffect } from "react";
import TitleType1 from "../contents/TitleType1";
import { useSelector } from "react-redux";
export default function SectionTabType1a({ props, content }) {

  useEffect(() => {
    document.getElementById("tab_btn0").classList.add("on");
  });
  // 내부 탭 내용 주입
  const Tabs = (props) => {
    return (
      <ol className="tabs_wrap">
        <li className="tab_inner on">
          <TitleType1 title={props.tabNames[0]}></TitleType1>
          <div className="inner" style={{ whiteSpace: "pre-wrap" }}>
            {content}
          </div>
        </li>
        <li className="tab_inner">
          <TitleType1 title={props.tabNames[2]}></TitleType1>
          <div className="inner">
            취소는 인원 미달시 취소가 되며 <br />
            교육 취소 시 교육 상세안내 옆 '취소안내' 확인 후 전화 또는 이메일
            요청
          </div>
        </li>
      </ol>
    );
  };
  // 탭 버튼 세팅
  const SetTabBtns = (props) => {
    const myTabs = props.tabNames;
    const tabHandle = (e) => {
      const tabLi = document.getElementsByClassName("tab_btn");
      const tabInner = document.getElementsByClassName("tab_inner");
      for (let i = 0; i < tabLi.length; i++) {
        const element = tabLi[i];
        const elementInner = tabInner[i];
        elementInner.classList.remove("on");
        element.classList.remove("on");
      }
      tabInner[e.target.id.split("btn")[1]].classList.add("on");
      e.target.classList.add("on");
    };
    const myTabBtns = myTabs.map((x) => (
      <li
        id={"tab_btn" + myTabs.indexOf(x)}
        className="tab_btn"
        key={myTabs.indexOf(x)}
        onClick={tabHandle}
      >
        {x}
      </li>
    ));
    return (
      <div className="tab">
        <ol className="tab_btns_wrap">{myTabBtns}</ol>
      </div>
    );
  };

  return (
    <section className="section_tab_type1a">
      <SetTabBtns tabNames={["상세 안내", "취소 안내"]}></SetTabBtns>
      <Tabs tabNames={["상세 안내", "취소 안내"]}></Tabs>
    </section>
  );
}
