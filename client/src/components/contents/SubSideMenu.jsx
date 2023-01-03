import { parseWithOptions } from "date-fns/fp";
import { useSelector } from "react-redux";
import React,{useCallback,useState,useLayoutEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

export default function SubSideMenu(props) {
  const [sidebar,setSidebar] = useState(false);
  const [isSpace,setIsSpace] = useState(false);
  const [click,setClick] = useState(false);
  const [isCompany,setIsCompany] = useState(false);
  const url = useLocation();
  const location = useLocation();
  const history = useNavigate();
  const { authority_level } = useSelector(state => state.user);
  useLayoutEffect(()=>{
    if(url.pathname.split('/')[1]==='didinfo'){
      setIsSpace(true);
    }
    if(url.pathname.split('/')[1]==="companyinfo"){
      setIsCompany(true);
    }
  },[url.pathname])
  const SubModal = () => {
    
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
      //props.setValue(e.target.value);
      const onRemoveTarget = classOnTarget.parentElement.children;
      for (let i = 0; i < onRemoveTarget.length; i++) {
        onRemoveTarget[i].classList.remove("on");
      }
      classOnTarget.classList.add("on");
    };
  const SubModal01 = (props) => {

      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>시설소개</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler} value="space"><Link to={"/didinfo"}> 공간소개 </Link></li>
              <li onClick={Dep3Handler} value="equip"><Link to={"/info/equipinfo"}> 장비소개 </Link></li>
              <li onClick={Dep3Handler} value="work"><Link to={"/info/workerinfo"}>운영인력소개</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>기관소개</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to={"/info/greetings"}>인사말</Link></li>
              <li onClick={Dep3Handler}><Link to ={"/info/vision"}>미션/비전</Link></li>
              <li onClick={Dep3Handler}><Link to ={"/info/organization"}>조직도</Link></li>
              <li onClick={Dep3Handler}><Link to ={"/info/partner"}>협력기관안내</Link></li>
            </ol>
          </li>
          <li>
         <p onClick={Dep2Handler}><Link to ={"/info/way"} onClick={Dep2Handler}>오시는 길</Link></p>
          </li>
          <li>
          <p onClick={Dep2Handler}><Link to ={"/info/faq"}  tag="div">FAQ</Link></p>
          </li>
        </ol>
      );
    };
    const SubModal02 = () => {
      return (
        <ol>
          <li>
          <p onClick={Dep2Handler}><Link to={"/didreservation"}>장비 예약</Link></p>
          </li>
          <li>
          <p onClick={Dep2Handler}><Link to={"/reservation/space"}>공간 예약</Link></p>
          </li>
          <li>
          <p onClick={Dep2Handler}><Link to={"/reservation/lab"}>전문 랩 투어</Link></p>
          </li>
        </ol>
      );
    };
    const SubModal03_1 = () =>{
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>시제품 제작 </p>
              <ol className="has_dep3"></ol>
              <li onClick={Dep3Handler} value="space"><Link to={"/uservice"}> 시제품 상담 신청 </Link></li>
              <li onClick={Dep3Handler} value="equip"><Link to={"/uservice"}> 시제품 제작 신청 </Link></li>
          </li>
          <li>
            <p onClick={Dep2Handler}>상담 신청 관리</p>
          </li>
        </ol>
      );
    }
    const SubModal03_2 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>시제품 제작 관리</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>상담 신청 관리</p>
          </li>
        </ol>
      );
    };
    const SubModal04 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}> <Link to={"/mentoring"}>멘토링 관리</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={'/notcompelete'}>멘토 검색</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={'/notcompelete'}>멘토 칭찬</Link></p>
          </li>
        </ol>
      );
    };
    const MentoringUser = () =>{
      return(
        <ol>
          <li>
            <p onClick={Dep2Handler}> <Link to={"/umentoring"}>멘토링</Link></p>
              <ol className="has_dep3">
              <li onClick={Dep3Handler} value="mentoring_application"><Link to={"/umentoring"}> 멘토링 신청</Link></li>
              </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={"/notcomplete"}> 멘토 검색</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={"/notcomplete"}> 멘토 칭찬</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={"/notcomplete"}> 멘토링 보고서</Link></p>
          </li>
        </ol>
      );
    }
    const SubModal05 = () => {
      return (
        <ol>
          <li onClick={(e)=>setClick(true)} >
            <p className={click===true?"on":""} onClick={()=>history('/classprogram')}>교육 프로그램</p>
          </li>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history('/eduprogram');}}>행사 프로그램</p>
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
          <li>
            <p onClick={Dep2Handler}><Link to={'/contact'}>연락처 안내</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}>자료실</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/archivecontact/video'}>영상 자료</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/archivecontact/text'}>문서 자료</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/archivecontact/basic'}>기초 학습 자료</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/notice'}>공지사항</Link></p>
          </li>
        </ol>
      );
    };
    const SubModal08 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>시제품제작관리</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/mservice'}>시제품제작관리</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/mservice/*'}>시제품제작신청</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/mservice/guide'}>시제품제작안내</Link></p>
          </li>
        </ol>
      );
    };
   const SubModal09 = () =>{
    const { token } = useSelector(state => state.user);
    return(
      <ol>
          <li>
            <p onClick={Dep2Handler}>시제품제작</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/uservice'}>상담신청</Link></li>
              <li onClick={Dep3Handler}><Link to ={location.pathname + '?step=2&next=app'}>제작신청</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/noticecontact'}>시제품제작안내</Link></p>
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
              <li onClick={Dep3Handler}><Link to ={'/management'}>기업관리</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/management/member'}>회원관리</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/ecategory'}>기자재 품목 관리</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}>기자재/자재관리</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/management/equipment'}>기자재관리</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/management/material'}>자재관리</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/servicecategory'}>서비스항목관리</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/mdepart'}>자재분류관리</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/mitem'}>자재항목관리</Link></p>
          </li>
         
        </ol>
    )
   }
  
    return (
      <>
      <div className="sub_modal">
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
    return (
      <div className="sub_bread">
        <h1>{props.subtitle ? props.subtitle:props.title}</h1>
        <div className="location">
        <h2>{props.subtitle}</h2>
        {props.subtitle ? <span>{">"}</span>:<></>}
        <h3>{props.title}</h3>
        </div>
      </div>
    );
  };