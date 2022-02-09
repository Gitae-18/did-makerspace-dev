import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_MENU, } from "../../../store/management";

import '../../../css/common.css';
import '../../../css/style.css';

export default function ({history, viewDepth}) {
	const { sideNaviPos } = useSelector(state => state.management);
	const dispatch = useDispatch();

	const onClick = useCallback((e, index) => {
		e.preventDefault();
		dispatch({ type: CHANGE_MENU, target: index });
		if (viewDepth && viewDepth === 2) {
			history.go(-1);
		} else {
			history.push('/management')
		}
	}, [dispatch, history, viewDepth]);

	const menu = ['기업 관리', '회원 관리', '기자재 품목 관리', '기자재 관리', '서비스 항목 관리', '자재 분류 관리', '자재 항목 관리', '2020년 자료 관리']
	const menus = [];
	for (const [index, value] of menu.entries()) {
		menus.push(<li onClick={(e) => onClick(e, index)} className={sideNaviPos === (index) ? "on" : ""} key={index}>{value}</li>)
	}

	return (
		<div className="side_menu">
			<div className="inner_menu">
				<h2>운영 관리</h2>
				<ul>
					{menus}
				</ul>
			</div>
		</div>
	);
}
