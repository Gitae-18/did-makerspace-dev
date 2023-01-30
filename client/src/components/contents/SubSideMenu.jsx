import { parseWithOptions } from "date-fns/fp";
import { useSelector ,useDispatch} from "react-redux";
import React,{useCallback,useState,useLayoutEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import { button } from "react-router-dom";
import { MdHome,MdChevronRight } from "react-icons/md";
import SubSideSubmenu from "./SubSideSubmenu";
import { SidebarData } from "../Admin/Statistics/SidebarData";
import { MENU_CHANGE } from "../../store/sidemenu";
import { exportDefaultSpecifier, isTemplateLiteral } from "../../../../../AppData/Local/Microsoft/TypeScript/4.9/node_modules/@babel/types/lib/index";
export default function SubSideMenu(props,onCategory) {
  const [sidebar,setSidebar] = useState(false);
  const [isItem1,setIsItem1] = useState(false);
  const [isItem2,setIsItem2] = useState(false);
  const [isItem3,setIsItem3] = useState(false);
  const [click,setClick] = useState(false);
  const { sideNaviMenu } = useSelector(state => state.sidemenu);
  const url = useLocation();
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { authority_level } = useSelector(state => state.user);


  const SubModal = () => {
    const showSidebar = (e) => {
      setSidebar(!sidebar);
      setIsItem1(!isItem1);
    }

    const openList = (value,title) =>{
      if(title="didinfo"){
      if(value === true) setIsItem1(false);
      else{
        setIsItem1(true);
        setIsItem2(false);
        setIsItem3(false);
      }
      }
      else if(title="admininfo"){

      }

    }
    let className;
 /*    for(let i = 0; i<10;i++){
     className = (isItem1===true)&&(sideNaviMenu===0) ? "on" : "off";
    } */
    const onClick = useCallback((e, index) => {
      e.preventDefault();
      dispatch({ type: MENU_CHANGE, target: index });
    },[dispatch,history])
    const Dep2Handler = (e) => {
      const classOnTarget = e.target.parentElement;
      const onRemoveTarget = classOnTarget.parentElement.children;
     
      if (classOnTarget.classList.contains("on")) {
        classOnTarget.classList.remove("on");
      }
      else {
        for (let i = 0; i < onRemoveTarget.length; i++) {
        onRemoveTarget[i].classList.remove("on");
        }
        classOnTarget.classList.add("on");
      }
      };



    const Dep3Handler = (e,props) => {   
      const classOnTarget = e.target;
      const onRemoveTarget = classOnTarget.parentElement.children;

      classOnTarget.classList.add("on");
    };
    const controlClassname = (e) =>{
      const classOnTarget = e.target;
      classOnTarget.className = "";
    }
  const SubModal01 = (props) => {

      return (
        <ol>
          <li sidebar={sidebar} className={sideNaviMenu===0?"on":"off"} >
            <p onClick={Dep2Handler}>시설소개</p>
            {/* <SubSideSubmenu  handleSubNav={()=>openList(isItem1,'didinfo')}isOpened={isItem1 && !isItem2 && !isItem3} item={SidebarData[0]}/> */}
            <ol className="has_dep3">
              <li onClick={(e)=>onClick(e,0)} value="space" className={sideNaviMenu===0?"on":""}><button className="btn" onClick={(e)=>history("/didinfo")}> 공간소개 </button></li>
              <li onClick={(e)=>onClick(e,0)} value="equip"className={sideNaviMenu===0?"on":""}><button className="btn" onClick={(e)=>history("/didinfo/info/equipinfo")}> 장비소개 </button></li>
              <li onClick={(e)=>onClick(e,0)} value="work"className={sideNaviMenu===0?"on":""}><button className="btn" onClick={(e)=>history("/didinfo/info/workerinfo")}>운영인력소개</button></li>
            </ol>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p onClick={Dep2Handler}>기관소개</p>
            <ol className="has_dep3">
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/admin/info/greetings")}>인사말</button></li>
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/admin/info/vision")}>미션/비전</button></li>
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/admin/info/organization")}>조직도</button></li>
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/admin/info/partner")}>협력기관안내</button></li>
            </ol>
          </li>
          <li className={sideNaviMenu===2?"on":"off"}>
         <p onClick={(e)=>{onClick(e,2);history("/info/way")}}>오시는 길</p>
          </li>
          <li className={sideNaviMenu===3?"on":"off"}>
          <p onClick={(e)=>{onClick(e,3);history("/info/faq")}}>FAQ</p>
          </li>
        </ol>
      );
    };
    const SubModal02 = () => {
      return (
        <ol>
          <li className={sideNaviMenu===0?"on":"off"}>
          <p onClick={(e)=>{onClick(e,0);history("/didreservation")}}>장비 예약</p>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
          <p onClick={(e)=>{onClick(e,1);history("/reservation/space")}}>공간 예약</p>
          </li>
          <li className={sideNaviMenu===2?"on":"off"}>
          <p onClick={(e)=>{onClick(e,2);history("/reservation/lab")}}>전문 랩 투어</p>
          </li>
        </ol>
      );
    };
    const SubModal03_1 = () =>{
      return (
        <ol>
          <li className={sideNaviMenu===0?"on":"off"}>
            <p onClick={Dep2Handler}>시제품 제작 </p>
              <ol className="has_dep3"></ol>
              <li onClick={(e)=>onClick(e,0)} value="space"><button className="btn" onClick={(e)=>history("/uservice")}> 시제품 상담 신청 </button></li>
              <li onClick={(e)=>onClick(e,0)} value="equip"><button className="btn" onClick={(e)=>history("/uservice")}> 시제품 제작 신청 </button></li>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p  onClick={(e)=>{onClick(e,1);history("/mservice/guide")}}>상담 신청 관리</p>
          </li>
        </ol>
      );
    }
    const SubModal03_2 = () => {
      return (
        <ol>
          <li className={sideNaviMenu===0?"on":"off"}>
            <p onClick={(e)=>Dep2Handler(e,0)}>시제품 제작 관리</p>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p onClick={(e)=>Dep2Handler(e,1)}>상담 신청 관리</p>
          </li>
        </ol>
      );
    };
    const SubModal04 = () => {
      return (
        <ol>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history("/mentoring")}}>멘토링 관리</p>
          </li>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history("/notcompelete")}}>멘토 검색</p>
          </li>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history("/notcompelete")}}>멘토 칭찬</p>
          </li>
        </ol>
      );
    };
    const MentoringUser = () =>{
      return(
        <ol>
          <li>
            <p onClick={Dep2Handler}> <button className="btn" onClick={(e)=>history("/umentoring")}>멘토링</button></p>
              <ol className="has_dep3">
              <li onClick={Dep3Handler} value="mentoring_application"><button className="btn" onClick={(e)=>history("/umentoring")}> 멘토링 신청</button></li>
              </ol>
          </li>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history("/notcompelete")}}> 멘토 검색</p>
          </li>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history("/notcompelete")}}> 멘토 칭찬</p>
          </li>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history("/notcompelete")}}> 멘토링 보고서</p>
          </li>
        </ol>
      );
    }
    const SubModal05 = () => {
      return (
        <ol>
          <li className={sideNaviMenu===0?"on":"off"} >
            <p onClick={(e)=>{onClick(e,0);history('/classprogram')}}>교육 프로그램</p>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p onClick={(e)=>{onClick(e,1);history('/eduprogram');}}>행사 프로그램</p>
          </li>
        </ol>
      );
    };
    const SubModal06 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>기업/회원 관리</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}>기업 관리</li>
              <li onClick={Dep3Handler}>회원 관리</li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>기자재/자재 관리</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>서비스 항목 관리</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>전문 멘토 관리</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}>전문 멘토 명단</li>
              <li onClick={Dep3Handler}>전문 멘토 신청</li>
              <li onClick={Dep3Handler}>전문 멘토 권한</li>
              <li onClick={Dep3Handler}>멘토링 보고서</li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>장비/공간 관리</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}>장비 관리</li>
              <li onClick={Dep3Handler}>공간 관리</li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>교육/행사 관리</p>
          </li>
        </ol>
      );
    };
    const SubModal07 = () => {
      return (
        <ol>
          <li className={sideNaviMenu===0?"on":"off"}>
            <p onClick={(e)=>{onClick(e,0);history("/contact")}}>연락처 안내</p>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p onClick={Dep2Handler}>자료실</p>
            <ol className="has_dep3">
              <li onClick={(e)=>onClick(e,1)}><button  className="btn" onClick={(e)=>history('/archivecontact/video')}>영상 자료</button></li>
              <li onClick={(e)=>onClick(e,1)}><button  className="btn" onClick={(e)=>history('/archivecontact/text')}>문서 자료</button></li>
              <li onClick={(e)=>onClick(e,1)}><button  className="btn" onClick={(e)=>history('/archivecontact/basic')}>기초 학습 자료</button></li>
            </ol>
          </li>
          <li className={sideNaviMenu===2?"on":"off"}>
            <p onClick={(e)=>{onClick(e,2);history("/notice")}}>공지사항</p>
          </li>
        </ol>
      );
    };
    const SubModal08 = () => {
      return (
        <ol>
          <li className={sideNaviMenu===0?"on":"off"}>
            <p onClick={Dep2Handler}>시제품제작관리</p>
            <ol className="has_dep3">
              <li onClick={(e)=>onClick(e,0)}><button className="btn" onClick={(e)=>history('/mservice')}>시제품제작관리</button></li>
            </ol>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p onClick={(e)=>{onClick(e,1);history("/mservice/guide")}}>시제품제작안내</p>
          </li>
        </ol>
      );
    };
   const SubModal09 = () =>{
    const { token } = useSelector(state => state.user);
    return(
      <ol>
          <li className={sideNaviMenu===0?"on":"off"}>
            <p onClick={(e)=>Dep2Handler(e,0)}>시제품제작</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><button className="btn" onClick={(e)=>history('/uservice')}>상담신청</button></li>
              <li onClick={Dep3Handler}><button className="btn" onClick={(e)=>history(location.pathname + '?step=2&next=app')}>제작신청</button></li>
            </ol>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p onClick={(e)=>{Dep2Handler(e,1);history("/noticecontact")}}>시제품제작안내</p>
          </li>
        </ol>
    )
   }
   const SubModalControl = () =>{
    const { token } = useSelector(state => state.user);
    return(
      <ol>
          <li>
            <p onClick={Dep2Handler}>기업/회원관리</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><button to ={'/management'}>기업관리</button></li>
              <li onClick={Dep3Handler}><button to ={'/management/member'}>회원관리</button></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><button to ={'/management/ecategory'}>기자재 품목 관리</button></p>
          </li>
          <li>
            <p onClick={Dep2Handler}>기자재/자재관리</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><button to ={'/management/equipment'}>기자재관리</button></li>
              <li onClick={Dep3Handler}><button to ={'/management/material'}>자재관리</button></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><button to ={'/management/servicecategory'}>서비스항목관리</button></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><button to ={'/management/mdepart'}>자재분류관리</button></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><button to ={'/management/mitem'}>자재항목관리</button></p>
          </li>
         
        </ol>
    )
   }

    return (
      <>
      <div className="sub_modal" >
        {url.pathname.includes("info") === true ? <SubModal01/> 
        : url.pathname.includes("reservation") === true? <SubModal02/>:
        url.pathname.includes("mentor") === true && authority_level > 1?<SubModal04/>
        :url.pathname.includes('mentor')===true && authority_level<10? <MentoringUser/>
        :url.pathname.includes("program")===true?<SubModal05/>
        :url.pathname.includes("contact")||url.pathname.includes("notice") === true?<SubModal07/>
        :url.pathname.includes("mservice")===true && authority_level>10?<SubModal08/>
        :url.pathname.includes("uservice")===true && authority_level<10?<SubModal09/>:<SubModal06/>}
      </div>
      </>
      )
    }

  
  // 페이지 이동시 아래의 SubBread 컨트롤 필요

  return (
    <div className="sub_side_menu">
      <SubModal></SubModal>
      <SubBread title={props.title} subtitle={props.subtitle}></SubBread>
    </div>
  );
  };

  export const SubBread = (props) => {
    const [currentTitle,setCurrentTitle] = useState('시설소개');
    const [currentsubmenu,setCurrentSubmenu] = useState('공간소개');
    const dataLabels = [
      {
        title: '시설 소개',
         submenu : [
         {
           title: '공간 소개',
            index : 1
         },
         {
           title: '장비 소개',
           index : 2
         },
          {
           title: "운영인력소개",
           index : 3
          }
        ]
      },
      {
        title : '기관 소개',
        submenu : [
          {
            title: '인사말',
             index : 1
          },
          {
            title: '미션/비전',
            index : 2
          },
           {
            title: "조직도",
            index : 3
           },
           {
            title: "협력기관안내",
            index : 4
           }
         ]
      },
      {
        title : '오시는 길'
      },
      {
        title : 'FAQ'
      }
    ]
    let style={
      position:"relative",
      left:"10px"
    }
    return (
      <div className="sub_bread">
        <h1>{props.subtitle ? props.subtitle:props.title}</h1>
        <div className="location">
        {props.subtitle ?<MdHome className="homeicon" style={!props.subtitle || props.subtitle.length< 5 ?{"left":"30px"}:!props.subtitle || props.subtitle.length < 6 ?{"left":"20px"}:{"left":"15px"}}/>:
        <MdHome className="homeicon" style={!props.subtitle || props.subtitle.length< 5 ?{"left":"30px"}:!props.subtitle || props.subtitle.length < 6 ?{"left":"25px"}:{"left":"40px"}}/>}
        <h3>{props.subtitle}</h3>
        {props.title ? <span style={props.title.length < 5?{"left":"20px"}:props.title.length < 7?{"left":"10px"}:{"left":"5px"}}>{props.subtitle?<MdChevronRight className="arrowicon"/>:<></>}</span>:<></>}
        <h2>{props.title}</h2>
        </div>
      </div>
    );
  };