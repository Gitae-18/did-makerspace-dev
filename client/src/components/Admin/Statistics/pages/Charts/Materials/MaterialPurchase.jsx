import React, { useEffect, useState } from "react";
import { PreUri } from "../../../../../../CommonCode";
import Chart from "react-apexcharts";
import xlsx from "xlsx";
import SearchBar from'../../Materials/SearchBar';
import { saveAs } from "file-saver";

const fileType =
  "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function MaterialPurchase() {
  const printFunc = () => {
    setTimeout(() => {
      window.print();
    }, 500);
  };
  const [data, setData] = useState([]);
  const cdata = [];

  useEffect(() => {
    const getData = async () => {
      let option = {
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      };
      try {
        const res = await fetch(PreUri + "/stastics/matuse", option);
        const response = await res.json();
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    return function clean() {
      console.log("clean");
    };
  }, []);

  if (!data) return null;
  const dataList = data.filter((v) => v.material_usage_no < 20);
  const quantity = data
    .filter((arr) => arr.material_usage_no < 20)
    .map((arr) => arr.quantity);
  const name = cdata
    .filter((arr) => arr.material_item_no < 20)
    .map((arr) => arr.name);

  const fileDownload = () => {
    const ws = xlsx.utils.json_to_sheet(dataList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { boolType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `file_${Date.now()}.xlsx`);
  };

  const series = [
    {
      name: "ėėŽėë",
      type: "column",
      data: quantity,
    },
  ];

  const options = {
    colors: ["#0f2750"],
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
        fillColors: ["#0C2840"],
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "70%",
      },
    },

    stroke: {
      colors: [""],
      width: 4,
    }, //line chartė 

    xaxis: {
      categories: name,
      tickPlacement: "on", // xėķė ëŠĐ start or center
      labels: {
        style: {
          fontSize: "11px",
          fontWeight: 300,
        },
      },
    },
    yaxis: {
      title: {
        text: "ëĻė: ęąī ",
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
  return (
    <>
      <h2>ėėŽ ėŽėĐ</h2>
      <div className="material"></div>
      <div class="graph">
        <Chart options={options} series={series} width={900} height={300} />
      </div>
      <div class="sheet">
        <div>
          <span>íĩęģ ë° ëķė</span> / <span>ęļ°ėėŽ,ėėŽ</span> /{" "}
          <span>ėėŽ ėŽėĐ</span>
          <SearchBar></SearchBar>
          <div class="download">
            <button  class="btn_print" onClick={printFunc}>
              íëĶ°íļ
            </button>
            <button  class="btn_excel" onClick={fileDownload}>
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
                <th>ėėŽëēíļ</th>
                <th>ėėŽëŠ</th>
                <th>ėë</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr key={item.material_item_no}>
                  <td>{item.material_item_no}</td>
                  <td>{item.request_content}</td>
                  <td>{item.quantity + "EA"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default MaterialPurchase;
