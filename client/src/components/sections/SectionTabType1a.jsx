import React, { useEffect } from "react";
import TitleType1 from "../contents/TitleType1";

export default function SectionTabType1a(props) {
  useEffect(() => {
    document.getElementById("tab_btn0").classList.add("on");
  });
  // 내부 탭 내용 주입
  const Tabs = (props) => {
    return (
      <ol className="tabs_wrap">
        <li className="tab_inner on">
          <TitleType1 title={props.tabNames[0]}></TitleType1>
          <div className="inner">1. 대상 : 목공 소품 제작 체험 원하는 일반인<br/>
                                 2. 일시- 2022. 08. 26(금), 14:00 ~ 17:00(3시간)<br/>
                                 3. 장소 : DID기술융합공작소 2층 PC교육장 (홈페이지 오시는 길 참조)<br/>
                                 5. 교육비 : 25,000원 - 하나은행 628-910114-71305 (예금주: ㈜아이피하트) * 입금명 : 본인이름+트레이 (ex. 홍길동트레이)<br/>
                                 6. 기타안내 - 참가비 입금 및 설문조사 작성 완료 순으로 마감<br/>
                                  - 교육신청 후 반드시 설문지 작성 (‘설문지 작성하기’ ☜ 클릭!)<br/>
                                  - 교육 취소 시 교육 상세안내 옆 '취소안내' 확인 후 전화 또는 이메일 요청<br/>
                                  - 코로나 확산 방지를 위해 반드시 마스크를 착용<br/>
                                  - 신청 인원 미달 시 교육 취소 (3명 미만)</div>
        </li>
        <li className="tab_inner">
          <TitleType1 title={props.tabNames[1]}></TitleType1>
          <div className="inner">DID기술융합공작소 2층 PC교육장 (홈페이지 오시는 길 참조)</div>
        </li>
        <li className="tab_inner">
          <TitleType1 title={props.tabNames[2]}></TitleType1>
          <div className="inner">취소는 인원 미달시 취소가 되며 <br/>교육 취소 시 교육 상세안내 옆 '취소안내' 확인 후 전화 또는 이메일 요청</div>
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
      <SetTabBtns
        tabNames={["상세 안내", "장소 안내", "취소 안내"]}
      ></SetTabBtns>
      <Tabs tabNames={["상세 안내", "장소 안내", "취소 안내"]}></Tabs>
    </section>
  );
}
