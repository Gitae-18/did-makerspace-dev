import React from "react";
export default function ListType1c() {
  return (
    <div className="list_type1 list_type1c">
      <ol>
        <li>
          <div className="image_part"><img src="/images/labtour_pic.png" alt="no-image"/></div>
          <div className="text_part">
            <dl>
              <dt className="blind">랩 투어 설명</dt>
              <dd>
                <ul>
                  <li>전문랩투어 일정</li>
                  <li>전문랩 소개(10분)</li>
                  <li>전문랩 시설 및 장비 견학(30분)</li>
                  <li>질의응답(20분)</li>
                  <li>투어 시간은 약 1시간 가량 진행 됩니다.</li>
                  <li>문의 T.042-385-4200</li>
                </ul>
              </dd>
            </dl>
          </div>
        </li>
      </ol>
    </div>
  );
}
