import React, { useState, useEffect, useCallback } from 'react';
import { CommonHeader, PreUri, Method, getFormatDate, PageMax } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { OLD_SERVICE_ITEM } from "../../../store/management";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

function makeQuery(search, dateType, year, month) {

    const search_text = (search.length > 0) ? ("search=" + search) : "";
    const search_dt = "dt=" + dateType;
    const search_year = "year=" + year;
    const search_month = "month=" + month;

    let query = search_text;
    if (dateType > 0 && year > 0) {
        query += ((query.length > 0) ? "&" : "") + search_dt;
        query += ((query.length > 0) ? "&" : "") + search_year;
        if (month > 0) {
            query += ((query.length > 0) ? "&" : "") + search_month;
        }
    }

    return query;
}

export default function ({  query }) {
	const { token } = useSelector(state => state.user);
    const {location} = useLocation;
    const history = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [dateType, setDateType] = useState(0);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [items, setItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        limit: 0,
        pageOffset: 0,
        items: [],
    });

    const getItemList = useCallback(async (pageNumber, searchWord, dateType, year, month) => {
        CommonHeader.authorization = token;
        const limitCount = 20;
        let requri = PreUri + '/oldservice?page=' + pageNumber + '&limit=' + limitCount;

        if (dateType > 0 && year > 0) {
            let startDate = new Date(year + '-' + (month > 0 ? month : 1));
            let endDate = new Date(year + '-' + (month > 0 ? month : 12));
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(endDate.getDate() - 1);

            // dateType : 1 은 신청일 2는 종료일
            requri += "&datetype=" + dateType;
            requri += "&sdate=" + getFormatDate(startDate) + "&edate=" + getFormatDate(endDate);
        }

        if (searchWord && searchWord.length > 0) { 
            requri += ("&search=" + searchWord); 
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
		setItems(items => ({
            ...items,
            totalCount: Number(json.total_count),
            totalPage,
            currentPage,
            limit: Number(json.limit),
            pageOffset: (pageOffset < 1 ? 0 : (pageOffset - 1) * PageMax),
            items: json.items,
        }));
    }, [token]);

    useEffect(() => {
        setSearch(query.search ? query.search : '');
        setDateType(query.dt ? query.dt : 0);
        setYear(query.year ? query.year : 0);
        setMonth(query.month ? query.month : 0);

        getItemList(query.page ? query.page : 1, query.search, query.dt, query.year, query.month);
    }, [getItemList, query])

    const onPage = useCallback((e, newPageNumber) => {
        e.preventDefault();
        let addQuery = makeQuery(search, dateType, year, month);
        addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
        history((location.pathname+location.search+location.hash) + '?page=' + newPageNumber + addQuery);
    }, [history, search, dateType, year, month]);

    const onPagePrev = useCallback((e) => {
        e.preventDefault();
        const curPageGrp = Math.ceil(items.pageOffset / PageMax);
        if (curPageGrp > 0) {
            let addQuery = makeQuery(search, dateType, year, month);
            addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
            history((location.pathname+location.search+location.hash) + '?page=' + items.pageOffset + addQuery);
        }
    }, [history, items, search, dateType, year, month]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = items.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(items.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
            let addQuery = makeQuery(search, dateType, year, month);
            addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
            history((location.pathname+location.search+location.hash) + '?page=' + (newPageOffset + 1) + addQuery);
        }
    }, [history, items, search, dateType, year, month]);

    const onSelectItem = useCallback((e, i) => {
        e.preventDefault();
        dispatch({ type: OLD_SERVICE_ITEM, target: items.items[i] });
        history((location.pathname+location.search+location.hash) + '?edit=8');
    }, [items, dispatch, history]);

    const onSearch = useCallback((e) => {
        let addQuery = makeQuery(search, dateType, year, month);
        addQuery = (addQuery.length > 0) ? "?" + addQuery : "";
        history((location.pathname+location.search+location.hash) + addQuery);
    }, [search, dateType, year, month, history]);

    const dt = new Date();
    const com_year = dt.getFullYear();
    const YearOption = [(<option value={0} key={0}>연도</option>)];
    for (let i = com_year; i >= (com_year - 5); i--) { YearOption.push(<option value={i} key={i}>{i + " 년"}</option>) }

    let MonthOption = [(<option value={0} key={0}>월</option>)];
    for (let i = 1; i <= 12; i++) { MonthOption.push(<option value={i} key={i}>{i + " 월"}</option>) }

    const ItemRow = useCallback((props) => {
		return (<>
			<tr>
                <td className="num">{props.index}</td>
                <td onClick={props.onClick}><span className="more">{props.title}</span></td>
                <td>{props.field}</td>
                <td>{props.customer}</td>
                <td>{props.companyName}</td>
                <td className="num">{props.registrationDate}</td>
                <td className="num">{props.completionDate}</td>
			</tr>
        </>);
    }, []);

	let ItemRows = [];
    if (items.totalCount > 0) {
        for (let i = 0; i <= items.items.length && i < items.limit; i++) {
            const item = items.items[i];
            const rowNumber = items.totalCount - i - (items.currentPage - 1) * items.limit;
            if (rowNumber < 1) { break; }

            ItemRows.push(
                <ItemRow index={rowNumber}
                    title={item.application_title}
                    field={item.application_field}
                    customer={item.customer}
                    companyName={item.company.name}
                    registrationDate={item.registration_date.substr(0, 10)}
                    completionDate={item.completion_date.substr(0, 10)}
                    updatedDate={item.updated_at.substr(0, 10)}
                    onClick={(e) => onSelectItem(e, i)}
                    key={i} />);
        };
    }

    let PageList = [];
    for (let i = 0; i < PageMax; i++) {
        let pageNum = i + 1 + items.pageOffset;
        if (pageNum > items.totalPage) { break; }
        PageList.push(<a href='#!' onClick={(e) => onPage(e, pageNum)}
            className={pageNum === items.currentPage ? "active" : ""}
            key={i}>{pageNum}</a>);
    }

    const DateTypeOption = [
        (<option value={0} key={0}>선택</option>),
        (<option value={1} key={1}>신청일</option>),
        (<option value={2} key={2}>종료일</option>)
    ]

    return (
		<div id="wrap" className="wrap management12">
			<div className="content_wrap">
                <SideNavi location={location} history={history} />
				<div className="content">
                    <h2>2020년 자료 관리</h2>
					<div className="table">
                        <div className="search_box" >
                            <div className="filter">
                                <p><select name="dateType" value={dateType} onChange={(e)=>{setDateType(e.target.value)}}>
                                    {DateTypeOption}
                                </select></p>
                                <p><select name="year" value={year} onChange={(e)=>{setYear(e.target.value)}} className="year">
                                    {YearOption}
                                </select></p>
                                <p><select name="month" value={month} onChange={(e)=>{setMonth(e.target.value)}} className="month">
                                    {MonthOption}
                                </select></p>
                            </div>
                            <input type="text" value={search} name="search" onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') { onSearch(e) } }} />
                            <button onClick={onSearch}></button>
                        </div>
						<table>
							<colgroup>
								<col width="6%" />
								<col width="30%" />
								<col width="14%" />
								<col width="13%" />
								<col width="13%" />
								<col width="11%" />
								<col width="11%" />
							</colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th>지원 서비스</th>
									<th>지원 분야</th>
									<th>신청자명</th>
									<th>담당기업</th>
									<th>신청일</th>
									<th>종료일</th>
								</tr>
							</thead>
							<tbody>
								{ItemRows}
							</tbody>
						</table>
                        <button className="btn_apply" onClick={() => { history('/management?reg=8') }}>신규 등록</button>
						<div className="page_num">
                            <span className="inner_num">
                                <a href='#!' className="first" onClick={(e) => onPage(e, 1)}> </a>
                                <a href='#!' className="prev" onClick={(e) => onPagePrev(e)}> </a>
                                {PageList}
                                <a href='#!' className="next" onClick={(e) => onPageNext(e)}> </a>
                                <a href='#!' className="last" onClick={(e) => onPage(e, items.totalPage)}> </a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
