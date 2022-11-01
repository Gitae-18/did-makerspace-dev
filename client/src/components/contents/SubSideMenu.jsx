import React,{useCallback,useState,useLayoutEffect} from "react";
import {useLocation} from "react-router";
import { Link } from "react-router-dom";

export default function SubSideMenu(location) {
  const [sidebar,setSidebar] = useState(false);
  const [isSpace,setIsSpace] = useState(false);
  const [isCompany,setIsCompany] = useState(false);
  const url = useLocation();

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
         <p onClick={Dep2Handler}><Link to ={"/info/way"} tag="div">오시는 길</Link></p>
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
          <Link to={"/didreservation"}><p onClick={Dep2Handler}>장비 예약</p></Link>
          </li>
          <li>
          <Link to={"/reservation/space"}><p onClick={Dep2Handler}>공간 예약</p></Link>
          </li>
          <li>
          <Link to={"/reservation/lab"}><p onClick={Dep2Handler}>전문 랩 투어</p></Link>
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
            <p onClick={Dep2Handler}>멘토 검색</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>멘토 칭찬</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>멘토링 보고서</p>
          </li>
        </ol>
      );
    };
    const SubModal05 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}><Link to={"/classprogram"}>행사 프로그램</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={"/eduprogram"}>교육 프로그램</Link></p>
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
            <p onClick={Dep2Handler}><Link to ={'/noticecontact/notice'}>공지사항</Link></p>
          </li>
        </ol>
      );
    };
  
  
    return (
      <>
      <div className="sub_modal">
        {url.pathname.includes("info") === true ? <SubModal01></SubModal01> : url.pathname.includes("reservation") === true? <SubModal02></SubModal02>:url.pathname.includes("mentor") === true?<SubModal04></SubModal04>:url.pathname.includes("program")===true?<SubModal05></SubModal05>:url.pathname.includes("contact") === true?<SubModal07></SubModal07>:<SubModal06></SubModal06>}
      </div>
      </>
      )
    }

  
  // 페이지 이동시 아래의 SubBread 컨트롤 필요
  const SubBread = () => {
    const dataLables = [
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
      }
    ]
    return (
      <div className="sub_bread">
        <h2>시설소개</h2>
        <h3>공간소개</h3>
      </div>
    );
  };
  return (
    <div className="sub_side_menu">
      <SubModal></SubModal>
      <SubBread></SubBread>
    </div>
  );
  };

