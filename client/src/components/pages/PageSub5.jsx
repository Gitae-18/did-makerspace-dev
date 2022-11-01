import React ,{useState} from "react";
import SubSideMenu,{SubSideMenu2} from "../contents/SubSideMenu";

import PageSub04a1 from "./PageSub04/PageSub04a1";
import PageSub04a2 from "./PageSub04/PageSub04a2";
import PageSub04a3 from "./PageSub04/PageSub04a3";

export default function Mentoring({location,history}) {
    const [value,setValue] = useState("");
    return (
      <>
      <div id="sub_page_wrap">
        <SubSideMenu location={location} history={history}></SubSideMenu>
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