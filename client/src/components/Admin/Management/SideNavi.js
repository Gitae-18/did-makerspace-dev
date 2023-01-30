import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import { CHANGE_MENU, } from "../../../store/management";
import {useLocation,useNavigate,useParams,Link,NavLink} from 'react-router-dom';
import { SET_CATEGORY/*, CHANGE_CATEGORY */} from "../../../store/material";
import '../../../css/common-s.css';
import '../../../css/style-s.css';
import { SubBread } from '../../contents/SubSideMenu';
import { MdHome,MdChevronRight } from "react-icons/md";

export default function ({ viewDepth ,onCategory}) {
	const { sideNaviPos } = useSelector(state => state.management);
	const { token } = useSelector(state => state.user);
	const { categoryList, categoryIndex } = useSelector(state => state.material);
	const mountedRef = useRef(true);
	const dispatch = useDispatch();
	const location = useLocation();
    const history = useNavigate();
	let titlevalue ;
	if(location.pathname.includes('mentorcontrol')){
		titlevalue="전문멘토관리"
	}
	if((location.pathname.includes('educontrol'))||(location.pathname.includes('classcontrol'))){
		titlevalue="교육/행사관리"
	}
	else if(sideNaviPos === 0){
		titlevalue="기업관리"
	}
	else if(sideNaviPos === 1){
		titlevalue="회원관리"
	}
	else if(sideNaviPos === 2){
		titlevalue="기자재 품목관리"
	}
	else if(sideNaviPos === 3){
		titlevalue="기자재 관리"
	}
	else if(sideNaviPos === 4){
		titlevalue="서비스 항목관리"
	}
	else if(sideNaviPos === 5){
		titlevalue="자재 분류관리"
	}
	else if(sideNaviPos === 6){
		titlevalue="자재 항목관리"
	}
	
	const onClick = useCallback((e, index) => {
		e.preventDefault();
		dispatch({ type: CHANGE_MENU, target: index });
		console.log(viewDepth);
		if (viewDepth && viewDepth === 2) {
			
			history(-1);
		} else {
			history('/management')
		}
	}, [dispatch, history, viewDepth]);

	  //<Link onClick={() => { dispatch({ type: CHANGE_CATEGORY, target: 0 }); }} to="/mmaterial">자재 관리</Link>
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
	  const onItem = (e) =>{
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
		history('/classeducontrol')
	  };
	  
	const SubModalControl = () =>{
		const { token } = useSelector(state => state.user);
		return(
		  <ol>
			  <li className={sideNaviPos===0 || sideNaviPos===1?"on":"off"}>
				<p onClick={Dep2Handler}>기업/회원관리</p>
				<ol className="has_dep3">
				  <li onClick={(e)=>{onClick(e,0);history("/management/mcompany")}}>기업관리</li>
				  <li onClick={(e)=>{onClick(e,1);history("/management/member")}}>회원관리</li>
				</ol>
			  </li>
			  <li className={sideNaviPos===2?"on":"off"}>
				<p onClick={(e)=>onClick(e,2)}>기자재 품목 관리</p>
			  </li>
			  <li className={sideNaviPos===3?"on":"off"}>
				<p onClick={(e)=>onClick(e,3)}>기자재 관리</p>
			  </li>
			  <li className={sideNaviPos===4?"on":"off"}>
				<p onClick={(e)=>onClick(e,4)}>서비스항목관리</p>
			  </li>
			  <li className={sideNaviPos===5||sideNaviPos===6?"on":"off"}> 
				<p onClick={Dep2Handler}>기/자재 관리</p>
				<ol className="has_dep3">
				  <li onClick={(e)=>onClick(e,5)}>자재 분류 관리</li>
				  <li onClick={(e)=>onClick(e,6)}>자재 항목 관리</li>
				</ol>
			  </li>
			  <li>
				<p onClick={Dep2Handler}>전문멘토관리</p>
				<ol className="has_dep3">
				  <li onClick={(e)=>{onClick(e,7);history("/notcomplete"/* "/mentorcontrol/mentorauthority" */)}}>전문 멘토 명단</li>
				  <li onClick={(e)=>{onClick(e,8);history("/notcomplete"/* "/mentorcontrol/mentorapplication" */)}}>전문 멘토 신청서</li>
				  <li onClick={(e)=>{onClick(e,9);history("/notcomplete"/*"/mentorcontrol/mentoringreport" */)}}>멘토링 보고서</li>
				</ol>
			  </li>
			  <li className={sideNaviPos===10?"on":"off"}>
				<p onClick={(e)=>{onClick(e,10);onItem(e)}}>교육/행사관리</p>
			  </li>
			  </ol>
		)
	   }
	   
	return (
		<div className="sub_side_menu">
			<SubBread2 title={titlevalue}></SubBread2>	
			<div className="sub_modal">
				<SubModalControl/>
			</div>
		</div>
	);
}
export const SubBread2 = (props) => {

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
        <MdHome className="homeicon" style={props.title.length < 5?{"left":"30px"}:props.title.length < 8 ? {"left":"10px"}:{"left":"0px"}}/>
        <h3>{props.subtitle}</h3>
        {props.subtitle ? <span style={props.subtitle.length < 5?{"left":"20px"}:{"left":"10px"}}><MdChevronRight className="arrowicon"/></span>:<></>}
        <h2>{props.title}</h2>
        </div>
      </div>
    );
	}