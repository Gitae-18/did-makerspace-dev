import React ,{useState} from "react";
import SubSideMenu,{SubSideMenu2} from "../contents/SubSideMenu";

import PageSub05a1 from "./PageSub05/PageSub05a1";
import PageSub05a2 from "./PageSub05/PageSub05a2";
import PageSub05b1 from "./PageSub05/PageSub05b1";
import PageSub05b2 from "./PageSub05/PageSub05b2";

export default function ClassEdu_Program({location,history}) {
    const [value,setValue] = useState("");
    console.log(location);
    return (
      <>
      <div id="sub_page_wrap">
        <SubSideMenu location={location} history={history}></SubSideMenu>
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
  export const ClassEdu_Program2 = ({location,history}) => {
    return (
        <>
        <div id="sub_page_wrap">
          <SubSideMenu location={location} history={history}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub05a2/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
