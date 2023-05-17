import { parseWithOptions } from "date-fns/fp";
import { useSelector ,useDispatch} from "react-redux";
import React,{useCallback,useState,useLayoutEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import { button } from "react-router-dom";
import { MdHome,MdChevronRight } from "react-icons/md";
import SubSideSubmenu from "./SubSideSubmenu";
import { SidebarData } from "../Admin/Statistics/SidebarData";
import { MENU_CHANGE } from "../../store/sidemenu";
import { useEffect } from "react";


export default function SubSideMenu(props,onCategory) {
  const [sidebar,setSidebar] = useState(false);
  const [isItem1,setIsItem1] = useState(false);
  const [isItem2,setIsItem2] = useState(false);
  const [isItem3,setIsItem3] = useState(false);
  const [click,setClick] = useState(false);

  const { sideNaviMenu } = useSelector(state => state.sidemenu);
  const { authority_level } = useSelector(state => state.user);


  const location = useLocation();
  const url = location.pathname;
  const history = useNavigate();
  const dispatch = useDispatch();



  useEffect(()=>{
    if(url.includes("didinfo"||url.includes("equip")||url.includes("classprogram")||url.includes("contact"))){
      setIsItem1(true);
      //setIsItem2(false);
      //setIsItem3(false);
    }
    if(url.includes("admin")||url.includes("space")||url.includes("eduprogram")||url.includes("guide")||url.includes("archive")){
      setIsItem2(true);
      //setIsItem1(false);
      //setIsItem3(false);
    }
    if(url.includes("way"||"faq")||url.includes("lab")){
      setIsItem3(true);
      //setIsItem1(false);
      //setIsItem2(false);
    }
  })
  const SubModal = () => {

    const showSidebar = (e) => {
      setSidebar(!sidebar);
      setIsItem1(!isItem1);
    }
    /* const checkUrl = () =>{
      let i;
      switch(location.path.includes(i)){
        case i==="info":
          dispatch({ type: MENU_CHANGE, target: 0 });
          return;
        case i==="":
          dispatch({ type: MENU_CHANGE, target: 0 });
        return;
        default:
          return;
      }
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

  const SubModal01 = (props) => {
      return (
        <ol>
          <li className={url.includes("didadmin")?"on":"off"}>
            <p onClick={Dep2Handler}>기관소개</p>
            <ol className="has_dep3">
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/didadmin/info/greetings")}>인사말</button></li>
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/didadmin/info/vision")}>미션/비전</button></li>
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/didadmin/info/organization")}>조직도</button></li>
              <li onClick={(e)=>onClick(e,1)}><button onClick={(e)=>history("/didadmin/info/partner")}>협력기관안내</button></li>
            </ol>
          </li>
          <li sidebar={sidebar} className={url.includes("didinfo")?"on":"off"}/*  onClick={checkUrl} */>
            <p onClick={Dep2Handler}>시설소개</p>
            {/* <SubSideSubmenu  handleSubNav={()=>openList(isItem1,'didinfo')}isOpened={isItem1 && !isItem2 && !isItem3} item={SidebarData[0]}/> */}
            <ol className="has_dep3">
              <li onClick={(e)=>onClick(e,0)} value="space"><button className="btn" onClick={(e)=>history("/didinfo")}> 공간소개 </button></li>
              <li onClick={(e)=>onClick(e,0)} value="equip"><button className="btn" onClick={(e)=>history("/didinfo/info/equipinfo")}> 장비소개 </button></li>
              <li onClick={(e)=>onClick(e,0)} value="work"><button className="btn" onClick={(e)=>history("/didinfo/info/workerinfo")}>운영인력소개</button></li>
            </ol>
          </li>
          
          <li className={url.includes("way")?"on":"off"}>
          <p onClick={(e)=>{onClick(e,2);history("/did/info/way")}}>오시는 길</p>
          </li>
          <li className={url.includes("faq")?"on":"off"}>
          <p onClick={(e)=>{onClick(e,3);history("/did/info/faq")}}>FAQ</p>
          </li>
        </ol>
      );
    };
    const SubModal02 = () => {
      return (
        <ol>
          <li className={url.includes("equip")?"on":"off"}>
          <p onClick={(e)=>{onClick(e,0);history("/eqreservation/equip")}}>장비 예약</p>
          </li>
          <li className={url.includes("space")?"on":"off"}>
          <p onClick={(e)=>{onClick(e,1);history("/eqreservation/space")}}>공간 예약</p>
          </li>
          <li className={url.includes("lab")?"on":"off"}>
          <p onClick={(e)=>{onClick(e,2);history("/eqreservation/lab")}}>전문 랩 투어</p>
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
          <li className={url.includes("class")?"on":"off"} >
            <p onClick={(e)=>{onClick(e,0);history('/classprogram')}}>교육 프로그램</p>
          </li>
          <li className={url.includes("edu")?"on":"off"}>
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
          <li className={url.includes("contact")?"on":"off"}>
            <p onClick={(e)=>{onClick(e,0);history("/contact")}}>연락처 안내</p>
          </li>
          <li className={url.includes("archive")?"on":"off"}>
            <p onClick={Dep2Handler}>자료실</p>
            <ol className="has_dep3">
              <li onClick={(e)=>onClick(e,1)}><button  className="btn" onClick={(e)=>history('/archive/video')}>영상 자료</button></li>
              <li onClick={(e)=>onClick(e,1)}><button  className="btn" onClick={(e)=>history('/archive/text')}>문서 자료</button></li>
              <li onClick={(e)=>onClick(e,1)}><button  className="btn" onClick={(e)=>history('/archive/basic')}>기초 학습 자료</button></li>
            </ol>
          </li>
          <li className={url.includes("notice")?"on":"off"}>
            <p onClick={(e)=>{onClick(e,2);history("/notice")}}>공지사항</p>
          </li>
          {authority_level>10&&
          <li className={url.includes("schedule")?"on":"off"}>
            <p onClick={(e)=>{onClick(e,3);history("/mschedule")}}>월간일정</p>
          </li>
          }
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
          <li className={url.includes("guide")?"on":"off"}>
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
            <p onClick={(e)=>{Dep2Handler(e,0);history("/uservice/guide")}}>시제품제작안내</p>
          </li>
          <li className={sideNaviMenu===1?"on":"off"}>
            <p onClick={(e)=>Dep2Handler(e,1)}>시제품제작지원</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><button className="btn" onClick={(e)=>history('/uservice')}>상담신청</button></li>
              <li onClick={Dep3Handler}><button className="btn" onClick={(e)=>history(location.pathname + '?step=2&next=app')}>제작신청</button></li>
            </ol>
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
        {url.includes("info") === true ? <SubModal01/> 
        : url.includes("reservation") === true? <SubModal02/>:
        url.includes("mentor") === true && authority_level > 1?<SubModal04/>
        :url.includes('mentor')===true && authority_level<10? <MentoringUser/>
        :url.includes("program")===true?<SubModal05/>
        :url.includes("contact")||url.includes("notice")||url.includes("archive")||url.includes("schedule") === true?<SubModal07/>
        :url.includes("mservice")===true && authority_level>10?<SubModal08/>
        :url.includes("uservice")===true && authority_level<10?<SubModal09/>:<SubModal06/>}
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
    return (
      <div className="sub_bread">
        <h1>{props.subtitle ? props.subtitle:props.title}</h1>
        <div className="location">
        <div className="title_area">
         {props.subtitle?
         <MdHome className="homeicon" style={props.subtitle.length===8&&props.title.length===7?{'left':'50px'}:props.subtitle.length===8?{'left':'75px'}:/* props.subtitle.length===7?{'left':'80px'}: */props.subtitle.length===6?{'left':'85px'}:props.subtitle.length===5?{'left':'95px'}:props.subtitle.length===4?{'left':'105px'}:{'left':'105px'}}/>:
         <MdHome className="homeicon" style={props.title.length<4?{'left':'200px'}:props.title.length<5?{'left':'185px'}:props.title.length<6?{'left':'175px'}:
         props.title.length<7?{'left':'160px'}:props.title.length<8?{'left':'165px'}:{'left':'155px'}}/>}
         
          {props.subtitle?<h2 style={props.subtitle.length === 3?{'left':'130px'}:props.subtitle.length === 4?{'left':'129px'}:props.subtitle.length === 5? {'left':'120px'}:props.subtitle.length === 8&&props.title.length===7?{'left':'70px'}:props.subtitle.length === 8?{'left':'95px'}:{'left':'108px'}}>{props.title}</h2>:<h2 style={props.title.includes("오시는")?{'left':'203px'}:props.title.length===3?{'left':'225px'}:props.title.length===4?{'left':'205px'}:props.title.length===5?{'left':'195px'}:
          props.title.length===6?{'left':'180px'}:props.title.length===7?{'left':'174px'}:props.title.length===9?{'left':'160px'}:{'left':'173px'}}>{props.title}</h2>}
          
          {props.subtitle?
          <MdChevronRight className="arrowicon" style={props.subtitle.length===3?{'left':'170px'}:props.subtitle.length===4?{'left':'165px'}:props.subtitle.length===5?{'left':'160px'}
          :props.subtitle.length===6?{'left':'145px'}:/* props.subtitle.length===7?{'left':'100px'}: */props.subtitle.length===8?{'left':'140px'}:{'left':'140px'}}/>:null}
        </div>
         {props.subtitle?<h3 style={props.subtitle.length===8?{'left':'132px'}:props.subtitle.length===6?{'left':'142px'}:props.subtitle.length===5?{'left':'157px'}:props.subtitle.length===4?{'left':'162px'}:props.subtitle.length===3?{'left':'170px'}:{'left':'180px'}}>{props.subtitle}</h3>:null}
        </div>
      </div>
    );
  };