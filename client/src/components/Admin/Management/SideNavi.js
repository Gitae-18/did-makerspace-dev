import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_MENU, } from "../../../store/management";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import '../../../css/common-s.css';
import '../../../css/style-s.css';
export default function ({ viewDepth}) {
	const { sideNaviPos } = useSelector(state => state.management);
	const dispatch = useDispatch();
	const location = useLocation();
    const history = useNavigate();
	const onClick = useCallback((e, index) => {
		e.preventDefault();
		dispatch({ type: CHANGE_MENU, target: index });
		if (viewDepth && viewDepth === 2) {
			history(-1);
		} else {
			history('/management')
		}
	}, [dispatch, history, viewDepth]);
	  //<Link onClick={() => { dispatch({ type: CHANGE_CATEGORY, target: 0 }); }} to="/mmaterial">자재 관리</Link>

	const menu = ['기업/회원 관리','자재 관리', '기자재 품목 관리', '기자재 관리', '서비스 항목 관리', '자재 분류 관리', '자재 항목 관리', '2020년 자료 관리']
	const menus = [];
	
	return (
		<div className="side_menu">
			<div className="inner_menu">
				<h2>운영 관리</h2>
				<ul>
					{menu.map((item,index)=>{
						return(
						<li onClick={(e)=>onClick(e,index)} className={sideNaviPos === (index) ? "on" : ""} key={index}>{item}</li>
						)
					})}
					
				</ul>
			</div>
		</div>
	);
}
