import React, { useState, useEffect } from "react";
import { PreUri } from "../../../../../../CommonCode";
import Chart from "react-apexcharts";
import xlsx from "xlsx";
import { saveAs } from "file-saver";
import "../../../../../../css/chart/Material.css";

const fileType =
  "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function MaterialMount() {
  const printFunc = () => {
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const [data, setData] = useState([]);
  const [Selected, setSelected] = useState("");

  useEffect(() => {
    const getData = async () => {
      let option = {
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
      try {
        const res = await fetch(PreUri + "/stastics/mat", option);
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
 
  const ChangeData = (e) => {
    setSelected(e.target.value);
  };
  let dataFat = [];
  dataFat = dataList.filter((v) => v.equipment_category_no);

  if (Selected === "합판") {
    dataFat = dataList.filter((v) => v.equipment_category_no === 24);
  } else if (Selected === "아크릴") {
    dataFat = dataList.filter((v) => v.equipment_category_no === 27);
  } else if (Selected === "프린트") {
    dataFat = dataList.filter((v) => v.equipment_category_no === 5);
  } else if (Selected === "필라멘트") {
    dataFat = dataList.filter((v) => v.equipment_category_no === 9);
  }
  console.log(dataFat);
  const quantity = dataList
    .filter((arr) => arr.material_item_no < 7)
    .map((arr) => arr.quantity);
  const name = dataList
    .filter((arr) => arr.material_item_no < 7)
    .map((arr) => arr.name);

  const fileDownload = () => {
    const ws = xlsx.utils.json_to_sheet(dataFat);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { boolType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `file_${Date.now()}.xlsx`);
  };
  const series = [
    {
      name: "사용중인 품목 수",
      type: "column",
      data: [20, 29, 37, 36, 44, 46],
    },

    {
      name: "사용하지 않는 품목 수",
      type: "column",
      data: [20, 29, 37, 36, 44, 67],
    },
    {
      name: "전체 품목 수",
      type: "line",
      data: quantity,
    },
  ];

  const options = {
    colors: ["#0C2840", "#097368", "#FFDAB9"],
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
        easing: "linear",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
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
        fillColors: ["#0C2840", "#097368", "#FFDAB9"],
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "70%",
      },
    },

    stroke: {
      colors: ["", "", "#FFDAB9"],
      width: 4,
    }, //line chart선

    xaxis: {
      categories: name,
      tickPlacement: "on", // x축제목 start or center
      labels: {
        style: {
          fontSize: "11px",
          fontWeight: 300,
        },
      },
    },
    yaxis: {
      title: {
        text: "단위: 건 ",
      },
      min: 0,
      max: 100,
    },

    grid: {
      row: {
        colors: ["#fff", "#f2f2f2"],
      },
    },
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
  };

  const DataFilter = [
    {
      id: 1,
      value: "합판",
    },
    {
      id: 2,
      value: "아크릴",
    },
    {
      id: 3,
      value: "프린트",
    },
    {
      id: 4,
      value: "필라멘트",
    },
  ];

  return (
    <>
      <div class="content">
        <h2>자재 재고 보유량</h2>
        <div className="material">
          <select onChange={ChangeData} value={Selected}>
            {DataFilter.map((el, idx) => (
              <option key={el.value} value={el.value}>
                {el.value}{" "}
              </option>
            ))}
          </select>
        </div>
        <div class="graph">
          <Chart options={options} series={series} width={900} height={300} />
        </div>
        <div class="sheet">
          <div>
            <span>통계 및 분석</span> / <span>기자재,자재</span> /{" "}
            <span>자재별 재고 보유량</span>
            <div class="download">
              <button class="btn_print" onClick={printFunc}>
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
                <col width="20%"></col>
                <col width="50%"></col>
                <col width="30%"></col>
              </colgroup>
              <thead>
                <tr>
                  <th>자재번호</th>
                  <th>자재명</th>
                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                {dataFat.map((item) => (
                  <tr key={item.material_item_no}>
                    <td>{item.material_item_no}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity + "EA"}</td>
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
export default MaterialMount;
