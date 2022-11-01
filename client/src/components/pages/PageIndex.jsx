import React from "react";
import SectionBannerType1 from "../sections/SectionBannerType1";
import SectionTabType1 from "../sections/SectionTabType1";
import SectionTextType1 from "../sections/SectionTextType1";

export default function PageIndex() {
  const MainBanner = () => {
    return (
      <div className="main_banner">
        <div className="wrap2">
          <div className="text_part">
            <h2>
              <span>DID</span> 소개 관련 배너
            </h2>
            <p>
              임시텍스트 입니다. 새 것은 같이 싹이 눈에 있는가? 이는 장식하는
              그들은 곳이 바이며, 그들에게 방황하여도, 가장 봄바람이다. 이
              충분히 가는 무엇을 찾아다녀도, 우리 피는 눈이 이것이다. 이것은
              역사를 그들의 석가는 보이는 사막이다 ...
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="pageIndex">
      <MainBanner></MainBanner>
      <SectionTextType1
        title="DID 주요 서비스"
        subTitle="서비스 바로가기"
        desc="얼마나 할지니, 우리 천고에 청춘의 싸인 하는 사랑의 것이다. 살 같이, 일월과 있으며, 천하를 그들의 끝까지 사막이다. 생의 우리의 꾸며 인간이 모래뿐일 그들은 얼음에 힘차게 이는 칼이다. 얼음에 오직 힘차게 이는 아니한 듣는다. 그러므로 없는 이것이야말로 시들어 대중을 것이다. 충분히 만천하의 따뜻한 고행을 철환하였는가? 끝에 안고, 가치를 풀이 사막이다 ..."
      ></SectionTextType1>
      <SectionTabType1 title="New 업데이트"></SectionTabType1>
      <SectionBannerType1 title="DID 협력기관"></SectionBannerType1>
    </div>
  );
}
