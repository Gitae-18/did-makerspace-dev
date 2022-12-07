import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import { CHANGE_MENU, } from "../../../store/management";
import {useLocation,useNavigate,useParams,Link,NavLink} from 'react-router-dom';
import { SET_CATEGORY/*, CHANGE_CATEGORY */} from "../../../store/material";
import '../../../css/common-s.css';
import '../../../css/style-s.css';
import { SubBread } from '../../contents/SubSideMenu';
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
	if(location.pathname.includes('classeducontrol')){
		titlevalue="교육/행사관리"
	}
	else{
		titlevalue="운영관리"
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
	  const Dep3Handler = (e,props) => {
		const classOnTarget = e.target;
		//props.setValue(e.target.value);
		const onRemoveTarget = classOnTarget.parentElement.children;
		for (let i = 0; i < onRemoveTarget.length; i++) {
		  onRemoveTarget[i].classList.remove("on");
		}
		classOnTarget.classList.add("on");
	  };
	const SubModalControl = () =>{
		const { token } = useSelector(state => state.user);
		return(
		  <ol>
			  <li>
				<p onClick={Dep2Handler}>기업/회원관리</p>
				<ol className="has_dep3">
				  <li onClick={(e)=>onClick(e,0)}><NavLink to="/management/mcompany">기업관리</NavLink></li>
				  <li onClick={(e)=>onClick(e,1)}><NavLink to="/management/member">회원관리</NavLink></li>
				</ol>
			  </li>
			  <li>
				<p onClick={(e)=>onClick(e,2)}>기자재 품목 관리</p>
			  </li>
			  <li>
				<p onClick={(e)=>onClick(e,3)}>기자재 관리</p>
			  </li>
			  <li>
				<p onClick={(e)=>onClick(e,4)}>서비스항목관리</p>
			  </li>
			  <li>
				<p onClick={Dep2Handler}>기/자재 관리</p>
				<ol className="has_dep3">
				  <li onClick={(e)=>onClick(e,5)}>자재 분류 관리</li>
				  <li onClick={(e)=>onClick(e,6)}>자재 항목 관리</li>
				</ol>
			  </li>
			  <li>
				<p onClick={Dep2Handler}>전문멘토관리</p>
				<ol className="has_dep3">
				  <li><NavLink to="/mentorcontrol/mentorauthority">전문 멘토 명단</NavLink></li>
				  <li><NavLink to="/mentorcontrol/mentorapplication">전문 멘토 신청서</NavLink></li>
				  <li><NavLink to="/mentorcontrol/mentoringreport">멘토링 보고서</NavLink></li>
				</ol>
			  </li>
			  <li>
				<p onClick={Dep2Handler}>교육/행사관리</p>
				<ol className="has_dep3">
				  <li><NavLink to="/classeducontrol/educontrol">교육프로그램 관리</NavLink></li>
				  <li><NavLink to="/classeducontrol/classcontrol">행사프로그램 관리</NavLink></li>
				</ol>
			  </li>
			  </ol>
		)
	   }
	return (
		<div className="sub_side_menu">
			<SubBread title={titlevalue}></SubBread>	
			<div className="sub_modal">
				<SubModalControl/>
			</div>
		</div>
	);
}
