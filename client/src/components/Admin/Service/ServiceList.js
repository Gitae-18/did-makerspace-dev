import React, { useState, useEffect, useCallback,useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation ,useParams} from 'react-router-dom';
import { CommonHeader, PreUri, Method, ProgressCode, StatusCode, PageMax, getRspMsg } from '../../../CommonCode';
import { M_SERVICE_DELETE, M_SERVICE_SET } from "../../../store/manager_service";
import SideNavi from './SideNavi';
import SubSideMenu from '../../contents/SubSideMenu';
import '../../../css/Paging.css';
import '../../../css/common-s.css';
import '../../../css/style-s.css';
import Service from '../../User/Service';
import ServiceStatics from '../Statistics/pages/Charts/Service/ServiceStastics';


function makeQuery(step, dateType, year, month, company,serviceNo) {
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
    if(company && company !== 0){
        query += ((query.length > 0)? "&":"") +"company="+ company;
    }
    return query;
}

export default function ({ query , no }) {
    const { token } = useSelector(state => state.user);
    console.log(token);
    const { authority_level } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();
    const mountedRef = useRef(true);
    const [info,setInfo] = useState("");
    const [deleted,setDeleted] = useState(false);
    const [checkValue, setCheckValue] = useState([]);
    const [serviceno,setServiceno] = useState();
	const [serviceAppItem, setServiceAppItem] = useState({
		serviceNo: '',
		name: '',
        title : '',
        progress:'',
        status : '',
	});
    const [categoryItems, setCategoryItems] = useState({
        count: 0,
        items: [],
	});
    let coName;
    let ServiceItemRows = [];
    let ServiceItemRow2 = [];
    let PageList = [];

    const [deletecol,setDeletecol] = useState('flase');
    const [companyNo,setCompanyNo] = useState(0);
    const [company,setCompany] = useState(0);
    const [step, setStep] = useState(0);
    const [dateType, setDateType] = useState("ALL");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [companyName,setCompanyName] = useState([]);
    const [serviceItems, setServiceItems] = useState({
        totalCount: 0,
        totalPage: 0,
        currentPage: 0,
        limit: 0,
        pageOffset: 0,
        items: [
            {
                co_name:" ",
            }
        ],
    });
    const getCompanyList = useCallback(async (query) =>{

        const res = await fetch(PreUri + "/company/companyno",{
            method:Method.get,
            headers:CommonHeader
        })
        const data = await res.json();
        setCompanyName(data.items);
    })


    const getServiceList = useCallback(async (query) => {
       

        const pageNumber = query.page ? query.page : 1 ;
        const company = query.company ? query.company : 0 ;
        const dt = query.dt ? query.dt : "ALL";
        const year = query.year ? query.year : 0;
        const month = query.month ? query.month : 0;
        const step = query.step ? Number(query.step) : 0;
        setDateType(query.dt ? query.dt : "ALL");
        setYear(year);
        setMonth(month);
        setStep(step);
        setCompany(company); 
   
        
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
        if(company){
           requri += "&company=" + company ;
        }
        const response = await fetch(requri, {
            method: Method.get,
            headers: CommonHeader
        });
        

        if (!response.ok) {
            console.log('????????? ???????????????.');
            return;
        }
        console.log(requri);
        const json = await response.json();
        const totalPage = Number(json.total_page);
        const currentPage = Number(json.current_page);
        const pageOffset = Math.ceil(currentPage / PageMax);
        console.log(token);
        setServiceItems(serviceItems => ({
            ...serviceItems,
            totalCount: Number(json.total_count),
            totalPage,
            currentPage,
            limit: Number(json.limit),
            pageOffset: (pageOffset < 1 ? 0 : (pageOffset - 1) * PageMax),
            items: json.items,
            categories:json.categories
        }));
        setServiceAppItem(serviceAppItem =>({
            ...serviceAppItem,
            serviceNo:json.items.map((item,i)=>item.service_no),
            name : json.items.map((item,i)=>item.username ),
            title : json.items.map((item,i)=>item.title),
            progress : json.items.map((item,i)=>item.progress),
            status: json.items.map((item,i)=>item.status)
        }))
    }, [token]);
   
    useEffect(() => {
        getServiceList(query);
        getCompanyList(query);
    }, [getServiceList, query],[getCompanyList,query] )
 
  
    const ServiceItemRow = useCallback((props) => {
           return (<>                                                                                                                                                              
            <tr id = "id">
                <td className="num"  onClick={props.onClick}>{props.index}</td>
                <td className="tit" onClick={props.onClick}>{props.title}</td>
                <td >{props.userName}</td>
                <td >{ProgressCode[props.progress]}</td>
                <td >{StatusCode[props.status]}</td>
                <td className="num" >{props.requestDate}</td>
                <td className="num" >{props.updateDate}</td>
                <td className="name" ></td>
                {(props.progress === 'STEP_01' && props.status === 'DRP') || props.progress === 'STEP_04'
                    ? <td className="btn" ><button onClick={props.onPrint}>????????? ??????</button></td>
                    : <td />
                }
                <td className="btn" ><button onClick={props.onDelete}>??????</button></td>
            </tr>
        </>);
    }, [serviceno]);
    let cal = serviceItems.items

    /* const ServiceDrop = useCallback((async(e,i,serviceno)=>{
        let copy = {...serviceItems};
        const item_no = copy.items[i].service_no;
        if(item_no > 0){
            CommonHeader.authorization = token;
            let response = await fetch(PreUri + '/service/' + no + "/service/drop",{
                method:Method.delete,
                headers: CommonHeader                
            });
            if(!response.ok){
                alert(getRspMsg(response.status));
                console.log('remove error');
                return;
            }
        }
        //serviceItems.items.filter(item=> item.service_no !== i)
        
        setServiceItems(serviceItems=>({
            ...serviceItems,
            totalCount:serviceItems.totalCount-1,
            totalPage:serviceItems.totalPage,
            currentPage:serviceItems.currentPage,
            limit: serviceItems.limit,
            pageOffset: serviceItems.pageOffset,
            items:serviceItems.items.filter(item=> item.service_no !== serviceno),
            co_name:serviceItems.co_name,
            categories:serviceItems.categorie}))
   
    }),[serviceItems,token]) */
  
    const onPage = useCallback((e, newPageNumber) => {
        e.preventDefault();

        let addQuery = makeQuery(step, dateType, year, month, company);
        addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
        history((location.pathname+location.search+location.hash) + '?page=' + newPageNumber + addQuery);
    }, [history, step, dateType, year, month,company]);

    const onPagePrev = useCallback((e) => {
        e.preventDefault();
        const curPageGrp = Math.ceil(serviceItems.pageOffset / PageMax);

        if (curPageGrp > 0) {
            let addQuery = makeQuery(step, dateType, year, month, company);
            addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
            history(location.pathname + '?page=' + serviceItems.pageOffset + addQuery);
        }
    }, [history, serviceItems, step, dateType, year, month, company]);

    const onPageNext = useCallback((e) => {
        e.preventDefault();
        const newPageOffset = serviceItems.pageOffset + PageMax;
        const curPageGrp = Math.ceil(newPageOffset / PageMax);
        const totPageGrp = Math.ceil(serviceItems.totalPage / PageMax);

        if (curPageGrp < totPageGrp) {
            let addQuery = makeQuery(step, dateType, year, month, company);
            addQuery = (addQuery.length > 0) ? "&" + addQuery : "";
            history(location.pathname + '?page=' + (newPageOffset + 1) + addQuery);
        }
    }, [history, serviceItems, step, dateType, year, month,company]);
    const onSelectItem = useCallback((e, index) => {
        e.preventDefault();
        const item = serviceItems.items[index];
        dispatch({ type: M_SERVICE_SET, target: item });
        history('/mservice/detail');
    }, [history, serviceItems, dispatch]);
   
    
    const onPrint = useCallback((e, index) => {
        e.preventDefault();
        const item = serviceItems.items[index];
        // window.open(window.location.href + '?report_no=' + item.service_no, 'report', 'width=820,height=900,location=no,status=no,scrollbars=yes');
        window.open('mservice?report_no=' + item.service_no, 'report', 'width=820,height=900,location=no,status=no,scrollbars=yes');
    }, [serviceItems]);

    const onSearchByDate = useCallback((e, dateType) => {
        e.preventDefault();
        let addQuery = makeQuery(step, dateType, year, month, company);
        addQuery = (addQuery.length > 0) ? "?" + addQuery : "";
        //history.push(window.location.pathname + addQuery);
        history(location.pathname + addQuery,{replace:true});
    }, [history, step, year, month,company]);

    const onSelectStep = useCallback((e, selstep) => {
        e.preventDefault();
        let addQuery = makeQuery(selstep, dateType, year, month, company);
        addQuery = (addQuery.length > 0) ? "?" + addQuery : "";
        // history.push(window.location.pathname + addQuery);
       history((location.pathname+location.search+location.hash) + addQuery,{replace:true});
    }, [history, dateType, year, month,company]);
    const onSelect = (e) =>{
        setCompanyNo(e.target.value);
        setCompany(e.target.value);
    }
   
    const onSelectCompany = useCallback((e) =>{
        e.preventDefault();
        let addQuery = makeQuery(step,dateType, year, month, company)
        addQuery = (addQuery.length>0)?"?" + addQuery: "";
       history((location.pathname+location.search+location.hash) + addQuery,{replace:true});
    },[history,step,dateType,year, month,company]);
    for (let i = 0; i < PageMax; i++) {
        let pageNum = i + 1 + serviceItems.pageOffset;
        if (pageNum > serviceItems.totalPage) { break; }
        PageList.push(<button href='#!' onClick={(e) => onPage(e, pageNum)}
            className={pageNum === serviceItems.currentPage ? "active" : ""}
            key={i}>{pageNum}</button>);
    }

    
    
    
 
    if (serviceItems.totalCount > 0) {
        for (let i = 0; i < serviceItems.items.length && i < serviceItems.limit; i++) {
            const item = serviceItems.items[i];
            const rowNumber = serviceItems.totalCount - i - (serviceItems.currentPage - 1) * serviceItems.limit;
            const serviceno = serviceItems.items.service_no;
            let serviceNo,title,name,progress,status;
            if (rowNumber < 1) { break;}
            ServiceItemRows.push(
                <ServiceItemRow index={rowNumber}
                    service_no = {item.service_no}
                    title={item.title}
                    userName={item.username}
                    requestDate={item.created_at.substring(0, 10)}
                    updateDate={item.updated_at.substring(0, 10)}
                    progress={item.progress}
                    status={item.status}
                    co_name={serviceItems.co_name}
                    //onDelete={(e) => onDelete(e,i)}
                   /*  ServiceDrop={(e) => ServiceDrop(e,i,serviceno)} */
                    onClick={(e) => onSelectItem(e, i)}
                    onPrint={(e) => onPrint(e, i)}
                    onDelete = {(e) =>DropItem(item.service_no,i)}
                    key={i}/>)
            };
    }
    
    const DropItem = useCallback(async(e,i)=>{

        /* for(let i = 0 ; i<ServiceItemRow.length;i++){
        serviceNum = ServiceItemRow[i][2].service_no; 
        }
        console.log(serviceNum); */
        setDeleted(true);
        CommonHeader.authorization = token;
        const service_number = e;

        const response = await fetch(PreUri + '/service/'+ service_number+'/dropitem',
            {
                method:Method.delete,
                headers:CommonHeader,
            })
            if(!response.ok){
                alert(getRspMsg(response.status));
                return;
            }
            alert("?????????????????????");
            history(0);
            /*   let item;
                for(let i = 1 ; i<serviceItems.items.length && i < serviceItems.limit;i++)
                { item = serviceItems.items[i].service_no;}
                if(item[i]===undefined )
                {
                    console.log("?????????????????? ????????????")
                }
                return item[i] */
                
        },[token,serviceItems])
      

    var dt = new Date();
    var com_year = dt.getFullYear();
    let YearOption = [(<option value={0} key={0}>??????</option>)];
    for (let i = com_year; i >= (com_year - 10); i--) { YearOption.push(<option value={i} key={i}>{i + " ???"}</option>) }

    let MonthOption = [(<option value={0} key={0}>???</option>)];
    for (let i = 1; i <= 12; i++) { MonthOption.push(<option value={i} key={i}>{i + " ???"}</option>) }
    //<button href='#!' className="first" onClick={(e) => onPage(e, 1)}>
    //<button href='#!' className="last" onClick={(e) => onPage(e, serviceItems.totalPage)}>
    return (
        <div id="wrap" className="wrap service1">
            <div className="content_wrap">
                <SubSideMenu  subtitle={"?????????????????????"}/>
                <div className="content">
                
                    <div className="top_menu">
                        <ul>
                            <li><button className={step === 0 ? "on" : ""} onClick={(e) => onSelectStep(e, 0)}><span className="num"></span> ??????</button></li>
                            <li><button className={step === 1 ? "on" : ""} onClick={(e) => onSelectStep(e, 1)}><span className="num">01</span> ????????????</button></li>
                            <li><button className={step === 2 ? "on" : ""} onClick={(e) => onSelectStep(e, 2)}><span className="num">02</span> ????????? ??????</button></li>
                            <li><button className={step === 3 ? "on" : ""} onClick={(e) => onSelectStep(e, 3)}><span className="num">03</span> ????????? ??????</button></li>
                            <li><button className={step === 4 ? "on" : ""} onClick={(e) => onSelectStep(e, 4)}><span className="num">04</span> ????????? ??????</button></li>
                        </ul>
                    </div>
                    <h2>????????? ?????? ??????</h2>
                    <select className="class" onChange = {(e)=>onSelect(e)}  onClick={(e)=>onSelectCompany(e,company)} >
                     {companyName.map((el,idx)=>(
                         <option  key ={el.name} value={el.company_no}>{el.name}</option>
                     ))}
                    </select>
                    <div className="table">
                        <div className="table_btn">
                            <button className={dateType === "ALL" ? "on" : ""} onClick={onSearchByDate}>??????</button>
                            <button className={dateType === "TODAY" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "TODAY") }}>??????</button>
                            <button className={dateType === "WEEK" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "WEEK") }}>1??????</button>
                            <button className={dateType === "MONTH" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "MONTH") }}>1??????</button>
                            <button className={dateType === "3MONTH" ? "on" : ""} onClick={(e) => { onSearchByDate(e, "3MONTH") }}>3??????</button>
                            <div className="filter">
                                <p><select name="year" value={year} onChange={(e) => { setYear(e.target.value) }} className="year">
                                    {YearOption}
                                </select></p>
                                <p><select name="month" value={month} onChange={(e) => { setMonth(e.target.value) }} className="month">
                                    {MonthOption}
                                </select></p>
                            </div>
                            <button className="search" onClick={(e) => { onSearchByDate(e, "SELECT") }}>??????</button>
                        </div>
                        <table>
                            <colgroup>
                                <col width="6%" />
                                <col width="14%" />
                                <col width="12%" />
                                <col width="10%" />
                                <col width="8%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>??????</th><th>??????</th><th>?????????</th><th>??????</th><th>??????</th><th>????????????</th><th>????????????</th><th>????????????</th><th>?????????</th><th>??????</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ServiceItemRows}
                            </tbody>
                        </table>
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
