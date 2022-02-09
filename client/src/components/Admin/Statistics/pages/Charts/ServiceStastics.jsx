import React, { Component , useState, useEffect} from "react";
import { CommonHeader, PreUri, Method, ProgressCode,StatusCode } from '../../../../../CommonCode';
import { saveAs } from "file-saver";
import axios from "axios";
import {VscCalendar} from "react-icons/vsc";
import fileDownload from 'js-file-download';
import DatePicker from 'react-datepicker';
import '../Datepicker.css';
import xlsx from "xlsx";
import Chart from "react-apexcharts";
import moment from "moment";
import UserData from "../Data/UserData";
import styled from 'styled-components';
import "./chart.css";

const fileType = "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function ServiceStatics() {
	const printFunc = () =>{
		setTimeout(() => {
			window.print();
		}, 500);
		
	
	}
	const beforePrint = ()=>{
		initBody = document.body.innerHTML;
		document.body.innerHTML = document.getElementById('print').innerHTML;
	}
	const afterPrint = () =>{
		document.body.innerHTML = initBody;
	}
	window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint;
	const [data,setData] = useState([]);
	const [newD,setNewD] = useState([]);
	const getService = async() =>{
		try{
	let option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };
	const res = await axios.get( "http://localhost:3006/api/v1/stastics",
	option);
	setData(res.data);
	}catch(e){
		console.log(e)
	}
	}
	useEffect(()=>{
		getService();
	},[])
	let dataList = data.filter((v)=> v.created_at);
	
	
const btn_inquire = () =>{
	
	let dataFrame = dataList.filter((v)=>(v.created_at>NewDate) && (v.created_at<EndDate));

	setNewD(dataFrame);
}
  const [cdata, setCdata] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };
      try {
        const res = await fetch(
          "http://localhost:3006/api/v1/stastics",
          option
        );
        const response = await res.json();
        setCdata(response.cdata);
      } catch (e) {
        console.log(e);
      }
    };
    
    getData();
  }, []);
  const [btnClick,setBtnClick] = useState(null);
	const [startDate,setStartDate] = useState("");
	const [endDate,setEndDate] = useState("");
	const NewDate = moment(startDate,'YYYY-MM-dd'+' '+'hh:mm:ss').format();
	const EndDate = moment(endDate,'YYYY-MM-dd'+' '+'hh:mm:ss').format();
	const handleClicked = (e) =>{
		const {value} = e.target;
		setBtnClick(value);
		const currentDate = new Date();
		let year ;
		let month;
		let day;
		let hours,minutes,seconds;
		const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
		const time = new Date().toTimeString().split(" ")[0];
		let today  = date + ' ' + time;
		function timestamp(){
			var today = new Date();
			today.setHours(today.getHours() + 9);
			return today.toISOString().replace('T', ' ').substring(0, 19);
		}
		let dateString ,timeString;
		if( value == "기본"){
			
			setStartDate();
			setEndDate();
		}
		if (value === "당일"){
			
			timeString = hours + ':' + minutes + ':' + seconds;
			setStartDate(new Date());
			setEndDate(new Date());
		}
		if (value === "1주일"){
			let sevenDays = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
			setStartDate(sevenDays);
			setEndDate(new Date());
		}
		if (value === "1개월"){
			let oneMonth = new Date(new Date().getFullYear(),new Date().getMonth() -1, new Date().getDate());
			setStartDate(oneMonth);
			setEndDate(new Date());
		}
		if (value === "3개월") {
			let threeMonthAgo = new Date(
			  new Date().getFullYear(),
			  new Date().getMonth() - 3,
			  new Date().getDate()
			);
			setStartDate(threeMonthAgo);
			setEndDate(new Date());
		  }
		 
	};
	
	const dataFat = dataList.filter((v)=>(v.created_at>NewDate) && (v.created_at<EndDate));
	if (!data) return null;
	const dataDay = data.map((key)=> key.created_at);

const fileDownload = () =>{
  const fileExtension = ".xlsx";
  const ws = xlsx.utils.json_to_sheet(newD);
  const wb = {Sheets:{data : ws}, SheetNames:["data"]};
  const excelBuffer = xlsx.write(wb,{boolType: "xlsx", type: "array"});
  const data = new Blob([excelBuffer], {type: fileType});
  saveAs(data, `file_${Date.now()}.xlsx`);
}
let initBody;

