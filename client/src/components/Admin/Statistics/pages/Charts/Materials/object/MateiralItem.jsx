import React, { useState, useEffect} from "react";
import {  PreUri } from '../../../../../../../CommonCode';
import Chart from "react-apexcharts";
import xlsx from "xlsx";
import { saveAs } from "file-saver";
import '../../../../../../../css/chart/chart.css';

const fileType =
  "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function MaterialItem () {
  const printFunc = () => {
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let option = {
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
      try {
        const res = await fetch(PreUri+"/stastics/mat", option);
        const response = await res.json();
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

if (!data) return null;
let dataList = data.filter((v) => v.material_item_no);
  const razor = data
    .filter((arr) => arr.material_category_no === 4)
    .map((arr) => arr.material_category_no);
  const cnc = data
 
  .filter((arr) => arr.material_category_no === 3)
  .map((arr) => arr.material_category_no);
  const wood = data
  
    .filter((arr) => arr.material_category_no === 5)
    .map((arr) => arr.material_category_no);
  const printnor = data
  
    .filter((arr) => arr.material_category_no === 1 )
    .map((arr) => arr.material_category_no);
  const printexp = data
  
  .filter((arr) => arr.material_category_no === 2)
  .map((arr) => arr.material_category_no);

  const fileDownload = () => {
    const ws = xlsx.utils.json_to_sheet(dataList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { boolType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `file_${Date.now()}.xlsx`);
  };
  const dataRequest = (item) =>{
    if(item.material_category_no===1){
      return("3D프린터(전문)");
  }else if(item.material_category_no===2){
    return("3D프린터(일반)");
  }else if(item.material_category_no===3){
    return("CNC");
  }else if(item.material_category_no===4){
    return("레이저");
  }else if(item.material_category_no===5){
    return("목재");
  }
}
 const state = {
  
    series: [razor.length,cnc.length,wood.length,printnor.length,printexp.length],
    options: {
      colors:[
        "#0F2027","#203A43","#2C5364","#1f4037","#355C7D"
      ],
      chart: {
        type: 'donut',
        toolbar:{show:false},
      },
      labels:['레이저','CNC','목재','3D프린터(전문)','3D프린터(일반)'],
      dataLabels: {
        enabled: true,
      },
      responsive: [{
        options: {
          legend: {
            show: false,
          }
        }
      }],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      },
      
    }};
    return (
    <>
        <div class="content">
	  <h2>자재 품목현황</h2>
			<div class="graph"> 
      <Chart
        options={state.options}
        series={state.series}
        width={900}
        height={300}
        type= "donut"
        
      />
     </div>
			<div class="sheet">
				<div>
					<span>통계 및 분석</span> / <span>기자재/자재통계</span> / <span>자재 품목</span>
					<div class="download">
						<button class="btn_print"onClick={printFunc}>프린트</button>
						<button class="btn_excel"onClick={fileDownload}>Excel</button>
					</div>
				</div>
				<div class="table_wrap">
				<table>
					<colgroup>
						<col width="33%"/>
						<col width="33%"/>
						<col width="34%"/>
					
					</colgroup>
					<thead>
						<tr>
              <th> 종류</th>
						  <th>수량</th>
            	<th>비고</th>
						</tr>
					</thead>
					<tbody>
          {dataList.map((item) => (
                  <tr key={item.material_item_no}>
                    <td>{dataRequest(item)}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity + "EA"}</td>
                  </tr>
                ))}
						<tr>	
							<td></td>
							<td></td>
							<td></td>
						</tr>
						
					</tbody>
				</table>
				</div>
			</div>
		</div>
     </>
    );
}
export default MaterialItem;
