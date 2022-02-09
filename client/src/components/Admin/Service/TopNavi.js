import React, { useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { M_SERVICE_VIEW_CHANGE } from "../../../store/manager_service";

import '../../../css/common.css';
import '../../../css/style.css';

export default ({ step }) => {

    const state = useSelector(state => state.managerService);
    const dispatch = useDispatch();

	const onClick = useCallback((e, newView) => {
		e.preventDefault();
        if (state.currentView !== newView) {
            dispatch({ type: M_SERVICE_VIEW_CHANGE, target: newView });
        }
    }, [state, dispatch]);

    const TopNavi = useCallback((props) => {
        return <li><button className={props.cursor} onClick={props.onClick}><span className="num">{props.labelNum}</span> {props.labelText}</button></li>
    }, []);

    return (
        <ul>
            <TopNavi cursor={step === 0 ? "on" : ""} labelNum="" labelText=" 전체" />
            <TopNavi cursor={step === 1 ? "on" : ""} onClick={e => { onClick(e, 'STEP_01') }} labelNum="01" labelText=" 상담신청" />
            <TopNavi cursor={step === 2 ? "on" : ""} onClick={e => { onClick(e, 'STEP_02') }} labelNum="02" labelText=" 서비스 신청" />
            <TopNavi cursor={step === 3 ? "on" : ""} onClick={e => { onClick(e, 'STEP_03') }} labelNum="03" labelText=" 서비스 진행" />
            <TopNavi cursor={step === 4 ? "on" : ""} onClick={e => { onClick(e, 'STEP_04') }} labelNum="04" labelText=" 서비스 완료" />
        </ul>
    );
}