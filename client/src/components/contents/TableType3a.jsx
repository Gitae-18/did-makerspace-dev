import React from "react";

export default function TableType3a() {
  return (
    <div className="table_type3 contact">
              <table className="didcontact">

              <th>소속</th>
              <th>담당자</th>
              <th>내선번호</th>
              <th>e-mail</th>
              <th>주요업무</th>

              <tr>
              <td rowSpan={4}>ETRI</td>
                <td >소운섭 총괄</td>
                <td >             </td>
                <td>wsso@etri.re.kr</td>
                <td rowSpan={4} >사업관리</td>
              </tr>

              <tr>
                <td>이재기 전문위원</td>
                <td>042-385-4206</td>
                <td>jklee@etri.re.kr</td>
              </tr>

              <tr>
                <td>이해원 전문위원</td>
                <td>             </td>
                <td>hewlee@etri.re.kr</td>             
             </tr>

              <tr> 
                <td>한기평 책임</td>
                <td>             </td>
                <td>gphan@etri.re.kr</td>
              </tr>


              <tr>
                <td rowSpan={3} >펀펀쓰리디<br/>[사업운영]</td>
                <td >문용재 대표</td>
                <td >             </td>
                <td >myj1380@nate.com</td>
                <td> 사업운영</td>
              </tr>
              <tr>
                <td>윤종화 이사</td>
                <td>042-385-4205</td>
                <td>didmaker.y@gmail.com</td>
                <td >사업운영,전문가 매칭</td>
              </tr>
              <tr>
                <td>장예닮 연구원</td>
                <td>042-385-4205</td>
                <td>didmanager.j@gmail.com</td>
                <td>연구행정</td>
              </tr>


              <tr>
                <td rowSpan={3} >펀펀쓰리디<br/>[시제품 제작]</td>
                <td >오석호 책임</td>
                <td >042-385-4208</td>
                <td >did.designersho@gmail.com</td>
                <td >시제품 제작 총괄,역설계</td>
              </tr>
              <tr>
                <td>김영민 연구원</td>
                <td>042-385-4207</td>
                <td>did.maker.kym@gmail.com</td>
                <td>3D설계,디자인,3D프린팅</td>
              </tr>
              <tr>
                <td>김준환 연구원</td>
                <td>             </td>
                <td>didmaker.kjh@gmail.com</td>
                <td >3D설계,전자,회로</td>
              </tr>
            
              <tr>
                <td rowSpan={3} >펀펀쓰리디<br/>[콘텐츠 제작]</td>
                <td >손성창 책임</td>
                <td >042-385-4202</td>
                <td >DIDmakerson@gmail.com</td>
                <td >콘텐츠 제작 총괄</td>
              </tr>
              <tr>
                <td>김지연 선임</td>
                <td>042-385-4203</td>
                <td>DIDmakerkjy@gmail.com</td>
                <td>3D콘텐츠,영상제작</td>
              </tr>
              <tr>

                <td>김희웅 연구원</td>
                <td>042-385-4201</td>
                <td>DIDmaker.W@gmail.com</td>
                <td >2D콘텐츠,영상편집</td>
              </tr>


              <tr>
                <td rowSpan={1} >펀펀쓰리디<br/>[안내]</td>
                <td >송유림 연구원</td>
                <td >042-385-4200</td>
                <td >DID.maker.yu@gmail.com</td>
                <td >인포데스크</td>
              </tr>
              
              <tr>
                <td rowSpan={3} >창조경제혁신센터</td>
                <td >김성근 본부장</td>
                <td >             </td>
                <td >apro64@ccei.kr</td>
                <td rowSpan={3}>창업지원,공간지원</td>
              </tr>
              <tr>
                <td>한은영 실장</td>
                <td>042-385-4203</td>
                <td>heyhaney@ccei.kr</td>
              </tr>
              <tr>
                <td>이종권 주임</td>
                <td>042-385-0534</td>
                <td>leejgs@ccei.kr</td>
              </tr>
              </table>
    </div>
  );
}
