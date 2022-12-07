import React ,{useState} from "react";
import SubSideMenu,{SubSideMenu2} from "../contents/SubSideMenu";
import TableType5c from "../contents/TableType5c";
import MServiceGuide from "../contents/ServiceGuide";
import SectionInputTextType1f from "../sections/sectionInputTextType1f";
import SectionTextType2a from "../sections/SectionTextType2a";
import PageSub04a1 from "./PageSub04/PageSub04a1";
import PageSub04a2 from "./PageSub04/PageSub04a2";
import PageSub04a3 from "./PageSub04/PageSub04a3";
import Menu from "../Menu";
export default function Mentoring({location,history}) {
    const [value,setValue] = useState("");
    return (
      <>
      <div id="sub_page_wrap">
        <SubSideMenu title={"멘토링관리"} ></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub04a1/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
  }
  export const UMentoring = () =>{
    return(
      <>
      <div id="sub_page_wrap">
        <SubSideMenu title={"멘토링"} ></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <TableType5c/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    )
  }
  export const UMentoringApplication = () =>{
    return(
      <>
      <div id="sub_page_wrap">
        <SubSideMenu title={"멘토링"} ></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <SectionTextType2a/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    )
  }
  export const MserviceGuide = () =>{
    return(
      <>
      <div id="sub_page_wrap">
        <SubSideMenu title={"멘토링"} ></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <MServiceGuide/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    )
  }