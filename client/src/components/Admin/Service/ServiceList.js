import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax } from '../../../CommonCode';
import { M_SERVICE_SET } from "../../../store/manager_service";
import SideNavi from './SideNavi';

import '../../../css/common.css';
import '../../../css/style.css';

function makeQuery(step, dateType, year, month) {
    const search_year = "year=" + year;
    const search_month = "month=" + month;

    let query = "";
    if (step > 0) {
        const s_step = "step=" + (step > 4 ? 4 : step);
        query = s_step;
    }

    if (dateType && dateType !== "ALL") {
        query += ((query.length > 0) ? "&" : "") + "dt=" + dateType;
    }
    if (dateType === "SELECT" && year > 0 && month > 0) {
        query += ((query.length > 0) ? "&" : "") + search_year;
        query += ((query.length > 0) ? "&" : "") + search_month;
    }

    console.log(query);
    return query;
}

export default function ({ location, history, query }) {
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    let ServiceItemRows = [];
    let PageList = [];

    const [step, setStep] = useState(0);
    const [dateType, setDateType] = useState("ALL");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [serviceItems, setServiceItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        limit: 0,
        pageOffset: 0,
        items: [],
    });

    const getServiceList = useCallback(async (query) => {

        const pageNumber = query.page ? query.page : 1;
        const dt = query.dt ? query.dt : "ALL";
        const year = query.year ? query.year : 0;
        const month = query.month ? query.month : 0;
        const step = query.step ? Number(query.step) : 0;

        setDateType(query.dt ? query.dt : "ALL");
        setYear(year);
        setMonth(month);
        setStep(step);

        let startDate, endDate;
        switch (dt) {
            case "TODAY":
                startDate = new Date();
                endDate = new Date();
                break;
            case "WEEK":
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 6);
                endDate = new Date();
                break;
            case "MONTH":
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
                startDate.setDate(startDate.getDate() + 1);
                endDate = new Date();
                break;
            case "3MONTH":
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 3);
                startDate.setDate(startDate.getDate() + 1);
                endDate = new Date();
                break;
            case "SELECT":
                if (year > 0 && month > 0) {
                    startDate = new Date(year + '-' + month);
                    endDate = new Date(year + '-' + month);
                    endDate.setMonth(endDate.getMonth() + 1);
                    endDate.setDate(endDate.getDate() - 1);
                }
                break;
            default:
                break;
        }

        //const startDateText = startDate ? getFormatDate(startDate) : undefined;
        //const endDateText = endDate ? getFormatDate(endDate) : undefined;

        CommonHeader.authorization = token;
        const limitCount = 20;
        let requri = PreUri + '/service?page=' + pageNumber + '&limit=' + limitCount;
        if (startDate && endDate) {
            requri += "&sdate=" + startDate + "&edate=" + endDate;
        }

        if (step > 0 && step < 5) {
            requri += "&step=" + step;
        }

        const response = await fetch(requri, {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        const totalPage = Number(json.total_page);
        const currentPage = Number(json.current_page);
        const pageOffset = Math.ceil(currentPage / PageMax);
        setServiceItems(serviceItems => ({
            ...serviceItems,
            totalCount: Number(json.total_count),
            totalPage,
            currentPage,
            limit: Number(json.limit),
            pageOffset: (pageOffset < 1 ? 0 : (pageOffset - 1) * PageMax),
            items: json.items,
        }));
    }, [token]);

    useEffect(() => {
        getServiceList(query);
    }, [getServiceList, query])

    const ServiceItemRow = useCallback((props) => {
        return (<>
            <tr>
                <td className="num" onClick={props.onClick}>{props.index}</td>
                <td className="tit" onClick={props.onClick}>{props.title}</td>
                <td>{props.userName}</td>
                <td>{ProgressCode[props.progress]}</td>
                <td>{StatusCode[props.status]}</td>
                <td className="num">{props.requestDate}</td>
                <td className="num">{props.updateDate}</td>
                {(props.progress === 'STEP_01' && props.status === 'DRP') || props.progress === 'STEP_04'
                    ? <td className="btn"><button onClick={props.onPrint}>보고서 출력</button></td>
                    : <td />
                }
            </tr>
        </>);
    }, []);

    const onPage = useCallback((e, newPageNumber) => {
        e.preventDefault();

        let addQuery = makeQuery(step, dateType, year, month);
        addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
        history.push(window.location.pathname + '?page=' + newPageNumber + addQuery);
    }, [history, step, dateType, year, month]);

    const onPagePrev = useCallback((e) => {
        e.preventDefault();
        const curPageGrp = Math.ceil(serviceItems.pageOffset / PageMax);

        if (curPageGrp > 0) {
            let addQuery = makeQuery(step, dateType, year, month);
            addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
            history.push(window.location.pathname + '?page=' + serviceItems.pageOffset + addQuery);
        }
    }, [history, serviceItems, step, dateType, year, month]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = serviceItems.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(serviceItems.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
            let addQuery = makeQuery(step, dateType, year, month);
            addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
            history.push(window.location.pathname + '?page=' + (newPageOffset + 1) + addQuery);
        }
    }, [history, serviceItems, step, dateType, year, month]);

    const onSelectItem = useCallback((e, index) => {
        e.preventDefault();
        const item = serviceItems.items[index];
        dispatch({ type: M_SERVICE_SET, target: item });
        history.push('/mservice/detail');
    }, [history, serviceItems, dispatch]);

    const onPrint = useCallback((e, index) => {
        e.preventDefault();
        const item = serviceItems.items[index];
        // window.open(window.location.href + '?report_no=' + item.service_no, 'report', 'width=820,height=900,location=no,status=no,scrollbars=yes');
        window.open('mservice?report_no=' + item.service_no, 'report', 'width=820,height=900,location=no,status=no,scrollbars=yes');
    }, [serviceItems]);

    const onSearchByDate = useCallback((e, dateType) => {
        e.preventDefault();
        let addQuery = makeQuery(step, dateType, year, month);
        addQuery = (addQuery.length > 0) ? "?" + addQuery : "";
        //history.push(window.location.pathname + addQuery);
        history.replace(window.location.pathname + addQuery);
    }, [history, step, year, month]);

    const onSelectStep = useCallback((e, selstep) => {
        e.preventDefault();
        let addQuery = makeQuery(selstep, dateType, year, month);
        addQuery = (addQuery.length > 0) ? "?" + addQuery : "";
        // history.push(window.location.pathname + addQuery);
        history.replace(window.location.pathname + addQuery);
    }, [history, dateType, year, month]);

    for (let i = 0; i < PageMax; i++) {
        let pageNum = i + 1 + serviceItems.pageOffset;
        if (pageNum > serviceItems.totalPage) { break; }
        PageList.push(<a href='#!' onClick={(e) => onPage(e, pageNum)}
            className={pageNum === serviceItems.currentPage ? "active" : ""}
            key={i}>{pageNum}</a>);
    }

    if (serviceItems.totalCount > 0) {
        for (let i = 0; i <= serviceItems.items.length && i < serviceItems.limit; i++) {
            const item = serviceItems.items[i];
            const rowNumber = serviceItems.totalCount - i - (serviceItems.currentPage - 1) * serviceItems.limit;
            if (rowNumber < 1) { break; }

            ServiceItemRows.push(
                <ServiceItemRow index={rowNumber}
                    title={item.title}
                    userName={item.username}
                    requestDate={item.created_at.substring(0, 10)}
                    updateDate={item.updated_at.substring(0, 10)}
                    progress={item.progress}
                    status={item.status}
                    onClick={(e) => onSelectItem(e, i)}
                    onPrint={(e) => onPrint(e, i)}
                    key={i} />);
        };
    }

    var dt = new Date();
    var com_year = dt.getFullYear();
    let YearOption = [(<option value={0} key={0}>연도</option>)];
    for (let i = com_year; i >= (com_year - 10); i--) { YearOption.push(<option value={i} key={i}>{i + " 년"}</option>) }

    let MonthOption = [(<option value={0} key={0}>월</option>)];
    for (let i = 1; i <= 12; i++) { MonthOption.push(<option value={i} key={i}>{i + " 월"}</option>) }

    return (
        <div id="wrap" className="wrap service1">
            <div className="content_wrap">
                <SideNavi history={history} />
                <div className="content">
                    <div className="top_menu">
                        <ul>
                            <li><button className={step === 0 ? "on" : ""} onClick={(e) => onSelectStep(e, 0)}><span className="num"></span> 전체</button></li>
                            <li><button className={step === 1 ? "on" : ""} onClick={(e) => onSelectStep(e, 1)}><span className="num">01</span> 상담신청</button></li>
                            <li><button className={step === 2 ? "on" : ""} onClick={(e) => onSelectStep(e, 2)}><span className="num">02</span> 서비스 신청</button></li>
                            <li><button className={step === 3 ? "on" : ""} onClick={(e) => onSelectStep(e, 3)}><span className="num">03</span> 서비스 진행</button></li>
                            <li><button className={step === 4 ? "on" : ""} onClick={(e) => onSelectStep(e, 4)}><span className="num">04</span> 서비스 완료</button></li>
                        </ul>
                    </div>
                    <h2>서비스 신청 목록</h2>
                    <div className="table">
                        <div className="table_btn">
                            <button className={dateType === "ALL" ? "on" : ""} onClick={onSearchByDate}>전체</button>
                            <button className={dateType === "TODAY" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "TODAY") }}>당일</button>
                            <button className={dateType === "WEEK" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "WEEK") }}>1주일</button>
                            <button className={dateType === "MONTH" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "MONTH") }}>1개월</button>
                            <button className={dateType === "3MONTH" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "3MONTH") }}>3개월</button>
                            <div className="filter">
                                <p><select name="year" value={year} onChange={(e) => { setYear(e.target.value) }} className="year">
                                    {YearOption}
                                </select></p>
                                <p><select name="month" value={month} onChange={(e) => { setMonth(e.target.value) }} className="month">
                                    {MonthOption}
                                </select></p>
                            </div>
                            <button className="search" onClick={(e) => { onSearchByDate(e, "SELECT") }}>조회</button>
                        </div>
                        <table>
                            <colgroup>
                                <col width="6%" />
                                <col width="20%" />
                                <col width="13%" />
                                <col width="11%" />
                                <col width="11%" />
                                <col width="12%" />
                                <col width="12%" />
                                <col width="15%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th><th>제목</th><th>신청자</th><th>진행</th><th>상태</th><th>등록일시</th><th>수정일시</th><th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ServiceItemRows}
                            </tbody>
                        </table>
                        <div className="page_num">
                            <span className="inner_num">
                                <a href='#!' className="first" onClick={(e) => onPage(e, 1)}> </a>
                                <a href='#!' className="prev" onClick={(e) => onPagePrev(e)}> </a>
                                {PageList}
                                <a href='#!' className="next" onClick={(e) => onPageNext(e)}> </a>
                                <a href='#!' className="last" onClick={(e) => onPage(e, serviceItems.totalPage)}> </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}