import React, { Component , useState, useEffect} from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import fileDownload from 'js-file-download';
import DatePicker from 'react-datepicker';
import '../Datepicker.css';
import RejectData from "../Data/RejectData";
import xlsx from "xlsx";
import Chart from "react-apexcharts";
import moment from "moment";
import styled from 'styled-components';
import "./chart.css";
const fileType = "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
 function UserReject (){
  const fileDownload = () =>{
		const ws = xlsx.utils.json_to_sheet();
		const wb = {Sheets:{data : ws}, SheetNames:["data"]};
		const excelBuffer = xlsx.write(wb,{boolType: "xlsx", type: "array"});
		const data = new Blob([excelBuffer], {type: fileType});
		saveAs(data, `file_${Date.now()}.xlsx`);
	}
	let initBody;

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
   const series = [60,30,10]
    
    const  options =  {
        colors:["#003399","#093812","#444444"],
        dataLabels: {
          enabled: true,
        },
        chart: {
          type:"pie",
          toolbar:{show:true},
        },
        labels:['내용부적합','필수내용누락','서비스진행불가'],
        fill: {
          colors: ["#003399","#093812","#444444"]
        },
       legend:{
        position:'bottom',
        markers:{
            fillColors:["#003399","#093812","#444444"],
        },
        
       },
       tooltip:{
        enabled:true,
      }
      };
  
  
    return (
    <>
    <div class="content">
			
    <h2>반려 사유</h2>
			<div class="graph">
        <Chart
        className="reject"
        options={options}
        series={series}
        type="pie"
        width={900}
        height={300}
      /></div>
			<div class="sheet">
				<div>
					<span>통계 및 분석</span> / <span>서비스</span> / <span>반려 내역</span>
					<div class="download">
						<a  class="btn_print" role="button" onClick={()=> window.print()}>프린트</a>
						<a  class="btn_excel" role="button" onClick={fileDownload}>Excel</a>
					</div>
				</div>
				<div class="table_wrap">
					<RejectData/>
				</div>
			</div>
      </div>
      
      </>
    );
}
export default UserReject;
