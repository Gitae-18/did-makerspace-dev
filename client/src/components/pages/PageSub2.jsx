import React ,{useState,useEffect} from "react";
import { MENU_CHANGE } from "../../store/sidemenu";
import {useLocation,useHistory} from 'react-router-dom'
import SubSideMenu,{SubSideMenu2} from "../contents/SubSideMenu";
import Menu from "../Menu";
import SelectDateType1 from "../contents/SelectDateType1";
import PageSub02a1 from "./PageSub02/PageSub02a1";
import PageSub02a2 from "./PageSub02/PageSub02a2";
import PageSub02a3 from "./PageSub02/PageSub02a3";
import PageSub02a4 from "./PageSub02/PageSub02a4";
import PageSub02a5 from "./PageSub02/PageSub02a5";
import PageSub02a6 from "./PageSub02/PageSub02a6";
import PageSub02a7 from "./PageSub02/PageSub02a7";
import PageSub02b1 from "./PageSub02/PageSub02b1";
import PageSub02b2 from "./PageSub02/PageSub02b2";
import PageSub02c1 from "./PageSub02/PageSub02c1";
import { useDispatch,useSelector } from "react-redux";

export default function DidReservation({location,history}) {
    const [value,setValue] = useState("");
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
        <SubSideMenu title={"장비예약"} ></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub02a1/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
  
      </div>
      </>
    );
  }
  export const DidReservation2 = ({location,history}) => {
    return (
        <>
  
        <div id="sub_page_wrap">
          <SubSideMenu title={"공간예약"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub02b1/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const DidReservation3 = ({location,history}) => {
    return (
        <>
  
        <div id="sub_page_wrap">
          <SubSideMenu title={"전문랩투어"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub02c1/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const DidReservation4 = ({location,history}) => {
      
    return (
        <>
  
        <div id="sub_page_wrap">
          <SubSideMenu title={"장비예약"} ></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <PageSub02a7/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }

  export const SelectReservation = () => {
      
    return (
        <>
  
        <div id="sub_page_wrap">
          <SubSideMenu title={"장비예약"} subtitle={"날짜 및 시간"}></SubSideMenu>
          <div className="sub_page_inner_wrap">
            <div className="sub_inner">
              <SelectDateType1/>
            </div>
          </div>
        </div>
        <div className="sub_page_outer">
        </div>
        </>
      );
  }
  export const TestReservation = ({location,history}) =>{
    return (
      <>

      <div id="sub_page_wrap">
        <SubSideMenu title={"장비예약"} subtitle={"온라인시험"}></SubSideMenu>
        <div className="sub_page_inner_wrap">
          <div className="sub_inner">
            <PageSub02a5/>
          </div>
        </div>
      </div>
      <div className="sub_page_outer">
      </div>
      </>
    );
  }