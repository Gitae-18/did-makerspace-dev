import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import Sidebar from './Sidebar';

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function () {
	const { sideNaviPos } = useSelector(state => state.management);
	const history = useNavigate();
	const onClick = useCallback((e, index) => {
		e.preventDefault();
		if (history) {
			if (index === 0) {
				history('/mservice');
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
				<ul>
					<Sidebar/>
				</ul>
			</div>
		</div>
	);
}
