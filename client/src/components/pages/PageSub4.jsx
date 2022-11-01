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

export default function Contact({location,history}) {
    const [value,setValue] = useState("");
    return (
      <>
      <div id="sub_page_wrap">
        <SubSideMenu location={location} history={history}></SubSideMenu>
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
          <SubSideMenu location={location} history={history}></SubSideMenu>
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
          <SubSideMenu location={location} history={history}></SubSideMenu>
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
  export const Contact4 = ({location,history}) => {
    return (
        <>
        <div id="sub_page_wrap">
          <SubSideMenu location={location} history={history}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub07b6/>
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
          <SubSideMenu location={location} history={history}></SubSideMenu>
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