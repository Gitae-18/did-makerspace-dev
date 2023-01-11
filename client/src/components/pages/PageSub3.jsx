import React ,{useState} from "react";
import InfoType2a from "../contents/InfoType2a";
import InfoType2b from "../contents/InfoType2b";
import SubSideMenu,{SubSideMenu2} from "../contents/SubSideMenu";
import MyClassReserv from "../contents/MyClassReserv";

import PageSub05a1 from "./PageSub05/PageSub05a1";
import PageSub05a2 from "./PageSub05/PageSub05a2";
import PageSub05b1 from "./PageSub05/PageSub05b1";
import PageSub05b2 from "./PageSub05/PageSub05b2";
import Menu from "../Menu";

export default function ClassEdu_Program() {
    const [value,setValue] = useState("");
    return (
      <>
       
      <div id="sub_page_wrap">
        <SubSideMenu subtitle={"교육프로그램"}></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub05b1/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
  
      </div>
      </>
    );
  }
  export const ClassEdu_Program2 = ({location,history}) => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu subtitle={"행사프로그램"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub05a1/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const ClassEdu_program3 = () => {
    return (
        <>
        <div id="sub_page_wrap">
        <SubSideMenu subtitle={"교육프로그램"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <InfoType2b/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }

  export const ClassEdu_program4 = () => {
    return (
        <>
        <div id="sub_page_wrap">
          <SubSideMenu subtitle={"행사프로그램"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <InfoType2a/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const ClassEdu_Reserv = () => {
    return (
        <>
        <div id="sub_page_wrap">
          <SubSideMenu subtitle={"교육/행사프로그램"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <MyClassReserv/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
