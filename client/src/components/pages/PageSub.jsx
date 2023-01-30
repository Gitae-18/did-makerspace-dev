import React ,{useState,useCallback,useEffect} from "react";
import { CHANGE_DEPTH, MENU_CHANGE } from "../../store/sidemenu";
import SubSideMenu from "../contents/SubSideMenu";
import {SubBread} from "../contents/SubSideMenu";
import PageSub01a1 from "./PageSub01/PageSub01a1";
import PageSub01a2 from "./PageSub01/PageSub01a2";
import PageSub01a3 from "./PageSub01/PageSub01a3";
import PageSub01b1 from "./PageSub01/PageSub01b1";
import PageSub01b2 from "./PageSub01/PageSub01b2";
import PageSub01b3 from "./PageSub01/PageSub01b3";
import PageSub01b4 from "./PageSub01/PageSub01b4";
import PageSub01c from "./PageSub01/PageSub01c";
import PageSub01d from "./PageSub01/PageSub01d";
//import PageSub02a1 from "./PageSub02/PageSub02a1";
//import PageSub02a2 from "./PageSub02/PageSub02a2";
//import PageSub02a3 from "./PageSub02/PageSub02a3";
//import PageSub02a4 from "./PageSub02/PageSub02a4";
//import PageSub02a5 from "./PageSub02/PageSub02a5";
//import PageSub02a6 from "./PageSub02/PageSub02a6";
//import PageSub02a7 from "./PageSub02/PageSub02a7";
//import PageSub02b1 from "./PageSub02/PageSub02b1";
//import PageSub02b2 from "./PageSub02/PageSub02b2";
//import PageSub02c1 from "./PageSub02/PageSub02c1";
//import PageSub05a1 from "./PageSub05/PageSub05a1";
//import PageSub05a2 from "./PageSub05/PageSub05a2";
//import PageSub05b1 from "./PageSub05/PageSub05b1";
//import PageSub05b2 from "./PageSub05/PageSub05b2";
//import PageSub07a from "./PageSub07/PageSub07a";
//import PageSub07b1 from "./PageSub07/PageSub07b1";
//import PageSub07b2 from "./PageSub07/PageSub07b2";
//import PageSub07b3 from "./PageSub07/PageSub07b3";
//import PageSub07b4 from "./PageSub07/PageSub07b4";
//import PageSub07b5 from "./PageSub07/PageSub07b5";
//import PageSub07b6 from "./PageSub07/PageSub07b6";
//import PageSub07c from "./PageSub07/PageSub07c";
//import PageSub07c2 from "./PageSub07/PageSub07c2";
import PageSub07c3 from "./PageSub07/PageSub07c3";
import SectionInputTextType1f from "../sections/SectionInputTextType1f";
import SectionInputTextType1f_update from "../sections/SectionInputTextType1f_update";
import SectionInputTextType1g from "../sections/SectionInputTextType1g";
//import PageSub03a1 from "./PageSub03/PageSub03a1";
//import PageSub03a2 from "./PageSub03/PageSub03a2";
//import PageSub04a1 from "./PageSub04/PageSub04a1";
//import PageSub04a2 from "./PageSub04/PageSub04a2";
//import PageSub04a3 from "./PageSub04/PageSub04a3";
//import PageSub06a1 from "./PageSub06/PageSub06a1";
//import PageSub06a2 from "./PageSub06/PageSub06a2";
//import PageSub06d2 from "./PageSub06/PageSub06d2";
//import PageSub06d3 from "./PageSub06/PageSub06d3";
//import PageSub06d4 from "./PageSub06/PageSub06d4";
//import PageSub06d5 from "./PageSub06/PageSub06d5";
//import PageSub06e1 from "./PageSub06/PageSub06e1";
//import PageSub06e2 from "./PageSub06/PageSub06e2";
//import PageSub06e3 from "./PageSub06/PageSub06e3";
//import PageSub06f1 from "./PageSub06/PageSub06f1";
//import PageSub06f2 from "./PageSub06/PageSub06f2";
import ListType1a from "../contents/ListType1a";
import Footer from "../../css/comb/Footer";
import InfoType1a from "../contents/InfoType1a";
import InfoTypeSpace from "../contents/infotypespace";
import Menu from "../Menu";
import { EquipmentContainer } from "../../containers/EquipmentContainer";
import TableType1d_User from "../contents/TableType1d_User";
import { useDispatch,useSelector } from "react-redux";
export default function DidInfo() {
  const [value,setValue] = useState("");
  const dispatch = useDispatch();
  const { sideNaviMenu } = useSelector(state => state.sidemenu);

  useEffect(()=>{
    return ()=>{
      console.log("123");
      dispatch({ type: MENU_CHANGE, target: 0 });
    }
  },[])
  return (
    <>
    <div id="sub_page_wrap">
      <SubSideMenu title={"시설소개"} subtitle={"공간소개"}>
      </SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01a1/>
        </div>
      </div>
    </div>
    <div className="sub_page_outer">

    </div>
    </>
  );
}
export const DidInfo1Detail1 = () =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"시설소개"} subtitle={"공간소개"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <InfoTypeSpace/>
        </div>
      </div>
    </div>
    </>
  );
}

export const DidInfo1Detail2 = ({location,history}) =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"시설소개"} subtitle={"장비소개"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <InfoType1a/>
        </div>
      </div>
    </div>
    </>
  );
}

export const DidInfo2 = ({location,history}) =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"시설소개"} subtitle={"장비소개"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <EquipmentContainer/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo3 = ({location,history}) => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"시설소개"} subtitle={"운영인력소개"}>
      <SubBread></SubBread>
      </SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01a3/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo4 = ({location,history}) => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"기관소개"} subtitle={"인사말"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01b1/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo5 = ({location,history}) => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"기관소개"} subtitle={"미션/비전"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01b2/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo6= ({location,history}) => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"기관소개"} subtitle={"조직도"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01b3/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo7 = ({location,history}) => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"기관소개"} subtitle={"협력기관안내"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01b4/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo8 = ({location,history}) => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"오시는 길"} ></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01c/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo9= () => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"FAQ"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <PageSub01d/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo10= () => {
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
    <div id="sub_page_wrap">
      <SubSideMenu title={"FAQ"}></SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <TableType1d_User/>
        </div>
      </div>
    </div>
    </>
  );
}
export const DidInfo1Detail = ({location,history}) =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
  <div id="sub_page_wrap">
  <SubSideMenu  title={"FAQ"}></SubSideMenu>
  <div className="sub_page_inner_wrap">
    <div className="sub_inner">
      <SectionInputTextType1g/>
    </div>
  </div>
</div>
</>
);

}
export const DidFaqWrite = ({location,history}) =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
  <div id="sub_page_wrap">
  <SubSideMenu  title={"FAQ"}></SubSideMenu>
  <div className="sub_page_inner_wrap">
    <div className="sub_inner">
      <SectionInputTextType1f/>
    </div>
  </div>
</div>
</>
);
}

export const DidFaqUpdate = () =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
  <div id="sub_page_wrap">
  <SubSideMenu  title={"FAQ"}></SubSideMenu>
  <div className="sub_page_inner_wrap">
    <div className="sub_inner">
      <SectionInputTextType1f_update/>
    </div>
  </div>
</div>
</>
);

}


