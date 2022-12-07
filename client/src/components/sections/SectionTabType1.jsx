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
            <li>장비 및 시설예약 New !
              <ol>
                <img src="/images/reservation.jpg" className="image1" alt="no-images"/>
              </ol>
              <ol>
                <span>장비명 : &nbsp;X-cut </span>
              </ol>
            </li>
            <li>장비 및 시설예약 New !
              <ol>
                <img src="/images/reservation.jpg" className="image1" alt="no-images"/>
              </ol>
              <ol>
                <span>장비명 : &nbsp; A0 플로터</span>
              </ol>
            </li>
            <li>장비 및 시설예약 New !
              <ol>
                <img src="/images/reservation.jpg" className="image1" alt="no-images"/>
              </ol>
              <ol>
                <span>장비명 : &nbsp; FDM &nbsp;: &nbsp;3D-WOX</span>
              </ol>
            </li>
          </ol>
        </li>
        <li className="tab_inner">
          {/* <h4>{props.tabNames[1]}</h4> */}
          <ol>
            <li>시제품 제작 New !
              <ol>
                <img src="/images/service.jpg" className="image1" alt="no-images"/>
              </ol>
              <ol>
                <span>제목 : &nbsp;무선 진동센서 하우징 개발 </span>
              </ol>
            </li>
            <li>시제품 제작 New !
              <ol>
                <img src="/images/service.jpg" className="image1" alt="no-images"/>
              </ol>
              <ol>
                <span>제목  : &nbsp; 3D 프린팅 셈플 제작 문의 </span>
              </ol>
            </li>
            <li>시제품 제작 New !
              <ol>
                <img src="/images/service.jpg" className="image1" alt="no-images"/>
              </ol>
              <ol>
                <span>제목  : &nbsp; 기계장치 고정 부품</span>
              </ol>
            </li>
          </ol>
        </li>
        <li className="tab_inner">
          {/* <h4>{props.tabNames[2]}</h4> */}
          <ol>
            <li></li>
            <li></li>
            <li></li>
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
