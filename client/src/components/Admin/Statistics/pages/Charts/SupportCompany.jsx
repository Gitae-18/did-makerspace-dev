import React, { Component , useState, useEffect} from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import fileDownload from 'js-file-download';
import DatePicker from 'react-datepicker';
import '../Datepicker.css';
import xlsx from "xlsx";
import Chart from "react-apexcharts";
import moment from "moment";
import CompanyData from "../Data/CompanyData";
import styled from 'styled-components';
import "./chart.css";
const fileType = "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function SupportCompany(){
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
  const [btnClick,setBtnClick] = useState(null);
	const [startDate,setStartDate] = useState("");
	const [endDate,setEndDate] = useState("");
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
	
	
	if (!data) return null;
	const dataDay = data.map((key)=> key.created_at);
let dataList = data.filter((v)=> v.created_at);
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
const NewDate = moment(startDate,'YYYY-MM-dd'+' '+'hh:mm:ss').format();
const EndDate = moment(endDate,'YYYY-MM-dd'+' '+'hh:mm:ss').format();
const btn_inquire = () =>{
	
	let dataFrame = dataList.filter((v)=>(v.created_at>NewDate) && (v.created_at<EndDate));

	setNewD(dataFrame);
}

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
         const series =  [
            {
              name: "현재 서비스 지원",
              type: "column",
              data: [20, 29, 37, 36, 44,55],
            },
    
            {
              name: "총 서비스 지원",
              type: "column",
              data: [20, 29, 37, 36, 44,65],
            },
            {
              name: "서비스 평균 지원",
              type: "line",
              data: [26, 23, 30, 32, 39,60],
            },
          ]
        
         const options =  {
          
            colors: ["#000066","#0033dd","#FFDAB9"],
          
            dataLabels: {
                enabled: false,
                enabledOnSeries:[2],
               textAnchor: 'middle',
               style:{
                   colors:['#000']
               }
              },
            chart: {
              height: 350,
              type: "line",
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
            legend:{
                labels:{
                    colors:"#000",
                    useSeriesColors:false,
                },
                markers:{
                    fillColors:["#000066","#0033dd","#FFDAB9"],
                },
            },
            plotOptions:{
                bar:{
                   borderRadius:10,
                   columnWidth:'60%',
             
                 
                },
              },
            
            stroke: {
             colors:["","","#FFDAB9"],
              width: 3,
              

            },
    
            xaxis: {
              categories: ["(주)디엠비", "이노플러스", "건축과화덕", "(주)새온", "따뜻한메이커스","아이피하트"],
            },
            yaxis: [
              {
                title: {
                    text: "단위: 건 ",
                  },
              },
              {
                seriesName: "Income",
                opposite: true,
                axisBorder: {
                  show: true,
                },
              },
            ],
            tooltip: {
              fixed: {
                enabled: true,
                position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60,
              },
            },
            
          }
      
    
     
        return (
          <>
            <div class="content">
              <div class="table">
                <div class="table_btn">
                {DateFilterData.map((el,idx)=>(
						<button className="on" onClick = {handleClicked}
						key = {idx}
						backgroundColor = {btnClick === el.value}
						type="button"
						value={el.value}>{el.value}</button>
					))}
					
					<div class="filter">
						<p><MyDatePicker id ="startdate"placeholderText="시작일 입력" locale="ko"selected={startDate}  onChange={(value)=>setStartDate(value)}  /></p>
						<BetweenDate>~</BetweenDate>
						<p><MyDatePicker id ="enddate" placeholderText="종료일 입력" locale="ko"selected={endDate}  onChange = {(value)=>setEndDate(value)} /></p>
					</div>
					<button href="#" class="search" onClick={btn_inquire} >조회</button>
                </div>
              </div>
              <h2>시제품 제작 지원 기업</h2>
              <div class="graph">
                <Chart
                  options={options}
                  series={series}
                  type="line"
                  width={900}
                  height={300}
                />
              </div>
              <div class="sheet">
                <div>
                  <span>통계 및 분석</span> / <span>서비스</span> /{" "}
                  <span>지원 기업</span>
                  <div class="download">
                    <a
                      class="btn_print"
                      role="button"
                      onClick={() => window.print()}
                    >
                      프린트
                    </a>
                    <a class="btn_excel" role="button" onClick={fileDownload}>
                      Excel
                    </a>
                  </div>
                </div>
                <div class="table_wrap">
                  <CompanyData />
                </div>
              </div>
            </div>
          </>
        );
}
export default SupportCompany;