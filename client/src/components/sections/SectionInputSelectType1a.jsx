import React from "react";
import TitleType1 from "../contents/TitleType1";

export default function SectionInputSelectType1a() {
  return (
    <section className="section_input_select_type1">
      <div className="title_wrap">
        <TitleType1 title="신청분야"></TitleType1>
        <p>(복수선택 가능)</p>
      </div>
      <ul className="checkbox_wrap">
        <li>
          <input type="checkbox" name="check01" id="check01" />
          <label htmlFor="check01">제품설계</label>
        </li>
        <li>
          <input type="checkbox" name="check02" id="check02" />
          <label htmlFor="check02">제품디자인</label>
        </li>
        <li>
          <input type="checkbox" name="check03" id="check03" />
          <label htmlFor="check03">제품설계지원</label>
        </li>
        <li>
          <input type="checkbox" name="check04" id="check04" />
          <label htmlFor="check04">3d프린팅 일반</label>
        </li>
        <li>
          <input type="checkbox" name="check05" id="check05" />
          <label htmlFor="check05">3d프린팅 전문</label>
        </li>
        <li>
          <input type="checkbox" name="check06" id="check06" />
          <label htmlFor="check06">회로설계</label>
        </li>
        <li>
          <input type="checkbox" name="check07" id="check07" />
          <label htmlFor="check07">레이저컷 가공</label>
        </li>
      </ul>
    </section>
  );
}
