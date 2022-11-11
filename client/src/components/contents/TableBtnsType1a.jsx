import React from "react";
import { useNavigate } from "react-router";
import ButtonType2 from "./ButtonType2";
export  function TableBtnsType1a() {
  const navigate = useNavigate();
  return (
   
    <div className="table_btns table_btns_type1">
        <ButtonType2 btnName="예약" bgc="white"></ButtonType2>
       <ButtonType2 btnName="목록" onClick={navigate(-1)}></ButtonType2>
      </div>
  );
}
