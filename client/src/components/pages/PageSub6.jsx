import React ,{useState,useEffect} from "react";
import { MENU_CHANGE } from "../../store/sidemenu";
import SubSideMenu from "../contents/SubSideMenu";
import Company from "../Admin/Management/Company";
import Equipment from "../Admin/Management/Equipment";
import EquipmentCategory from "../Admin/Management/EquipmentCategory";
import MaterialCategory from "../Admin/Management/MaterialCategory";
import MaterialItem from "../Admin/Material/MaterialItem";
import User from "../Admin/Management/User";
import Material from "../Admin/Material/Material";
import ServiceCategory from "../Admin/Management/ServiceCategory";
import PageSub06d4 from "./PageSub06/PageSub06d4";
import PageSub06d5 from "./PageSub06/PageSub06d5";
import PageSub06d3 from "./PageSub06/PageSub06d3";
import TableType5e from "../contents/TableType5e";
import PageSub06d2 from "./PageSub06/PageSub06d2";
import Classedulist from "../contents/classedulist";
import SideNavi from "../Admin/Management/SideNavi";
import SectionInputTextType1d_update from "../sections/SectionInputTextType1d_update";
import SectionInputTextType1d from "../sections/SectionInputTextType1d";
import SectionInputTextType1d_a from "../sections/SectionInputTextType1d_a";
import MentorWrite from "../contents/Mentoring/MentorWrite";
import MentorApplicationDetail from "../contents/Mentoring/MentorApplicationDetail";
import { useDispatch,useSelector } from "react-redux";


export default function ManagementCompany() {
  const dispatch = useDispatch();
  const { sideNaviMenu } = useSelector(state => state.sidemenu);
  useEffect(()=>{
    return ()=>{
      dispatch({ type: MENU_CHANGE, target: 0 });
    }
  },[])
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"기업관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <Company/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}

export const ManagementMember = () =>{
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"회원관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <User/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}
export const ManagementMaterial = () =>{
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자재관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <Material/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}
export const ManagementEquipment = () =>{
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"기자재관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <Equipment/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}
export const ManagementEquipCategory = () =>{
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu subtitle={"기자재 품목 관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <EquipmentCategory/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}
export const ManagementServiceCateogry = () =>{
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"서비스 품목 관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <ServiceCategory/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}
export const ManagementMaterialDepart = () =>{
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자재 분류 관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <MaterialCategory/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}
export const ManagementMaterialItem = () =>{
    return (
        <>
         
        <div id="sub_page_wrap">
          <SubSideMenu title={"자재 항목 관리"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <MaterialItem/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
}

/* export const MentoringReport = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
      <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub06d4/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
} */
export const MentoringReportDetail = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
      <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub06d5/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const MentorAuthority = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
      <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub06d3/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const MentorApplication = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
      <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <TableType5e/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const MentorAppDetail = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
      <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <MentorApplicationDetail/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const MentorAddPage = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
      <SubSideMenu title={"멘토링"} subtitle={"전문멘토신청"}/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <MentorWrite/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const MentorApplicationAdd = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
        <SubSideMenu title={"멘토링"} subtitle={"전문멘토신청서"}/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub06d2/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const ClassEduControl = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
        <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <SectionInputTextType1d/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const ClassEduControl2 = () =>{
  return (
      <>
       
      <div id="sub_page_wrap">
        <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <SectionInputTextType1d_a/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const ClassEduTotalControl = ({no}) =>{
  return (
      <>
      <div id="sub_page_wrap">
        <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <Classedulist no={no}/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}
export const ClassEduUpdate = ({no}) =>{
  return (
      <>
       
      <div id="sub_page_wrap">
        <SideNavi/>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <SectionInputTextType1d_update no={no}/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
}