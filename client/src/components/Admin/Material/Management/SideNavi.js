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
	const url = location.pathname;
	let title,subtitle;
	if(location.pathname.includes('mentorcontrol')){
		title="전문멘토관리"
	}
	if((location.pathname.includes('edu'))||(location.pathname.includes('class'))){
		title="교육/행사관리"
	}
	else if(sideNaviPos === 0){
		title="기업/회원관리"
		subtitle="기업관리"
	}
	else if(sideNaviPos === 1){
		title="기업/회원관리"
		subtitle="회원관리"
	}
	else if(sideNaviPos === 2){
		title="기자재 품목관리"
	}
	else if(sideNaviPos === 3){
		title="기자재 관리"
	}
	else if(sideNaviPos === 4){
		title="서비스 항목관리"
	}
	else if(sideNaviPos === 5){
		title="기/자재관리"
		subtitle="자재 분류관리"
	}
	else if(sideNaviPos === 6){
		title="기/자재관리"
		subtitle="자재 항목관리"
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
				  <li onClick={(e)=>{onClick(e,7);history("/mentorcontrol/mentorauthority")}}>전문 멘토 명단</li>
				  <li onClick={(e)=>{onClick(e,8);history("/mentorcontrol/mentorapplication")}}>전문 멘토 신청서</li>
				  <li onClick={(e)=>{onClick(e,9);history("/mentorcontrol/mentoringreport")}}>멘토링 보고서</li>
				</ol>
			  </li>
			  <li className={url.includes("classedu")?"on":"off"}>
				<p onClick={(e)=>{onClick(e,10);onItem(e)}}>교육/행사관리</p>
			  </li>
			  </ol>
		)
	   }
	   
	return (
		<div className="sub_side_menu">
			<SubBread2 title={title} subtitle={subtitle}></SubBread2>	
			<div className="sub_modal">
				<SubModalControl/>
			</div>
		</div>
	);
}
export const SubBread2 = (props) => {

    let style={
      position:"relative",
      left:"10px"
    }
    return (
		<div className="sub_bread">
        <h1>{props.subtitle ? props.subtitle:props.title}</h1>
        <div className="location">
        <div className="title_area">
		{props.subtitle&&props.subtitle.length>0?
         <MdHome className="homeicon" style={props.subtitle.length===8?{'left':'75px'}:props.subtitle.length===6?{'left':'85px'}:props.subtitle.length===5?{'left':'95px'}:props.subtitle.length===4?{'left':'80px'}:{'left':'80px'}}/>:
         <MdHome className="homeicon" style={props.title.length<4?{'left':'200px'}:props.title.length<5?{'left':'185px'}:props.title.length<6?{'left':'175px'}:
         props.title.length<7?{'left':'170px'}: props.title.length<8?{'left':'160px'}:{'left':'150px'}}/>}
         
          {props.subtitle&&props.subtitle.length>0?<h2 style={props.subtitle.length === 3?{'left':'130px'}:props.subtitle.length === 4?{'left':'100px'}:props.subtitle.length === 5? {'left':'120px'}:props.subtitle.length === 6?{'left':'110px'}:{'left':'105px'}}>{props.title}</h2>:<h2 style={props.title.includes("오시는")?{'left':'203px'}:props.title.length===3?{'left':'225px'}:props.title.length===4?{'left':'205px'}:props.title.length===5?{'left':'195px'}:
          props.title.length===6?{'left':'190px'}: props.title.length===7?{'left':'180px'}:props.title.length===8?{'left':'172px'}:{'left':'170px'}}>{props.title}</h2>}
          
          {props.subtitle&&props.subtitle.length>0?
          <MdChevronRight className="arrowicon" style={props.subtitle.length===3?{'left':'170px'}:props.subtitle.length===4?{'left':'165px'}:props.subtitle.length===5?{'left':'160px'}
          :props.subtitle.length===6?{'left':'150px'}:props.subtitle.length===8?{'left':'140px'}:{'left':'150px'}}/>:null}
        </div>
         {props.subtitle&&props.subtitle.length>0?<h3 style={props.subtitle.length===6?{'left':'142px'}:props.subtitle.length===5?{'left':'157px'}:props.subtitle.length===4?{'left':'162px'}:props.subtitle.length===3?{'left':'170px'}:{'left':'138px'}}>{props.subtitle}</h3>:null}
        </div>
      </div>
    );
	}