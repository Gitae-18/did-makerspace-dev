import React, { useState, useEffect, useCallback } from 'react';
import { CommonHeader, PreUri, Method, PageMax } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { EQUIP_ITEM } from "../../../store/management";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function ({ query }) {
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [page,setPage] = useState(1);
    const [items, setItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        limit: 0,
        pageOffset: 0,
        items: [],
    });
    const location = useLocation();
    const history = useNavigate();
    console.log(location.pathname)
    const getItemList = useCallback(async (pageNumber, searchWord) => {
        CommonHeader.authorization = token;
        const limitCount = 20;
        let requri = PreUri + '/equipment/element?page=' + pageNumber + '&limit=' + limitCount;
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
        history((location.pathname+location.search+location.hash) + '?page=' + newPageNumber + querySearch);
    }, [history, search]);

    const onPagePrev = useCallback((e) => {
     /*    const currPage = page - 1;
        if (page<=1){
          return;
        }
        if (page <= items.totalPage && page > 0) {
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history(location.pathname + '?page=' + currPage + querySearch);
        }
        setPage((n) => n - 1); */
        e.preventDefault();
        const curPageGrp = Math.ceil(items.pageOffset / PageMax);
        if (curPageGrp > 0) {
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history(location.pathname + '?page=' + items.pageOffset + querySearch);
        }
    }, [history, items, search]);

    const onPageNext = useCallback((e) => {
     /*    const currPage = page + 1;
        if (page>=items.totalPage){
         return;
       }
         if (page <= items.totalPage ) {
             const querySearch = (search.length > 0) ? ("&search=" + search) : "";
             history(location.pathname + '?page=' + currPage + querySearch);
         }
         setPage((n) => n + 1); */
        e.preventDefault();
        const newPageOffset = items.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(items.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history(location.pathname + '?page=' + (newPageOffset + 1) + querySearch);
        }
    }, [history, items, search]);

    const onSelectItem = useCallback((e, i) => {
        e.preventDefault();
        dispatch({ type: EQUIP_ITEM, target: items.items[i] });
        history((location.pathname+location.search+location.hash) + '?edit=4');
    }, [items, dispatch, history]);

    const onSearch = useCallback((e) => {
        const addQuery = (search.length > 0) ? ("?search=" + search) : "";
        history(location.pathname + addQuery);
    }, [search, history]);

    const ItemRow = useCallback((props) => {
        return (<>
            <tr>
                <td className="num">{props.index}</td>
                <td className="eng" onClick={props.onClick}><span className="more">{props.number}</span></td>
                <td className="eng">{props.name}</td>
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
                    name={item.model_name}
                    number={item.serial_number}
                    coName={item.co_name ? item.co_name : ''}
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
        <div id="wrap" className="wrap management9">
            <div className="content_wrap">
                <SideNavi location={location} history={history} />
                <div className="content">
                    <div className="table">
                        <div className="search_box">
                            <input type="text" value={search} name="search" placeholder="검색어를 입력하세요" onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') { onSearch(e) } }} />
                            <button onClick={onSearch}>검색</button>
                        </div>
                        <table>
                            <colgroup>
                                <col width="6%" />
                                <col width="22%" />
                                <col width="30%" />
                                <col width="18%" />
                                <col width="12%" />
                                <col width="12%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>관리 번호<small>(Serial No.)</small></th>
                                    <th>기자재 품목</th>
                                    <th>담당 기업</th>
                                    <th>등록일</th>
                                    <th>수정일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ItemRows}
                            </tbody>
                        </table>
                        <button className="btn_apply" onClick={() => { history('/management?reg=4') }}>신규 등록</button>
                        <div className="page_control">
                            <div className='pagination'>
                            <div>
                                <button  className="prev" onClick={(e) => onPagePrev(e)}> &lt;</button>
                                {PageList}
                                <button  className="next" onClick={(e) => onPageNext(e)}> &gt;</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}