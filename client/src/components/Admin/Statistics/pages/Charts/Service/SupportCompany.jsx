import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { PreUri } from "../../../../../../CommonCode";
import axios from "axios";
import "../../../../../../css/chart/Datepicker.css";
import xlsx from "xlsx";
import Chart from "react-apexcharts";

const fileType =
  "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function SupportCompany() {
  const [data, setData] = useState([]);
  const getService = async () => {
    try {
      let option = {
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
      const res = await axios.get(PreUri + "/stastics/com", option);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }




  };
  useEffect(() => {
    getService();
  }, []);

  if (!data) return null;
  const fileDownload = () => {
    const ws = xlsx.utils.json_to_sheet(serviceList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { boolType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `file_${Date.now()}.xlsx`);
  };

  const serviceList = data.filter((word) => word.company_no < 20);

  const series = [
    {
      name: "현재 서비스 지원",
      type: "column",
      data: [20, 29, 37, 36, 44, 55],
    },

    {
      name: "총 서비스 지원",
      type: "column",
      data: [20, 29, 37, 36, 44, 65],
    },
    {
      name: "서비스 평균 지원",
      type: "line",
      data: [26, 23, 30, 32, 39, 60],
    },
  ];

  const options = {
    colors: ["#0f2753", "#009999", "#FFDAB9"],

    dataLabels: {
      enabled: false,
      enabledOnSeries: [2],
      textAnchor: "middle",
      style: {
        colors: ["#000"],
      },
    },
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
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
    legend: {
      labels: {
        colors: "#000",
        useSeriesColors: false,
      },
      markers: {
        fillColors: ["#000066", "#0033dd", "#FFDAB9"],
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "60%",
      },
    },

    stroke: {
      colors: ["", "", "#FFDAB9"],
      width: 3,
    },

    xaxis: {
      categories: [
        "(주)디엠비",
        "이노플러스",
        "건축과화덕",
        "(주)새온",
        "따뜻한메이커스",
        "아이피하트",
      ],
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
  };

  return (
    <>
      <div class="content">
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
              <button class="btn_print" onClick={() => window.print()}>
                프린트
              </button>
              <button class="btn_excel" onClick={fileDownload}>
                Excel
              </button>
            </div>
          </div>
          <div class="table_wrap">
            <table>
              <colgroup>
                <col width="25%"></col>
                <col width="25%"></col>
                <col width="25%"></col>
                <col width="25%"></col>
              </colgroup>
              <thead>
                <tr>
                  <th>지원 기업</th>
                  <th>
                    현재 서비스 지원
                    <div class="filter2">
                      <span></span>
                    </div>
                  </th>
                  <th>
                    지난 서비스 지원
                    <div class="filter2">
                      <span></span>
                    </div>
                  </th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {serviceList.map((item) => (
                  <tr key={item.company_no}>
                    <td>{item.company_no}</td>
                    <td>{item.name}</td>
                    <td>{item.business_field}</td>
                    <td>{item.telephone_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default SupportCompany;
