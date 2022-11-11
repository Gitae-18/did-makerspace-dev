import React, { /*useState, useEffect, */useCallback, /*useMemo*/ } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { CHANGE_MENU,STASTICS_ANALYZE } from "../store/management";
import { CHANGE_CATEGORY } from "../store/material";

import '../css/common-s.css';
import '../css/style-s.css';

const UserMenu = () => (
  <>
    <Link to="/didinfo">DID기술융합공작소</Link>
    <Link to="/didreservation">장비 및 시설예약</Link>
    <Link to="/uservice">시제품 제작</Link>
    <Link to="/classprogram">교육/행사</Link>
    <Link to="/mentoring">멘토링</Link>
    <Link to="/contact">Contact</Link>
   
    
  </>
);
/*<Link onClick={() => { dispatch({ type: STASTICS_ANALYZE, target: 0 }); }} to="/statics">통계 분석</Link>*/
const AdminMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/didinfo">DID기술융합공작소</Link>
      <Link to="/didreservation">장비 및 시설예약</Link>
      <Link to="/mservice">시제품 제작 관리</Link>
      <Link to="/classprogram">교육/행사</Link>
      <Link onClick={() => { dispatch({ type: CHANGE_MENU, target: 0 }); }} to="/management">운영 관리</Link>
      <Link to="/contact">Contact</Link>
     
    </>);
};

export default function Menu({ authority_level }) {
  //const classes = useStyles();
  const CurrentMenu = useCallback((authority_level > 1) ? AdminMenu : UserMenu);

  return (
    <div className="btn_box">
      <CurrentMenu />
    </div >
  );
}

/*
    <BrowserRouter>
        <div id="menu" float="right">
            <ul>
                <li><Link to="/uguide">이용안내</Link></li>
                <li><Link to="/uservice">서비스 이용</Link></li>
                <li><Link to="/mservice">서비스 관리</Link></li>
                <li><Link to="/mschedule">스케쥴 관리</Link></li>
                <li><Link to="/mmaterial">자재 관리</Link></li>
                <li><Link to="/management">운영 관리</Link></li>
            </ul>
        </div >
        <Route exact path="/" component={Home} />
        <Route path="/uguide" component={About} />
        <Route path="/uservice" component={Topics} />
        <Route path="/mservice" component={Topics} />
        <Route path="/mschedule" component={Topics} />
        <Route path="/mmaterial" component={Topics} />
        <Route path="/management" component={Topics} />
    </BrowserRouter>
*/
