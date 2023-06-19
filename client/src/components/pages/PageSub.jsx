import React ,{useState,useCallback,useEffect} from "react";
import {useNavigate,useLocation,useParams} from "react-router-dom"
import SubSideMenu from "../contents/SubSideMenu";
import {SubBread} from "../contents/SubSideMenu";
import PageSub01b1 from "./PageSub01/PageSub01b1";
import PageSub01b2 from "./PageSub01/PageSub01b2";
import PageSub01b3 from "./PageSub01/PageSub01b3";
import PageSub01b4 from "./PageSub01/PageSub01b4";
import PageSub01c from "./PageSub01/PageSub01c";
import PageSub01d from "./PageSub01/PageSub01d";
import TableType1a from "../contents/TableType1a";
import TableType1c from "../contents/TableType1c";
import SectionInputTextType1f from "../sections/SectionInputTextType1f";
import SectionInputTextType1f_update from "../sections/SectionInputTextType1f_update";
import SectionInputTextType1g from "../sections/SectionInputTextType1g";
import InfoType1a from "../contents/InfoType1a";
import InfoTypeSpace from "../contents/infotypespace";
import { EquipmentContainer } from "../../containers/EquipmentContainer";
import Terms from "../contents/ReportType1a";
import PersonalInfo from "../contents/ReportType1b";
import CopyRight from "../contents/ReportType2a";
import Email from "../contents/ReportType2b";
import TableType1d_User from "../contents/TableType1d_User";
import { useDispatch,useSelector } from "react-redux";

export default function DidInfo() {
  const [value,setValue] = useState("");
  const dispatch = useDispatch();
  const { sideNaviMenu } = useSelector(state => state.sidemenu);
  const location = useLocation();

  return (
    <>
    <div id="sub_page_wrap">
      <SubSideMenu title={"시설소개"} subtitle={"공간소개"}>
      </SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          
          <TableType1a/>
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
  return(
    <>
    <div id="sub_page_wrap">
      <SubSideMenu title={"시설소개"} subtitle={"운영인력소개"}>
      <SubBread></SubBread>
      </SubSideMenu>
      <div className="sub_page_inner_wrap">
        <div className="sub_inner">
          <TableType1c/>
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


export const DidTerms = () =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
  <div id="sub_page_wrap">
  <div className="sub_page_inner_wrap">
      <Terms/>
  </div>
  <div className="sub_page_outer"/>
</div>
</>
);

}
export const DidPI = () =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
  <div id="sub_page_wrap">
  <div className="sub_page_inner_wrap">
      <PersonalInfo/>
  </div>
</div>
</>
);

}
export const DidCopyRight = () =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
  <div id="sub_page_wrap">
  <div className="sub_page_inner_wrap">
      <CopyRight/>
  </div>
</div>
</>
);

}
export const DidEmail = () =>{
  const dispatch = useDispatch();
  const { sideNaviPos } = useSelector(state => state.sidemenu);

  return(
    <>
    
  <div id="sub_page_wrap">
  <div className="sub_page_inner_wrap">
      <Email/>
  </div>
</div>
</>
);

}
