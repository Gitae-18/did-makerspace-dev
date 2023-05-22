import React from "react";
import ButtonType1 from "./ButtonType1";
import TitleType1 from "./TitleType1";
export default function Email() {
  return (
    <div className="report_type1" style={{"top":"100px","position":"relative"}}>
       <h1 className="title_type2" style={{"fontWeight":"bold","marginBottom":"30px","fontSize":"20px"}}>홈페이지와 관련된 이메일로...</h1>
        <p style={{"whiteSpace":"pre-wrap"}}>
        DID기술융합공작소 홈페이지와 관련된이메일로 보내지는 타사의 메일을 차단하기위해 본 웹사이트에 게시된 이메일주소가 전자우편 수집 프로그램이나 그 밖의 기술적장치를 이용하여 무단으로 수집되는 것을거부하며, 이를 위반시정보통신방법에의해 형사처벌됨을 유념하시기바랍니다.<br/>
        게시일 : 2020년 3월 9일
        </p>
        </div>
    );
}
