import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from 'react-router';
import { CommonHeader, PreUri, Method, ProgressCode,StatusCode } from '../../CommonCode';
import UServiceNavi from './ServiceNavi';
import '../../css/common-s.css';
import '../../css/style-s.css';
import SubSideMenu from '../contents/SubSideMenu';
import Menu from '../Menu';
export default function () {
    const PageMax = 5;
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    let ServiceItemRows = [];
    let PageList = [];

    const [serviceItems, setServiceItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        offset: 0,
        limit: 0,
        pageOffset: 0,
        items: [],
    });

    const mountedRef = useRef(true)

    const getServiceList = useCallback(async (pageNumber, newPageOffset) => {
        CommonHeader.authorization = token;
        const limitCount = 20;
        const response = await fetch(PreUri + '/service?page=' + pageNumber + '&limit=' + limitCount, {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
        console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }
        
        setServiceItems(serviceItems => ({
            ...serviceItems,
            totalCount: Number(json.total_count),
            totalPage: Number(json.total_page),
            currentPage: Number(json.current_page),
            offset: Number(json.offset),
            limit: Number(json.limit),
            pageOffset : newPageOffset,
            items: json.items,
        }));
    }, [token]);

    useEffect(() => {
        getServiceList(1, 0);
        return () => {
            mountedRef.current = false
        }
    }, [getServiceList])

    const onPage = useCallback((e, newPageNumber) => {
        e.preventDefault();
        const pageOffset = (newPageNumber === 1) ? 0 :
            (newPageNumber === serviceItems.totalPage) ?
                (Math.ceil(serviceItems.totalPage / PageMax) - 1) * PageMax :
                serviceItems.pageOffset;
        getServiceList(newPageNumber, pageOffset);
    }, [getServiceList, serviceItems.totalPage, serviceItems.pageOffset]);

    const onPagePrev = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = serviceItems.pageOffset - PageMax;
        const curPageGrp = Math.ceil(serviceItems.pageOffset  / PageMax);

        if (curPageGrp > 0) {
            getServiceList(serviceItems.pageOffset , newPageOffset);
        }
    }, [getServiceList, serviceItems]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = serviceItems.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(serviceItems.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
            getServiceList(newPageOffset + 1, newPageOffset);
        }

    }, [getServiceList, serviceItems]);

    const onSelectItem = useCallback((e, index) => {
        e.preventDefault();
        const item = serviceItems.items[index];
        switch (item.progress) {
            case 'STEP_01':
                if (item.status === 'URD') {
                    history('/uservice?step=1&next=reserv&no=' + item.service_no);
                } else if (item.status === 'RUN') {
                    history('/uservice?step=1&next=notyet&no=' + item.service_no);
                } else if (item.status === 'RES') {
                    history('/uservice?step=1&next=res&no=' + item.service_no);
                } else if (item.status === 'REJ') {
                    history('/uservice?step=1&next=rej&no=' + item.service_no);
                }
                break;
            case 'STEP_02':
                if (item.status === 'URD' || item.status === 'RUN' || item.status === 'EVA') {
                    history('/uservice?step=2&next=urd&no='+item.service_no);
                } else if (item.status === 'REJ'){
                    history('/uservice?step=2&next=rej&no='+item.service_no);
                }
                break;
            case 'STEP_03':
                    history('/uservice?step=3&no='+item.service_no);
                break;
            case 'STEP_04':
                    history('/uservice?step=4&no='+item.service_no);
                break;
            default:
        }
    }, [serviceItems.items, history]);


    const onSurvey = useCallback((e, index) => {
        e.preventDefault();
        const item = serviceItems.items[index];
        if (item.progress === 'STEP_04') {
            history('/uservice?step=5&no=' + item.service_no);
        }
    }, [serviceItems.items, history]);

    const onServiceApp = useCallback((e, index) => {
        e.preventDefault();
        const item = serviceItems.items[index];
        if (item.progress === 'STEP_01' && item.status === 'RES') {
            history('/uservice?step=2&next=app&no=' + item.service_no);
        } else if (item.progress === 'STEP_01' && item.status === 'URD') {
            history('/uservice?step=1&next=edit&no=' + item.service_no);
        } else if (item.progress === 'STEP_02' && item.status === 'URD') {
            history('/uservice?step=2&next=urd&no=' + item.service_no);
        }
    }, [serviceItems.items, history]);

    for (let i = 0; i < PageMax; i++) {
        let pageNum = i + 1 + serviceItems.pageOffset;
        if (pageNum > serviceItems.totalPage) { break; }
        PageList.push(<a href='#!' onClick={(e) => onPage(e, pageNum)}
            className={pageNum === serviceItems.currentPage ? "active" : ""}
            key={i}>{pageNum}</a>);
    }

    const ServiceItemRow = useCallback((props) => {
        return (<>
            <tr>
                <td className="num">{props.index}</td>
                <td className="tit" onClick={props.onClick}>{props.title}</td>
                <td>{ProgressCode[props.progress]}</td>
                <td>{StatusCode[props.status]}</td>
                <td className="num">{props.requestDate}</td>
                {/* <td className="num">{props.updateDate}</td> */}
                {(props.progress === 'STEP_04' && props.status === 'END')
                    ? <td className="btn" onClick={props.onSurvey}><button>설문지 작성</button></td>
                    : (props.progress === 'STEP_01' && props.status === 'RES')
                        ? <td className="btn" onClick={props.onServiceApp}><button>서비스 신청</button></td>
                        : (props.progress === 'STEP_01' && props.status === 'URD')
                            ? <td className="btn" onClick={props.onServiceApp}><button>상담신청 수정</button></td>
                            : (props.progress === 'STEP_02' && props.status === 'URD')
                                ? <td className="btn" onClick={props.onServiceApp}><button>서비스신청 수정</button></td>
                                : <td />
                }
            </tr>
        </>);
    }, []);

    if (serviceItems.totalCount > 0) {
        for (let i = 0; i <= serviceItems.items.length && i < serviceItems.limit; i++) {
            const item = serviceItems.items[i];
            const rowNumber = serviceItems.totalCount - i - (serviceItems.currentPage - 1) * serviceItems.limit;
            if (rowNumber < 1) { break; }

            ServiceItemRows.push(
                <ServiceItemRow index={rowNumber}
                    title={item.title}
                    requestDate={item.created_at.substring(0, 10)}
                    // updateDate={item.updated_at.substring(0, 10)}
                    progress={item.progress}
                    status={item.status}
                    onClick={(e) => onSelectItem(e, i)}
                    onSurvey={(e) => onSurvey(e, i)}
                    onServiceApp={(e) => onServiceApp(e, i)}
                    key={i} />);
        };
    }

    return (
        <>
        <div id="wrap" className='wrap utilize1'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <SubSideMenu title={"시제품제작"} subtitle={"시제품 제작신청"}/>
                    <div className='under'>
                    <div className="top_menu">
                        <UServiceNavi step={0} />
                    </div>

                    <p className="info">서비스 이용이 처음이거나 상담이 필요하신분은 상담 신청을 통해 안내를 받으실 수 있습니다.</p>
                    <div className="table">
                        <table>
                            <colgroup>
                                <col width="6%" />
                                <col width="40%" />
                                <col width="13%" />
                                <col width="13%" />
                                <col width="13%" />
                                <col width="25%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>진행</th>
                                    <th>상태</th>
                                    <th>신청일</th>
                                    {/* <th>수정일</th> */}
                                    <th></th>
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
                    <div className="btn_box">
                        <button type="button" onClick={() => { history('/uservice?step=1'); }} className="btn_left">상담 신청</button>
                        {/* <button className="back" onClick={(e) => {history.replace('/uservice')}} >뒤로 가기</button>
                        <button onClick={(e) => { $('.pop').css('display', 'block'); }}>상담예약 취소</button> */}
                    </div>
 
                </div>
                </div>
            </div>
        </div>
        </>
    );
}
