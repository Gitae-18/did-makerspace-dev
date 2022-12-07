import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method/*, StatusCode, ConvertPhoneNumber, ConvertDate2, getFormatDate*/ } from '../../../CommonCode';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_CATEGORY, SET_MATERIAL, SET_MATERIAL_PAGEINFO, SET_LIST_PAGEINFO } from "../../../store/material";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import SideNavi from './SideNavi';

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function ({query}) {
    const PageMax = 10;
    const mountedRef = useRef(true);
    const location = useLocation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user);
    //console.log('1 met =  ' + token);
    const { categoryList, categoryIndex, materialPageNo, materialPageOffset, materialSearch } = useSelector(state => state.material);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        offset: 0,
        limit: 0,
        pageOffset: 0,
        items: [],
    });
    const getItemList = useCallback(async (pageNumber, newPageOffset, categoryNo, searchWord) => {
        CommonHeader.authorization = token;

        if (!token) { return; }
        const limitCount = 20;
        let requri = PreUri + '/material/item/?page=' + pageNumber + '&limit=' + limitCount;
         if (searchWord && searchWord.length > 0) { requri += ("&search=" + searchWord); }
		if (categoryNo > -1) { requri += ("&category=" + categoryNo); }

        const response = await fetch(requri, {
            method: Method.get,
            headers: CommonHeader
        });

		if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
		}

        const json = await response.json();
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
            type: SET_MATERIAL_PAGEINFO,
            target: {
                pageNo: pageNumber,
                pageOffset: newPageOffset,
                search: (searchWord && searchWord.length > 0) ? searchWord : ''
            }
        });
	}, [token, dispatch]);

    /*
    useEffect(() => {
		getItemList(
            materialPageNo, 
            materialPageOffset,
            categoryList[categoryIndex].no,
            materialSearch);
        if (materialSearch) { setSearch(materialSearch); }
        return () => {
            mountedRef.current = false
        }
	}, [getItemList])
    */

    useEffect(() => {
		getItemList(
            materialPageNo, 
            materialPageOffset,
            categoryList[categoryIndex].no,
            materialSearch);
        if (materialSearch) { setSearch(materialSearch); }
        return () => {
            mountedRef.current = false;
        }
	}, [token])

    const onPage = useCallback((e, newPageNumber) => {
        e.preventDefault();
        const pageOffset = (newPageNumber === 1) ? 0 :
            (newPageNumber === items.totalPage) ?
                (Math.ceil(items.totalPage / PageMax) - 1) * PageMax :
                items.pageOffset;
		getItemList(newPageNumber, pageOffset, categoryList[categoryIndex].no, materialSearch);
	}, [getItemList, items.totalPage, items.pageOffset, categoryIndex, categoryList, materialSearch]);

    const onPagePrev = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = items.pageOffset - PageMax;
        const curPageGrp = Math.ceil(items.pageOffset  / PageMax);

        if (curPageGrp > 0) {
			getItemList(items.pageOffset, newPageOffset, categoryList[categoryIndex].no, materialSearch);
        }
	}, [getItemList, items, categoryList, categoryIndex, materialSearch]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = items.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(items.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
			getItemList(newPageOffset + 1, newPageOffset, categoryList[categoryIndex].no, materialSearch);
        }
	}, [getItemList, items, categoryList, categoryIndex, materialSearch]);

    const onCategory = useCallback((e, index) => {
		dispatch({ type: CHANGE_CATEGORY, target: index });
        dispatch({ type: SET_MATERIAL_PAGEINFO, target: { pageNo: 1, pageOffset: 0, search: '' } });
        setSearch('');
		getItemList(1, 0, categoryList[index].no);
	}, [dispatch, categoryList, getItemList]);

    const onSelectItem = useCallback((e, item) => {
        e.preventDefault();
        dispatch({ type: SET_MATERIAL, target: item });
		dispatch({ type: SET_LIST_PAGEINFO, target: { pageNo: 1, pageOffset: 0, year: '0', month: '0' } });
        history( (location.pathname+location.search+location.hash) + '?view=list');
    }, [dispatch, history]);

    const onChange = useCallback((e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }, [setSearch]);

    const onSearch = useCallback((e) => {
		getItemList(1, 0, categoryList[categoryIndex].no, search);
    }, [search, getItemList, categoryList, categoryIndex]);

    const ItemRow = useCallback((props) => {
		return (<>
            <tr>
                <td onClick={props.onClick} className="num"><span className="more">{props.index}</span></td>
                <td onClick={props.onClick}><span className="more">{props.categoryName ? props.categoryName : '-'}</span></td>
                <td onClick={props.onClick}><span className="more">{props.name}</span></td>
                <td className="num">{props.quantity}</td>
                <td>{props.coName}</td>
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
                    name={item.name}
                    email={item.email}
                    categoryName={item.material_category ? item.material_category.name : undefined}
                    coName={item.company ? item.company.name : '-'}
                    quantity={item.quantity}
                    onClick={(e) => onSelectItem(e, item)}
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

	return (
		<div id="wrap" className="wrap materials1">
			<div className="content_wrap">
                <SideNavi location={location} history={history} onCategory={onCategory} />
				<div className="content">
					
					<div className="status">
						<div className="search_box">
                            <input type="text" name="search" value={search} onChange={onChange} onKeyPress={(e) => { if (e.key === 'Enter') { onSearch(e) } }} />
                            <button onClick={onSearch}></button>
                        </div>
					</div>
					<div className="table">
						<table>
							<colgroup>
								<col width="6%" />
								<col width="20%" />
								<col width="40%" />
								<col width="12%" />
								<col width="22%" />
							</colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th>구분</th>
									<th>원자재 명</th>
									<th>재고</th>
									<th>담당 기업</th>
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
