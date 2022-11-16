import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method, StatusCode, ConvertPhoneNumber } from '../../../CommonCode';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_CATEGORY, SET_RECORD, SET_MATERIAL_PAGEINFO, SET_LIST_PAGEINFO } from "../../../store/material";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import SideNavi from './SideNavi';

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function ({query}) {
	const PageMax = 10;
	const mountedRef = useRef(true);
	const dispatch = useDispatch();
	const location = useLocation();
    const history = useNavigate();
	const { token } = useSelector(state => state.user);
	const { material, listPageNo, listPageOffset, listSearchYear, listSearchMonth } = useSelector(state => state.material);
    const [year, setYear] = useState(0);
	const [month, setMonth] = useState(0);
    const [items, setItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        offset: 0,
        limit: 0,
        pageOffset: 0,
        items: [],
    });

	const [topInfo, setTopInfo] = useState({
		quantity: '',
		company: '',
		name: '',
		email: '',
		phoneNumber: '',
		representInfo: null
	});

	const getTopInfo = useCallback(async (item) => {
		CommonHeader.authorization = token;
		const response = await fetch(PreUri + '/user/represent/' + item.company_no, {
			method: Method.get,
			headers: CommonHeader
		});

		if (!response.ok) {
			console.log('잘못된 접근입니다.');
			return;
		}

		const json = await response.json();
		setTopInfo(topInfo => ({
			...topInfo,
			quantity: item.quantity + ' ' + item.unit,
			company: json.co_name,
			name: json.name,
			email: json.email,
			phoneNumber: json.phone_number ? ConvertPhoneNumber(json.phone_number) : '',
		}));
	}, [token]);

    const getItemList = useCallback(async (pageNumber, newPageOffset, item, year, month) => {
		CommonHeader.authorization = token;
        const limitCount = 20;
        let requri = PreUri + '/material/usage/item/' + item.material_item_no + '?page=' + pageNumber + '&limit=' + limitCount;
		if (Number(year) > 0) {
			let startDate = new Date(year + '-' + (Number(month) > 0 ? month : 1));
			let endDate = new Date(year + '-' + (Number(month) > 0 ? month : 12));
			endDate.setMonth(endDate.getMonth() + 1);
			endDate.setDate(endDate.getDate() - 1);
			requri += "&sdate=" + startDate + "&edate=" + endDate;
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
		// console.log(json);

		if (!mountedRef.current) { return }
		setItems(items => ({
			...items,
			totalCount: Number(json.total_count),
			totalPage: Number(json.total_page),
			currentPage: Number(json.current_page),
			offset: Number(json.offset),
			limit: Number(json.limit),
			pageOffset: newPageOffset,
			items: json.items,
		}));

        dispatch({
            type: SET_LIST_PAGEINFO,
			target: { pageNo: pageNumber, pageOffset: newPageOffset, year, month }
        });
    }, [token, dispatch]);

	useEffect(() => {
        if (material) {
			//console.log(material);
			getTopInfo(material);
			getItemList(listPageNo, listPageOffset, material, listSearchYear, listSearchMonth);
			if (listSearchYear) { setYear(listSearchYear) }
			if (listSearchMonth) { setMonth(listSearchMonth) }
        } else {
            history('/mmaterial',{replace:true})
		}

		return () => {
			mountedRef.current = false
		}
	}, [getTopInfo, getItemList, material, history])

    const onSelectItem = useCallback((e, i) => {
		e.preventDefault();
		// console.log(items.items[i])
		// if (items.items[i].sortation === 'USE' || items.items[i].status === 'END' || items.items[i].status === 'REJ') { return; }

		let copy = {
			...items.items[i],
			categoryName : material.material_category ? material.material_category.name : '미지정',
			materialName : material.name,
			unit: material.unit,
        };

		dispatch({ type: SET_RECORD, target: copy });
        history('/mmaterial?view=item');
        // dispatch({ type: CHANGE_PAGE, target: PAGE_VIEW.EDIT });
    }, [items, material, history, dispatch]);

    const onPage = useCallback((e, newPageNumber) => {
        e.preventDefault();
        const pageOffset = (newPageNumber === 1) ? 0 :
            (newPageNumber === items.totalPage) ?
                (Math.ceil(items.totalPage / PageMax) - 1) * PageMax :
				items.pageOffset;

		getItemList(newPageNumber, pageOffset, material, listSearchYear, listSearchMonth);
	}, [getItemList, items, material, listSearchYear, listSearchMonth]);

    const onPagePrev = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = items.pageOffset - PageMax;
        const curPageGrp = Math.ceil(items.pageOffset  / PageMax);

        if (curPageGrp > 0) {
			getItemList(items.pageOffset, newPageOffset, material, listSearchYear, listSearchMonth);
		}
	}, [getItemList, items, material, listSearchYear, listSearchMonth]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = items.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(items.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
			getItemList(newPageOffset + 1, newPageOffset, material, listSearchYear, listSearchMonth);
        }
	}, [getItemList, items, material, listSearchYear, listSearchMonth]);

    const onCategory = useCallback((e, index) => {
		dispatch({ type: CHANGE_CATEGORY, target: index });
        dispatch({ type: SET_MATERIAL_PAGEINFO, target: { pageNo: 1, pageOffset: 0, search: '' } });
		dispatch({ type: SET_LIST_PAGEINFO, target: { pageNo: 1, pageOffset: 0, year: '0', month: '0' } });

		history('/mmaterial');
	}, [dispatch, history]);

    const ItemRow = useCallback((props) => {
		return (<>
            <tr>
				<td className="num">{props.index}</td>
				<td>{props.sortation}</td>
				<td className="num" style={{ whiteSpace: 'nowrap' }}>{props.quantity}</td>
                <td>{StatusCode[props.status]}</td>
				<td onClick={props.onClick} className="tit"><span className="more">{props.content}</span></td>
				<td style={{whiteSpace:'nowrap'}} >{props.createdUser}</td>
				{/* <td className="num">{ConvertDate2(props.createDate)}</td> */}
				<td className="num">{props.createDate.substr(0, 10)}</td>
				<td className="num">{(props.status === 'END' || props.status === 'REJ') ? props.updateDate.substr(0, 10) : '-'}</td>
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
                    sortation={item.sortation === 'BUY' ? '구매 요청' : '재자 사용'}
					content={item.sortation === 'BUY' ? item.status === 'REJ' ? item.reject_content : item.request_content : '[ 서비스 진행 ]'}
					quantity={item.quantity}
					status={item.status}
					createDate={item.created_at}
					updateDate={item.updated_at}
					createdUser={item.user ? item.user.company ? item.user.company.name : '-' : '-'}
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

	const onSearchByDate = useCallback((e) => {
        e.preventDefault();
		if (Number(year) === 0 && Number(month) > 0) {
			alert("연도를 선택해주세요");
			return;
		}

		getItemList(1, 0, material, year, month);
    }, [getItemList, material, year, month]);

	var dt = new Date();
    var com_year = dt.getFullYear();
	let YearOption = [(<option value={0} key={0}>연도</option>)];
    for (let i = com_year; i >= (com_year - 10); i--) { YearOption.push(<option value={i} key={i}>{i + " 년"}</option>) }

    let MonthOption = [(<option value={0} key={0}>월</option>)];
    for (let i = 1; i <= 12; i++) { MonthOption.push(<option value={i} key={i}>{i + " 월"}</option>) }
	
	return (
		<div id="wrap" className="wrap materials1">
			<div className="content_wrap">
				<SideNavi location={location} history={history} onCategory={onCategory} />
				<div className="content">
					<h2>{material ? ((material.material_category ? material.material_category.name : '미지정') + ' - ' + material.name) : '-'}</h2>
					<div className="status">
						<div className="table_btn">
							<div className="filter">
								<p><select name="year" value={year} onChange={(e) => { setYear(e.target.value) }} className="year">
									{YearOption}
								</select></p>
								<p><select name="month" value={month} onChange={(e) => { setMonth(e.target.value) }} className="month">
									{MonthOption}
								</select></p>
							</div>
							<button className="search" onClick={onSearchByDate}>조회</button>
						</div>
						<table>
							<colgroup>
								<col width="12%" />
								<col width="38%" />
								<col width="12%" />
								<col width="38%" />
							</colgroup>
							<thead>
								<tr>
									<th>재고 현황</th>
									<td colSpan="3" className="num">{topInfo.quantity}</td>
								</tr>
								<tr>
									<th>담당자</th><td>{topInfo.name}</td>
									<th>기업명</th><td>{topInfo.company}</td>
								</tr>
								<tr>
									<th>이메일</th>
									<td className="eng">{topInfo.email}</td>
									<th>전화번호</th>
									<td className="num">{topInfo.phoneNumber}</td>
								</tr>
							</thead>
						</table>
					</div>
					<div className="table">
						<table>
							<colgroup>
								<col width="6%" />
								<col width="9%" />
								<col width="10%" />
								<col width="6%" />
								<col width="33%" />
								<col width="16%" />
								<col width="10%" />
								<col width="10%" />
							</colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th>구분</th>
									<th>수량</th>
									<th>상태</th>
									<th>내용</th>
									<th>등록자</th>
									<th>등록일</th>
									<th>종료일</th>
								</tr>
							</thead>
							<tbody>
								{ItemRows}
							</tbody>
						</table>
                        <button className="btn_apply" onClick={() => history('/mmaterial?view=reg')} >자재 신청</button>
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
