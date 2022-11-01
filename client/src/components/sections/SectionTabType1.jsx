import React, { useEffect } from "react";
import TitleType1 from "../contents/TitleType1";

export default function SectionTabType1(props) {
  useEffect(() => {
    document.getElementById("tab_btn0").classList.add("on");
  });
  // 내부 탭 내용 주입
  const Tabs = (props) => {
    return (
      <ol className="tabs_wrap">
        <li className="tab_inner on">
          {/* <h4>{props.tabNames[0]}</h4> */}
          <ol>
            <li>1. 장비 관련</li>
            <li>2. 장비 관련</li>
            <li>3. 장비 관련</li>
          </ol>
        </li>
        <li className="tab_inner">
          {/* <h4>{props.tabNames[1]}</h4> */}
          <ol>
            <li>02-1</li>
            <li>02-2</li>
            <li>02-3</li>
          </ol>
        </li>
        <li className="tab_inner">
          {/* <h4>{props.tabNames[2]}</h4> */}
          <ol>
            <li>03-1</li>
            <li>03-2</li>
            <li>03-3</li>
          </ol>
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
      <div>
        <ol className="tab_btns_wrap">{myTabBtns}</ol>
      </div>
    );
  };

  return (
    <section className="section_tab_type1">
      <div className="section_inner_wrap">
        <TitleType1 title={props.title}></TitleType1>
        <SetTabBtns
          tabNames={["장비 및 시설예약", "시제품 제작", "멘토링"]}
        ></SetTabBtns>
        <Tabs tabNames={["장비 및 시설예약", "시제품 제작", "멘토링"]}></Tabs>
      </div>
    </section>
  );
}
