import React ,{useState} from "react";
import SubSideMenu,{SubSideMenu2} from "../contents/SubSideMenu";

import PageSub07a from "./PageSub07/PageSub07a";
import PageSub07b1 from "./PageSub07/PageSub07b1";
import PageSub07b2 from "./PageSub07/PageSub07b2";
import PageSub07b3 from "./PageSub07/PageSub07b3";
import PageSub07b4 from "./PageSub07/PageSub07b4";
import PageSub07b5 from "./PageSub07/PageSub07b5";
import PageSub07b6 from "./PageSub07/PageSub07b6";
import PageSub07c from "./PageSub07/PageSub07c";
import Menu from "../Menu";
import InfoType3a from "../contents/InfoType3a";
import InfoType3c from '../contents/InfoType3c';
import SectionInputTextType1e from "../sections/SectionInputTextType1e";
import SectionInputTextType1h from "../sections/SectionInputTextType1h";
import SectionInputTextType1h_update from "../sections/SectionInputTextType1h_update";
import TableType1e_User from "../contents/TableType1e_User";
export default function Contact({location,history}) {
    const [value,setValue] = useState("");
    return (
      <>
       
      <div id="sub_page_wrap">
        <SubSideMenu title={"연락처안내"}></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub07a/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
  }
  export const Contact2 = ({location,history}) => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자료실"} subtitle={"영상자료"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub07b1/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const Contact3 = ({location,history}) => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자료실"} subtitle={"기초학습자료"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub07b5/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const ContactNoticeDetail = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"공지사항"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
             <SectionInputTextType1e/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const Contact5 = ({location,history}) => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자료실"} subtitle={"문서자료"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub07b3/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const Contact6 = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"공지사항"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub07c/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const Contact6_User = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"공지사항"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <TableType1e_User/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const AddNotice = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"공지사항"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <SectionInputTextType1h/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const UpdateNotice = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"공지사항"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <SectionInputTextType1h_update/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const ContactDetail = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자료실"} subtitle={"영상자료"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <InfoType3a/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const ContactDetail2 = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자료실"} subtitle={"영상자료"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <InfoType3c/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const BasicDetail = () => {
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자료실"} subtitle={"문서자료"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub07b4/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }