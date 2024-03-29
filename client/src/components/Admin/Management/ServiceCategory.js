import React, { useState, useEffect, useCallback } from 'react';
import { CommonHeader, PreUri, Method, PageMax } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { SERVICE_CATEGORY_ITEM } from "../../../store/management";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function ({ query }) {
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();
    const [search, setSearch] = useState('');
    const [items, setItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        limit: 0,
        pageOffset: 0,
        items: [],
    });

    const getItemList = useCallback(async (pageNumber, searchWord) => {
        CommonHeader.authorization = token;
        const limitCount = 20;
        let requri = PreUri + '/service/category/list?page=' + pageNumber + '&limit=' + limitCount;
        if (searchWord && searchWord.length > 0) { requri += ("&search=" + searchWord); }

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
        getItemList(query.page ? query.page : 1, query.search);
        setSearch(query.search ? query.search : '');
    }, [getItemList, query])

    const onPage = useCallback((e, newPageNumber) => {
        e.preventDefault();
        const querySearch = (search.length > 0) ? ("&search=" + search) : "";
        history((location.pathname) + '?page=' + newPageNumber + querySearch);
    }, [history, search]);

    const onPagePrev = useCallback((e) => {
        e.preventDefault();
        const curPageGrp = Math.ceil(items.pageOffset / PageMax);
        if (curPageGrp > 0) {
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history((location.pathname) + '?page=' + items.pageOffset + querySearch);
        }
    }, [history, items, search]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = items.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(items.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history((location.pathname) + '?page=' + (newPageOffset + 1) + querySearch);
        }
    }, [history, items, search]);

    const onSelectItem = useCallback((e, i) => {
        e.preventDefault();
        dispatch({ type: SERVICE_CATEGORY_ITEM, target: items.items[i] });
        history((location.pathname) + '?edit=5');
    }, [items, dispatch, history]);

    const onSearch = useCallback((e) => {
        const addQuery = (search.length > 0) ? ("?search=" + search) : "";
        history(location.pathname + addQuery);
    }, [search, history]);

    const ItemRow = useCallback((props) => {
        return (<>
            <tr>
                <td className="num">{props.index}</td>
                <td onClick={props.onClick}><span className="more">{props.name}</span></td>
                <td>{props.coName}</td>
                <td className="num">{props.regDate}</td>
                <td className="num">{props.updateDate}</td>
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
                    name={item.service_name}
                    coName={item.co_name ? item.co_name : '-'}
                    regDate={item.created_at.substr(0, 10)}
                    updateDate={item.updated_at.substr(0, 10)}
                    onClick={(e) => onSelectItem(e, i)}
                    key={i} />);
        };
    }

    let PageList = [];
    for (let i = 0; i < PageMax; i++) {
        let pageNum = i + 1 + items.pageOffset;
        if (pageNum > items.totalPage) { break; }
        PageList.push(<button href='#!' onClick={(e) => onPage(e, pageNum)}
            className={pageNum === items.currentPage ? "active" : ""}
            key={i}>{pageNum}</button>);
    }

    return (
        <div id="wrap" className="wrap management12">
            <div className="content_wrap">
                <SideNavi location={location} history={history} />
                <div className="content">
                    <div className="table">
                        <div className="search_box">
                            <input type="text" value={search} name="search" placeholder="서비스명을 입력하세요" onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') { onSearch(e) } }} />
                            <button onClick={onSearch}>검색</button>
                        </div>
                        <table>
                            <colgroup>
                                <col width="6%" />
                                <col width="34%" />
                                <col width="18%" />
                                <col width="21%" />
                                <col width="21%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>서비스 명</th>
                                    <th>담당 기업</th>
                                    <th>등록일</th>
                                    <th>수정일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ItemRows}
                            </tbody>
                        </table>
                        <button className="btn_apply" onClick={() => { history('/management?reg=5') }}>신규 등록</button>
                        <div className="page_control">
                            <div className='pagination'>
                            <div>
                                <button href='#!' className="prev" onClick={(e) => onPagePrev(e)}> &lt;</button>
                                {PageList}
                                <button href='#!' className="next" onClick={(e) => onPageNext(e)}> &gt;</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}