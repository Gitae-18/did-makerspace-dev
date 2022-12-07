import React, { useState, useEffect, useCallback } from 'react';
import { CommonHeader, PreUri, Method, ConvertRegNumber, ConvertPhoneNumber, PageMax } from '../../../CommonCode';
import SideNavi from './SideNavi';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { COMPANY_ITEM } from "../../../store/management";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

export default function ({ query }) {
    const location = useLocation();
    const history = useNavigate();
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
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
        const limitCount = 10;
        let requri = PreUri + '/company?page=' + pageNumber + '&limit=' + limitCount;
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
        e.preventDefault();
        const curPageGrp = Math.ceil(items.pageOffset / PageMax);
        if (curPageGrp > 0) {
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history((location.pathname+location.search+location.hash) + '?page=' + items.pageOffset + querySearch);
        }
    }, [history, items, search]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = items.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(items.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
            const querySearch = (search.length > 0) ? ("&search=" + search) : "";
            history((location.pathname+location.search+location.hash)+ '?page=' + (newPageOffset + 1) + querySearch);
        }
    }, [history, items, search]);

    const onSelectItem = useCallback((e, i) => {
        e.preventDefault();
        dispatch({ type: COMPANY_ITEM, target: items.items[i] });
        history((location.pathname+location.search+location.hash) + '?edit=1');
    }, [items, dispatch, history]);

    const onSearch = useCallback((e) => {
        const addQuery = (search.length > 0) ? ("?search=" + search) : "";
        history((location.pathname+location.search+location.hash) + addQuery);
    }, [search, history]);

    const ItemRow = useCallback((props) => {
        return (<>
            <tr>
                <th rowSpan="3" onClick={props.onClick}><span>{props.name}</span></th>
                <th>소재지</th>
                <td colSpan="3">{props.address}</td>
            </tr>
            <tr>
                <th>사업자등록번호</th>
                <td className="num">{props.regNumber}</td>
                <th>대표 담당자</th>
                <td>{props.userName}</td>
            </tr>
            <tr>
                <th>전화번호</th>
                <td className="num">{props.telephone}</td>
                <th>등록일</th>
                <td className="num">{props.regDate}</td>
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
                    address={item.address}
                    regNumber={ConvertRegNumber(item.registration_number)}
                    telephone={ConvertPhoneNumber(item.telephone_number)}
                    regDate={item.created_at.substr(0, 10)}
                    userName={item.user ? item.user.name : ''}
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

    return (
        <div id="wrap" className="wrap management1">
            <div className="content_wrap">
                <SideNavi location={location} history={history} />
                <div className="content">
                    <div className="table">
                        <div className="search_box">
                            <input type="text" value={search} name="search" onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') { onSearch(e) } }} />
                            <button onClick={onSearch}></button>
                        </div>
                        <table>
                            <colgroup>
                                <col width="14%" />
                                <col width="15%" />
                                <col width="28%" />
                                <col width="15%" />
                                <col width="28%" />
                            </colgroup>
                            <tbody>
                                {ItemRows}
                            </tbody>
                        </table>
                        <button className="btn_apply" onClick={() => { history('/management?reg=1',{replace:true}) }}>신규 등록</button>
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