//setStartDate(new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]+new Date().toTimeString().split(" ")[0]);
//setEndDate(new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]+new Date().toTimeString().split(" ")[0]);
let date = startDate


const MyDatePicker = styled(DatePicker)`
  height: 25px;
  width: 140px;
  padding: 6px 12px;
  font-size: 14px;
  text-align: center;
  border: 2px solid #e5e5e5;
  border-radius:4px;
  outline: none;
  cursor: pointer;
`
const BetweenDate = styled.span`
  display: table;
  height:20px;
  padding: 2px 12px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  font-size: 12px;
  cursor: pointer;
`;
const DateFilterData = [
	{
		id:1,
		value:"기본"
	},
	{
		id:2,
		value:"당일"
	},
	{
		id:3,
		value:"1주일"
	},
	{
		id:4,
		value:"1개월"
	},
	{
		id:5,
		value:"3개월"
	}
]
  let dayday= [];
  const histories = data.filter((arr)=>(arr.created_at>NewDate) && (arr.created_at<EndDate)).map((arr)=> arr.created_at);

  for(let i = 0 ; i<histories.length;i++)
  {
    if(histories[i] != null)
    {
      dayday[i]= histories[i].substr(5,6);
    }
  }
  const days = data.filter((arr)=>(arr.created_at>NewDate) && (arr.created_at<EndDate)).map((arr)=> arr.created_at);
  
  const arr=[40,30,50,60,70,80];
     const options = {
        dataLabels: {
          enabled: false,
        },
        chart: {
          id: "chart",
          stacked: false,
              toolbar: {
                show: true,
                tools: {
                  pan: true,
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                  download: true,
                  reset: true,
                },
              },
        },
        fill: {
          colors: ["#000066"]
        },
        storke:{
          
        },
        xaxis: {
          categories: dayday,
        },
		plotOptions:{
			bar:{
			   borderRadius:10,
			   columnWidth:'60%',
		 
			 
			},
		  },
      }
      const series =  [
        {
          name: "sales",
          data: arr,
        },
      ]
      const DatePickerCustomInput = (onClick) => <div className="calendar_icon"><VscCalendar onClick={onClick} /></div>;
  
    return (
      <>
      <div class="content">
			
			<div class="table">
				
				<div class="table_btn">
					
					{DateFilterData.map((el,idx)=>(
						<button className="on" onClick = {(event)=>{handleClicked(event);btn_inquire(event);}}
						key = {idx}
						backgroundColor = {btnClick === el.value}
						type="button"
						value={el.value}>{el.value}</button>
					))}
					
					<div class="filter">
						<p><MyDatePicker id ="startdate"placeholderText="시작일 입력" locale="ko"selected={startDate}  onChange={(value)=>setStartDate(value)}/></p>
						<BetweenDate>~</BetweenDate>
						<p><MyDatePicker id ="enddate" placeholderText="종료일 입력" locale="ko"selected={endDate}  onChange = {(value)=>setEndDate(value)} /></p>
					</div>
					<button href="#" class="search" onClick={btn_inquire} >조회</button>
				</div>
			</div>
			<div id ="print">
			<h2>당월 상담 통계 내역</h2>
			<div class="graph"><Chart
        options={options}
        series={series}
        width={900}
        height={300}
        type= "bar"/></div>
			<div class="sheet">
				<div>
					<span>통계 및 분석</span> / <span>서비스</span> / <span>상담 내역</span>
					<div class="download">
						<a  class="btn_print" role="button" onClick={printFunc}>프린트</a>
						<a  class="btn_excel" role="button" onClick={fileDownload}>Excel</a>
					</div>
				</div>
				<div class="table_wrap">
					
				<table>
        <colgroup>
            <col width="33%"></col>
            <col width="33%"></col>
            <col width="34%"></col>
        </colgroup>
        <thead>
            <tr>
                <th>기간</th>
                <th>상담<div class="filter2"><span className='filterimg'></span></div></th>
                <th>비고</th>
            </tr>
        </thead>
								  <tbody>
									  {dataFat.map((key => (
										  <tr key={key.service_no}>
											  <td>{key.created_at}</td>
											  <td>{key.title}</td>
											  <td>{key.progress}</td>
										  </tr>
									  )))}
								  </tbody>
    </table>
				</div>
			</div>
			</div>
		</div>
      </>
    );
  
  }
export default ServiceStatics;
