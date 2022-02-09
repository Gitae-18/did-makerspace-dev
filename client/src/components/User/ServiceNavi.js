import React, { useCallback } from 'react'

import '../../css/common.css';
import '../../css/style.css';

export default ({ step }) => {
    // const title = ['상담 신청서 작성', '전문가 상담', '서비스 신청서 작성', '서비스 진행', '이용 결과서 확인']
    // const items = [];
    // for (const [index, value] of title.entries()) {
    //     items.push((step === index + 1)
    //         ? (<li><a className="on"><span className="num">0{index + 1}</span> {value}</a></li>)
    //         : (<li><a><span className="num">0{index + 1}</span> {value}</a></li>));
    // }

    const TopNavi = useCallback((props) => {
        return <li><button className={props.cursor}><span className="num">{props.labelNum}</span> {props.labelText}</button></li>
    }, []);


    return (
        <ul>
            <TopNavi cursor={step === 1 ? "on" : ""} labelNum="01" labelText="상담 신청서 작성" />
            <TopNavi cursor={step === 2 ? "on" : ""} labelNum="02" labelText="전문가 상담" />
            <TopNavi cursor={step === 3 ? "on" : ""} labelNum="03" labelText="서비스 신청서 작성" />
            <TopNavi cursor={step === 4 ? "on" : ""} labelNum="04" labelText="서비스 진행" />
            <TopNavi cursor={step === 5 ? "on" : ""} labelNum="05" labelText="이용 결과서 확인" />
            {/* {items} */}
        </ul>
    );
}