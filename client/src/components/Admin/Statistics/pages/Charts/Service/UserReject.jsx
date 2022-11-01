import React from "react";
import { saveAs } from "file-saver";
import "../../../../../../css/chart/Datepicker.css";
import xlsx from "xlsx";
import Chart from "react-apexcharts";
import data2 from "../../Data/data2.json";

const fileType =
  "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function UserReject() {
  const fileDownload = () => {
    const ws = xlsx.utils.json_to_sheet(wordList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { boolType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `file_${Date.now()}.xlsx`);
  };

  const series = [60, 30, 10];

  const options = {
    colors: ["#0f2753", "#093812", "#444444"],
    dataLabels: {
      enabled: true,
    },
    chart: {
      type: "pie",
      toolbar: { show: true },
    },
    labels: ["내용부적합", "필수내용누락", "서비스진행불가"],
    fill: {
      colors: ["#0f2753", "#093812", "#444444"],
    },
    legend: {
      position: "bottom",
      markers: {
        fillColors: ["#0f2753", "#093812", "#444444"],
      },
    },
    tooltip: {
      enabled: true,
    },
  };

  const wordList = data2.filter((word) => word.day);
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
          />
        </div>
        <div class="sheet">
          <div>
            <span>통계 및 분석</span> / <span>서비스</span> /{" "}
            <span>반려 내역</span>
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
              <thead>
                <tr>
                  <th>반려사유</th>
                  <th>
                    반려횟수
                    <div class="filter2">
                      <span className="filterimg"></span>
                    </div>
                  </th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {wordList.map((word) => (
                  <tr key={word.id}>
                    <td>{word.reason}</td>
                    <td>{word.application}</td>
                    <td>{word.note}</td>
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
export default UserReject;
