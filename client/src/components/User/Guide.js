import React from 'react'
import '../../css/common-s.css';
import '../../css/style-s.css';

export default function () {
    
    return (
        <div id="wrap" className='wrap utilize'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="box box1">
                        <h2>이용절차</h2>
                        <div className="nb1">
                            <p>회원가입</p>
                            <strong>1</strong>
                            <span>메이커스페이스<br />이용은 회원가입이<br />필요합니다.</span>
                        </div>
                        <div>
                            <p>상담 예약 신청</p>
                            <strong>2</strong>
                            <span>시제품 제작에 대한<br />구현 방법, 비용 등을<br />전문 상담사가<br />오프라인으로 자세히<br />상담해 드립니다.</span>
                        </div>
                        <div>
                            <p>서비스 신청</p>
                            <strong>3</strong>
                            <span>상담 내용이 마음에<br />드시면 서비스를<br />신청해주세요.</span>
                        </div>
                        <div>
                            <p>서비스 이용</p>
                            <strong>4</strong>
                            <span>신청한 서비스가<br />진행됩니다.</span>
                        </div>
                        <div className="nb2">
                            <p>완료</p>
                            <strong>5</strong>
                            <span>서비스가 완료되고<br />결과물을 받으실 수<br />있습니다.</span>
                        </div>
                    </div>
                    <div className="box box2">
                        <div className="l_box">
                            <h2>찾아오시는 길</h2>
                            <p className="map"></p>
                            <ul>
                                <li><strong>주소</strong><span>대전 중구 중앙로 101 (선화동) / (구)충남도청 구봉산관 1층</span></li>
                                <li><strong>전화</strong><span className="num">042-385-4200 <a href="http://didmakerspace.kr/bbs/contact.php" target="_blank">(관계자 연락처 이동)</a></span></li>
                            </ul>
                        </div>
                        <div className="r_box">
                            <h2>운영 시간</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>월~금</th>
                                        <td className="num">09:00~21:00</td>
                                    </tr>
                                    <tr>
                                        <th>토</th>
                                        <td className="num">09:00~18:00</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
