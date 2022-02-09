import React, { useCallback } from 'react';
import { useSelector } from "react-redux";

import '../../../css/common.css';
import '../../../css/style.css';

export default function ({ history }) {
	const { sideNaviPos } = useSelector(state => state.management);

	const onClick = useCallback((e, index) => {
		e.preventDefault();
		if (history) {
			if (index === 0) {
				history.push('/mservice');
			}
		}
	}, [history]);

	const menu = ['서비스 관리']
	const menus = [];
	for (const [index, value] of menu.entries()) {
		menus.push(<li onClick={(e) => onClick(e, index)} className={sideNaviPos === (index) ? "on" : ""} key={index}>{value}</li>)
		//menus.push(<li className= "on" key={index}>{value}</li>)
	}

	return (
		<div className="side_menu">
			<div className="inner_menu">
				<h2>서비스 관리</h2>
				<ul>
					{menus}
				</ul>
			</div>
		</div>
	);
}
