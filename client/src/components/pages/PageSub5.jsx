import React ,{useState,useEffect} from "react";
import { MENU_CHANGE } from "../../store/sidemenu";
import SubSideMenu from "../contents/SubSideMenu";
import MServiceGuide from "../contents/ServiceGuide";
import SectionInputTextType1a from "../sections/SectionInputTextType1a";
import PageSub04a1 from "../pages/PageSub04/PageSub04a1";
import TableType5c from "../contents/TableType5c";
import NotCompeleted from "../NotCompeleted";
import { useDispatch,useSelector } from "react-redux";
export default function Mentoring({location,history}) {
    /* const [value,setValue] = useState(""); */
    const dispatch = useDispatch();
    const { sideNaviMenu } = useSelector(state => state.sidemenu);
    useEffect(()=>{
      return ()=>{
        dispatch({ type: MENU_CHANGE, target: 0 });
      }
    },[])
    return (
      <>
      {/* <NotCompeleted/> */}
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
       {/* <NotCompeleted/> */}
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
            <SectionInputTextType1a/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    )
  }
  export const MserviceGuide = () =>{
    const { authority_level } = useSelector(state => state.user);
    return(
      <>
      <div id="sub_page_wrap">
        <SubSideMenu title={"시제품제작안내"}></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <MServiceGuide authority={authority_level}/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    )
  }